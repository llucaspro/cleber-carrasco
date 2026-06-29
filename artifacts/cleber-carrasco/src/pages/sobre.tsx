import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLenis } from "@/hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "2008", title: "O Início", text: "Cleber Carrasco funda o atelier em São Paulo com uma única crença: que o verdadeiro luxo reside na perfeição silenciosa da forma." },
  { year: "2012", title: "Primeira Alta-Costura", text: "O lançamento da primeira coleção de alta-costura no São Paulo Fashion Week redefine os padrões da alfaiataria brasileira." },
  { year: "2016", title: "Expansão Internacional", text: "Clientes de Paris, Milão e Nova York descobrem a sofisticação discreta da marca. A lista de espera para peças sob medida ultrapassa seis meses." },
  { year: "2020", title: "Manifesto do Silêncio", text: "Em resposta ao excesso da moda global, a marca publica o 'Manifesto do Silêncio' — um compromisso com a subtração, durabilidade e beleza intemporal." },
  { year: "2024", title: "Nova Era", text: "Com um novo atelier expandido nos Jardins, a marca entra em sua fase mais criativa, combinando artesanato ancestral com uma nova linguagem visual." },
];

const pillars = [
  { number: "01", title: "Forma", text: "Acreditamos que a roupa deve esculpir, não vestir. Cada corte é calculado como arquitetura — proporcional, intencional e preciso." },
  { number: "02", title: "Matéria", text: "Selecionamos apenas fibras de origem rastreável. Cada tecido passa por uma curadoria rigorosa antes de entrar no atelier." },
  { number: "03", title: "Tempo", text: "Nossas peças não seguem estações. São concebidas para durar décadas — passando de geração em geração como um patrimônio pessoal." },
  { number: "04", title: "Silêncio", text: "Enquanto o mundo grita, nós sussurramos. A ostentação é a confissão da insegurança. A verdadeira elegância não precisa se anunciar." },
];

