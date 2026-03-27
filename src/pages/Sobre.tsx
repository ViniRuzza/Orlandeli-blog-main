import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Award, BookOpen, Palette } from "lucide-react";

import artistPortrait from "@/assets/image.png";
import cabecalhoVerdeSobre from "@/assets/cabecalho_verde_sobre.png";
import { useTrajetoria } from "@/hooks/useTrajetoria";
import type { TrajetoriaItem } from "@/lib/types";


const awards = [
  { name: "CCXP Awards", year: "2022", category: "Chico Bento - Verdade" },
  { name: "Troféu HQ Mix", year: "2024", category: "Lusco Fusco - Marvin escreve poemas" },
  { name: "Prêmio Jabuti", year: "2025", category: "Mais uma história para o velho Smih" },
];

export default function Sobre() {
  const { data: trajetoria } = useTrajetoria();

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
            src={cabecalhoVerdeSobre}
            alt="Sobre Orlandeli"
            className="w-full h-auto block"
          />
        </motion.div>
        <div className="container mx-auto px-4 text-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2" style={{ color: "#93c748" }}>
              Sobre Orlandeli
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mais de duas décadas transformando ideias em traços que emocionam e divertem
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-12 bg-background">
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
                Vencedor do Troféu HQMix em 2002 como "melhor revista de humor" (Grump), 2018 como "melhor publicação juvenil" (Chico Bento - Arvorada) e em 2024 como melhor design gráfico (Lusco Fusco). Vencedor do CCXP Awards em 2022 (Chico Bento - Verdade) e conquistou o Prêmio Jabuti em 2025 (Mais uma história para o velho Smih).
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
      <section className="py-24 bg-background relative overflow-hidden" id="trajetoria">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              A Trajetória
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-16">
            {(trajetoria ?? []).map((item: TrajetoriaItem, idx: number) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center"
                >
                  {/* Texto */}
                  <div className={`space-y-3 ${isEven ? 'md:order-1' : 'md:order-3'}`}>
                    <span className="inline-block text-sm font-bold px-3 py-1 rounded-full" style={{ backgroundColor: "#93c74822", color: "#93c748" }}>
                      {item.ano}
                    </span>
                    <h3 className="font-serif text-2xl font-semibold text-foreground">
                      {item.titulo}
                    </h3>
                    <div className="w-10 h-1" style={{ backgroundColor: "#93c748" }} />
                    <p className="text-muted-foreground leading-relaxed">
                      {item.descricao}
                    </p>
                  </div>

                  {/* Divisor vertical */}
                  <div className="hidden md:flex md:order-2 flex-col items-center self-stretch py-2">
                    <div className="w-px flex-1" style={{ backgroundColor: "#93c74840" }} />
                    <div className="w-3 h-3 rounded-full my-2" style={{ backgroundColor: "#93c748" }} />
                    <div className="w-px flex-1" style={{ backgroundColor: "#93c74840" }} />
                  </div>

                  {/* Imagem */}
                  <div className={`overflow-hidden rounded-xl aspect-video bg-muted flex items-center justify-center ${isEven ? 'md:order-3' : 'md:order-1'}`}>
                    {item.imagemUrl ? (
                      <img
                        src={item.imagemUrl}
                        alt={item.titulo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                    )}
                  </div>
                </motion.div>
              );
            })}
            {(!trajetoria || trajetoria.length === 0) && (
              <p className="text-center text-muted-foreground py-12">
                Nenhum item de trajetória cadastrado ainda. Adicione no painel do Strapi!
              </p>
            )}
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
      <section className="py-20 bg-background">
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
