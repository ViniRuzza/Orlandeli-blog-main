import { Layout } from "@/components/Layout";
import { useEffect } from "react";

export default function Loja() {
  useEffect(() => {
    // Esconde a barra de rolagem principal do projeto (body) ao entrar na página
    document.body.style.overflow = "hidden";
    
    // Cleanup: Restaura a rolagem normal ao sair da página da loja
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    //hidefooter remove o rodapé
    <Layout hideFooter>
      <div className="overflow-hidden w-full" style={{height: "calc(100vh - 64px)"}}>
      <iframe
        src="https://orlandeli.commercesuite.com.br"
        title="Loja Orlandeli"
        className="w-full border-0"
        style={{ height: "calc(100vh - 64px)" }}
      />
      </div>
    </Layout>
  );
}
