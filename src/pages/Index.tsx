import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, BookOpen, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNoticiasHome } from "@/hooks/useNoticiasHome";
import type { NoticiaHome } from "@/lib/types";

import carouselYang from "@/assets/carrossel_2.jpg.jpeg";
import carouselCartoons from "@/assets/carousel-cartoons.jpg";
import artistPortrait from "@/assets/Orlandeli_FT.jpeg";
import placaYang1 from "@/assets/placas_yang_1.jpg.jpeg";
import sapinImg from "@/assets/sapin.jpeg";
import { useIlustracoes } from "@/hooks/useIlustracoes";
import { useDestaques } from "@/hooks/useDestaques";
import { useLivrosDestaque } from "@/hooks/useLivrosDestaque";
import type { LivroDestaque } from "@/lib/types";
import bookYang1 from "@/assets/Yang_OmundoDoMeio.webp";
import sulImg from "@/assets/sul.jpeg";
import darumaImg from "@/assets/darumaa.jpeg";
import aCoisaImg from "@/assets/acoisa.jpeg";
import iconeYang from "@/assets/iconehome_yang.png";
import iconeLoja from "@/assets/iconehome_loja.png";
import iconePortfolio from "@/assets/iconehome_portfolio.png";
import iconePublicacoes from "@/assets/iconehome_publicacoes.png";
import iconeBlog from "@/assets/iconehome_blog.png";
import iconeSobre from "@/assets/carica_orlandeli.png"

const HOME_NAV_ICONS: { label: string; image: string; link: string; imageSize?: string; imageFit?: string }[] = [
  { label: "Publicações", image: iconePublicacoes, link: "/quadrinhos" },
  { label: "Portfólio", image: iconePortfolio, link: "/portfolio" },
  { label: "Loja", image: iconeLoja, link: "/loja" },
  { label: "Blog", image: iconeBlog, link: "/blog" },
  { label: "Yang", image: iconeYang, link: "/yang" },
  { label: "Sobre", image: iconeSobre, link: "/sobre", imageSize: "w-4/5 h-4/5", imageFit: "object-cover" },
];

const carouselSlides = [
  {
    image: placaYang1,
    title: "O Traço de Orlandeli",
    subtitle: "Cartuns, ilustrações e histórias que encantam há mais de 20 anos",
    cta: { label: "Conheça a Arte", link: "/portfolio" },
  },
  {
    image: sapinImg,
    title: "O Mundo de Yang",
    subtitle: "Uma aventura épica no oriente fantástico",
    cta: { label: "Explorar Universo", link: "/yang" },
  },
  {
    image: sulImg,
    title: "Cartuns Editoriais",
    subtitle: "Humor e crítica social com traço marcante",
    cta: { label: "Ver Publicações", link: "/quadrinhos" },
  },
];



const featuredBooks = [
  {
    image: bookYang1,
    title: "O Mundo de Yang - O Caminho do Meio",
    link: "https://orlandeli.commercesuite.com.br/livros/o-mundo-de-yang-caminho-do-meio"
  },
  {
    image: aCoisaImg,
    title: "A Coisa",
    link: "https://orlandeli.commercesuite.com.br/livros/a-coisa"
  },
  {
    image: darumaImg,
    title: "Daruma",
    link: "https://orlandeli.commercesuite.com.br/livros/daruma-129"
  },
];

