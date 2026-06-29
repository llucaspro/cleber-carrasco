import { useState } from "react";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_PRODUCTS } from "@/data/products";
import NotFound from "@/pages/not-found";

export default function Produto() {
  const [, params] = useRoute("/produto/:id");
  const id = params?.id;
  const product = MOCK_PRODUCTS.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  if (!product) {
    return <NotFound />;
  }

  const handleWhatsAppClick = () => {
    const message = `Olá! Tenho interesse neste produto.\n- Nome: ${product.name}\n- Código: ${product.sku}\n- Tamanho: ${selectedSize || 'Não selecionado'}\n- Cor: ${selectedColor || 'Não selecionada'}\n- Link: ${window.location.href}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5514997182001?text=${encodedMessage}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="bg-white min-h-screen text-[#0E0E0E]"
    >
      <Navbar />

      <main className="pt-32 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-8rem)]">
          {/* Left: Image Gallery */}
          <div className="bg-[#F9F9F9] flex items-center justify-center p-6 lg:p-12 overflow-hidden h-[60vh] lg:h-auto sticky top-0">
             <motion.img 
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={product.image} 
              alt={product.name} 
              className="w-full h-full max-h-[800px] object-cover object-center"
            />
          </div>

          {/* Right: Details */}
          <div className="p-8 lg:p-24 flex flex-col justify-center">
            <div className="max-w-xl">
              <div className="mb-8">
                <p className="font-sans text-xs tracking-[0.2em] text-[#767676] uppercase mb-4">
                  {product.category}
                </p>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-[0.1em] font-light uppercase mb-4">
                  {product.name}
                </h1>
                <p className="font-sans text-sm tracking-wider text-[#767676]">
                  REF: {product.sku}
                </p>
              </div>

              <div className="text-xl font-sans font-light tracking-wider mb-12">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
              </div>

              <div className="w-full h-px bg-[#E5E5E5] mb-12" />

              <p className="font-sans font-light leading-relaxed tracking-wider text-[#767676] mb-12 text-sm">
                {product.description}
              </p>

              <div className="space-y-12 mb-16">
                {/* Colors */}
                {product.colors.length > 0 && (
                  <div>
                    <span className="block font-sans text-xs tracking-[0.15em] uppercase mb-4 text-[#0E0E0E]">
                      Cores
                    </span>
                    <div className="flex gap-4">
                      {product.colors.map(color => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center transition-all ${
                            selectedColor === color.name ? 'ring-1 ring-[#0E0E0E] ring-offset-2' : ''
                          }`}
                          title={color.name}
                          data-cursor="pointer"
                        >
                          <span 
                            className="w-6 h-6 rounded-full block" 
                            style={{ backgroundColor: color.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes.length > 0 && (
                  <div>
                    <div className="flex justify-between items-end mb-4">
                      <span className="block font-sans text-xs tracking-[0.15em] uppercase text-[#0E0E0E]">
                        Tamanho
                      </span>
                      <span className="font-sans text-[10px] tracking-widest uppercase border-b border-[#E5E5E5] pb-1 text-[#767676] cursor-pointer hover:text-[#0E0E0E]">
                        Guia de Medidas
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 font-sans text-xs tracking-wider uppercase border transition-all ${
                            selectedSize === size 
                              ? 'border-[#0E0E0E] bg-[#0E0E0E] text-white' 
                              : 'border-[#E5E5E5] text-[#767676] hover:border-[#0E0E0E] hover:text-[#0E0E0E]'
                          }`}
                          data-cursor="pointer"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-12">
                <span className="block font-sans text-xs tracking-[0.15em] uppercase mb-2 text-[#0E0E0E]">
                  Composição
                </span>
                <p className="font-sans text-sm font-light text-[#767676]">
                  {product.composition}
                </p>
              </div>

              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#0B0B0B] text-white font-sans text-xs tracking-[0.2em] uppercase py-6 hover:bg-[#1A1A1A] transition-colors duration-300"
                data-cursor="pointer"
              >
                Solicitar via WhatsApp
              </button>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
