import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MessageCircle, Loader2, Share2, Link as LinkIcon, Check, Search, Mail } from "lucide-react";
import { usePostsBlog } from "@/hooks/usePostsBlog";
import type { PostBlog } from "@/lib/types";

import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import cabecalhoVerdeBlog from "@/assets/cabecalho_verde_blog.png";
import caricaOrlandeli from "@/assets/carica_orlandeli.png";
import imgGrump from "@/assets/blog_categoria_grump.png";
import imgSIC from "@/assets/blog_categoria_sic.png";
import imgPiuPhiu from "@/assets/blog_categoria_piuephiu.png";
import imgTextos from "@/assets/blog_categoria_textos.png";
import imgCharge from "@/assets/blog_categoria_charge.png";
import imgYang from "@/assets/iconehome_yang.png";

function ShareMenu({ url, title, size = "sm" }: { url: string; title: string; size?: "sm" | "md" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  const enc = encodeURIComponent(url);
  const encTitle = encodeURIComponent(title);

  const options = [
    {
      label: "WhatsApp",
      bg: "#25D366",
      href: `https://wa.me/?text=${encTitle}%20${enc}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      label: "X",
      bg: "#000000",
      href: `https://twitter.com/intent/tweet?text=${encTitle}&url=${enc}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.843L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      label: "Telegram",
      bg: "#26A5E4",
      href: `https://t.me/share/url?url=${enc}&text=${encTitle}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
    },
    {
      label: "Facebook",
      bg: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      bg: "#0A66C2",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: "E-mail",
      bg: "#6B7280",
      href: `mailto:?subject=${encTitle}&body=${enc}`,
      icon: <Mail className="w-5 h-5" />,
    },
    {
      label: "Outlook",
      bg: "#0078D4",
      href: `https://outlook.live.com/mail/0/deeplink/compose?subject=${encTitle}&body=${enc}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 7.387v12.828A1.785 1.785 0 0 1 22.215 22H9.785A1.785 1.785 0 0 1 8 20.215V18l8-2.5V12l8-4.613zM14 3a1 1 0 0 1 1 1v1H7.5A1.5 1.5 0 0 0 6 6.5V18H1.785A1.785 1.785 0 0 1 0 16.215V4.785A1.785 1.785 0 0 1 1.785 3H14zm8 3.5L16 10l-6-3.5V6h12v.5z"/>
        </svg>
      ),
    },
    {
      label: copied ? "Copiado!" : "Copiar link",
      bg: copied ? "#93c748" : "#374151",
      href: null,
      icon: copied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />,
    },
  ];

  const iconSize = size === "sm" ? "text-[10px]" : "text-xs";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        className={`flex items-center gap-1 ${size === "sm" ? "text-[10px]" : "text-xs"} font-medium text-muted-foreground hover:text-primary transition-colors`}
      >
        <Share2 className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
        Compartilhar
      </button>

      {open && (
        <div
          className="absolute bottom-full mb-2 right-0 z-50 bg-background border border-border rounded-2xl shadow-xl p-3 w-64"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">Compartilhar via</p>
          <div className="grid grid-cols-4 gap-2">
            {options.map((opt) =>
              opt.href ? (
                <a
                  key={opt.label}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-opacity group-hover:opacity-80"
                    style={{ backgroundColor: opt.bg }}
                  >
                    {opt.icon}
                  </span>
                  <span className={`${iconSize} text-muted-foreground text-center leading-tight`}>{opt.label}</span>
                </a>
              ) : (
                <button
                  key={opt.label}
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                    setCopied(true);
                    setTimeout(() => { setCopied(false); setOpen(false); }, 1500);
                  }}
                  className="flex flex-col items-center gap-1 group"
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-opacity group-hover:opacity-80"
                    style={{ backgroundColor: opt.bg }}
                  >
                    {opt.icon}
                  </span>
                  <span className={`${iconSize} text-muted-foreground text-center leading-tight`}>{opt.label}</span>
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Post de exemplo exibido quando não há dados no Strapi
const EXEMPLO_POST: PostBlog = {
  id: -1,
  titulo: "Exemplo — Post do Blog",
  conteudo: "Este é um post de exemplo. Substitua pelo conteúdo real no Strapi.\n\nVocê pode escrever textos longos, usar **negrito**, *itálico* e muito mais pelo painel de administração.",
  imagemUrl: "",
  data: "2025-01-15",
  categorias: ["Textos"],
};

const CATEGORY_BUTTONS: { label: string; image: string; category: string; imageSize?: string; imageFit?: string }[] = [
  { label: "Yang", image: imgYang, category: "Yang", imageSize:"w-full h-full" ,imageFit: "object-cover" },
  { label: "Grump", image: imgGrump, category: "Grump", imageSize:"w-full h-full" ,imageFit: "object-cover" },
  { label: "SIC", image: imgSIC, category: "SIC", imageSize:"w-full h-full" ,imageFit: "object-cover" },
  { label: "Piu e Phiu", image: imgPiuPhiu, category: "Piu e Phiu", imageSize:"w-full h-full" ,imageFit: "object-cover" },
  { label: "Textos", image: imgTextos, category: "Textos", imageSize: "w-3/5 h-3/5", imageFit: "object-cover" },
  { label: "Charge", image: imgCharge, category: "Charge", imageSize:"w-full h-full" ,imageFit: "object-cover" },
];

export default function Blog() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostBlog | null>(null);
  const [comment, setComment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { data: rawPosts = [], isLoading, isError } = usePostsBlog();
  const posts = (!isLoading && !isError && rawPosts.length === 0) ? [EXEMPLO_POST] : rawPosts;

  const categories = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.categorias))),
    [posts]
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) {
      const matched = categories.filter((c) => c.toLowerCase().includes(q.toLowerCase()));
      if (matched.length > 0) setSelectedCategories(matched.map((c) => c.toLowerCase()));
    }
    const cat = params.get("cat");
    if (cat) {
      setSelectedCategories(cat.split(",").map((c) => c.toLowerCase()));
    }
  }, [location.search, categories]);

  useEffect(() => {
    const postId = new URLSearchParams(location.search).get("post");
    if (!postId || posts.length === 0) return;
    const found = posts.find((p) => String(p.id) === postId);
    if (found) setSelectedPost(found);
  }, [location.search, posts]);

  const toggleCategory = (cat: string) => {
    const lower = cat.toLowerCase();
    setSelectedCategories((prev) => {
      const next = prev.includes(lower) ? prev.filter((c) => c !== lower) : [...prev, lower];
      const params = new URLSearchParams(location.search);
      if (next.length > 0) params.set("cat", next.join(","));
      else params.delete("cat");
      navigate({ search: params.toString() }, { replace: true });
      return next;
    });
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      post.categorias.some((c) => selectedCategories.includes(c.toLowerCase()));
    const matchesSearch =
      post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.conteudo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.categorias.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <img
            src={cabecalhoVerdeBlog}
            alt="Blog"
            className="w-full h-auto block"
          />
        </motion.div>
        <div className="container mx-auto px-4 text-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: "#93c748" }}>
              Última Quimera
            </h1>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Novidades, bastidores, dicas e reflexões sobre o mundo dos quadrinhos e ilustração.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter & Local Search */}
      <section className="py-8 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col items-center gap-6">
              {/* Image Category Buttons */}
              <div className="flex flex-wrap gap-6 justify-center items-end">
                {CATEGORY_BUTTONS.map(({ label, image, category, imageSize, imageFit }) => {
                  const isActive = selectedCategories.includes(category.toLowerCase());
                  return (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className="flex flex-col items-center gap-2 group focus:outline-none"
                    >
                      <div
                        className={`relative w-28 h-28 rounded-full overflow-hidden border-4 transition-all duration-300  ${isActive
                          ? "border-[#93c748] scale-110 shadow-[0_0_12px_2px_#93c74860]"
                          : "border-transparent group-hover:border-[#93c748]/60 group-hover:scale-105"
                          }`}
                      >
                        <img
                          src={image}
                          alt={label}
                          className={`absolute inset-0 m-auto ${imageFit ?? "object-contain"} ${imageSize ?? "w-4/5 h-4/5"}`}
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-[#93c748]/20 rounded-full" />
                        )}
                      </div>
                      <span
                        className={`text-xs font-semibold transition-colors duration-200 ${isActive ? "text-[#93c748]" : "text-muted-foreground group-hover:text-[#93c748]"
                          }`}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      const params = new URLSearchParams(location.search);
                      params.delete("cat");
                      navigate({ search: params.toString() }, { replace: true });
                    }}
                    className="flex flex-col items-center gap-2 group focus:outline-none mb-0.5"
                  >
                    <div className="w-8 h-8 rounded-full bg-destructive/10 border-2 border-destructive/40 flex items-center justify-center group-hover:bg-destructive/20 transition-colors mt-6">
                      <span className="text-destructive text-sm font-bold">✕</span>
                    </div>
                    <span className="text-[10px] font-medium text-destructive">Limpar</span>
                  </button>
                )}
              </div>

              {/* Local Search Bar */}
              <div className="relative w-full max-w-md">
                <Input
                  type="text"
                  placeholder="Buscar posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10 rounded-full border-border bg-muted/30 focus:bg-background transition-all"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </section>

      {/* Blog Posts */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Carregando posts...</span>
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="text-center py-20">
              <p className="text-destructive font-medium">Não foi possível carregar os posts.</p>
              <p className="text-muted-foreground text-sm mt-1">
                Verifique se o Strapi está em execução e tente novamente.
              </p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && filteredPosts.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              {posts.length === 0
                ? "Nenhum post publicado ainda."
                : "Nenhum post encontrado para a categoria selecionada."}
            </div>
          )}

          {/* Posts timeline */}
          {!isLoading && !isError && !selectedPost && filteredPosts.length > 0 && (
            <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="w-full bg-card border border-border rounded-xl shadow-sm overflow-hidden"
                >
                  {/* Post header */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={caricaOrlandeli}
                      alt="Orlandeli"
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#93c748]/40"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-none mb-0.5">Orlandeli</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.data)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="px-4 pb-2">
                    <h2 className="font-serif text-lg font-bold text-foreground leading-snug">
                      {post.titulo}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
                      {post.conteudo.replace(/[#*`]/g, '').slice(0, 180)}...
                    </p>
                  </div>

                  {/* Full image */}
                  {post.imagemUrl && (
                    <div className="w-full bg-muted/10">
                      <img
                        src={post.imagemUrl}
                        alt={post.titulo}
                        className="w-full h-auto block"
                      />
                    </div>
                  )}

                  {/* Action bar */}
                  <div className="flex items-center justify-between px-4 py-2 border-t border-border/50">
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium px-3 py-1.5 rounded-md hover:bg-muted/40"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Ver post completo
                    </button>
                    <ShareMenu
                      url={window.location.origin + "/blog?post=" + post.id}
                      title={post.titulo}
                      size="sm"
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Post detail */}
          {!isLoading && selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-3xl mx-auto"
            >
              <Button
                variant="ghost"
                onClick={() => setSelectedPost(null)}
                className="mb-6"
              >
                ← Voltar ao Blog
              </Button>

              <article className="space-y-8">
                {selectedPost.imagemUrl && (
                  <div className="image-frame overflow-hidden">
                    <img
                      src={selectedPost.imagemUrl}
                      alt={selectedPost.titulo}
                      className="w-full h-auto block"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                    {selectedPost.titulo}
                  </h1>
                  <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/50">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(selectedPost.data)}
                      </span>
                    </div>

                    <ShareMenu
                      url={window.location.origin + "/blog?post=" + selectedPost.id}
                      title={selectedPost.titulo}
                      size="md"
                    />
                  </div>
                </div>

                {/* Rich text content */}
                <div className="prose prose-xl md:prose-2xl max-w-none text-foreground leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkBreaks]}>{selectedPost.conteudo}</ReactMarkdown>
                </div>
              </article>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}