export default function Index() {
  const [slideCounter, setSlideCounter] = useState(0);
  const [noticiaAberta, setNoticiaAberta] = useState<NoticiaHome | null>(null);
  const { data: todasIlustracoes = [], isLoading: isLoadingIlustracoes } = useIlustracoes();
  const { data: noticiasHome = [] } = useNoticiasHome();
  const { data: destaquesData = [], isLoading: isLoadingDestaques } = useDestaques();
  const { data: livrosDestaqueData = [] } = useLivrosDestaque();
  const illustrations = todasIlustracoes.slice(0, 4);

  // Fallback to static slides ONLY if we finished loading and there's no data
  const activeSlides = isLoadingDestaques
    ? [{ image: "", title: "", subtitle: "", cta: { label: "Carregando...", link: "#" } }]
    : (destaquesData.length > 0 
      ? destaquesData.map(d => ({
          image: d.imagemUrl,
          title: d.titulo,
          subtitle: d.legenda,
          cta: { label: d.textoBotao || "Ver mais", link: d.link || "/" }
        }))
      : carouselSlides);

  const safeLength = activeSlides.length > 0 ? activeSlides.length : 1;
  const currentSlide = ((slideCounter % safeLength) + safeLength) % safeLength;

  useEffect(() => {
    if (activeSlides.length <= 1 && !isLoadingDestaques) return; // don't slide if only 1 item

    const timer = setInterval(() => {
      setSlideCounter((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length, isLoadingDestaques]);

  const goToSlide = (index: number) => {
    // Determine shortest path to clicked dot to keep counter moving forward if possible
    // But for simplicity, just setting the exact index difference:
    setSlideCounter(index);
  };
  const nextSlide = () => setSlideCounter((prev) => prev + 1);
  const prevSlide = () => setSlideCounter((prev) => prev - 1);

  return (
    <Layout>
      {/* Hero Carousel */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden bg-muted/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideCounter}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 overflow-hidden bg-background"
          >
            {/* Fundo Desfocado para preencher espaço vazio na tela de PC */}
            <div
              className={`absolute inset-0 bg-cover bg-center blur-3xl opacity-50 scale-110 ${isLoadingDestaques ? "animate-pulse bg-muted" : ""}`}
              style={{ backgroundImage: `url("${activeSlides[currentSlide]?.image}")` }}
            />
            {/* Imagem em destaque (bg-cover) */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-normal"
              style={{ backgroundImage: `url("${activeSlides[currentSlide]?.image}")` }}
            />
            {/* Gradiente suave sobre a imagem toda */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            key={`text-${slideCounter}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-background max-w-sm md:max-w-lg lg:max-w-xl"
          >
            <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3">
              {activeSlides[currentSlide]?.title}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-background/90 mb-4 md:mb-6">
              {activeSlides[currentSlide]?.subtitle}
            </p>
            {!isLoadingDestaques && (
              <Link to={activeSlides[currentSlide]?.cta.link || "/"}>
                <Button size="lg" className="btn-wood">
                  {activeSlides[currentSlide]?.cta.label}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <button
            onClick={prevSlide}
            disabled={activeSlides.length <= 1}
            className="p-2 rounded-full bg-background/20 hover:bg-background/40 backdrop-blur transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5 text-background" />
          </button>
          <div className="flex gap-2">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide
                  ? "bg-background w-8"
                  : "bg-background/40 hover:bg-background/60"
                  }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            disabled={activeSlides.length <= 1}
            className="p-2 rounded-full bg-background/20 hover:bg-background/40 backdrop-blur transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5 text-background" />
          </button>
        </div>
      </section>

      {/* Home Navigation Icons */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-8 justify-center items-end">
            {HOME_NAV_ICONS.map(({ label, image, link, imageSize, imageFit }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <Link
                  to={link}
                  className="flex flex-col items-center gap-2 group focus:outline-none"
                >
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-transparent transition-all duration-300 group-hover:border-[#93c748] group-hover:scale-105 group-hover:shadow-[0_0_12px_2px_hsl(var(--primary)/0.35)]">
                    <img
                      src={image}
                      alt={label}
                      className={`absolute inset-0 m-auto ${imageFit ?? "object-cover"} ${imageSize ?? "w-full h-full"}`}
                    />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-200">
                    {label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notícias */}
      {noticiasHome.length > 0 && (
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-1">
                Notícias
              </h2>
              <div className="w-14 h-1 mt-3" style={{ backgroundColor: "#93c748" }} />
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {noticiasHome.map((noticia, idx) => (
                <motion.div
                  key={noticia.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 group cursor-pointer"
                  onClick={() => setNoticiaAberta(noticia)}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                    {noticia.imagemCapaUrl ? (
                      <img
                        src={noticia.imagemCapaUrl}
                        alt={noticia.titulo}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #1a2a1a 0%, #2d4a1e 50%, #93c748 100%)" }}
                      >
                        <BookOpen className="h-16 w-16 text-white/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex flex-col items-center">
                    <h3 className="font-serif text-base font-bold text-foreground text-center leading-snug group-hover:text-primary transition-colors">
                      {noticia.titulo}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modal Notícia */}
      <Dialog open={!!noticiaAberta} onOpenChange={() => setNoticiaAberta(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {noticiaAberta && (
            <div className="flex flex-col md:flex-row h-[90vh] md:h-[560px] overflow-y-auto scrollbar-hidden">
              {/* Imagem */}
              {noticiaAberta.imagemCapaUrl ? (
                <div className="w-full md:w-96 md:shrink-0 bg-muted">
                  <img
                    src={noticiaAberta.imagemCapaUrl}
                    alt={noticiaAberta.titulo}
                    className="w-full h-auto md:h-full md:object-cover"
                  />
                </div>
              ) : (
                <div className="w-full md:w-96 md:shrink-0 bg-muted flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-muted-foreground/40" />
                </div>
              )}
              {/* Conteúdo */}
              <div className="flex flex-col gap-3 p-6 min-w-0">
                <h2 className="font-serif text-3xl font-bold text-foreground leading-tight">
                  {noticiaAberta.titulo}
                </h2>
                <div className="w-20 h-1 shrink-0" style={{ backgroundColor: "#93c748" }} />
                {noticiaAberta.data && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(noticiaAberta.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</span>
                  </div>
                )}
                {noticiaAberta.descricao && (
                  <p className="text-muted-foreground leading-relaxed text-sm break-words">{noticiaAberta.descricao}</p>
                )}
                {noticiaAberta.linkSaibaMais && (
                  <a href={noticiaAberta.linkSaibaMais} target="_blank" rel="noopener noreferrer">
                    <button
                      className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90 mt-2"
                      style={{ backgroundColor: "#93c748" }}
                    >
                      Saiba mais
                    </button>
                  </a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Illustrations Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Galeria de Ilustrações
            </h2>
            <div className="section-divider bg-[#93c748]" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {isLoadingIlustracoes ? (
              <div className="col-span-2 md:col-span-4 text-center py-10 text-muted-foreground">
                Carregando ilustrações...
              </div>
            ) : illustrations.length === 0 ? (
              <div className="col-span-2 md:col-span-4 text-center py-10 text-muted-foreground">
                Nenhuma ilustração adicionada ainda.
              </div>
            ) : (
              illustrations.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link to={`/portfolio?id=${item.id}`} className="card-artistic group overflow-hidden block cursor-pointer">
                    {item.imagemUrl && (
                      <div className="aspect-square overflow-hidden bg-muted/20 dark:bg-muted/10 flex items-center justify-center p-2">
                        <img
                          src={item.imagemUrl}
                          alt={item.titulo}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-medium text-foreground">{item.titulo}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>

          <div className="text-center mt-10">
            <Link to="/portfolio">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Ver Portfólio Completo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="image-frame w-full mx-auto md:mx-0"
            >
              <img
                src={artistPortrait}
                alt="Orlandeli"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-serif text-3x1 md:text-4xl font-bold text-foreground">
                Sobre o Artista
              </h2>
              <div className="section-divider !mx-0 bg-[#93c748]" />
              <p className="text-muted-foreground leading-1">
                Walmir Americo Orlandeli é quadrinista e ilustrador. Formado em Comunicação Social pela faculdade Unilago.
                Sócio proprietário da empresa W.A. Orlandeli - ME, onde realiza projetos de ilustração e design gráfico além de administrar o selo editorial Gambatte.
              </p>
              <p className="text-muted-foreground leading-1">
                Já publicou em várias revistas e jornais, entre eles: Jornal Folha de São Paulo, revista Época, Revista Superinteressante etc.
              </p>
              <div>
                <p className="text-muted-foreground leading-1 mb-2">
                  Vencedor de vários prêmios nacionais e internacionais, destacando:
                </p>
                <ul className="text-muted-foreground space-y-1 pl-4 list-disc">
                  <li>Prêmio Jabuti (2025)</li>
                  <li>Salão internacional de Humor de Piracicaba</li>
                  <li>HQMix (2002, 2018 e 2024)</li>
                </ul>
              </div>
              <Link to="/sobre">
                <Button className="bg-primary hover:bg-primary/90 mt-4">
                  Conhecer Trajetória
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Livros em Destaque
            </h2>
            <div className="section-divider bg-[#93c748]" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {(livrosDestaqueData.length > 0 ? livrosDestaqueData : featuredBooks).map((book: LivroDestaque | typeof featuredBooks[0], idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="card-artistic group"
              >
                <div className="aspect-[2/3] overflow-hidden rounded-t-lg bg-muted/20 dark:bg-muted/10 flex items-center justify-center p-2">
                  <img
                    src={"imagemUrl" in book ? book.imagemUrl : book.image}
                    alt={"titulo" in book ? book.titulo : book.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-serif font-semibold text-foreground mb-2">
                    {"titulo" in book ? book.titulo : book.title}
                  </h3>
                  <a href={book.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full border-wood text-wood-dark hover:bg-wood hover:text-background">
                      Ver na Loja
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/loja">
              <Button size="lg" className="btn-wood">
                Visitar Loja
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Yang CTA */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${carouselYang})` }}
        />
        <div className="absolute inset-0 bg-accent/85" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-accent-foreground mb-6">
              Explore O Mundo de Yang
            </h2>
            <p className="text-accent-foreground/90 text-lg mb-8">
              Mergulhe no universo oriental fantástico criado por Orlandeli.
              Conheça os personagens, a história e os livros desta saga épica.
            </p>
            <Link to="/yang">
              <Button size="lg" variant="secondary" className="font-semibold">
                Descobrir o Universo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
