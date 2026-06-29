import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_PRODUCTS } from "@/data/products";

export default function Colecao() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="bg-white min-h-screen text-[#0E0E0E]"
    >
      <Navbar />

      <main className="pt-40 pb-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <header className="mb-24 flex flex-col md:flex-row md:justify-between md:items-end gap-8 border-b border-[#E5E5E5] pb-12">
          <div>
            <h1 className="font-serif text-5xl md:text-7xl tracking-[0.15em] font-light uppercase mb-6">
              Coleção
            </h1>
            <p className="font-sans text-[#767676] tracking-wider max-w-md font-light leading-relaxed">
              Descubra a elegância atemporal através das nossas peças Prêt-à-Porter e seleções de Alta-Costura.
            </p>
          </div>
          
          <div className="flex gap-8 font-sans text-xs tracking-[0.15em] text-[#767676] uppercase">
            <span className="text-[#0E0E0E] cursor-pointer">Todos</span>
            <span className="cursor-pointer hover:text-[#0E0E0E] transition-colors">Feminino</span>
            <span className="cursor-pointer hover:text-[#0E0E0E] transition-colors">Masculino</span>
            <span className="cursor-pointer hover:text-[#0E0E0E] transition-colors">Acessórios</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          {MOCK_PRODUCTS.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 4) * 0.1, duration: 0.8 }}
              className="group"
            >
              <Link href={`/produto/${product.id}`} className="block relative overflow-hidden bg-[#F9F9F9] aspect-[3/4] mb-6" data-cursor="pointer">
                {product.isNew && (
                  <span className="absolute top-4 left-4 z-10 font-sans text-[10px] tracking-widest uppercase bg-white/90 px-3 py-1 text-[#0E0E0E]">
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
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-lg tracking-wider text-[#0E0E0E]">{product.name}</h3>
                  <span className="font-sans text-xs text-[#767676] tracking-wider ml-4">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </span>
                </div>
                <p className="font-sans text-xs text-[#767676] tracking-[0.1em] uppercase">{product.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
