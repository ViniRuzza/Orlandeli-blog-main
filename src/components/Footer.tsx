import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import iconeInsta from "@/assets/icone_insta.png";
import iconeFace from "@/assets/icone_face.png";
import iconeX from "@/assets/icone_x.png";
import iconeYoutube from "@/assets/icone_youtube.png";

const socialLinks = [
  { img: iconeInsta, href: "https://instagram.com/orlandeli", label: "Instagram" },
  { img: iconeFace, href: "https://facebook.com/orlandeli", label: "Facebook" },
  { img: iconeX, href: "https://twitter.com/orlandeli", label: "Twitter" },
  { img: iconeYoutube, href: "https://www.youtube.com/@orlandeli1", label: "YouTube" },
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
    <footer className="text-background" style={{ backgroundColor: "#3D2D38" }}>
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
                  <img src={social.img} alt={social.label} className="h-5 w-5 object-contain" />
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
                href="mailto:orlandeli50@icloud.com"
                className="flex items-center gap-2 text-background/80 hover:text-background text-sm transition-colors"
              >
                <Mail className="h-4 w-4" />
                orlandeli50@icloud.com.br
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
            <div className="text-xs text-background/30 flex flex-col items-start gap-1 mr-14">
              <span>Desenvolvido por</span>
              <a href="https://github.com/ViniRuzza" target="_blank" rel="noopener noreferrer" className="hover:text-background/60 transition-colors inline-flex items-center gap-1">
                <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                Vinicius Ruzza
              </a>
              <a href="https://github.com/Welinton-Rodrigues/" target="_blank" rel="noopener noreferrer" className="hover:text-background/60 transition-colors inline-flex items-center gap-1">
                <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                Welinton Rodrigues
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    
  );
}
