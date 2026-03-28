import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ChevronUp } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:brightness-110"
      style={{ backgroundColor: "#93c748" }}
      aria-label="Voltar ao topo"
    >
      <ChevronUp className="h-5 w-5 text-white" strokeWidth={2.5} />
    </button>
  );
}

export function Layout({ children, hideFooter }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
      <BackToTopButton />
    </div>
  );
}
