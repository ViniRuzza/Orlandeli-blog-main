import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, AlertCircle, ImageOff } from "lucide-react";
import cabecalhoVerdePortfolio from "@/assets/cabecalho_verde_portfolio.png";
import { useIlustracoes } from "@/hooks/useIlustracoes";
import type { Ilustracao } from "@/lib/types";

function IllustrationModal({ item, onClose }: { item: Ilustracao; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-background w-full max-w-5xl max-h-[96vh] overflow-y-auto rounded-2xl shadow-2xl"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Imagem em destaque — ocupa quase tudo */}
          <div className="w-full bg-black rounded-t-2xl flex items-center justify-center">
            <img
              src={item.imagemUrl}
              alt={item.titulo}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>

          {/* Título, legenda e tags */}
          <div className="px-6 py-4 space-y-2">
            <h2 className="font-serif text-lg font-bold text-foreground leading-tight">
              {item.titulo}
            </h2>
            {item.legenda && (
              <p className="text-sm text-muted-foreground leading-relaxed italic">{item.legenda}</p>
            )}
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


// Skeleton de card
function IllustrationSkeleton() {
  return (
    <div className="card-artistic animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-4 space-y-2">
        <div className="h-5 bg-muted rounded w-2/3" />
        <div className="flex gap-1">
          <div className="h-4 bg-muted rounded w-16" />
          <div className="h-4 bg-muted rounded w-12" />
        </div>
      </div>
    </div>
  );
}

const CATEGORIAS = ["Ilustração", "Caricatura", "Design"];

export default function Portfolio() {
  const { data: ilustracoes, isLoading, isError, error } = useIlustracoes();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<Ilustracao | null>(null);
  const location = useLocation();

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q");
    if (q) setSearchQuery(q);
  }, [location.search]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredItems = useMemo(() => {
    if (!ilustracoes) return [];
    return ilustracoes.filter((item) => {
      const matchesSearch =
        item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [ilustracoes, searchQuery, selectedTags]);

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
            src={cabecalhoVerdePortfolio}
            alt="Portfólio"
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
              Portfólio
            </h1>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore a galeria de ilustrações, cartuns e artes criados.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters — só exibe quando tiver dados */}
      {!isLoading && !isError && ilustracoes && ilustracoes.length > 0 && (
        <section className="py-10 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-6">

              {/* Categorias fixas */}
              <div className="flex flex-wrap gap-3 justify-center">
                {CATEGORIAS.map((cat) => {
                  const isActive = selectedTags.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleTag(cat)}
                      className={`px-6 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
                        isActive
                          ? "border-[#93c748] text-[#93c748] bg-[#93c74818] scale-105 shadow-sm"
                          : "border-border text-muted-foreground hover:border-[#93c748]/70 hover:text-foreground hover:scale-105"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="px-4 py-2 rounded-full text-sm font-semibold border-2 border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <X className="inline mr-1 h-3 w-3" />
                    Limpar
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar ilustrações..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 rounded-full border-border bg-muted/30 focus:bg-background transition-all"
                />
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">

          {/* Estado: carregando */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <IllustrationSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Estado: erro */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Não foi possível carregar as ilustrações
              </h3>
              <p className="text-muted-foreground max-w-sm">
                {error instanceof Error
                  ? error.message
                  : "Verifique se o Strapi está rodando em http://localhost:1337"}
              </p>
            </div>
          )}

          {/* Estado: sem dados cadastrados */}
          {!isLoading && !isError && ilustracoes?.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground">
                Nenhuma ilustração cadastrada ainda. Adicione uma no painel do Strapi!
              </p>
            </div>
          )}

          {/* Estado: sem resultados nos filtros */}
          {!isLoading && !isError && ilustracoes && ilustracoes.length > 0 && filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                Nenhuma ilustração encontrada com os filtros selecionados.
              </p>
            </div>
          )}

          {/* Estado: com dados */}
          {!isLoading && !isError && filteredItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-artistic group cursor-pointer overflow-hidden"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="aspect-square overflow-hidden bg-muted/20 dark:bg-muted/10 flex items-center justify-center p-2">
                    {item.imagemUrl ? (
                      <img
                        src={item.imagemUrl}
                        alt={item.titulo}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <ImageOff className="h-12 w-12 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-semibold text-foreground mb-2">{item.titulo}</h3>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs capitalize">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <IllustrationModal item={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </Layout>
  );
}
