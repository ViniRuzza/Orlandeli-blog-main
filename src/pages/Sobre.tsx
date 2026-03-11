import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Award, BookOpen, Palette, Calendar } from "lucide-react";

import artistPortrait from "@/assets/image.png";
import heroStudio from "@/assets/hero-studio.jpg";

const timeline = [
  { year: "1995", title: "Primeiros Traços", description: "Início da carreira como ilustrador freelancer em São Paulo." },
  { year: "2000", title: "Primeiro Quadrinho", description: "Publicação da primeira história em quadrinhos em revista nacional." },
  { year: "2008", title: "Reconhecimento", description: "Prêmio Angelo Agostini de melhor desenhista brasileiro." },
  { year: "2015", title: "O Mundo de Yang", description: "Lançamento do primeiro volume da saga que se tornaria sua obra mais conhecida." },
  { year: "2020", title: "Expansão Digital", description: "Início dos cursos online e ampliação da presença nas redes sociais." },
];

const awards = [
  { name: "Prêmio Angelo Agostini", year: "2008", category: "Melhor Desenhista" },
  { name: "Troféu HQ Mix", year: "2016", category: "Melhor Publicação Independente" },
  { name: "CCXP Awards", year: "2019", category: "Artista Revelação" },
];

export default function Sobre() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroStudio})` }}
        />
        <div className="absolute inset-0 bg-foreground/70" />

        <div className="relative z-10 container mx-auto px-4 text-center text-background">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Sobre Orlandeli
            </h1>
            <p className="text-lg text-background/80 max-w-2xl mx-auto">
              Mais de duas décadas transformando ideias em traços que emocionam e divertem
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1 space-y-6"
            >
              <h2 className="font-serif text-3xl font-bold text-foreground">
                O Artista
              </h2>
              <div className="section-divider !mx-0" />
              <p className="text-muted-foreground leading-relaxed">
                Walmir Americo Orlandeli mora no Brasil e é um artista de quadrinhos, cartunista e ilustrador.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                É autor de diversas publicações. Como artista de quadrinhos, participou das antologias MSP 50 e Front.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Vencedor do Troféu HQMix em 2002 como "melhor revista de humor" (Grump), 2018 como "melhor publicação juvenil" (Chico Bento - Arvorada) e em 2024 como melhor design gráfico (Lusco-Fusco). Vencedor do CCXP Awards em 2022 (Chico Bento - Verdade).
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="image-frame aspect-square max-w-md mx-auto">
                <img
                  src={artistPortrait}
                  alt="Orlandeli"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Trajetória
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-6 mb-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    <Calendar className="h-5 w-5" />
                  </div>
                  {idx < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <span className="text-sm font-bold text-primary">{item.year}</span>
                  <h3 className="font-serif text-xl font-semibold text-foreground mt-1">{item.title}</h3>
                  <p className="text-muted-foreground mt-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Prêmios e Reconhecimentos
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {awards.map((award, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-artistic p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-wood/20 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-wood" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">{award.name}</h3>
                <p className="text-primary font-bold mt-1">{award.year}</p>
                <p className="text-sm text-muted-foreground mt-2">{award.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Ilustração</h3>
              <p className="text-muted-foreground text-sm">
                Ilustrações para livros, revistas, capas e projetos editoriais.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Quadrinhos</h3>
              <p className="text-muted-foreground text-sm">
                Criação de histórias em quadrinhos autorais e comerciais.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Ensino</h3>
              <p className="text-muted-foreground text-sm">
                Workshops e cursos de desenho e narrativa visual.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
