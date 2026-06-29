import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isHome = location === "/";
  const isAdmin = location.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdmin) return null;

  const navLinks = [
    { name: "COLEÇÃO", href: "/colecao" },
    { name: "SOBRE", href: "/#sobre" },
    { name: "CONTATO", href: "/#contato" }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md py-4 border-b border-[#E5E5E5]/50 shadow-sm"
            : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link href="/" className="group" data-cursor="pointer">
            <span className={`font-serif text-lg tracking-[0.2em] uppercase transition-colors duration-500 ${
              !isScrolled && isHome ? "text-white" : "text-[#0E0E0E]"
            }`}>
              Cleber Carrasco
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-12">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="group" data-cursor="pointer">
                <span className={`font-sans text-xs tracking-[0.15em] font-light transition-colors duration-500 ${
                  !isScrolled && isHome ? "text-white/80 hover:text-white" : "text-[#767676] hover:text-[#0E0E0E]"
                }`}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(true)}
            data-cursor="pointer"
          >
            <Menu className={`w-6 h-6 transition-colors duration-500 ${
              !isScrolled && isHome ? "text-white" : "text-[#0E0E0E]"
            }`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-[#0B0B0B] flex flex-col justify-center items-center"
          >
            <button 
              className="absolute top-8 right-6 p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col gap-12 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="font-serif text-3xl tracking-[0.2em] text-white font-light uppercase">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-16 text-center"
            >
              <p className="font-sans text-xs tracking-widest text-[#767676] mb-4">CONTATO DIRETO</p>
              <a 
                href="https://wa.me/5514997182001" 
                className="font-sans text-sm tracking-widest text-white uppercase"
              >
                +55 14 99718 2001
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
