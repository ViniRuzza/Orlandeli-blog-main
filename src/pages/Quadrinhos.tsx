import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, BookOpen, AlertCircle } from "lucide-react";
import cabecalhoVerdePublicacoes from "@/assets/cabecalho_verde_publicacoes.png";
import { useQuadrinhos } from "@/hooks/useQuadrinhos";
import type { Quadrinho } from "@/lib/types";


function ComicCardSkeleton() {
  return (
    <div className="card-artistic animate-pulse">
      <div className="aspect-[2/3] bg-muted rounded-t-lg" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    </div>
  );
}

function ComicCard({ comic, onOpen, idx }: { comic: Quadrinho; onOpen: (c: Quadrinho) => void; idx: number }) {
  return (
    <motion.div
      key={comic.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      className="group flex flex-col rounded-lg border-0 hover:border hover:border-[#93c748] transition-all duration-300"
    >
      <div
        className="aspect-[3/4] overflow-hidden rounded-t-lg relative bg-muted/20 dark:bg-muted/10 flex items-center justify-center p-2 cursor-pointer"
        onClick={() => onOpen(comic)}
      >
        {comic.capaUrl ? (
          <img
            src={comic.capaUrl}
            alt={comic.titulo}
            className="w-full h-full object-contain object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}
      </div>
      <div className="p-3 pb-0 flex flex-col flex-1">
        <h3
          className="font-serif text-sm font-semibold text-foreground leading-tight cursor-pointer mb-1"
          onClick={() => onOpen(comic)}
        >
          {comic.titulo}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span>{comic.ano}</span>
          <span className="text-primary font-medium">{comic.stats}</span>
        </div>
        {comic.botaoTexto && comic.botaoLink && (
          <Button
            size="sm"
            className="w-[calc(100%+24px)] -mx-3 text-xs rounded-t-none rounded-b-lg mt-auto h-9 shrink-0"
            style={{ backgroundColor: "#93c748", color: "#fff" }}
            onClick={() => window.open(comic.botaoLink, "_blank", "noopener,noreferrer")}
          >
            {comic.botaoTexto}
          </Button>
        )}
        {(!comic.botaoTexto || !comic.botaoLink) && <div className="h-3" />}
      </div>
    </motion.div>
  );
}

export default function Quadrinhos() {
  const { data: comics, isLoading, isError, error } = useQuadrinhos();
  const [selectedComic, setSelectedComic] = useState<Quadrinho | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const openComic = (comic: Quadrinho) => {
    setSelectedComic(comic);
    setCurrentPage(0);
  };

  const fonte: Quadrinho[] = comics ?? [];

  const quadrinhosAutorais = fonte.filter(c => c.secao === "quadrinhos_autorais");
  const literaturaInfantil = fonte.filter(c => c.secao === "literatura_infantil");

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
            src={cabecalhoVerdePublicacoes}
            alt="Publicações"
            className="w-full h-auto block"
          />
        </motion.div>
        <div className="container mx-auto px-4 text-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3" style={{ color: "#93c748" }}>
              Publicações
            </h1>
            {!isLoading && (
              <nav className="flex flex-wrap justify-center items-center gap-2 mb-2">
                {[
                  { label: "Quadrinhos Autorais", href: "#quadrinhos-autorais", show: quadrinhosAutorais.length > 0 },
                  { label: "Literatura Infantil e Infanto Juvenil", href: "#literatura-infantil", show: literaturaInfantil.length > 0 },
                ].filter(item => item.show).map((item, idx, arr) => (
                  <>
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                    {idx < arr.length - 1 && (
                      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#93c748" }} />
                    )}
                  </>
                ))}
              </nav>
            )}
            <div className="section-divider" />
          </motion.div>
        </div>
      </section>

      {/* Estado: erro */}
      {isError && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4 text-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <h3 className="font-serif text-xl font-semibold text-foreground">
              Não foi possível carregar as publicações
            </h3>
            <p className="text-muted-foreground max-w-sm">
              {error instanceof Error ? error.message : "Verifique se o Strapi está rodando em http://localhost:1337"}
            </p>
          </div>
        </section>
      )}

      {/* Seção: Quadrinhos Autorais */}
      {(isLoading || quadrinhosAutorais.length > 0) && (
        <section id="quadrinhos-autorais" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                Quadrinhos Autorais
              </h2>
              <p className="text-muted-foreground text-base">
                Obras e quadrinhos escritos e desenhados pelo Orlandeli
              </p>
              <div className="w-16 h-1 mt-3" style={{ backgroundColor: "#93c748" }} />
            </motion.div>

            {isLoading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <ComicCardSkeleton key={i} />
                ))}
              </div>
            )}

            {!isLoading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {quadrinhosAutorais.map((comic, idx) => (
                  <ComicCard key={comic.id} comic={comic} onOpen={openComic} idx={idx} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Seção: Literatura Infantil e Infanto Juvenil */}
      {(isLoading || literaturaInfantil.length > 0) && (
        <section id="literatura-infantil" className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                Literatura Infantil e Infanto Juvenil
              </h2>
              <p className="text-muted-foreground text-base">
                Obras ilustradas pelo Orlandeli
              </p>
              <div className="w-16 h-1 mt-3" style={{ backgroundColor: "#93c748" }} />
            </motion.div>

            {isLoading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <ComicCardSkeleton key={i} />
                ))}
              </div>
            )}

            {!isLoading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {literaturaInfantil.map((comic, idx) => (
                  <ComicCard key={comic.id} comic={comic} onOpen={openComic} idx={idx} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

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
