import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MessageCircle, User, Send, Loader2 } from "lucide-react";
import { usePostsBlog } from "@/hooks/usePostsBlog";
import type { PostBlog } from "@/lib/types";

export default function Blog() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostBlog | null>(null);
  const [comment, setComment] = useState("");
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

  const filteredPosts = posts.filter(
    (post) =>
      selectedCategories.length === 0 ||
      post.categorias.some((c) => selectedCategories.includes(c))
  );

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

      {/* Category Filter */}
      <section className="py-6 bg-background border-b border-border sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                  selectedCategories.includes(category)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
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
                className="text-destructive hover:text-destructive px-4 py-2"
              >
                Limpar
              </Button>
            )}
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
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={post.imagemUrl}
                        alt={post.titulo}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5 space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {post.categorias.map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {post.titulo}
                    </h2>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.data)}
                      </span>
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
                  <div className="image-frame aspect-video">
                    <img
                      src={selectedPost.imagemUrl}
                      alt={selectedPost.titulo}
                      className="w-full h-full object-cover"
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
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(selectedPost.data)}
                    </span>
                  </div>
                </div>

                {/* Rich text content */}
                <div
                  className="prose prose-lg max-w-none text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedPost.conteudo }}
                />

                {/* Comments Section */}
                <div className="border-t border-border pt-8 space-y-6">
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    Deixe um comentário
                  </h3>

                  {/* Comment Form */}
                  <div className="bg-muted p-6 rounded-lg space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Seu nome" />
                      <Input placeholder="Seu email" type="email" />
                    </div>
                    <Textarea
                      placeholder="Escreva seu comentário..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                    />
                    <Button className="btn-wood">
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Comentário
                    </Button>
                  </div>

                  {/* Sample Comments */}
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-card rounded-lg border border-border">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">Maria Silva</span>
                          <span className="text-xs text-muted-foreground">há 2 dias</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Adorei o post! Sempre quis saber mais sobre o processo criativo. Continue compartilhando!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}
