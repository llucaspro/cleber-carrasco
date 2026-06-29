import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLenis } from "@/hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

const seasons = ["Todos", "Inverno 2025", "Verão 2025", "Alta-Costura"];

const lookbookImages = [
  {
    id: 1,
    season: "Inverno 2025",
    title: "Silhueta Noturna",
    subtitle: "Alfaiataria de Inverno",
    src: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1600&auto=format&fit=crop",
    size: "large",
    productId: "p1",
  },
  {
    id: 2,
    season: "Inverno 2025",
    title: "Forma e Vazio",
    subtitle: "Prêt-à-Porter",
    src: "https://images.unsplash.com/photo-1594938298596-88941f1737e5?q=80&w=1200&auto=format&fit=crop",
    size: "small",
    productId: "p2",
  },
  {
    id: 3,
    season: "Alta-Costura",
    title: "Seda e Movimento",
    subtitle: "Alta-Costura",
    src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop",
    size: "small",
    productId: "p3",
  },
  {
    id: 4,
    season: "Verão 2025",
    title: "Leveza Estruturada",
    subtitle: "Verão Editorial",
    src: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ce3?q=80&w=1600&auto=format&fit=crop",
    size: "large",
    productId: "p4",
  },
  {
    id: 5,
    season: "Verão 2025",
    title: "Branco Absoluto",
    subtitle: "Feminino Verão",
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    size: "small",
    productId: "p5",
  },
  {
    id: 6,
    season: "Alta-Costura",
    title: "Geometria Pura",
    subtitle: "Acessórios",
    src: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1200&auto=format&fit=crop",
    size: "small",
    productId: "p6",
  },
  {
    id: 7,
    season: "Inverno 2025",
    title: "Névoa Cashmere",
    subtitle: "Masculino",
    src: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1600&auto=format&fit=crop",
    size: "large",
    productId: "p7",
  },
  {
    id: 8,
    season: "Alta-Costura",
    title: "Dança e Seda",
    subtitle: "Alta-Costura",
    src: "https://images.unsplash.com/photo-1583391733958-6c68da78d234?q=80&w=1200&auto=format&fit=crop",
    size: "small",
    productId: "p8",
  },
  {
    id: 9,
    season: "Verão 2025",
    title: "Sombra e Mistério",
    subtitle: "Acessórios Verão",
    src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop",
    size: "small",
    productId: "p9",
  },
  {
    id: 10,
    season: "Alta-Costura",
    title: "Assimetria Controlada",
    subtitle: "Vestido Escultura",
    src: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1600&auto=format&fit=crop",
    size: "large",
    productId: "p10",
  },
];

