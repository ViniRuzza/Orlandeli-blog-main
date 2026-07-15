import { LegalPage, type LegalSection } from "@/components/LegalPage";

const secoes: LegalSection[] = [
  {
    titulo: "Aceitação dos termos",
    paragrafos: [
      "Ao acessar e utilizar este site, você declara ter lido, compreendido e concordado com estes Termos de Uso. Caso não concorde com qualquer disposição, pedimos que não utilize o site.",
    ],
  },
  {
    titulo: "Uso do site",
    paragrafos: [
      "Este site destina-se à divulgação do trabalho de Orlandeli, incluindo portfólio, blog, publicações e loja. Você concorda em utilizá-lo apenas para fins lícitos e de forma que não prejudique o funcionamento da plataforma nem os direitos de outros usuários.",
    ],
    itens: [
      "Não é permitido tentar acessar áreas restritas, sistemas ou dados sem autorização;",
      "Não é permitido introduzir vírus, códigos maliciosos ou realizar ações que comprometam a segurança do site;",
      "Não é permitido reproduzir, copiar ou explorar comercialmente o conteúdo sem autorização prévia.",
    ],
  },
  {
    titulo: "Propriedade intelectual",
    paragrafos: [
      "Todo o conteúdo publicado neste site - incluindo quadrinhos, ilustrações, textos, personagens, logotipos, marcas e elementos visuais - é de titularidade de Orlandeli ou de seus respectivos licenciantes, sendo protegido pelas leis de direitos autorais e propriedade intelectual.",
      "É proibida a reprodução, distribuição, modificação ou uso comercial de qualquer material sem autorização expressa e por escrito do autor. O uso pessoal e não comercial, com a devida atribuição, é permitido salvo indicação em contrário.",
    ],
  },
  {
    titulo: "Conteúdo enviado por usuários",
    paragrafos: [
      "Caso o site permita o envio de comentários ou mensagens, você é o único responsável pelo conteúdo que publicar. Ao enviá-lo, você garante que possui os direitos necessários e concede autorização para sua exibição no site. Reservamo-nos o direito de moderar ou remover conteúdos ofensivos, ilegais ou que violem estes Termos.",
    ],
  },
  {
    titulo: "Loja e links externos",
    paragrafos: [
      "A loja e eventuais compras podem ser operadas por plataformas de terceiros, sujeitas a seus próprios termos e políticas. Este site pode conter links para sites externos, sobre os quais não temos controle e pelos quais não nos responsabilizamos. Recomendamos a leitura dos termos e políticas de cada serviço acessado.",
    ],
  },
  {
    titulo: "Limitação de responsabilidade",
    paragrafos: [
      "O site é disponibilizado \"no estado em que se encontra\". Embora nos esforcemos para manter as informações corretas e o serviço disponível, não garantimos que o site estará livre de erros ou interrupções. Na medida permitida pela lei, não nos responsabilizamos por danos decorrentes do uso ou da impossibilidade de uso do site.",
    ],
  },
  {
    titulo: "Alterações nos termos",
    paragrafos: [
      "Estes Termos podem ser atualizados a qualquer momento. As alterações passam a valer a partir da sua publicação nesta página, com a respectiva atualização da data de \"Última atualização\". O uso continuado do site após as mudanças representa a sua concordância com os novos termos.",
    ],
  },
  {
    titulo: "Legislação aplicável",
    paragrafos: [
      "Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de São Paulo/SP para dirimir quaisquer controvérsias decorrentes deste documento, com renúncia a qualquer outro, por mais privilegiado que seja.",
    ],
  },
];

export default function Termos() {
  return (
    <LegalPage
      titulo="Termos de Uso"
      atualizadoEm="14 de julho de 2026"
      intro="Estes Termos de Uso estabelecem as regras para a utilização deste site. Leia com atenção antes de continuar navegando."
      secoes={secoes}
      contatoEmail="orlandeli50@icloud.com"
    />
  );
}
