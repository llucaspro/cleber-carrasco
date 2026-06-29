import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@clebercarrasco.com" && password === "admin123") {
      sessionStorage.setItem("admin_auth", "true");
      setLocation("/admin");
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#121212] flex items-center justify-center text-white px-6"
    >
      <CustomCursor />

      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl tracking-[0.2em] font-light uppercase mb-4">
            Acesso Restrito
          </h1>
          <p className="font-sans text-xs tracking-widest text-[#767676] uppercase">
            Sistema Administrativo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-[#333] py-4 focus:outline-none focus:border-white font-sans font-light tracking-wide text-white placeholder:text-[#444] transition-colors"
              data-cursor="text"
              autoComplete="email"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-[#333] py-4 pr-10 focus:outline-none focus:border-white font-sans font-light tracking-wide text-white placeholder:text-[#444] transition-colors"
              data-cursor="text"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#767676] hover:text-white transition-colors"
              data-cursor="pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="font-sans text-xs text-red-400 tracking-wider">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-12 bg-white text-[#0B0B0B] font-sans text-xs tracking-[0.2em] uppercase py-5 hover:bg-[#E5E5E5] transition-colors"
            data-cursor="pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </motion.div>
  );
}