export default function Lookbook() {
  useLenis();
  const [activeSeason, setActiveSeason] = useState("Todos");
  const [lightboxImg, setLightboxImg] = useState<(typeof lookbookImages)[0] | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const filtered = activeSeason === "Todos"
    ? lookbookImages
    : lookbookImages.filter(img => img.season === activeSeason);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "power4.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (lightboxImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxImg]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-[#0B0B0B] text-white min-h-screen"
    >
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
        <p className="font-sans text-[10px] tracking-[0.35em] text-[#767676] uppercase mb-8">
          Editorial Visual
        </p>
        <h1 ref={titleRef} className="font-serif text-[clamp(3rem,12vw,9rem)] tracking-[0.06em] font-light uppercase leading-[0.9] opacity-0 mb-16 overflow-hidden">
          Lookbook
        </h1>

        {/* Season Filter */}
        <div className="flex flex-wrap gap-8 border-t border-[#1A1A1A] pt-8">
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => setActiveSeason(season)}
              className={`font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300 pb-2 ${
                activeSeason === season
                  ? "text-white border-b border-white"
                  : "text-[#767676] hover:text-white border-b border-transparent"
              }`}
              data-cursor="pointer"
              data-testid={`filter-${season.toLowerCase().replace(/\s/g, "-")}`}
            >
              {season}
            </button>
          ))}
        </div>
      </section>

      {/* Editorial Grid */}
      <section className="px-4 md:px-6 pb-32 max-w-[1600px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6"
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.8 }}
                className="break-inside-avoid group relative overflow-hidden cursor-pointer"
                onClick={() => setLightboxImg(img)}
                data-cursor="pointer"
                data-testid={`lookbook-item-${img.id}`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className={`w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 ${
                    img.size === "large" ? "h-[560px] md:h-[700px]" : "h-[320px] md:h-[440px]"
                  }`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end">
                  <div className="p-6 md:p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                    <p className="font-sans text-[9px] tracking-[0.3em] text-white/60 uppercase mb-2">
                      {img.season}
                    </p>
                    <h3 className="font-serif text-xl tracking-wider font-light text-white mb-1">
                      {img.title}
                    </h3>
                    <p className="font-sans text-xs tracking-[0.15em] text-white/60 uppercase">
                      {img.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* CTA */}
      <section className="bg-white text-[#0E0E0E] py-32 px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl tracking-[0.12em] font-light uppercase mb-6">
            Vista o Lookbook
          </h2>
          <p className="font-sans font-light text-[#767676] tracking-wider mb-12 text-sm max-w-md mx-auto leading-relaxed">
            Interesse em alguma das peças editoriais? Solicite via WhatsApp e nossa equipe encontrará o item ideal para você.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/colecao">
              <span className="inline-block bg-[#0B0B0B] text-white font-sans text-xs tracking-[0.25em] uppercase py-5 px-12 hover:bg-[#1A1A1A] transition-colors duration-300" data-cursor="pointer">
                Ver Coleção
              </span>
            </Link>
            <a
              href="https://wa.me/5514997182001?text=Olá!%20Vi%20o%20lookbook%20da%20Cleber%20Carrasco%20e%20gostaria%20de%20mais%20informações."
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-[#0B0B0B] text-[#0B0B0B] font-sans text-xs tracking-[0.25em] uppercase py-5 px-12 hover:bg-[#0B0B0B] hover:text-white transition-all duration-500"
              data-cursor="pointer"
            >
              Solicitar via WhatsApp
            </a>
          </div>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-6 md:p-12"
            onClick={() => setLightboxImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white font-sans text-xs tracking-[0.2em] uppercase transition-colors"
              onClick={() => setLightboxImg(null)}
            >
              Fechar
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-4xl w-full flex flex-col md:flex-row gap-8 md:gap-16 items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImg.src}
                alt={lightboxImg.title}
                className="w-full md:w-2/3 max-h-[70vh] object-cover"
              />
              <div className="md:w-1/3">
                <p className="font-sans text-[9px] tracking-[0.3em] text-[#767676] uppercase mb-4">
                  {lightboxImg.season}
                </p>
                <h2 className="font-serif text-3xl tracking-wider font-light text-white mb-2">
                  {lightboxImg.title}
                </h2>
                <p className="font-sans text-xs tracking-[0.2em] text-[#767676] uppercase mb-10">
                  {lightboxImg.subtitle}
                </p>
                <Link href={`/produto/${lightboxImg.productId}`} onClick={() => setLightboxImg(null)}>
                  <span className="font-sans text-xs tracking-[0.2em] uppercase border-b border-white/40 pb-1 text-white hover:border-white transition-colors duration-300 block mb-4" data-cursor="pointer">
                    Ver Produto
                  </span>
                </Link>
                <a
                  href={`https://wa.me/5514997182001?text=Olá!%20Vi%20a%20peça%20'${encodeURIComponent(lightboxImg.title)}'%20no%20lookbook%20e%20gostaria%20de%20mais%20informações.`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-sans text-xs tracking-[0.2em] uppercase border-b border-[#767676] pb-1 text-[#767676] hover:text-white hover:border-white transition-colors duration-300 block"
                  data-cursor="pointer"
                >
                  Solicitar via WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </motion.div>
  );
}
