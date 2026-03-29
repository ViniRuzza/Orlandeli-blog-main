import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { BookOpen, Palette, Award, AlertCircle } from "lucide-react";

import artistPortrait from "@/assets/Orlandeli_FT.jpeg";
import caricaOrlandeli from "@/assets/carica_orlandeli.png";
import cabecalhoVerdeSobre from "@/assets/cabecalho_verde_sobre.png";
import assOrlandeli from "@/assets/ASSORLANDELI.png";
import { useTrajetoria } from "@/hooks/useTrajetoria";
import { usePremios } from "@/hooks/usePremios";
import type { TrajetoriaItem } from "@/lib/types";

export default function Sobre() {
  const { data: trajetoria, isLoading: isLoadingTrajetoria, isError: isErrorTrajetoria } = useTrajetoria();
  const { data: premios = [], isLoading: isLoadingPremios } = usePremios();

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
            <img
              src={assOrlandeli}
              alt="Sobre Orlandeli"
              className="h-12 md:h-16 w-auto mx-auto mb-2"
            />
            <nav className="flex flex-wrap justify-center items-center gap-2 mt-4">
              {[
                { label: "O Artista", href: "#artista" },
                { label: "Traços", href: "#tracos" },
                { label: "Trajetória", href: "#trajetoria" },
                { label: "Prêmios", href: "#premios" },
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
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section id="artista" className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-serif text-3xl font-bold text-foreground">
                O Artista
              </h2>
              <div className="w-16 h-1" style={{ backgroundColor: "#93c748" }} />
              <p className="text-muted-foreground leading-relaxed">
                Walmir Americo Orlandeli é quadrinista e ilustrador. Formado em Comunicação Social pela faculdade Unilago.
                Sócio proprietário da empresa W.A. Orlandeli - ME, onde realiza projetos de ilustração e design gráfico além de administrar o selo editorial Gambatte.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="image-frame aspect-[4/3] max-w-xl w-full">
                <img
                  src={artistPortrait}
                  alt="Orlandeli"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-muted-foreground leading-relaxed">
                Já publicou em várias revistas e jornais, entre eles: Jornal Folha de São Paulo, revista Época, Revista Superinteressante etc.
              </p>
              <p className="text-muted-foreground leading-relaxed font-medium">Publicou os seguintes álbuns em quadrinhos:</p>
              <ul className="columns-2 text-muted-foreground text-sm space-y-1 list-disc pl-4">
                <li>Eu matei o Libório</li>
                <li>Grump - Um dia eu chego lá</li>
                <li>SIC</li>
                <li>Daruma</li>
                <li>O mundo de Yang</li>
                <li>O mundo de Yang - Rumo ao Sul</li>
                <li>O mundo de Yang - Dois cortes</li>
                <li>O mundo de Yang - Caminho do meio</li>
                <li>O Sinal</li>
                <li>Os olhos de Barthô</li>
                <li>Chico Bento - Arvorada</li>
                <li>Chico Bento - Verdade</li>
                <li>Chico Bento - Viola</li>
                <li>A Coisa</li>
                <li>Depois que eu matei o Libório</li>
                <li>Lusco Fusco - O mundo acabou</li>
                <li>Lusco Fusco - Marvin escreve poemas</li>
                <li>Lusco Fusco - Este lugar não está no mapa</li>
                <li>Lusco Fusco - Coloquei minha tristeza em uma garrafa</li>
                <li>Mais uma história para o velho Smith</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Traços */}
      <section id="tracos" className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Traços
            </h2>
            <div className="w-16 h-1 mt-3 mx-auto" style={{ backgroundColor: "#93c748" }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src={caricaOrlandeli}
              alt="Caricatura de Orlandeli"
              className="w-[480px] md:w-[700px] h-auto"
            />
          </motion.div>
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
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              A Trajetória
            </h2>
            <div className="w-16 h-1 mt-3 mx-auto" style={{ backgroundColor: "#93c748" }} />
          </motion.div>

          <div className="max-w-5xl mx-auto relative">
            {/* Linha contínua vertical */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ backgroundColor: "#93c74840" }} />

            {isLoadingTrajetoria && (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              </div>
            )}

            {isErrorTrajetoria && (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <AlertCircle className="h-10 w-10 text-destructive" />
                <p className="font-medium text-foreground">Não foi possível carregar a trajetória.</p>
                <p className="text-sm text-muted-foreground">Verifique se o Strapi está em execução e tente novamente.</p>
              </div>
            )}

            {!isLoadingTrajetoria && !isErrorTrajetoria && (trajetoria ?? []).map((item: TrajetoriaItem, idx: number) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center py-8"
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

                  {/* Ponto central */}
                  <div className="hidden md:flex md:order-2 flex-col items-center justify-center relative z-10">
                    <div className="w-4 h-4 rounded-full ring-4 ring-background" style={{ backgroundColor: "#93c748" }} />
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
            {!isLoadingTrajetoria && !isErrorTrajetoria && (!trajetoria || trajetoria.length === 0) && (
              <p className="text-center text-muted-foreground py-12">
                Nenhum item de trajetória cadastrado ainda. Adicione no painel do Strapi!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Awards */}
      {(!isLoadingPremios && premios.length > 0) && <section id="premios" className="py-20 bg-background">
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
            {premios.map((premio, idx) => (
              <motion.div
                key={premio.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-artistic overflow-hidden text-center"
              >
                {premio.imagemUrl ? (
                  <img
                    src={premio.imagemUrl}
                    alt={premio.nome}
                    className="w-full h-auto block"
                  />
                ) : (
                  <div className="w-full h-48 bg-muted flex items-center justify-center">
                    <Award className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground">{premio.nome}</h3>
                  <p className="text-primary font-bold mt-1">{premio.ano}</p>
                  {premio.categoria && (
                    <p className="text-sm text-muted-foreground mt-2">{premio.categoria}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>}

      {/* Skills */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
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
          </div>
        </div>
      </section>
    </Layout>
  );
}
