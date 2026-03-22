import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, BookOpen, Loader2, AlertCircle, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useQuadrinhos } from "@/hooks/useQuadrinhos";
import type { Quadrinho } from "@/lib/types";

// Skeleton de card
function ComicCardSkeleton() {
  return (
    <div className="card-artistic animate-pulse">
      <div className="aspect-[2/3] bg-muted rounded-t-lg" />
      <div className="p-4 space-y-2">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
      </div>
    </div>
  );
}

export default function Quadrinhos() {
  const { data: comics, isLoading, isError, error } = useQuadrinhos();
  const [selectedComic, setSelectedComic] = useState<Quadrinho | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const location = useLocation();

  const categories = useMemo(() => {
    if (!comics) return [];
    // Tenta pegar categorias se existirem, senão usa as tags/stats
    return Array.from(new Set(comics.flatMap(c => (c as any).categorias || [c.stats])));
  }, [comics]);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q");
    if (q) setSearchQuery(q);
  }, [location.search]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredComics = comics?.filter(comic => {
    const matchesSearch = !searchQuery ||
      comic.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comic.sinopse.toLowerCase().includes(searchQuery.toLowerCase());

    const comicCats = (comic as any).categorias || [comic.stats];
    const matchesCategory = selectedCategories.length === 0 ||
      selectedCategories.some(cat => comicCats.includes(cat));

    return matchesSearch && matchesCategory;
  }) ?? [];

  const openComic = (comic: Quadrinho) => {
    setSelectedComic(comic);
    setCurrentPage(0);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="h-[60vh] min-h-[400px] w-full flex flex-col justify-center overflow-hidden bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Publicações
            </h1>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conheça as publicações criadas por Orlandeli. Clique em cada título para ler a sinopse e ver algumas páginas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter & Local Search */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col items-center gap-6">
            {/* Local Search Bar */}
            <div className="relative w-full max-w-md">
              <Input
                type="text"
                placeholder="Buscar publicações..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-full border-border bg-muted/30 focus:bg-background transition-all"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-1.5 text-xs transition-all rounded-full ${selectedCategories.includes(category)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted hover:border-primary/50"
                    }`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Badge>
              ))}
              {selectedCategories.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategories([])}
                  className="text-destructive hover:text-white hover:bg-destructive px-3 py-1.5 h-auto text-xs rounded-full ml-2"
                >
                  Limpar
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Comics Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">

          {/* Estado: carregando */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <ComicCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Estado: erro */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <h3 className="font-serif text-xl font-semibold text-foreground">
                Não foi possível carregar os quadrinhos
              </h3>
              <p className="text-muted-foreground max-w-sm">
                {error instanceof Error ? error.message : "Verifique se o Strapi está rodando em http://localhost:1337"}
              </p>
            </div>
          )}

          {/* Estado: sem dados */}
          {!isLoading && !isError && filteredComics.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground">
                Nenhum quadrinho cadastrado ainda. Adicione um no painel do Strapi!
              </p>
            </div>
          )}

          {/* Estado: com dados */}
          {!isLoading && !isError && filteredComics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredComics.map((comic, idx) => (
                <motion.div
                  key={comic.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className="card-artistic group cursor-pointer"
                  onClick={() => openComic(comic)}
                >
                  <div className="aspect-[2/3] overflow-hidden rounded-t-lg relative bg-muted/20 dark:bg-muted/10 flex items-center justify-center p-2">
                    {comic.capaUrl ? (
                      <img
                        src={comic.capaUrl}
                        alt={comic.titulo}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-muted-foreground/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                      <Button variant="secondary" size="sm">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      {comic.titulo}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{comic.ano}</span>
                      <span className="text-primary font-medium">{comic.stats}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Comic Detail Modal */}
      <Dialog open={!!selectedComic} onOpenChange={() => setSelectedComic(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedComic && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">{selectedComic.titulo}</DialogTitle>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                {/* Capa */}
                <div className="image-frame aspect-[2/3] bg-muted/20 dark:bg-muted/10 flex items-center justify-center p-2">
                  {selectedComic.capaUrl ? (
                    <img
                      src={selectedComic.capaUrl}
                      alt={selectedComic.titulo}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-muted-foreground/40" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Sinopse</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedComic.sinopse}</p>
                  </div>

                  <div className="flex gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Ano:</span>
                      <span className="ml-2 font-medium">{selectedComic.ano}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <span className="ml-2 font-medium text-primary">{selectedComic.stats}</span>
                    </div>
                  </div>

                  {/* Páginas de amostra */}
                  {selectedComic.paginasUrls.length > 0 && (
                    <div className="pt-4">
                      <h4 className="font-semibold text-foreground mb-3">Páginas de Amostra</h4>
                      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        <img
                          src={selectedComic.paginasUrls[currentPage]}
                          alt={`Página ${currentPage + 1}`}
                          className="w-full h-full object-cover"
                        />

                        {selectedComic.paginasUrls.length > 1 && (
                          <div className="absolute inset-x-0 bottom-0 flex justify-between p-2">
                            <Button
                              variant="secondary"
                              size="icon"
                              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                              disabled={currentPage === 0}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="bg-background/80 px-3 py-1 rounded text-sm">
                              {currentPage + 1} / {selectedComic.paginasUrls.length}
                            </span>
                            <Button
                              variant="secondary"
                              size="icon"
                              onClick={() => setCurrentPage(prev => Math.min(selectedComic.paginasUrls.length - 1, prev + 1))}
                              disabled={currentPage === selectedComic.paginasUrls.length - 1}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
