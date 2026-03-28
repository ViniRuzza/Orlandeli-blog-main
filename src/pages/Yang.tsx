import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Instagram, X, Calendar } from "lucide-react";

import cabecalhoVerdeYang from "@/assets/cabecalho_verde_yang.png";
import { useYangPosts } from "@/hooks/useYangPosts";
import type { YangPost } from "@/lib/types";
import { Comments } from "@/components/Comments";

// Post de exemplo exibido quando não há dados no Strapi
const EXEMPLO_POST: YangPost = {
  id: -1,
  titulo: "As Origens do Universo Yang",
  descricao: "Descubra a mitologia por trás do mundo criado por Orlandeli — os espíritos ancestrais, os clãs guerreiros e a profecia que moldou tudo.",
  conteudo: `O universo de Yang não nasceu do nada. Antes das primeiras aldeias, antes dos guerreiros e dos impérios, havia apenas o Grande Equilíbrio — a força invisível que mantinha o mundo dos humanos separado do reino dos espíritos.

Segundo a mitologia que Orlandeli construiu ao longo de anos de pesquisa e criação, o mundo foi dividido em três planos:

O Plano dos Vivos, onde humanos constroem suas histórias sob o sol.

O Plano dos Espíritos, um lugar de névoa eterna onde as almas dos guerreiros caídos guardam segredos ancestrais.

O Plano das Sombras, corrompido por aqueles que ousaram romper o equilíbrio em busca de poder absoluto.

Yang descende de uma linhagem de guardiões — seres escolhidos para transitar entre esses planos e manter a ordem. Mas quando a profecia dos Três Dragões começa a se cumprir, até mesmo os guardiões precisam escolher um lado.

Esta é apenas a superfície de um universo rico, cheio de lendas, criaturas e histórias ainda por contar.`,
  imagemCapaUrl: "",
  imagensConteudoUrls: [],
  data: "2025-01-15",
  ordem: 1,
};

function formatarData(data: string) {
  if (!data) return "";
  try {
    return new Date(data).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  } catch {
    return data;
  }
}

