import { motion } from "framer-motion";
import { Headphones, Play, Download } from "lucide-react";
import { Layout } from "@/components/Layout";

import bannerSmith from "@/assets/banner_smith_2.jpeg";
import boiaSmith from "@/assets/boia_smith_2.png";
import capaSmith from "@/assets/capa_smith.png";
import proacSmith from "@/assets/proac_smith.png";

const VERDE = "#93c748";

/**
 * Ficha técnica da áudio-descrição.
 * Substitua `descricao` pelos créditos reais de cada profissional.
 */
const fichaTecnica = [
  {
    nome: "ORLANDELI",
    funcao: "Roteiro e desenhos",
    descricao: "",
  },
  {
    nome: "MILENA BERTONI",
    funcao: "Versão em audiodescrição",
    descricao:
      "Especialista em Educação Especial, Professora de Arte, Pedagoga, Arteterapeuta e Audiodescritora.",
  },
];

export default function Smith() {
  return (
    <Layout>
      {/* Banner topo */}
      <section className="w-full overflow-hidden">
        <motion.img
          src={bannerSmith}
          alt="Mais uma história para o velho Smith — Orlandeli"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-auto block"
        />
      </section>

      <div className="mx-auto px-4 md:px-8 py-12" style={{ maxWidth: "820px" }}>
        {/* Ilustração da boia */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <img
            src={boiaSmith}
            alt="Ilustração: um pássaro pousado sobre uma boia que flutua no mar"
            className="w-56 md:w-72 h-auto dark:invert"
          />
        </motion.div>

        {/* Texto de apresentação */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-muted-foreground text-base space-y-5 mt-8"
          style={{ lineHeight: 1.8 }}
        >
          <p>
            <strong className="text-foreground italic">
              Mais uma história para o velho Smith
            </strong>{" "}
            é um projeto que faz uma reflexão sobre um assunto muito delicado. É
            uma história sobre identidade, memórias e o destino das nossas
            lembranças, depois que elas vão embora.
          </p>
          <p>
            O projeto foi um dos contemplados pelo edital ProacSP, que ajudou a
            levantar recursos e criou as condições necessárias para o autor
            produzir esse material.
          </p>
          <p>
            Uma das contrapartidas do edital é idealizar uma ação inclusiva, que
            tenha como ponto fundamental a acessibilidade. Pensando nisso
            resolvemos produzir uma versão em áudio descrição, tornando o
            material acessível aos deficientes visuais.
          </p>
          <p>
            Uma áudio descrição feita especialmente para esse público é
            diferente de um áudio book convencional, ainda mais se tratando de
            uma história em quadrinhos, onde a imagem tem papel fundamental na
            narrativa.
          </p>
          <p>
            Para produzir esse material foi fundamental encontrar uma
            profissional experiente, que atua e conhece as reais demandas de
            pessoas com deficiência visual.
          </p>
          <p>
            Que essa versão da história do Smith consiga desenhar imagens e
            plantar lembranças dentro de cada um de vocês.
          </p>
        </motion.div>

        {/* Capa do livro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <img
            src={capaSmith}
            alt="Capa do livro Mais uma história para o velho Smith, de Orlandeli"
            className="w-full max-w-sm h-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Player de áudio (placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-border bg-card shadow-sm p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: VERDE }}
            >
              <Headphones className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground leading-tight">
                Ouvir a áudio-descrição
              </h2>
              <p className="text-sm text-muted-foreground">
                Mais uma história para o velho Smith
              </p>
            </div>
          </div>

          {/*
            PLACEHOLDER DO PLAYER.
            Quando o áudio estiver pronto, substitua o bloco abaixo por:

            <audio controls className="w-full" preload="none">
              <source src={audioSmith} type="audio/mpeg" />
              Seu navegador não suporta o player de áudio.
            </audio>

            e importe o arquivo no topo:
            import audioSmith from "@/assets/smith.mp3";
            (ou coloque em /public e use src="/smith.mp3")
          */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              disabled
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white text-sm opacity-60 cursor-not-allowed"
              style={{ backgroundColor: VERDE }}
            >
              <Play className="h-4 w-4" />
              Áudio em breve
            </button>
            <button
              disabled
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border border-border text-muted-foreground opacity-60 cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              Baixar áudio
            </button>
          </div>
        </motion.div>

        {/* Ficha técnica */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold italic text-foreground">
              ÁUDIO-DESCRIÇÃO
            </h2>
            <p className="text-sm font-semibold tracking-wide text-muted-foreground mt-1">
              FICHA TÉCNICA
            </p>
          </div>

          <div className="space-y-6">
            {fichaTecnica.map((item, idx) => (
              <div key={idx} className="flex items-stretch gap-5">
                <div
                  className="w-16 md:w-20 shrink-0 rounded-md"
                  style={{ backgroundColor: VERDE }}
                />
                <div className="py-1">
                  <h3 className="font-serif text-base font-bold italic text-foreground">
                    {item.nome}
                    {item.funcao && (
                      <span className="font-normal not-italic text-muted-foreground">
                        {" "}
                        — {item.funcao}
                      </span>
                    )}
                  </h3>
                  {item.descricao && (
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                      {item.descricao}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Logos do edital / patrocínio */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <img
            src={proacSmith}
            alt="ProAC SP · Cult SP · Governo do Estado de São Paulo — Secretaria da Cultura, Economia e Indústria Criativas"
            className="w-full max-w-md h-auto"
          />
        </motion.div>
      </div>
    </Layout>
  );
}
