import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_PRODUCTS } from "@/data/products";
import { Preloader } from "@/components/ui/Preloader";
import { useLenis } from "@/hooks/useLenis";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useLenis();
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    const heroElements = heroRef.current?.querySelectorAll('.hero-anim');
    if (heroElements) {
      // Delay to wait for preloader
      const delay = sessionStorage.getItem("preloader_shown") === "true" ? 0 : 2.5;
      
      gsap.fromTo(heroElements, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.15, 
          ease: "power3.out",
          delay: delay 
        }
      );
    }

    // Scroll trigger animations for section titles
    titleRefs.current.forEach((title) => {
      if (!title) return;
      gsap.fromTo(
        title,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title.parentElement,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  const addToRefs = (el: HTMLHeadingElement | null) => {
    if (el && !titleRefs.current.includes(el)) {
      titleRefs.current.push(el);
    }
  };

  const featuredProducts = MOCK_PRODUCTS.filter(p => p.isFeatured).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="bg-[#0B0B0B] min-h-screen text-white overflow-hidden"
    >
      <Preloader />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center px-6">
          <h1 className="hero-anim opacity-0 font-serif text-5xl md:text-8xl lg:text-9xl tracking-[0.15em] font-light mb-6 uppercase text-white">
            Cleber Carrasco
          </h1>
          <p className="hero-anim opacity-0 font-sans text-sm md:text-base tracking-[0.2em] font-light text-[#E5E5E5] mb-12 uppercase max-w-xl">
            A essência do luxo silencioso. Alfaiataria e alta-costura.
          </p>
          <Link href="/colecao" className="hero-anim opacity-0">
            <span className="font-sans text-xs tracking-[0.2em] uppercase border-b border-white pb-2 hover:text-[#767676] hover:border-[#767676] transition-colors duration-300" data-cursor="pointer">
              Descubra a Coleção
            </span>
          </Link>
        </div>
      </section>

      {/* Editorial Grid */}
      <section className="bg-white text-[#0E0E0E] py-32 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="overflow-hidden mb-24">
            <h2 ref={addToRefs} className="font-serif text-4xl md:text-6xl tracking-[0.15em] font-light uppercase text-center">
              Nova Coleção
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
            <div className="md:col-span-7 flex flex-col justify-center mb-12 md:mb-0 pr-0 md:pr-12">
              <p className="font-sans text-lg md:text-xl font-light leading-relaxed tracking-wider mb-8 text-[#767676]">
                Uma exploração da forma e do vazio. Peças construídas com rigor arquitetônico que encontram sua verdadeira expressão no movimento.
              </p>
              <Link href="/colecao">
                <span className="font-sans text-xs tracking-[0.2em] uppercase border-b border-[#0E0E0E] pb-2 w-fit hover:text-[#767676] hover:border-[#767676] transition-colors duration-300" data-cursor="pointer">
                  Ver Editorial
                </span>
              </Link>
            </div>
            
            <div className="md:col-span-5 relative group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1594938298596-88941f1737e5?q=80&w=1200&auto=format&fit=crop" 
                alt="Editorial" 
                className="w-full h-[600px] object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Carousel/Grid */}
      <section className="bg-[#F9F9F9] py-32 px-6 md:px-12 text-[#0E0E0E]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div className="overflow-hidden">
              <h2 ref={addToRefs} className="font-serif text-3xl md:text-4xl tracking-[0.15em] font-light uppercase">
                Destaques
              </h2>
            </div>
            <Link href="/colecao" className="hidden md:block">
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#767676] hover:text-[#0E0E0E] transition-colors duration-300" data-cursor="pointer">
                Ver Tudo
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative"
              >
                <Link href={`/produto/${product.id}`} className="block overflow-hidden bg-[#121212] aspect-[3/4]" data-cursor="pointer">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                <div className="mt-6 text-center">
                  <h3 className="font-serif text-lg tracking-wider text-[#0E0E0E] mb-2">{product.name}</h3>
                  <p className="font-sans text-xs text-[#767676] tracking-[0.1em] uppercase">{product.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto with Parallax */}
      <section id="sobre" className="relative h-screen min-h-[800px] flex items-center justify-center bg-[#0B0B0B] text-white overflow-hidden py-32">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2000&auto=format&fit=crop" 
            alt="Atelier" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="overflow-hidden mb-12">
             <h2 ref={addToRefs} className="font-serif text-3xl md:text-5xl tracking-[0.15em] font-light uppercase">
              O Atelier
            </h2>
          </div>
          <p className="font-sans font-light text-lg md:text-2xl leading-loose tracking-wide text-[#E5E5E5]">
            "Acreditamos no poder do silêncio. Em um mundo de excessos, o verdadeiro luxo reside na subtração do desnecessário até que reste apenas a perfeição da forma e a pureza da matéria. Cada peça é um manifesto de intenção."
          </p>
          <div className="mt-16 text-[#767676] font-serif italic text-xl">
            — Cleber Carrasco
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white text-[#0E0E0E] py-32 px-6 md:px-12">
        <div className="max-w-[800px] mx-auto">
          <div className="overflow-hidden mb-16 text-center">
            <h2 ref={addToRefs} className="font-serif text-3xl md:text-4xl tracking-[0.15em] font-light uppercase">
              Atendimento Privado
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full font-sans">
            <AccordionItem value="item-1" className="border-[#E5E5E5] py-2">
              <AccordionTrigger className="font-sans text-sm tracking-[0.1em] uppercase hover:no-underline font-normal">
                Como funciona o processo sob medida?
              </AccordionTrigger>
              <AccordionContent className="text-[#767676] font-light leading-relaxed pt-4 pb-6">
                O processo de alta-costura começa com um encontro no nosso atelier em São Paulo, onde discutimos suas necessidades e tiramos suas medidas. Após a aprovação do croqui, realizamos de 2 a 3 provas (toiles) antes da entrega final.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-[#E5E5E5] py-2">
              <AccordionTrigger className="font-sans text-sm tracking-[0.1em] uppercase hover:no-underline font-normal">
                Vocês enviam para todo o Brasil?
              </AccordionTrigger>
              <AccordionContent className="text-[#767676] font-light leading-relaxed pt-4 pb-6">
                Sim, enviamos nossas coleções Prêt-à-Porter para todo o território nacional através de transportadoras premium, garantindo que a peça chegue impecável.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-[#E5E5E5] py-2">
              <AccordionTrigger className="font-sans text-sm tracking-[0.1em] uppercase hover:no-underline font-normal">
                Como agendar um horário?
              </AccordionTrigger>
              <AccordionContent className="text-[#767676] font-light leading-relaxed pt-4 pb-6">
                O agendamento é feito exclusivamente através do nosso WhatsApp. Nossa equipe de concierge organizará sua visita ao atelier de forma privativa.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