function NewsletterModal({ post, onClose }: { post: YangPost; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-background w-full max-w-6xl max-h-[96vh] overflow-y-auto rounded-3xl shadow-2xl scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Imagem de capa — cobre topo completamente */}
          {post.imagemCapaUrl ? (
            <div className="w-full aspect-[16/4] overflow-hidden rounded-t-3xl">
              <img
                src={post.imagemCapaUrl}
                alt={post.titulo}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className="w-full aspect-[16/4] rounded-t-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1a2a1a 0%, #2d4a1e 50%, #93c748 100%)" }}
            >
              <span className="font-serif text-white/40 text-4xl font-bold tracking-widest">YANG</span>
            </div>
          )}

          {/* Conteúdo */}
          <div className="p-6 space-y-4">
            {/* Cabeçalho */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground leading-tight mb-2">
                {post.titulo}
              </h2>
              {post.data && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatarData(post.data)}</span>
                </div>
              )}
            </div>

            <div className="w-12 h-0.5" style={{ backgroundColor: "#93c748" }} />

            {/* Corpo do texto — parágrafos com imagens intercaladas */}
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              {post.conteudo.split("\n\n").map((bloco, i) => {
                // A cada 2 parágrafos, intercala uma imagem do conteúdo (se houver)
                const imagemIdx = Math.floor(i / 2);
                const temImagem = i % 2 === 1 && post.imagensConteudoUrls[imagemIdx];
                return (
                  <div key={i}>
                    {temImagem && (
                      <div className="my-3 overflow-hidden rounded-2xl">
                        <img
                          src={post.imagensConteudoUrls[imagemIdx]}
                          alt={`Imagem ${imagemIdx + 1}`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <p className="leading-relaxed text-sm whitespace-pre-line">{bloco}</p>
                  </div>
                );
              })}

              {/* Imagens restantes que não foram intercaladas */}
              {post.imagensConteudoUrls.slice(
                Math.ceil(post.conteudo.split("\n\n").length / 4)
              ).map((url, i) => (
                <div key={`extra-${i}`} className="overflow-hidden rounded-2xl">
                  <img src={url} alt={`Imagem extra ${i + 1}`} className="w-full h-48 object-cover" />
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-border/50">
              <Comments postId={`yang_${post.id}`} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PostCard({ post, onClick, idx }: { post: YangPost; onClick: () => void; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      onClick={onClick}
      className="cursor-pointer group flex flex-col rounded-3xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300"
    >
      {/* Imagem quadrada no topo */}
      <div className="aspect-square overflow-hidden bg-muted relative">
        {post.imagemCapaUrl ? (
          <img
            src={post.imagemCapaUrl}
            alt={post.titulo}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1a2a1a 0%, #2d4a1e 50%, #93c748 100%)" }}
          >
            <span className="font-serif text-white/30 text-2xl font-bold tracking-widest">YANG</span>
          </div>
        )}
      </div>

      {/* Texto */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {post.data && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatarData(post.data)}
          </span>
        )}
        <h3 className="font-serif text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
          {post.titulo}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {post.descricao}
        </p>
        <span className="mt-auto text-xs font-medium" style={{ color: "#93c748" }}>
          Ler mais →
        </span>
      </div>
    </motion.div>
  );
}

export default function Yang() {
  const { data: yangPosts } = useYangPosts();
  const [postAberto, setPostAberto] = useState<YangPost | null>(null);

  const posts = (!yangPosts || yangPosts.length === 0) ? [EXEMPLO_POST] : yangPosts;

  return (
    <Layout>
      {/* Hero */}
      <section className="w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <img src={cabecalhoVerdeYang} alt="O Mundo de Yang" className="w-full h-auto block" />
        </motion.div>
        <div className="container mx-auto px-4 text-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-block px-3 py-1 bg-accent/20 rounded-full text-xs font-medium mb-4 text-accent-foreground">
              Uma Saga Épica de Orlandeli
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: "#93c748" }}>
              O Mundo de Yang
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
              Em um oriente fantástico, um jovem guerreiro descobre que seu destino está
              entrelaçado com forças ancestrais que podem salvar ou destruir seu mundo.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/loja">
                <Button variant="default" className="font-semibold">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Comprar Livros
                </Button>
              </Link>
              <a href="https://www.instagram.com/omundodeyang" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="font-semibold">
                  <Instagram className="mr-0.5 h-4 w-4" />
                  O Mundo de Yang
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              A História
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground leading-relaxed mb-6"
            >
              Numa terra onde a natureza e a magia se entrelaçam, Yang vive uma vida simples
              em uma pequena aldeia cercada por florestas de bambu. Tudo muda quando ele encontra
              uma antiga espada escondida em uma caverna sagrada.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              A partir desse momento, Yang descobre que faz parte de uma linhagem de guerreiros
              destinados a proteger o equilíbrio entre o mundo dos humanos e o reino dos espíritos.
              Mas os Senhores da Sombra também despertaram, e eles farão de tudo para conquistar
              ambos os mundos.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Seção: Posts do Universo Yang */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-1">
              Yang
            </h2>
            <p className="text-muted-foreground text-base font-medium">
              Sobre o Universo
            </p>
            <div className="w-14 h-1 mt-3" style={{ backgroundColor: "#93c748" }} />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {posts.map((post, idx) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => setPostAberto(post)}
                idx={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-accent-foreground mb-4">
              Comece sua Jornada no Mundo de Yang
            </h2>
            <p className="text-accent-foreground/80 mb-8">
              Adquira o primeiro volume e embarque nesta aventura épica.
            </p>
            <Link to="/loja">
              <Button size="lg" variant="secondary" className="font-semibold">
                Ir para a Loja
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modal Newsletter */}
      {postAberto && (
        <NewsletterModal post={postAberto} onClose={() => setPostAberto(null)} />
      )}
    </Layout>
  );
}
