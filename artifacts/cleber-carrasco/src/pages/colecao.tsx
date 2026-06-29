import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_PRODUCTS } from "@/data/products";

const FILTERS = ["Todos", "Feminino", "Masculino", "Alta-Costura", "Acessórios"] as const;

export default function Colecao() {
  const [, navigate] = useLocation();
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filtered = activeFilter === "Todos"
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="bg-white min-h-screen text-[#0E0E0E]"
    >
      <Navbar />

      <main className="pt-32 pb-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-sans text-xs tracking-[0.15em] text-[#767676] hover:text-[#0E0E0E] transition-colors uppercase mb-12"
          data-cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <header className="mb-12 border-b border-[#E5E5E5] pb-12">
          <h1 className="font-serif text-5xl md:text-7xl tracking-[0.15em] font-light uppercase mb-6">
            Coleção
          </h1>
          <p className="font-sans text-[#767676] tracking-wider max-w-md font-light leading-relaxed">
            Descubra a elegância atemporal através das nossas peças Prêt-à-Porter e seleções de Alta-Costura.
          </p>
        </header>

        {/* Filters — wraps on mobile */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 mb-16 font-sans text-xs tracking-[0.15em] uppercase">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`pb-2 transition-colors border-b ${
                activeFilter === f
                  ? "text-[#0E0E0E] border-[#0E0E0E]"
                  : "text-[#767676] border-transparent hover:text-[#0E0E0E]"
              }`}
              data-cursor="pointer"
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.8 }}
              className="group"
            >
              <Link href={`/produto/${product.id}`} className="block relative overflow-hidden bg-[#F9F9F9] aspect-[3/4] mb-4" data-cursor="pointer">
                {product.isNew && (
                  <span className="absolute top-3 left-3 z-10 font-sans text-[9px] tracking-widest uppercase bg-white/90 px-2 py-1 text-[#0E0E0E]">
                    Novo
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />
              </Link>

              <div className="flex flex-col">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-serif text-sm md:text-base tracking-wider text-[#0E0E0E] leading-snug">{product.name}</h3>
                </div>
                <p className="font-sans text-[10px] text-[#767676] tracking-[0.1em] uppercase mb-1">{product.category}</p>
                <span className="font-sans text-xs text-[#0E0E0E] tracking-wider">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
