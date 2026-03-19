import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Twitter, Mail, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/orlandeli", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/orlandeli", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com/orlandeli", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com/orlandeli", label: "Twitter" },
];

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Publicações", path: "/quadrinhos" },
  { label: "Portfólio", path: "/portfolio" },
  { label: "Loja", path: "/loja" },
  { label: "Blog", path: "/blog" },
  { label: "Sobre", path: "/sobre" },
];

export function Footer() {
  return (
    <footer className="bg-wood-dark text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">Orlandeli</h3>
            <p className="text-background/80 text-sm leading-relaxed">
              Cartunista e ilustrador brasileiro, criador de universos visuais únicos 
              que mesclam humor, crítica social e narrativas envolventes.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
              
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Navegação</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/80 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/yang"
                  className="text-sage-light hover:text-background text-sm font-medium transition-colors"
                >
                  O Mundo de Yang
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Contato</h4>
            <div className="space-y-3">
              <a
                href="mailto:contato@orlandeli.com.br"
                className="flex items-center gap-2 text-background/80 hover:text-background text-sm transition-colors"
              >
                <Mail className="h-4 w-4" />
                contato@orlandeli.com.br
              </a>
              <div className="flex items-start gap-2 text-background/80 text-sm">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} Orlandeli. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 text-sm text-background/60">
              <Link to="/privacidade" className="hover:text-background transition-colors">
                Privacidade
              </Link>
              <Link to="/termos" className="hover:text-background transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>

    
  );
}
