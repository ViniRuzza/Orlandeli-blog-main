import { LegalPage, type LegalSection } from "@/components/LegalPage";

const secoes: LegalSection[] = [
  {
    titulo: "Quem somos",
    paragrafos: [
      "Este site é mantido por Walmir Américo Orlandeli (W.A. Orlandeli - ME), quadrinista e ilustrador, e reúne o portfólio, o blog, as publicações e a loja do artista. Levamos a sério a privacidade de quem nos visita e esta Política explica como tratamos os seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).",
    ],
  },
  {
    titulo: "Dados que coletamos",
    paragrafos: [
      "Coletamos apenas os dados necessários para o funcionamento do site e para nos comunicarmos com você:",
    ],
    itens: [
      "Dados de navegação: endereço IP, tipo de dispositivo, navegador, páginas visitadas e tempo de permanência, coletados automaticamente para fins estatísticos e de segurança.",
      "Dados de contato: nome e e-mail, quando você nos envia uma mensagem ou se inscreve para receber novidades.",
      "Dados de interação: comentários ou mensagens que você opte por publicar ou enviar.",
    ],
  },
  {
    titulo: "Como usamos os seus dados",
    paragrafos: ["Utilizamos os dados coletados para as seguintes finalidades:"],
    itens: [
      "Operar, manter e melhorar o site e sua experiência de navegação;",
      "Responder às suas mensagens e solicitações;",
      "Enviar novidades e conteúdos, quando você autorizar;",
      "Cumprir obrigações legais e garantir a segurança da plataforma.",
    ],
  },
  {
    titulo: "Cookies",
    paragrafos: [
      "Utilizamos cookies e tecnologias semelhantes para lembrar preferências (como o tema claro ou escuro), medir audiência e melhorar o funcionamento do site. Você pode gerenciar ou desativar os cookies nas configurações do seu navegador, ciente de que algumas funcionalidades podem ser afetadas.",
    ],
  },
  {
    titulo: "Compartilhamento com terceiros",
    paragrafos: [
      "Não vendemos os seus dados pessoais. O compartilhamento ocorre apenas com prestadores de serviço essenciais ao funcionamento do site (como hospedagem e ferramentas de análise) ou quando exigido por lei ou autoridade competente. Esses parceiros estão obrigados a tratar os dados de acordo com a legislação aplicável.",
    ],
  },
  {
    titulo: "Seus direitos como titular",
    paragrafos: [
      "Nos termos da LGPD, você pode, a qualquer momento, solicitar:",
    ],
    itens: [
      "Confirmação da existência de tratamento e acesso aos seus dados;",
      "Correção de dados incompletos, inexatos ou desatualizados;",
      "Anonimização, bloqueio ou eliminação de dados desnecessários;",
      "Portabilidade e informação sobre com quem compartilhamos seus dados;",
      "Revogação do consentimento e exclusão dos dados tratados com base nele.",
    ],
  },
  {
    titulo: "Segurança e retenção",
    paragrafos: [
      "Adotamos medidas técnicas e organizacionais razoáveis para proteger os seus dados contra acesso não autorizado, perda ou uso indevido. Mantemos os dados apenas pelo tempo necessário às finalidades descritas nesta Política ou para cumprir obrigações legais.",
    ],
  },
  {
    titulo: "Alterações nesta Política",
    paragrafos: [
      "Esta Política pode ser atualizada periodicamente. Sempre que houver mudanças relevantes, atualizaremos a data de \"Última atualização\" no topo desta página. Recomendamos que você a revise de tempos em tempos.",
    ],
  },
];

export default function Privacidade() {
  return (
    <LegalPage
      titulo="Política de Privacidade"
      atualizadoEm="14 de julho de 2026"
      intro="Esta Política de Privacidade descreve como coletamos, usamos e protegemos as suas informações ao navegar por este site."
      secoes={secoes}
      contatoEmail="orlandeli50@icloud.com"
    />
  );
}
