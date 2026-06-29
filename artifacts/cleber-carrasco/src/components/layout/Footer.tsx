import React from 'react';
import { useLocation } from 'wouter';

export function Footer() {
  const [location] = useLocation();

  if (location.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="w-full bg-[#0B0B0B] text-white pt-24 pb-12 px-6 md:px-12 mt-24">
      <div className="max-w-[1600px] mx-auto flex flex-col items-center">
        <h2 className="font-serif text-3xl md:text-5xl tracking-[0.2em] mb-6 font-light uppercase">
          Cleber Carrasco
        </h2>
        
        <p className="font-sans font-light tracking-[0.15em] text-[#767676] text-sm md:text-base text-center mb-12 uppercase">
          Alta Costura & Prêt-à-Porter — São Paulo, Brasil
        </p>

        <nav className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 font-sans text-xs tracking-[0.2em] text-[#767676] uppercase font-light">
          <a href="/colecao" className="hover:text-white transition-colors duration-300" data-cursor="pointer">Coleção</a>
          <a href="/lookbook" className="hover:text-white transition-colors duration-300" data-cursor="pointer">Lookbook</a>
          <a href="/sobre" className="hover:text-white transition-colors duration-300" data-cursor="pointer">Sobre</a>
          <a href="/contato" className="hover:text-white transition-colors duration-300" data-cursor="pointer">Contato</a>
        </nav>
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center mb-24 font-sans text-sm tracking-[0.1em] text-[#E5E5E5] font-light">
          <a 
            href="https://wa.me/5514997182001" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-white transition-colors duration-300 uppercase"
            data-cursor="pointer"
          >
            WhatsApp
          </a>
          <a 
            href="https://instagram.com/cleberccarrasco" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-white transition-colors duration-300 uppercase"
            data-cursor="pointer"
          >
            Instagram
          </a>
        </div>

        <div className="w-full h-px bg-[#1A1A1A] mb-8"></div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center text-[#767676] text-xs tracking-wider uppercase font-light">
          <p>© {new Date().getFullYear()} Cleber Carrasco. Todos os direitos reservados.</p>
          <a href="/admin/login" className="mt-4 md:mt-0 hover:text-white transition-colors duration-300">
            Acesso Restrito
          </a>
        </div>
      </div>
    </footer>
  );
}
