import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { MOCK_PRODUCTS, Product } from "@/data/products";
import { LogOut, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_auth");
    if (!isAuth) {
      setLocation("/admin/login");
      return;
    }

    // Load from local storage or fallback to mock
    const stored = localStorage.getItem("admin_products");
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(MOCK_PRODUCTS);
      localStorage.setItem("admin_products", JSON.stringify(MOCK_PRODUCTS));
    }
  }, [setLocation]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setLocation("/");
  };

  const handleToggle = (id: string, field: 'isNew' | 'isFeatured' | 'isOutOfStock') => {
    const updated = products.map(p => {
      if (p.id === id) {
        return { ...p, [field]: !p[field] };
      }
      return p;
    });
    setProducts(updated);
    localStorage.setItem("admin_products", JSON.stringify(updated));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0B0B0B] text-white flex"
    >
      <CustomCursor />
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#1A1A1A] p-8 flex flex-col justify-between hidden md:flex">
        <div>
          <h2 className="font-serif text-xl tracking-[0.2em] uppercase font-light mb-12">
            Admin
          </h2>
          <nav className="space-y-6">
            <div className="font-sans text-xs tracking-[0.15em] text-white uppercase" data-cursor="pointer">
              Produtos
            </div>
            <div className="font-sans text-xs tracking-[0.15em] text-[#767676] hover:text-white transition-colors uppercase" data-cursor="pointer">
              Categorias
            </div>
            <div className="font-sans text-xs tracking-[0.15em] text-[#767676] hover:text-white transition-colors uppercase" data-cursor="pointer">
              Configurações
            </div>
          </nav>
        </div>
        
        <div>
           <button 
            onClick={handleLogout}
            className="flex items-center gap-3 font-sans text-xs tracking-[0.15em] text-[#767676] hover:text-white transition-colors uppercase"
            data-cursor="pointer"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-auto">
        <div className="max-w-[1200px] mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <h1 className="font-serif text-3xl tracking-[0.15em] font-light uppercase">
              Gerenciar Produtos
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
                <Input 
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#121212] border-[#1A1A1A] focus-visible:ring-1 focus-visible:ring-white font-sans text-xs tracking-wider"
                />
              </div>
              <button 
                className="bg-white text-[#0B0B0B] px-6 py-2 flex items-center gap-2 font-sans text-xs tracking-wider uppercase hover:bg-[#E5E5E5] transition-colors"
                data-cursor="pointer"
              >
                <Plus className="w-4 h-4" /> Novo
              </button>
            </div>
          </header>

          <div className="bg-[#121212] border border-[#1A1A1A] rounded-none overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead>
                <tr className="border-b border-[#1A1A1A] text-[#767676] text-xs tracking-wider uppercase font-light">
                  <th className="p-6 font-normal">Produto</th>
                  <th className="p-6 font-normal">Categoria</th>
                  <th className="p-6 font-normal">Preço</th>
                  <th className="p-6 font-normal text-center">Novo</th>
                  <th className="p-6 font-normal text-center">Destaque</th>
                  <th className="p-6 font-normal text-center">Esgotado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-[#161616] transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-12 h-16 object-cover bg-[#1A1A1A]" />
                        <div>
                          <p className="font-medium mb-1 tracking-wide">{product.name}</p>
                          <p className="text-[#767676] text-xs tracking-widest">{product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-[#E5E5E5] tracking-wider">{product.category}</td>
                    <td className="p-6 text-[#E5E5E5] tracking-wider">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                    </td>
                    <td className="p-6 text-center">
                      <Switch 
                        checked={product.isNew}
                        onCheckedChange={() => handleToggle(product.id, 'isNew')}
                        className="data-[state=checked]:bg-white mx-auto"
                      />
                    </td>
                    <td className="p-6 text-center">
                      <Switch 
                        checked={product.isFeatured}
                        onCheckedChange={() => handleToggle(product.id, 'isFeatured')}
                        className="data-[state=checked]:bg-white mx-auto"
                      />
                    </td>
                    <td className="p-6 text-center">
                      <Switch 
                        checked={product.isOutOfStock}
                        onCheckedChange={() => handleToggle(product.id, 'isOutOfStock')}
                        className="data-[state=checked]:bg-white mx-auto"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