export default function Sobre() {
  useLenis();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "power4.out", delay: 0.2 }
      );

      sectionRefs.current.forEach((section) => {
        const title = section.querySelector(".reveal-title");
        const content = section.querySelectorAll(".reveal-content");

        if (title) {
          gsap.fromTo(
            title,
            { y: 80, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 80%" }
            }
          );
        }

        if (content.length) {
          gsap.fromTo(
            content,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
              stagger: 0.12, delay: 0.15,
              scrollTrigger: { trigger: section, start: "top 75%" }
            }
          );
        }
      });

      const milestoneItems = document.querySelectorAll(".milestone-item");
      milestoneItems.forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%" }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7 }}
      className="bg-white text-[#0E0E0E]"
    >
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[600px] bg-[#0B0B0B] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2400&auto=format&fit=crop"
            alt="Atelier Cleber Carrasco"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-20 md:pb-32">
          <p className="font-sans text-xs tracking-[0.3em] text-[#767676] uppercase mb-6 reveal-content">
            São Paulo — Fundado em 2008
          </p>
          <h1 ref={titleRef} className="font-serif text-6xl md:text-8xl lg:text-[10rem] tracking-[0.08em] font-light text-white leading-[0.9] uppercase opacity-0">
            Sobre<br />a Marca
          </h1>
        </div>
      </section>

      {/* Opening Statement */}
      <section ref={addToRefs} className="py-32 md:py-48 px-6 md:px-12 bg-white">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
          <div className="md:col-span-4">
            <span className="reveal-content font-sans text-xs tracking-[0.3em] text-[#767676] uppercase block mb-8">
              A Filosofia
            </span>
            <div className="reveal-content w-12 h-px bg-[#0E0E0E]" />
          </div>
          <div className="md:col-span-8">
            <h2 className="reveal-title font-serif text-3xl md:text-5xl tracking-[0.08em] font-light leading-tight mb-12 uppercase">
              O Luxo que Não Precisa se Anunciar
            </h2>
            <p className="reveal-content font-sans font-light text-lg leading-loose text-[#767676] tracking-wider mb-8">
              Cleber Carrasco nasceu de uma insatisfação fundamental com a moda contemporânea. Em um mundo onde tudo compete por atenção, onde cada coleção grita mais alto que a anterior, a marca propõe o caminho oposto: a eloquência do silêncio.
            </p>
            <p className="reveal-content font-sans font-light text-lg leading-loose text-[#767676] tracking-wider">
              Acreditamos que o mais alto nível de sofisticação é aquele que passa despercebido para os não iniciados, mas que ressoa profundamente para quem entende. Cada peça é uma conversa privada entre o criador e quem a veste.
            </p>
          </div>
        </div>
      </section>

      {/* Atelier Images */}
      <section className="bg-[#F9F9F9] py-4 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="col-span-1 md:col-span-2 overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1600&auto=format&fit=crop"
              alt="Atelier"
              className="w-full h-[320px] md:h-[560px] object-cover hover:scale-105 transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop"
              alt="Craftsmanship"
              className="w-full h-[320px] md:h-[560px] object-cover hover:scale-105 transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Pilares */}
      <section ref={addToRefs} className="bg-white py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-24 text-center">
            <h2 className="reveal-title font-serif text-4xl md:text-6xl tracking-[0.12em] font-light uppercase">
              Nossos Pilares
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.number}
                className="reveal-content border-t border-[#E5E5E5] pt-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <span className="font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase block mb-6">
                  {pillar.number}
                </span>
                <h3 className="font-serif text-2xl tracking-[0.1em] font-light uppercase mb-6">
                  {pillar.title}
                </h3>
                <p className="font-sans font-light text-sm leading-relaxed text-[#767676] tracking-wider">
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={addToRefs} className="bg-[#0B0B0B] text-white py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-24 text-center">
            <h2 className="reveal-title font-serif text-4xl md:text-6xl tracking-[0.12em] font-light uppercase">
              Uma Trajetória
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[#1A1A1A]" />
            <div className="space-y-20 md:space-y-0">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`milestone-item relative flex flex-col md:flex-row gap-8 md:gap-0 mb-16 ${
                    i % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div className={`md:w-[45%] ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <span className="font-sans text-[10px] tracking-[0.35em] text-[#767676] uppercase block mb-3">
                      {m.year}
                    </span>
                    <h3 className="font-serif text-2xl tracking-wider font-light uppercase mb-4">
                      {m.title}
                    </h3>
                    <p className="font-sans font-light text-sm leading-relaxed text-[#767676] tracking-wider">
                      {m.text}
                    </p>
                  </div>

                  <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 top-0 w-2.5 h-2.5 bg-white border border-[#767676]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Quote */}
      <section ref={addToRefs} className="bg-[#F9F9F9] py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="reveal-title font-serif text-3xl md:text-5xl tracking-[0.08em] font-light text-[#0E0E0E] leading-loose mb-12">
            "Subtrair até restar apenas o essencial.<br />
            <em>Esse é o nosso método.</em>"
          </div>
          <p className="reveal-content font-sans text-xs tracking-[0.3em] text-[#767676] uppercase mb-16">
            — Cleber Carrasco, Manifesto do Silêncio, 2020
          </p>
        </div>
      </section>

      {/* Artesanato */}
      <section ref={addToRefs} className="bg-white py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1605289355680-75fb41239154?q=80&w=1400&auto=format&fit=crop"
              alt="Artesanato"
              className="w-full h-[600px] md:h-[700px] object-cover"
            />
          </motion.div>

          <div>
            <span className="reveal-content font-sans text-[10px] tracking-[0.35em] text-[#767676] uppercase block mb-8">
              O Processo
            </span>
            <h2 className="reveal-title font-serif text-3xl md:text-5xl tracking-[0.1em] font-light uppercase mb-10 leading-tight">
              Artesanato<br />como Crença
            </h2>
            <p className="reveal-content font-sans font-light text-base leading-loose text-[#767676] tracking-wider mb-8">
              Cada peça passa por pelo menos 40 horas de trabalho manual. Nossas alfaiatas são treinadas por mestres artesãos com décadas de experiência em ateliers europeus.
            </p>
            <p className="reveal-content font-sans font-light text-base leading-loose text-[#767676] tracking-wider mb-12">
              Utilizamos apenas materiais de origem rastreável — lãs da Itália, sedas do Japão, couros da Europa — e acreditamos que a qualidade dos materiais é o respeito que dedicamos a quem vai vestir nossas peças.
            </p>
            <Link href="/colecao">
              <span className="reveal-content font-sans text-xs tracking-[0.2em] uppercase border-b border-[#0E0E0E] pb-2 hover:text-[#767676] hover:border-[#767676] transition-colors duration-300 inline-block" data-cursor="pointer">
                Explorar a Coleção
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-[#0B0B0B] text-white py-32 md:py-40 px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-serif text-4xl md:text-6xl tracking-[0.15em] font-light uppercase mb-8">
            Visite o Atelier
          </h2>
          <p className="font-sans font-light text-[#767676] tracking-wider mb-12 text-sm md:text-base max-w-lg mx-auto">
            Agende sua visita privativa ao nosso atelier nos Jardins. Uma experiência personalizada e exclusiva.
          </p>
          <a
            href="https://wa.me/5514997182001?text=Olá!%20Gostaria%20de%20agendar%20uma%20visita%20ao%20atelier%20Cleber%20Carrasco."
            target="_blank"
            rel="noreferrer"
            className="inline-block border border-white text-white font-sans text-xs tracking-[0.25em] uppercase py-5 px-12 hover:bg-white hover:text-[#0B0B0B] transition-all duration-500"
            data-cursor="pointer"
          >
            Agendar via WhatsApp
          </a>
        </motion.div>
      </section>

      <Footer />
    </motion.div>
  );
}
