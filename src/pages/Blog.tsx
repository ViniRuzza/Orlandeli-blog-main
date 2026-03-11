import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MessageCircle, User, Send } from "lucide-react";

import illustration1 from "@/assets/illustration-1.jpg";
import illustration3 from "@/assets/illustration-3.jpg";
import carouselCartoons from "@/assets/carousel-cartoons.jpg";

const blogPosts = [
  {
    id: 1,
    title: "O Processo Criativo por Trás de Yang",
    excerpt: "Conheça como nasceu o universo de O Mundo de Yang, desde os primeiros esboços até a versão final.",
    image: illustration1,
    date: "2024-01-15",
    categories: ["Bastidores", "Dicas"],
    comments: 12,
  },
  {
    id: 2,
    title: "Dicas para Aspirantes a Cartunistas",
    excerpt: "Compartilho algumas lições que aprendi ao longo de mais de 20 anos desenhando quadrinhos.",
    image: carouselCartoons,
    date: "2024-01-08",
    categories: ["Dicas"],
    comments: 24,
  },
  {
    id: 3,
    title: "Nova Coleção Infantil em Produção",
    excerpt: "Estou trabalhando em uma nova série de livros infantis! Confira os primeiros conceitos.",
    image: illustration3,
    date: "2024-01-02",
    categories: ["Novidades", "Eventos"],
    comments: 8,
  },
];

export default function Blog() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [comment, setComment] = useState("");
  const location = useLocation();

  const categories = useMemo(
    () => Array.from(new Set(blogPosts.flatMap(p => p.categories))),
    []
  );

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q");
    if (!q) return;
    const matched = categories.filter(c => c.toLowerCase().includes(q.toLowerCase()));
    if (matched.length > 0) {
      setSelectedCategories(matched);
    }
  }, [location.search, categories]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredPosts = blogPosts.filter(post =>
    selectedCategories.length === 0 ||
    post.categories.some(c => selectedCategories.includes(c))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
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
            {categories.map(category => (
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
          {!selectedPost ? (
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
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {post.categories.map(cat => (
                        <Badge key={cat} variant="secondary" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {post.comments} comentários
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
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
                <div className="image-frame aspect-video">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {selectedPost.categories.map(cat => (
                      <Badge key={cat} variant="secondary">{cat}</Badge>
                    ))}
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                    {selectedPost.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(selectedPost.date)}
                    </span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground leading-relaxed">
                    {selectedPost.excerpt}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

                {/* Comments Section */}
                <div className="border-t border-border pt-8 space-y-6">
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    Comentários ({selectedPost.comments})
                  </h3>

                  {/* Comment Form */}
                  <div className="bg-muted p-6 rounded-lg space-y-4">
                    <h4 className="font-medium text-foreground">Deixe seu comentário</h4>
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
