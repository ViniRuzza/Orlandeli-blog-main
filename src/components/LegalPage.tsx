import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";

const VERDE = "#93c748";

export interface LegalSection {
  titulo: string;
  paragrafos?: string[];
  itens?: string[];
}

interface LegalPageProps {
  titulo: string;
  atualizadoEm: string;
  intro?: string;
  secoes: LegalSection[];
  contatoEmail?: string;
}

/**
 * Layout reutilizável para páginas de texto legal (Privacidade, Termos de Uso).
 * Mantém a identidade visual do site (tipografia serifada + detalhe verde).
 */
export function LegalPage({
  titulo,
  atualizadoEm,
  intro,
  secoes,
  contatoEmail,
}: LegalPageProps) {
  return (
    <Layout>
      <div className="mx-auto px-4 md:px-8 py-16" style={{ maxWidth: "800px" }}>
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            {titulo}
          </h1>
          <div className="w-16 h-1 mt-4" style={{ backgroundColor: VERDE }} />
          <p className="text-sm text-muted-foreground mt-4">
            Última atualização: {atualizadoEm}
          </p>
          {intro && (
            <p className="text-muted-foreground leading-relaxed mt-6">{intro}</p>
          )}
        </motion.header>

        <div className="mt-10 space-y-10">
          {secoes.map((secao, idx) => (
            <motion.section
              key={secao.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                <span className="text-muted-foreground/60 mr-2">{idx + 1}.</span>
                {secao.titulo}
              </h2>
              {secao.paragrafos?.map((p, i) => (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed mt-3"
                >
                  {p}
                </p>
              ))}
              {secao.itens && (
                <ul className="mt-3 space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
                  {secao.itens.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}

          {contatoEmail && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                <span className="text-muted-foreground/60 mr-2">
                  {secoes.length + 1}.
                </span>
                Contato
              </h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Em caso de dúvidas sobre este documento, entre em contato pelo
                e-mail{" "}
                <a
                  href={`mailto:${contatoEmail}`}
                  className="underline hover:text-foreground transition-colors"
                  style={{ color: VERDE }}
                >
                  {contatoEmail}
                </a>
                .
              </p>
            </motion.section>
          )}
        </div>
      </div>
    </Layout>
  );
}
