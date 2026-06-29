export type Product = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  category: 'Masculino' | 'Feminino' | 'Alta-Costura' | 'Acessórios';
  composition: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  isNew: boolean;
  isFeatured: boolean;
  isOutOfStock: boolean;
  image: string;
  price: number;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "blazer-estruturado-milano",
    name: "Blazer Estruturado Milano",
    sku: "CC-MIL-001",
    category: "Masculino",
    composition: "98% Lã Fria, 2% Elastano. Forro: 100% Cupro.",
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: [
      { name: "Preto Noturno", hex: "#0B0B0B" },
      { name: "Cinza Chumbo", hex: "#2C2C2C" }
    ],
    description: "Um ícone de alfaiataria. Corte preciso que esculpe a silhueta, ombros perfeitamente desenhados e lapelas de proporções exatas. A essência do poder silencioso.",
    isNew: true,
    isFeatured: true,
    isOutOfStock: false,
    image: "https://images.unsplash.com/photo-1594938298596-88941f1737e5?q=80&w=2000&auto=format&fit=crop",
    price: 8900
  },
  {
    id: "p2",
    slug: "trench-coat-noturno",
    name: "Trench Coat Noturno",
    sku: "CC-TRC-002",
    category: "Feminino",
    composition: "100% Gabardine de Algodão Tratado.",
    sizes: ["PP", "P", "M", "G"],
    colors: [
      { name: "Areia", hex: "#D9D0C1" },
      { name: "Preto Absoluto", hex: "#000000" }
    ],
    description: "Fluidez e mistério. Um trench coat com caimento arquitetônico que protege contra os elementos mantendo uma elegância inabalável.",
    isNew: true,
    isFeatured: true,
    isOutOfStock: false,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2000&auto=format&fit=crop",
    price: 12500
  },
  {
    id: "p3",
    slug: "vestido-seda-jardins",
    name: "Vestido Seda Jardins",
    sku: "CC-VSJ-003",
    category: "Alta-Costura",
    composition: "100% Seda Pura. Bordados feitos à mão.",
    sizes: ["PP", "P", "M"],
    colors: [
      { name: "Branco Neve", hex: "#F9F9F9" },
      { name: "Vinho Profundo", hex: "#3B1115" }
    ],
    description: "Uma peça que desafia o tempo. Desliza sobre o corpo como água, capturando e refletindo a luz com uma suavidade hipnótica.",
    isNew: false,
    isFeatured: true,
    isOutOfStock: false,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2000&auto=format&fit=crop",
    price: 24000
  },
  {
    id: "p4",
    slug: "camisa-linho-essencial",
    name: "Camisa Linho Essencial",
    sku: "CC-CLE-004",
    category: "Masculino",
    composition: "100% Linho Europeu de fibra longa.",
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Branco Neve", hex: "#FFFFFF" },
      { name: "Areia", hex: "#D9D0C1" }
    ],
    description: "A sofisticação do despojamento. Leve, respirável e impecavelmente cortada para momentos onde o luxo é sentido, não visto.",
    isNew: false,
    isFeatured: false,
    isOutOfStock: false,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ce3?q=80&w=2000&auto=format&fit=crop",
    price: 2100
  },
  {
    id: "p5",
    slug: "calca-alfaiataria-reta",
    name: "Calça Alfaiataria Reta",
    sku: "CC-CAR-005",
    category: "Feminino",
    composition: "95% Lã Virgem, 5% Seda.",
    sizes: ["PP", "P", "M", "G"],
    colors: [
      { name: "Preto Noturno", hex: "#0B0B0B" },
      { name: "Off White", hex: "#F5F5F5" }
    ],
    description: "A base de todo guarda-roupa extraordinário. Linhas puras que alongam a silhueta com uma fluidez escultural.",
    isNew: true,
    isFeatured: false,
    isOutOfStock: false,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop",
    price: 3400
  },
  {
    id: "p6",
    slug: "bolsa-couro-geometria",
    name: "Bolsa Geometria",
    sku: "CC-BCG-006",
    category: "Acessórios",
    composition: "100% Couro de Vitelo. Ferragens em paládio.",
    sizes: ["Único"],
    colors: [
      { name: "Preto Absoluto", hex: "#000000" },
      { name: "Caramelo", hex: "#9E6D4B" }
    ],
    description: "Arquitetura portátil. Um estudo sobre formas puras e funcionalidade discreta. Feita à mão pelos mestres artesãos.",
    isNew: true,
    isFeatured: true,
    isOutOfStock: true,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=2000&auto=format&fit=crop",
    price: 18500
  },
  {
    id: "p7",
    slug: "sueter-cashmere-nuvem",
    name: "Suéter Cashmere Nuvem",
    sku: "CC-SCN-007",
    category: "Masculino",
    composition: "100% Cashmere da Mongólia.",
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Cinza Névoa", hex: "#8C8C8C" },
      { name: "Marinho Profundo", hex: "#1A2238" }
    ],
    description: "Intimidade tátil. A mais pura expressão de conforto, tecido de forma tão fina que se torna uma segunda pele.",
    isNew: false,
    isFeatured: false,
    isOutOfStock: false,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2000&auto=format&fit=crop",
    price: 6800
  },
  {
    id: "p8",
    slug: "saia-plissada-seda",
    name: "Saia Plissada Movimento",
    sku: "CC-SPS-008",
    category: "Feminino",
    composition: "100% Seda Georgette.",
    sizes: ["PP", "P", "M"],
    colors: [
      { name: "Preto Noturno", hex: "#0B0B0B" },
      { name: "Vinho Profundo", hex: "#3B1115" }
    ],
    description: "Poesia em movimento. Cada prega foi calculada para criar uma dança magnética com os passos de quem a veste.",
    isNew: true,
    isFeatured: false,
    isOutOfStock: false,
    image: "https://images.unsplash.com/photo-1583391733958-6c68da78d234?q=80&w=2000&auto=format&fit=crop",
    price: 5200
  },
  {
    id: "p9",
    slug: "oculos-acetato-sombra",
    name: "Óculos Sombra",
    sku: "CC-OAS-009",
    category: "Acessórios",
    composition: "Acetato italiano. Lentes com proteção UV total.",
    sizes: ["Único"],
    colors: [
      { name: "Tartaruga", hex: "#4A3525" },
      { name: "Preto Absoluto", hex: "#000000" }
    ],
    description: "Mistério emولدado. Um escudo elegante contra o mundo exterior, com linhas fortes e proporções generosas.",
    isNew: false,
    isFeatured: true,
    isOutOfStock: false,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2000&auto=format&fit=crop",
    price: 3100
  },
  {
    id: "p10",
    slug: "vestido-assimetrico-escultura",
    name: "Vestido Escultura",
    sku: "CC-VAE-010",
    category: "Alta-Costura",
    composition: "100% Crepe de Chine Duplo.",
    sizes: ["PP", "P", "M"],
    colors: [
      { name: "Branco Neve", hex: "#F9F9F9" },
      { name: "Preto Noturno", hex: "#0B0B0B" }
    ],
    description: "Uma afirmação de assimetria controlada. Dobras e cortes inesperados que revelam uma estrutura magistral.",
    isNew: true,
    isFeatured: true,
    isOutOfStock: false,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2000&auto=format&fit=crop",
    price: 16800
  },
  {
    id: "p11",
    slug: "casaco-lã-envelope",
    name: "Casaco Lã Envelope",
    sku: "CC-CLE-011",
    category: "Masculino",
    composition: "100% Lã Merino.",
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Preto Noturno", hex: "#0B0B0B" }
    ],
    description: "O abraço definitivo. Construção oversized intencional, fluida mas imponente, ideal para transições urbanas.",
    isNew: false,
    isFeatured: false,
    isOutOfStock: false,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2000&auto=format&fit=crop",
    price: 14500
  },
  {
    id: "p12",
    slug: "cinto-couro-minimal",
    name: "Cinto Couro Minimal",
    sku: "CC-CCM-012",
    category: "Acessórios",
    composition: "Couro de Bezerro. Fivela de latão envelhecido.",
    sizes: ["80", "85", "90", "95", "100"],
    colors: [
      { name: "Preto Noturno", hex: "#0B0B0B" },
      { name: "Marrom Café", hex: "#3A2B24" }
    ],
    description: "O ponto de união perfeito. Simplicidade extrema como a maior forma de sofisticação.",
    isNew: false,
    isFeatured: false,
    isOutOfStock: false,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2000&auto=format&fit=crop",
    price: 1900
  }
];
