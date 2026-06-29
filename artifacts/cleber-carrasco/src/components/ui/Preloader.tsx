import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader() {
  const [shouldShow, setShouldShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("preloader_shown");
    if (hasShown) {
      setShouldShow(false);
      return;
    }

    setShouldShow(true);
    sessionStorage.setItem("preloader_shown", "true");
  }, []);

  useEffect(() => {
    if (!shouldShow || !containerRef.current || !logoRef.current) return;

    const tl = gsap.timeline();

    // Reset state
    gsap.set(logoRef.current, { clipPath: "inset(100% 0 0 0)", scale: 1.05 });
    gsap.set(containerRef.current, { yPercent: 0 });

    tl.to(logoRef.current, {
      clipPath: "inset(0% 0 0 0)",
      duration: 1.4,
      ease: "power3.inOut"
    })
    .to(logoRef.current, {
      scale: 1.0,
      duration: 0.5,
      ease: "power2.out"
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.2
    });

    // We can dispatch an event or just let it finish. 
    // Hero elements fade in handled by hero component, or we can use a global class.

  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center pointer-events-none"
    >
      <img 
        ref={logoRef}
        src="/logo-cleber-carrasco.png" 
        alt="Cleber Carrasco"
        className="w-full max-w-[280px] invert object-contain"
        style={{ clipPath: "inset(100% 0 0 0)" }}
      />
    </div>
  );
}
