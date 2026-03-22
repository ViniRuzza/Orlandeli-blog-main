import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Sword, Instagram } from "lucide-react";

import carouselYang from "@/assets/placas_yang_5.jpg.jpeg";
import bookYang1 from "@/assets/book-yang-1.jpg";



const characters = [
  { name: "Yang", role: "Protagonista", description: "Um jovem guerreiro que descobre poderes ancestrais." },
  { name: "Mei", role: "Aliada", description: "Mestre de artes marciais e mentora de Yang." },
  { name: "Kuro", role: "Antagonista", description: "Líder dos Senhores da Sombra, misterioso e poderoso." },
];

export default function Yang() {
  return (
    <Layout>
      {/* Hero */}
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full flex flex-col justify-center overflow-hidden">
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
            <span className="inline-block px-3 py-1 bg-background/20 rounded-full text-xs font-medium mb-4">
              Uma Saga Épica de Orlandeli
            </span>
            {/* Título com tamanho reduzido para igualar à página Sobre */}
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              O Mundo de Yang
            </h1>
            <p className="text-lg text-accent-foreground/90 mb-6 leading-relaxed">
              Em um oriente fantástico, um jovem guerreiro descobre que seu destino está
              entrelaçado com forças ancestrais que podem salvar ou destruir seu mundo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/loja">
                <Button variant="secondary" className="font-semibold">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Comprar Livros
                </Button>
              </Link>
              <a href="https://www.instagram.com/omundodeyang" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="font-semibold">
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


      {/* Characters */}
      {/* 
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
      */}

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
