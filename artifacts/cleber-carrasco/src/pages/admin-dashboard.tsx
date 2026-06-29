import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_PRODUCTS, Product } from "@/data/products";
import { LogOut, Plus, Search, X, Trash2, Edit2, Home } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { CustomCursor } from "@/components/ui/CustomCursor";

type Category = 'Masculino' | 'Feminino' | 'Alta-Costura' | 'Acessórios';
const CATEGORIES: Category[] = ['Feminino', 'Masculino', 'Alta-Costura', 'Acessórios'];
const SIZES = ["PP", "P", "M", "G", "GG", "XGG"];

type View = 'produtos' | 'categorias';

const emptyForm = {
  name: "",
  sku: "",
  price: "",
  category: "Feminino" as Category,
  image: "",
  description: "",
  composition: "",
  sizes: ["P", "M", "G"] as string[],
  isNew: false,
  isFeatured: false,
  isOutOfStock: false,
};

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<View>('produtos');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_auth");
    if (!isAuth) {
      setLocation("/admin/login");
      return;
    }
    const stored = localStorage.getItem("admin_products");
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(MOCK_PRODUCTS);
      localStorage.setItem("admin_products", JSON.stringify(MOCK_PRODUCTS));
    }
  }, [setLocation]);

  const save = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem("admin_products", JSON.stringify(updated));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setLocation("/");
  };

  const handleToggle = (id: string, field: 'isNew' | 'isFeatured' | 'isOutOfStock') => {
    save(products.map(p => p.id === id ? { ...p, [field]: !p[field] } : p));
  };

  const openNew = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      sku: product.sku,
      price: String(product.price),
      category: product.category,
      image: product.image,
      description: product.description,
      composition: product.composition,
      sizes: product.sizes,
      isNew: product.isNew,
      isFeatured: product.isFeatured,
      isOutOfStock: product.isOutOfStock,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) return;

    if (editingId) {
      save(products.map(p => p.id === editingId ? {
        ...p,
        name: form.name,
        sku: form.sku,
        price: parseFloat(form.price),
        category: form.category,
        image: form.image,
        description: form.description,
        composition: form.composition,
        sizes: form.sizes,
        isNew: form.isNew,
        isFeatured: form.isFeatured,
        isOutOfStock: form.isOutOfStock,
      } : p));
    } else {
      const newProduct: Product = {
        id: `p${Date.now()}`,
        slug: form.name.toLowerCase().replace(/\s+/g, '-'),
        name: form.name,
        sku: form.sku || `CC-${Date.now()}`,
        category: form.category,
        composition: form.composition || "Consulte a etiqueta.",
        sizes: form.sizes,
        colors: [{ name: "Único", hex: "#0B0B0B" }],
        description: form.description,
        isNew: form.isNew,
        isFeatured: form.isFeatured,
        isOutOfStock: form.isOutOfStock,
        image: form.image,
        price: parseFloat(form.price),
      };
      save([...products, newProduct]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    save(products.filter(p => p.id !== id));
    setConfirmDelete(null);
  };

  const toggleSize = (size: string) => {
    setForm(f => ({
      ...f,
      sizes: f.sizes.includes(size) ? f.sizes.filter(s => s !== size) : [...f.sizes, size]
    }));
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryCounts = CATEGORIES.map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0B0B0B] text-white flex"
    >
      <CustomCursor />

      {/* Sidebar */}
      <aside className="w-60 border-r border-[#1A1A1A] p-8 flex-col justify-between hidden md:flex flex-shrink-0">
        <div>
          <h2 className="font-serif text-xl tracking-[0.2em] uppercase font-light mb-10">
            Admin
          </h2>
          <nav className="space-y-5">
            <Link href="/">
              <div className="flex items-center gap-2 font-sans text-xs tracking-[0.15em] text-[#767676] hover:text-white transition-colors uppercase cursor-pointer" data-cursor="pointer">
                <Home className="w-3 h-3" /> Home
              </div>
            </Link>
            <button
              onClick={() => setView('produtos')}
              className={`block font-sans text-xs tracking-[0.15em] uppercase transition-colors w-full text-left ${view === 'produtos' ? 'text-white' : 'text-[#767676] hover:text-white'}`}
              data-cursor="pointer"
            >
              Produtos
            </button>
            <button
              onClick={() => setView('categorias')}
              className={`block font-sans text-xs tracking-[0.15em] uppercase transition-colors w-full text-left ${view === 'categorias' ? 'text-white' : 'text-[#767676] hover:text-white'}`}
              data-cursor="pointer"
            >
              Categorias
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 font-sans text-xs tracking-[0.15em] text-[#767676] hover:text-white transition-colors uppercase"
          data-cursor="pointer"
        >
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="max-w-[1100px] mx-auto">

          {/* Mobile top bar */}
          <div className="flex md:hidden items-center justify-between mb-8">
            <span className="font-serif text-xl tracking-[0.2em] uppercase">Admin</span>
            <div className="flex gap-4">
              <Link href="/"><Home className="w-5 h-5 text-[#767676]" /></Link>
              <button onClick={handleLogout}><LogOut className="w-5 h-5 text-[#767676]" /></button>
            </div>
          </div>

          {/* ---- PRODUTOS VIEW ---- */}
          {view === 'produtos' && (
            <>
              <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <h1 className="font-serif text-2xl md:text-3xl tracking-[0.15em] font-light uppercase">
                  Gerenciar Produtos
                </h1>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
                    <input
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-[#121212] border border-[#1A1A1A] focus:outline-none focus:border-white font-sans text-xs tracking-wider text-white placeholder:text-[#444] w-48"
                    />
                  </div>
                  <button
                    onClick={openNew}
                    className="bg-white text-[#0B0B0B] px-5 py-2 flex items-center gap-2 font-sans text-xs tracking-wider uppercase hover:bg-[#E5E5E5] transition-colors flex-shrink-0"
                    data-cursor="pointer"
                  >
                    <Plus className="w-4 h-4" /> Novo
                  </button>
                </div>
              </header>

              <div className="bg-[#121212] border border-[#1A1A1A] overflow-x-auto">
                <table className="w-full text-left font-sans text-sm min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#1A1A1A] text-[#767676] text-xs tracking-wider uppercase font-light">
                      <th className="p-4 font-normal">Produto</th>
                      <th className="p-4 font-normal">Categoria</th>
                      <th className="p-4 font-normal">Preço</th>
                      <th className="p-4 font-normal text-center">Novo</th>
                      <th className="p-4 font-normal text-center">Destaque</th>
                      <th className="p-4 font-normal text-center">Esgot.</th>
                      <th className="p-4 font-normal"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A1A1A]">
                    {filtered.map(product => (
                      <tr key={product.id} className="hover:bg-[#161616] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-14 bg-[#1A1A1A] flex-shrink-0 overflow-hidden">
                              {product.image && (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium tracking-wide text-sm leading-snug">{product.name}</p>
                              <p className="text-[#767676] text-[10px] tracking-widest mt-0.5">{product.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-[#E5E5E5] tracking-wider text-xs">{product.category}</td>
                        <td className="p-4 text-[#E5E5E5] tracking-wider text-xs whitespace-nowrap">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                        </td>
                        <td className="p-4 text-center">
                          <Switch checked={product.isNew} onCheckedChange={() => handleToggle(product.id, 'isNew')} className="data-[state=checked]:bg-white mx-auto" />
                        </td>
                        <td className="p-4 text-center">
                          <Switch checked={product.isFeatured} onCheckedChange={() => handleToggle(product.id, 'isFeatured')} className="data-[state=checked]:bg-white mx-auto" />
                        </td>
                        <td className="p-4 text-center">
                          <Switch checked={product.isOutOfStock} onCheckedChange={() => handleToggle(product.id, 'isOutOfStock')} className="data-[state=checked]:bg-white mx-auto" />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 justify-end">
                            <button onClick={() => openEdit(product)} className="text-[#767676] hover:text-white transition-colors" data-cursor="pointer">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => setConfirmDelete(product.id)} className="text-[#767676] hover:text-red-400 transition-colors" data-cursor="pointer">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-12 text-center text-[#767676] font-sans text-xs tracking-wider">
                          Nenhum produto encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ---- CATEGORIAS VIEW ---- */}
          {view === 'categorias' && (
            <>
              <header className="mb-10">
                <h1 className="font-serif text-2xl md:text-3xl tracking-[0.15em] font-light uppercase">
                  Categorias
                </h1>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryCounts.map(cat => (
                  <div key={cat.name} className="bg-[#121212] border border-[#1A1A1A] p-8">
                    <p className="font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase mb-3">Categoria</p>
                    <h3 className="font-serif text-2xl tracking-wider font-light mb-6">{cat.name}</h3>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-sans text-xs text-[#767676] tracking-wider">{cat.count} produto{cat.count !== 1 ? 's' : ''}</p>
                      </div>
                      <button
                        onClick={() => { setView('produtos'); setActiveFilter(cat.name as Category); }}
                        className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#767676] hover:text-white border-b border-[#333] pb-0.5 transition-colors"
                        data-cursor="pointer"
                      >
                        Ver produtos
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Product Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 flex items-start justify-end"
            onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="w-full max-w-lg h-screen bg-[#121212] border-l border-[#1A1A1A] overflow-y-auto"
            >
              <div className="sticky top-0 bg-[#121212] border-b border-[#1A1A1A] px-8 py-6 flex items-center justify-between z-10">
                <h2 className="font-serif text-xl tracking-[0.15em] font-light uppercase">
                  {editingId ? "Editar Produto" : "Novo Produto"}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-[#767676] hover:text-white transition-colors" data-cursor="pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
                {/* Image URL */}
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase mb-2">URL da Imagem *</label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm(f => ({ ...f, image: e.target.value }))}
                    placeholder="https://..."
                    className="w-full bg-[#0B0B0B] border border-[#1A1A1A] px-4 py-3 font-sans text-sm text-white placeholder:text-[#333] focus:outline-none focus:border-white transition-colors"
                    required
                  />
                  {form.image && (
                    <div className="mt-3 w-full h-48 bg-[#0B0B0B] border border-[#1A1A1A] overflow-hidden">
                      <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase mb-2">Nome do Produto *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Ex: Vestido Seda Noir"
                    className="w-full bg-[#0B0B0B] border border-[#1A1A1A] px-4 py-3 font-sans text-sm text-white placeholder:text-[#333] focus:outline-none focus:border-white transition-colors"
                    required
                  />
                </div>

                {/* SKU + Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase mb-2">SKU</label>
                    <input
                      type="text"
                      value={form.sku}
                      onChange={(e) => setForm(f => ({ ...f, sku: e.target.value }))}
                      placeholder="CC-XXX-000"
                      className="w-full bg-[#0B0B0B] border border-[#1A1A1A] px-4 py-3 font-sans text-sm text-white placeholder:text-[#333] focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase mb-2">Preço (R$) *</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full bg-[#0B0B0B] border border-[#1A1A1A] px-4 py-3 font-sans text-sm text-white placeholder:text-[#333] focus:outline-none focus:border-white transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase mb-2">Categoria *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm(f => ({ ...f, category: e.target.value as Category }))}
                    className="w-full bg-[#0B0B0B] border border-[#1A1A1A] px-4 py-3 font-sans text-sm text-white focus:outline-none focus:border-white transition-colors"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Sizes */}
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase mb-3">Tamanhos Disponíveis</label>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`px-4 py-2 font-sans text-xs tracking-wider border transition-colors ${
                          form.sizes.includes(size)
                            ? "bg-white text-[#0B0B0B] border-white"
                            : "bg-transparent text-[#767676] border-[#1A1A1A] hover:border-white hover:text-white"
                        }`}
                        data-cursor="pointer"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase mb-2">Descrição</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Descreva o produto..."
                    rows={3}
                    className="w-full bg-[#0B0B0B] border border-[#1A1A1A] px-4 py-3 font-sans text-sm text-white placeholder:text-[#333] focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                {/* Composition */}
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.3em] text-[#767676] uppercase mb-2">Composição</label>
                  <input
                    type="text"
                    value={form.composition}
                    onChange={(e) => setForm(f => ({ ...f, composition: e.target.value }))}
                    placeholder="Ex: 100% Seda Natural"
                    className="w-full bg-[#0B0B0B] border border-[#1A1A1A] px-4 py-3 font-sans text-sm text-white placeholder:text-[#333] focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                {/* Toggles */}
                <div className="space-y-4 border-t border-[#1A1A1A] pt-6">
                  {([
                    { field: 'isNew', label: 'Marcar como Novo' },
                    { field: 'isFeatured', label: 'Produto em Destaque' },
                    { field: 'isOutOfStock', label: 'Esgotado' },
                  ] as const).map(({ field, label }) => (
                    <div key={field} className="flex items-center justify-between">
                      <span className="font-sans text-xs tracking-[0.15em] text-[#767676] uppercase">{label}</span>
                      <Switch
                        checked={form[field]}
                        onCheckedChange={(v) => setForm(f => ({ ...f, [field]: v }))}
                        className="data-[state=checked]:bg-white"
                      />
                    </div>
                  ))}
                </div>

                {/* Submit */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 border border-[#1A1A1A] text-[#767676] py-4 font-sans text-xs tracking-[0.2em] uppercase hover:border-white hover:text-white transition-colors"
                    data-cursor="pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-white text-[#0B0B0B] py-4 font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#E5E5E5] transition-colors"
                    data-cursor="pointer"
                  >
                    {editingId ? "Salvar" : "Adicionar"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Delete */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121212] border border-[#1A1A1A] p-10 max-w-sm w-full text-center"
            >
              <h3 className="font-serif text-xl tracking-wider font-light mb-4">Remover produto?</h3>
              <p className="font-sans text-xs text-[#767676] tracking-wider mb-8">Esta ação não pode ser desfeita.</p>
              <div className="flex gap-4">
                <button onClick={() => setConfirmDelete(null)} className="flex-1 border border-[#1A1A1A] py-3 font-sans text-xs tracking-wider uppercase text-[#767676] hover:text-white hover:border-white transition-colors" data-cursor="pointer">
                  Cancelar
                </button>
                <button onClick={() => handleDelete(confirmDelete)} className="flex-1 bg-red-600 py-3 font-sans text-xs tracking-wider uppercase hover:bg-red-700 transition-colors" data-cursor="pointer">
                  Remover
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function setActiveFilter(_name: string) {
  // Used in categorias view — handled inline above
}
