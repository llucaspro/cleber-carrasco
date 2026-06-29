import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLenis } from "@/hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

const contactChannels = [
  {
    label: "WhatsApp",
    value: "+55 14 99718-2001",
    description: "Atendimento de segunda a sábado, das 10h às 19h",
    href: "https://wa.me/5514997182001?text=Olá!%20Gostaria%20de%20entrar%20em%20contato%20com%20a%20Cleber%20Carrasco.",
    cta: "Iniciar Conversa",
  },
  {
    label: "Instagram",
    value: "@cleberccarrasco",
    description: "Acompanhe os bastidores e as últimas criações",
    href: "https://instagram.com/cleberccarrasco",
    cta: "Seguir no Instagram",
  },
  {
    label: "Atelier",
    value: "Jardins, São Paulo — SP",
    description: "Visitas exclusivamente com agendamento prévio",
    href: "https://wa.me/5514997182001?text=Olá!%20Gostaria%20de%20agendar%20uma%20visita%20ao%20atelier.",
    cta: "Agendar Visita",
  },
];

const services = [
  { title: "Alta-Costura", text: "Criação de peças únicas sob medida. Do croqui à entrega, um processo de 8 a 16 semanas com múltiplas provas no atelier." },
  { title: "Prêt-à-Porter", text: "Nossa linha disponível de imediato. Peças com os mesmos materiais premium, prontas para adaptar ao seu corpo." },
  { title: "Consultoria de Guarda-Roupa", text: "Uma sessão privativa para curar e construir um guarda-roupa que dure décadas, não estações." },
  { title: "Atelier para Noivas", text: "O vestido da sua vida, criado sem pressa. O processo começa com uma conversa íntima sobre quem você é e o que deseja expressar." },
];

