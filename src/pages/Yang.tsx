import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  BookOpen,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  Instagram,
  X,
  Calendar,
  ExternalLink,
  User,
} from "lucide-react";

import cabecalhoVerdeYang from "@/assets/cabecalho_verde_yang.png";
import yangLogoPreto from "@/assets/Yang_logonovo_preto.png";
import assOrlandeli from "@/assets/ASSORLANDELI.png";
import placasYang3 from "@/assets/Yang_yingxYang.png";
import { useYangPosts } from "@/hooks/useYangPosts";
import { useYangLivros } from "@/hooks/useYangLivros";
import { useYangPersonagens } from "@/hooks/useYangPersonagens";
import type { YangPost, YangLivro, YangPersonagem } from "@/lib/types";

// Post de exemplo exibido quando não há dados no Strapi
const EXEMPLO_POST: YangPost = {
  id: -1,
  titulo: "As Origens do Universo Yang",
  descricao:
    "Descubra a mitologia por trás do mundo criado por Orlandeli — os espíritos ancestrais, os clãs guerreiros e a profecia que moldou tudo.",
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
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return data;
  }
}

function NewsletterModal({
  post,
  onClose,
}: {
  post: YangPost;
  onClose: () => void;
}) {
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
              style={{
                background:
                  "linear-gradient(135deg, #1a2a1a 0%, #2d4a1e 50%, #93c748 100%)",
              }}
            >
              <span className="font-serif text-white/40 text-4xl font-bold tracking-widest">
                Curiosidades
              </span>
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

            <div
              className="w-12 h-0.5"
              style={{ backgroundColor: "#93c748" }}
            />

            {/* Corpo do texto — parágrafos com imagens intercaladas */}
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              {post.conteudo.split("\n\n").map((bloco, i) => {
                // A cada 2 parágrafos, intercala uma imagem do conteúdo (se houver)
                const imagemIdx = Math.floor(i / 2);
                const temImagem =
                  i % 2 === 1 && post.imagensConteudoUrls[imagemIdx];
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
                    <p className="leading-relaxed text-sm whitespace-pre-line">
                      {bloco}
                    </p>
                  </div>
                );
              })}

              {/* Imagens restantes que não foram intercaladas */}
              {post.imagensConteudoUrls
                .slice(Math.ceil(post.conteudo.split("\n\n").length / 4))
                .map((url, i) => (
                  <div
                    key={`extra-${i}`}
                    className="overflow-hidden rounded-2xl"
                  >
                    <img
                      src={url}
                      alt={`Imagem extra ${i + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PostCard({
  post,
  onClick,
  idx,
}: {
  post: YangPost;
  onClick: () => void;
  idx: number;
}) {
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
            style={{
              background:
                "linear-gradient(135deg, #1a2a1a 0%, #2d4a1e 50%, #93c748 100%)",
            }}
          >
            <span className="font-serif text-white/30 text-2xl font-bold tracking-widest">
              YANG
            </span>
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
        <span
          className="mt-auto text-xs font-medium"
          style={{ color: "#93c748" }}
        >
          Ler mais →
        </span>
      </div>
    </motion.div>
  );
}

export default function Yang() {
  const { data: yangPosts } = useYangPosts();
  const { data: yangLivros = [] } = useYangLivros();
  const { data: yangPersonagens = [] } = useYangPersonagens();
  const [postAberto, setPostAberto] = useState<YangPost | null>(null);
  const [personagemAberto, setPersonagemAberto] =
    useState<YangPersonagem | null>(null);

  const posts =
    !yangPosts || yangPosts.length === 0 ? [EXEMPLO_POST] : yangPosts;

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
          <img
            src={cabecalhoVerdeYang}
            alt="O Mundo de Yang"
            className="w-full h-auto block"
          />
        </motion.div>
        {/* Nó Raiz — máx. 1200px, centralizado */}
        <div className="mx-auto px-4 md:px-8 py-12" style={{ maxWidth: "1200px" }}>

          {/* Bloco A: Cabeçalho — logo centralizado, isolado */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-14"
          >
            <div className="flex flex-col items-center gap-4">
              <img
                src={yangLogoPreto}
                alt="O Mundo de Yang"
                className="h-24 md:h-36 w-auto dark:invert"
              />
              <nav className="flex flex-wrap justify-center items-center gap-2">
                {[
                  { label: "Yang", href: "#universo" },
                  { label: "Livros Publicados", href: "#livros" },
                  { label: "Personagens", href: "#personagens" },
                ].map((item, idx, arr) => (
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
            </div>
          </motion.div>

          {/* Bloco B: Corpo — grade 60% / 40% */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-col md:flex-row gap-10 md:gap-14 items-start"
          >
            {/* Coluna esquerda: dados e interação (60%) */}
            <div className="w-full md:w-[60%] flex flex-col order-2 md:order-1">

              {/* Passo 1: Textos */}
              <div
                className="text-muted-foreground text-base space-y-4"
                style={{ lineHeight: 1.8 }}
              >
                <p>
                  O mundo de Yang surgiu em 2015. Na época, eu queria criar uma
                  espécie de saga com um pequeno herói e sua jornada de
                  aprendizado, algo que envolvesse cultura oriental, filosofia e
                  humor, muito humor.
                </p>
                <p>
                  Nesses dez anos de publicação, a série passou por diferentes
                  formatos: começou como tira semanal em jornal; experimentou
                  novas possibilidades gráficas com as narrativas longas das
                  graphic novels; e ampliou o seu alcance com o poder de
                  compartilhamento das tiras em redes sociais (@omundodeyang).
                </p>
                <p>
                  Essa trajetória rendeu três publicações: O mundo de Yang
                  (2015); O mundo de Yang - Rumo ao Sul (2019) e O mundo de
                  Yang - Dois Cortes (2022).
                </p>
                <p>
                  Uma década vivenciando a impermanência nas adaptações
                  necessárias para continuar levando as aventuras do Yang aos
                  seus leitores, sempre preservando a sua essência: mergulhar em
                  questões e inquietações de um jeito leve e en­graçado.
                </p>
                <p>
                  Não é simples lidar com alguns sentimentos; não à toa, em boa
                  parte das ve­zes, eles são representados na série como
                  criaturas, seres fantásticos que transitam e interagem com quem
                  encontram pela frente.
                </p>
                <p>
                  O mundo de Yang é a forma que eu encontrei de olhar minhas
                  criaturas mais de perto e conhecer melhor cada uma delas.
                </p>
              </div>

              {/* Passo 2: Assinatura — abaixo do último parágrafo, à esquerda */}
              <div className="mt-7 flex justify-center md:justify-start">
                <img
                  src={assOrlandeli}
                  alt="Ass. Orlandeli"
                  className="h-10 w-auto dark:invert"
                />
              </div>

              {/* Passo 3: Ações — coluna no mobile, linha no desktop */}
              <div className="flex flex-col md:flex-row md:flex-wrap gap-3 mt-7">
                {/* Ação principal — fundo sólido */}
                <Link to="/loja" className="w-full md:w-auto">
                  <Button variant="default" className="font-semibold w-full md:w-auto min-h-[44px]">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Comprar Livros
                  </Button>
                </Link>
                {/* Ações secundárias — outline */}
                <Link to="/blog?q=Yang" className="w-full md:w-auto">
                  <Button variant="outline" className="font-semibold w-full md:w-auto min-h-[44px]">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Posts Yang
                  </Button>
                </Link>
                <a
                  href="https://www.instagram.com/omundodeyang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto"
                >
                  <Button variant="outline" className="font-semibold w-full md:w-auto min-h-[44px]">
                    <Instagram className="mr-1.5 h-4 w-4" />
                    O Mundo de Yang
                  </Button>
                </a>
              </div>
            </div>

            {/* Coluna direita: mídia (40%) — imagem fixada no topo */}
            <div className="w-full md:w-[50%] md:sticky md:top-8 order-1 md:order-2 mb-6 md:mb-0">
              <img
                src={placasYang3}
                alt="Placa Yang"
                className="w-full rounded-2xl object-cover"               
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Seção: Personagens */}
      {yangPersonagens.length > 0 && (
        <section id="personagens" className="py-20 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-1">
                Personagens
              </h2>
              <p className="text-muted-foreground text-base font-medium">
                Conheça os habitantes do universo Yang
              </p>
              <div
                className="w-14 h-1 mt-3"
                style={{ backgroundColor: "#93c748" }}
              />
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {yangPersonagens.map((personagem, idx) => (
                <motion.div
                  key={personagem.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 group cursor-pointer"
                  onClick={() => setPersonagemAberto(personagem)}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                    {personagem.imagemUrl ? (
                      <img
                        src={personagem.imagemUrl}
                        alt={personagem.nome}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #1a2a1a 0%, #2d4a1e 50%, #93c748 100%)",
                        }}
                      >
                        <User className="h-16 w-16 text-white/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex flex-col items-center">
                    <h3 className="font-serif text-base font-bold text-foreground text-center leading-snug group-hover:text-primary transition-colors">
                      {personagem.nome}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modal Personagem */}
      <Dialog
        open={!!personagemAberto}
        onOpenChange={() => setPersonagemAberto(null)}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {personagemAberto && (
            <div className="flex flex-col md:flex-row md:h-[560px] overflow-y-auto">
              {/* Imagem */}
              {personagemAberto.imagemUrl && (
                <div className="w-full md:w-96 md:shrink-0 bg-muted">
                  <img
                    src={personagemAberto.imagemUrl}
                    alt={personagemAberto.nome}
                    className="w-full h-auto md:h-full md:object-cover"
                  />
                </div>
              )}
              {/* Conteúdo */}
              <div className="flex flex-col gap-3 p-6">
                <h2 className="font-serif text-7xl font-bold text-foreground leading-tight">
                  {personagemAberto.nome}
                </h2>
                <div
                  className="w-20 h-1 shrink-0"
                  style={{ backgroundColor: "#93c748" }}
                />
                {personagemAberto.descricao && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {personagemAberto.descricao}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Seção: Livros Publicados */}
      {yangLivros.length > 0 && (
        <section id="livros" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-1">
                Livros Publicados
              </h2>
              <p className="text-muted-foreground text-base font-medium">
                A saga Yang em volumes
              </p>
              <div
                className="w-14 h-1 mt-3"
                style={{ backgroundColor: "#93c748" }}
              />
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {yangLivros.map((livro, idx) => (
                <motion.div
                  key={livro.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 group"
                >
                  {/* Capa */}
                  <div className="aspect-square overflow-hidden bg-muted relative">
                    {livro.capaUrl ? (
                      <img
                        src={livro.capaUrl}
                        alt={livro.titulo}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #1a2a1a 0%, #2d4a1e 50%, #93c748 100%)",
                        }}
                      >
                        <BookOpen className="h-16 w-16 text-white/30" />
                      </div>
                    )}
                    {livro.ano > 0 && (
                      <span className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full bg-black/60 text-white">
                        {livro.ano}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3 flex flex-col gap-2 flex-1">
                    <h3 className="font-serif text-sm font-bold text-foreground leading-snug">
                      {livro.titulo}
                    </h3>
                    {livro.sinopse && (
                      <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                        {livro.sinopse}
                      </p>
                    )}
                    {livro.linkCompra && (
                      <a
                        href={livro.linkCompra}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          className="w-full mt-auto text-xs"
                          style={{ backgroundColor: "#93c748", color: "#fff" }}
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                          Comprar
                        </Button>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Seção: Posts do Universo Yang */}
      <section id="universo" className="py-20 bg-muted/20">
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
            <div
              className="w-14 h-1 mt-3"
              style={{ backgroundColor: "#93c748" }}
            />
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

      {/* Modal Newsletter */}
      {postAberto && (
        <NewsletterModal
          post={postAberto}
          onClose={() => setPostAberto(null)}
        />
      )}
    </Layout>
  );
}
