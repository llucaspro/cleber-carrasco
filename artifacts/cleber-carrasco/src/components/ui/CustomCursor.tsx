import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Set initial positions off-screen to avoid flash
    gsap.set(dot, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const speed = 0.12;

    const xSet = gsap.quickSetter(ring, "x", "px");
    const ySet = gsap.quickSetter(ring, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
      
      // Instantly set dot position
      gsap.set(dot, { x: mouse.x, y: mouse.y, autoAlpha: 1 });
      
      // Make ring visible on first move
      if (gsap.getProperty(ring, "autoAlpha") === 0) {
        gsap.set(ring, { autoAlpha: 1 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Render loop for lerp
    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      
      xSet(pos.x);
      ySet(pos.y);
    });

    // Handle hovers
    const handleHoverEnter = () => {
      gsap.to(ring, {
        width: 56,
        height: 56,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        mixBlendMode: "difference",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(dot, {
        scale: 0,
        duration: 0.2
      });
    };

    const handleHoverLeave = () => {
      gsap.to(ring, {
        width: 32,
        height: 32,
        backgroundColor: "transparent",
        mixBlendMode: "normal",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.2
      });
    };

    // Attach listeners to all interactable elements
    const attachHoverListeners = () => {
      const hoverables = document.querySelectorAll("a, button, [data-cursor='pointer']");
      hoverables.forEach(el => {
        el.addEventListener("mouseenter", handleHoverEnter);
        el.addEventListener("mouseleave", handleHoverLeave);
      });
    };

    attachHoverListeners();

    // Re-attach listeners on DOM mutations (simplified for this task)
    const observer = new MutationObserver((mutations) => {
      attachHoverListeners();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(() => {});
      observer.disconnect();
      const hoverables = document.querySelectorAll("a, button, [data-cursor='pointer']");
      hoverables.forEach(el => {
        el.removeEventListener("mouseenter", handleHoverEnter);
        el.removeEventListener("mouseleave", handleHoverLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-[4px] h-[4px] bg-[#0E0E0E] dark:bg-white rounded-full pointer-events-none z-[9999]"
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-[32px] h-[32px] border border-[#0E0E0E] dark:border-white border-opacity-15 dark:border-opacity-30 rounded-full pointer-events-none z-[9998]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
