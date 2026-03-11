import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Instagram, Facebook, Youtube, Twitter, Search, Newspaper, Rss, Mail, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { useQuadrinhos } from "@/hooks/useQuadrinhos";
import { useIlustracoes } from "@/hooks/useIlustracoes";
import { Label } from "recharts";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "QUADRINHOS", path: "/quadrinhos" },
  { label: "PORTFÓLIO", path: "/portfolio" },
  { label: "LOJA", path: "/loja" },
  { label: "BLOG", path: "/blog" },
  { label: "SOBRE", path: "/sobre" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/orlandeli", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/orlandeli", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/orlandeli", label: "Twitter" },
  { icon: Youtube, href: "https://www.youtube.com/@orlandeli1", label: "YouTube" },
  {icon: Bookmark, href: "https://substack.com/@orlandeli", label: "Substack"}
];

const blogPosts = [
  {
    id: 1,
    title: "O Processo Criativo por Trás de Yang",
    category: "Bastidores",
    excerpt: "Conheça como nasceu o universo de O Mundo de Yang, desde os primeiros esboços até a versão final.",
  },
  {
    id: 2,
    title: "Dicas para Aspirantes a Cartunistas",
    category: "Dicas",
    excerpt: "Compartilho algumas lições que aprendi ao longo de mais de 20 anos desenhando quadrinhos.",
  },
  {
    id: 3,
    title: "Nova Coleção Infantil em Produção",
    category: "Novidades",
    excerpt: "Estou trabalhando em uma nova série de livros infantis! Confira os primeiros conceitos.",
  },
];

type SearchResultType = "quadrinho" | "portfolio" | "blog";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: SearchResultType;
  path: string;
}

const typeLabel: Record<SearchResultType, string> = {
  quadrinho: "Quadrinhos",
  portfolio: "Portfólio",
  blog: "Blog",
};

const typeBg: Record<SearchResultType, string> = {
  quadrinho: "#7c3aed22",
  portfolio: "#2563eb22",
  blog: "#d9772022",
};

const typeText: Record<SearchResultType, string> = {
  quadrinho: "#7c3aed",
  portfolio: "#2563eb",
  blog: "#d97720",
};

function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { data: quadrinhos } = useQuadrinhos();
  const { data: ilustracoes } = useIlustracoes();
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    const items: SearchResult[] = [];

    // Quadrinhos
    (quadrinhos || []).forEach((item) => {
      if (
        item.titulo.toLowerCase().includes(q) ||
        item.sinopse.toLowerCase().includes(q)
      ) {
        items.push({
          id: `q-${item.id}`,
          title: item.titulo,
          subtitle: item.sinopse.length > 60 ? item.sinopse.slice(0, 60) + "…" : item.sinopse,
          type: "quadrinho",
          path: "/quadrinhos",
        });
      }
    });

    // Portfólio / Ilustrações
    (ilustracoes || []).forEach((item) => {
      if (
        item.titulo.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
      ) {
        items.push({
          id: `p-${item.id}`,
          title: item.titulo,
          subtitle: item.tags.join(", "),
          type: "portfolio",
          path: "/portfolio",
        });
      }
    });

    // Blog
    blogPosts.forEach((post) => {
      if (
        post.title.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q)
      ) {
        items.push({
          id: `b-${post.id}`,
          title: post.title,
          subtitle: post.category,
          type: "blog",
          path: "/blog",
        });
      }
    });

    return items.slice(0, 8);
  }, [query, quadrinhos, ilustracoes]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showDropdown = isOpen && query.length >= 2;

  return (
    <div style={{ backgroundColor: "#93c748" }}>
      <div className="container mx-auto px-4 py-2">
        <div className="relative max-w-xl mx-auto" ref={containerRef}>
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
            style={{ color: "rgba(255,255,255,0.85)" }}
          />
          <input
            type="text"
            placeholder="Pesquisar..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="search-bar-input w-full pl-9 pr-8 py-1.5 text-sm rounded-md border focus:outline-none transition-colors"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderColor: "rgba(255,255,255,0.4)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLInputElement).style.backgroundColor = "rgba(255,255,255,0.28)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLInputElement).style.backgroundColor = "rgba(255,255,255,0.2)";
            }}
          />
          {/* Placeholder branco via CSS global não funciona inline, então usamos um estilo em-linha via data attr */}
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-white/20 transition-colors"
              style={{ color: "white" }}
              aria-label="Limpar pesquisa"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Dropdown de resultados */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full mt-1 z-50 rounded-md shadow-xl overflow-hidden"
                style={{ backgroundColor: "white", border: "1px solid #e5e7eb" }}
              >
                {results.length > 0 ? (
                  results.map((result) => (
                    <button
                      key={result.id}
                      className="w-full flex items-start gap-3 px-4 py-2.5 text-left border-b last:border-0 transition-colors hover:bg-gray-50"
                      style={{ borderColor: "#f3f4f6" }}
                      onClick={() => {
                        navigate(`${result.path}?q=${encodeURIComponent(query)}`);
                        setQuery("");
                        setIsOpen(false);
                      }}
                    >
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5"
                        style={{
                          backgroundColor: typeBg[result.type],
                          color: typeText[result.type],
                        }}
                      >
                        {typeLabel[result.type]}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{result.title}</p>
                        {result.subtitle && (
                          <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>
                        )}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    Nenhum resultado encontrado para &ldquo;{query}&rdquo;
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full" style={{ fontFamily: "'Arial', sans-serif" }}>
      {/* Main navbar */}
      <nav style={{ backgroundColor: "#3D2D38" }}>
        <div className="container mx-auto px-4">
          <div className="flex h-[72px] items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src={logo}
                alt="Orlandeli"
                className="h-12 w-auto object-contain transition-opacity group-hover:opacity-90"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-0">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-3 py-1 text-xs font-bold tracking-wider transition-colors"
                  style={{
                    color: isActive(link.path) ? "#93c748" : "#cccccc",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#93c748")}
                  onMouseLeave={(e) => {
                    if (!isActive(link.path)) e.currentTarget.style.color = "#cccccc";
                  }}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: "#93c748" }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Social icons - desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded transition-colors"
                  style={{ color: "#cccccc" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#93c748")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#cccccc")}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded"
              style={{ color: "#cccccc" }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Search bar with green background */}
      {location.pathname !== "/loja" && <SearchBar />}

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 lg:hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-72 z-50 lg:hidden flex flex-col"
              style={{ backgroundColor: "#3D2D38" }}
            >
              {/* Mobile header */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "#93c748" }}
              >
                <span className="text-base font-black tracking-wider" style={{ color: "#93c748" }}>
                  MENU
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: "#cccccc" }}
                  aria-label="Fechar menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile nav links */}
              <div className="flex-1 py-4 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-6 py-3 text-sm font-bold tracking-wider transition-colors"
                    style={{
                      color: isActive(link.path) ? "#93c748" : "#cccccc",
                      borderLeft: isActive(link.path) ? "3px solid #93c748" : "3px solid transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Mobile social links */}
              <div className="px-4 py-4 border-t" style={{ borderColor: "#555" }}>
                <p className="text-xs font-bold tracking-wider mb-3" style={{ color: "#93c748" }}>
                  REDES SOCIAIS
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-2 rounded transition-colors"
                      style={{ color: "#cccccc", backgroundColor: "#4a3a4a" }}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
