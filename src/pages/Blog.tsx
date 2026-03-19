import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MessageCircle, User, Send, Loader2, Share2, Facebook, Twitter, Link as LinkIcon, Check, Search } from "lucide-react";
import { usePostsBlog } from "@/hooks/usePostsBlog";
import type { PostBlog } from "@/lib/types";
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

export default function Blog() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostBlog | null>(null);
  const [comment, setComment] = useState("");
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const { data: posts = [], isLoading, isError } = usePostsBlog();

  const categories = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.categorias))),
    [posts]
  );

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q");
    if (!q) return;
    const matched = categories.filter((c) => c.toLowerCase().includes(q.toLowerCase()));
    if (matched.length > 0) {
      setSelectedCategories(matched);
    }
  }, [location.search, categories]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      post.categorias.some((c) => selectedCategories.includes(c));
    const matchesSearch =
      post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.conteudo.toLowerCase().includes(searchTerm.toLowerCase());
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
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Novidades, bastidores, dicas e reflexões sobre o mundo dos quadrinhos e ilustração.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter & Local Search */}
      <section className="py-8 bg-background border-b border-border sticky top-[72px] z-30 shadow-sm">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col items-center gap-6">
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

          {/* Posts grid */}
          {!isLoading && !isError && !selectedPost && filteredPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-artistic group cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.imagemUrl && (
                    <div className="overflow-hidden rounded-t-lg bg-muted/10">
                      <img
                        src={post.imagemUrl}
                        alt={post.titulo}
                        className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.categorias.map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-[10px] px-2 py-0 h-5 bg-muted/50 text-muted-foreground border-none font-normal">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                      {post.titulo}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                      {post.conteudo.replace(/[#*`]/g, '').slice(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50 text-[10px] text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.data)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          12 comentários
                        </span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (navigator.share) {
                            navigator.share({
                              title: post.titulo,
                              url: window.location.href + "?post=" + post.id
                            });
                          }
                        }}
                        className="flex items-center gap-1 hover:text-primary transition-colors font-medium"
                      >
                        <Share2 className="h-3 w-3" />
                        Compartilhar
                      </button>
                    </div>
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
                  <div className="flex flex-wrap gap-1">
                    {selectedPost.categorias.map((cat) => (
                      <Badge key={cat} variant="secondary">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                    {selectedPost.titulo}
                  </h1>
                  <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/50">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(selectedPost.data)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        12 comentários
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: selectedPost.titulo,
                              url: window.location.href
                            });
                          } else {
                            navigator.clipboard.writeText(window.location.href);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }
                        }}
                        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                        {copied ? "Link copiado!" : "Compartilhar"}
                      </button>
                    </div>
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
