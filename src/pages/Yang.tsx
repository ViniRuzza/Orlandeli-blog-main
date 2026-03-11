import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Sword } from "lucide-react";

import carouselYang from "@/assets/carousel-yang.jpg";
import bookYang1 from "@/assets/book-yang-1.jpg";

const volumes = [
  {
    number: 1,
    title: "O Despertar",
    cover: bookYang1,
    description: "Yang encontra a espada mágica e descobre seu destino como protetor da floresta.",
    status: "Disponível",
  },
  {
    number: 2,
    title: "Os Senhores da Sombra",
    cover: bookYang1,
    description: "A jornada de Yang o leva ao confronto com os temidos vilões que ameaçam seu mundo.",
    status: "Em produção",
  },
  {
    number: 3,
    title: "A Grande Batalha",
    cover: bookYang1,
    description: "O épico confronto final que decidirá o destino de todo o universo.",
    status: "Planejado",
  },
];

const characters = [
  { name: "Yang", role: "Protagonista", description: "Um jovem guerreiro que descobre poderes ancestrais." },
  { name: "Mei", role: "Aliada", description: "Mestre de artes marciais e mentora de Yang." },
  { name: "Kuro", role: "Antagonista", description: "Líder dos Senhores da Sombra, misterioso e poderoso." },
];

export default function Yang() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${carouselYang})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/95 via-accent/70 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-accent-foreground"
          >
            <span className="inline-block px-4 py-2 bg-background/20 rounded-full text-sm font-medium mb-6">
              Uma Saga Épica de Orlandeli
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
              O Mundo de Yang
            </h1>
            <p className="text-xl text-accent-foreground/90 mb-8 leading-relaxed">
              Em um oriente fantástico, um jovem guerreiro descobre que seu destino está 
              entrelaçado com forças ancestrais que podem salvar ou destruir seu mundo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/loja">
                <Button size="lg" variant="secondary" className="font-semibold">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Comprar Livros
                </Button>
              </Link>
              <Link to="/quadrinhos">
                <Button size="lg" variant="outline" className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10">
                  Ler Capítulos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
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

      {/* Volumes */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Os Volumes
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {volumes.map((vol, idx) => (
              <motion.div
                key={vol.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="card-artistic"
              >
                <div className="aspect-[2/3] overflow-hidden rounded-t-lg relative">
                  <img 
                    src={vol.cover} 
                    alt={vol.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                    {vol.number}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      Volume {vol.number}: {vol.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{vol.description}</p>
                  <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${
                    vol.status === "Disponível" 
                      ? "bg-primary/20 text-primary" 
                      : vol.status === "Em produção"
                      ? "bg-wood/20 text-wood"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {vol.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Characters */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Personagens
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {characters.map((char, idx) => (
              <motion.div
                key={char.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  {char.role === "Protagonista" && <Sword className="h-10 w-10 text-accent" />}
                  {char.role === "Aliada" && <Users className="h-10 w-10 text-primary" />}
                  {char.role === "Antagonista" && <Sword className="h-10 w-10 text-wood rotate-180" />}
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">{char.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{char.role}</p>
                <p className="text-muted-foreground text-sm">{char.description}</p>
              </motion.div>
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
    </Layout>
  );
}