export default function Contato() {
  useLenis();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "", servico: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".hero-sub",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.7 }
      );

      const cards = document.querySelectorAll(".contact-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: card, start: "top 85%" }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const handleWhatsApp = () => {
    if (!formData.nome || !formData.mensagem) return;
    const msg = `Olá! Meu nome é ${formData.nome}.\nEmail: ${formData.email}\nServiço de interesse: ${formData.servico || 'Não especificado'}\n\nMensagem:\n${formData.mensagem}`;
    window.open(`https://wa.me/5514997182001?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-white text-[#0E0E0E]"
    >
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0B0B0B] pt-40 pb-32 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2400&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-[1600px] mx-auto">
          <p className="hero-sub font-sans text-[10px] tracking-[0.35em] text-[#767676] uppercase mb-8 opacity-0">
            Atendimento Exclusivo
          </p>
          <h1 ref={titleRef} className="font-serif text-6xl md:text-8xl lg:text-[9rem] tracking-[0.06em] font-light text-white uppercase leading-[0.9] opacity-0 mb-12">
            Contato
          </h1>
          <p className="hero-sub font-sans font-light text-[#767676] tracking-wider max-w-lg leading-relaxed opacity-0">
            Cada conversa começa com uma escuta. Conte-nos sobre o que procura e daremos início ao processo mais cuidadoso da sua vida.
          </p>
        </div>
      </section>

      {/* Channels */}
      <section className="bg-white py-32 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-20">
            <h2 className="font-serif text-3xl md:text-4xl tracking-[0.12em] font-light uppercase mb-4">
              Como nos encontrar
            </h2>
            <div className="w-8 h-px bg-[#0E0E0E]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {contactChannels.map((c) => (
              <div key={c.label} className="contact-card border-t border-[#E5E5E5] pt-8">
                <span className="font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase block mb-4">
                  {c.label}
                </span>
                <p className="font-serif text-xl tracking-wider font-light text-[#0E0E0E] mb-4">
                  {c.value}
                </p>
                <p className="font-sans text-sm font-light text-[#767676] tracking-wider leading-relaxed mb-8">
                  {c.description}
                </p>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-sans text-xs tracking-[0.2em] uppercase border-b border-[#0E0E0E] pb-1 hover:text-[#767676] hover:border-[#767676] transition-colors duration-300"
                  data-cursor="pointer"
                >
                  {c.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="bg-[#F9F9F9] py-32 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-20">
            <h2 className="font-serif text-3xl md:text-4xl tracking-[0.12em] font-light uppercase mb-4">
              Nossos Serviços
            </h2>
            <div className="w-8 h-px bg-[#0E0E0E]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E5E5E5]">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 2) * 0.1, duration: 0.8 }}
                className="bg-[#F9F9F9] p-10 md:p-12"
              >
                <span className="font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase block mb-6">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-2xl tracking-wider font-light uppercase mb-6">
                  {s.title}
                </h3>
                <p className="font-sans font-light text-sm leading-relaxed text-[#767676] tracking-wider">
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl tracking-[0.1em] font-light uppercase mb-8 leading-tight">
              Inicie<br />uma Conversa
            </h2>
            <p className="font-sans font-light text-[#767676] tracking-wider leading-relaxed mb-12 text-sm max-w-sm">
              Preencha o formulário e nossa equipe entrará em contato. Para respostas imediatas, prefira o WhatsApp.
            </p>

            <div className="space-y-2 font-sans text-xs tracking-[0.15em] text-[#767676] uppercase">
              <div className="flex gap-3 items-center">
                <span className="w-1.5 h-1.5 bg-[#767676] block" />
                Atendimento de segunda a sábado
              </div>
              <div className="flex gap-3 items-center">
                <span className="w-1.5 h-1.5 bg-[#767676] block" />
                Resposta em até 24 horas
              </div>
              <div className="flex gap-3 items-center">
                <span className="w-1.5 h-1.5 bg-[#767676] block" />
                Total confidencialidade
              </div>
            </div>
          </div>

          <div>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full py-24 text-center"
              >
                <div className="w-12 h-px bg-[#0E0E0E] mb-8 mx-auto" />
                <h3 className="font-serif text-2xl tracking-wider font-light uppercase mb-4">
                  Mensagem Enviada
                </h3>
                <p className="font-sans font-light text-[#767676] tracking-wider text-sm max-w-xs">
                  Sua mensagem foi direcionada para o WhatsApp. Responderemos em breve.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-8">
                <div>
                  <label className="font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase block mb-3">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={e => setFormData(p => ({ ...p, nome: e.target.value }))}
                    className="w-full border-0 border-b border-[#E5E5E5] bg-transparent font-sans font-light text-[#0E0E0E] py-4 focus:outline-none focus:border-[#0E0E0E] transition-colors tracking-wider placeholder:text-[#E5E5E5]"
                    placeholder="Seu nome"
                    data-testid="input-nome"
                  />
                </div>

                <div>
                  <label className="font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase block mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="w-full border-0 border-b border-[#E5E5E5] bg-transparent font-sans font-light text-[#0E0E0E] py-4 focus:outline-none focus:border-[#0E0E0E] transition-colors tracking-wider placeholder:text-[#E5E5E5]"
                    placeholder="seu@email.com"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <label className="font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase block mb-3">
                    Interesse
                  </label>
                  <select
                    value={formData.servico}
                    onChange={e => setFormData(p => ({ ...p, servico: e.target.value }))}
                    className="w-full border-0 border-b border-[#E5E5E5] bg-transparent font-sans font-light text-[#0E0E0E] py-4 focus:outline-none focus:border-[#0E0E0E] transition-colors tracking-wider appearance-none cursor-pointer"
                    data-testid="select-servico"
                  >
                    <option value="">Selecione um serviço</option>
                    <option value="Alta-Costura">Alta-Costura</option>
                    <option value="Prêt-à-Porter">Prêt-à-Porter</option>
                    <option value="Consultoria de Guarda-Roupa">Consultoria de Guarda-Roupa</option>
                    <option value="Atelier para Noivas">Atelier para Noivas</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase block mb-3">
                    Mensagem
                  </label>
                  <textarea
                    value={formData.mensagem}
                    onChange={e => setFormData(p => ({ ...p, mensagem: e.target.value }))}
                    rows={5}
                    className="w-full border-0 border-b border-[#E5E5E5] bg-transparent font-sans font-light text-[#0E0E0E] py-4 focus:outline-none focus:border-[#0E0E0E] transition-colors tracking-wider resize-none placeholder:text-[#E5E5E5]"
                    placeholder="Conte-nos o que procura..."
                    data-testid="textarea-mensagem"
                  />
                </div>

                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-[#0B0B0B] text-white font-sans text-xs tracking-[0.25em] uppercase py-6 hover:bg-[#1A1A1A] transition-colors duration-300 mt-4"
                  data-testid="button-enviar"
                  data-cursor="pointer"
                >
                  Enviar via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Atelier Address Strip */}
      <section className="bg-[#0B0B0B] text-white py-16 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase mb-3">Atelier Cleber Carrasco</p>
            <p className="font-serif text-xl tracking-wider font-light">Jardins, São Paulo — SP, Brasil</p>
          </div>
          <div className="text-right">
            <p className="font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase mb-3">Horário de Atendimento</p>
            <p className="font-sans text-sm tracking-wider font-light text-[#E5E5E5]">Segunda a Sábado · 10h às 19h</p>
          </div>
          <a
            href="https://wa.me/5514997182001?text=Olá!%20Gostaria%20de%20agendar%20uma%20visita%20ao%20atelier."
            target="_blank"
            rel="noreferrer"
            className="border border-white/30 text-white font-sans text-[10px] tracking-[0.25em] uppercase py-4 px-8 hover:border-white transition-colors duration-300 whitespace-nowrap"
            data-cursor="pointer"
          >
            Agendar Visita
          </a>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
