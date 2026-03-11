import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";

import heroStudio from "@/assets/hero-studio.jpg";
import carouselYang from "@/assets/carousel-yang.jpg";
import carouselCartoons from "@/assets/carousel-cartoons.jpg";
import artistPortrait from "@/assets/image.png";
import illustration1 from "@/assets/illustration-1.jpg";
import illustration2 from "@/assets/illustration-2.jpg";
import illustration3 from "@/assets/illustration-3.jpg";
import illustration4 from "@/assets/illustration-4.jpg";
import bookYang1 from "@/assets/book-yang-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";

const carouselSlides = [
  {
    image: artistPortrait,
    title: "O Traço de Orlandeli",
    subtitle: "Cartuns, ilustrações e histórias que encantam há mais de 20 anos",
    cta: { label: "Conheça a Arte", link: "/portfolio" },
  },
  {
    image: carouselYang,
    title: "O Mundo de Yang",
    subtitle: "Uma aventura épica no oriente fantástico",
    cta: { label: "Explorar Universo", link: "/yang" },
  },
  {
    image: carouselCartoons,
    title: "Cartuns Editoriais",
    subtitle: "Humor e crítica social com traço marcante",
    cta: { label: "Ver Quadrinhos", link: "/quadrinhos" },
  },
];

const illustrations = [
  { image: illustration1, title: "Personagem Fantástico" },
  { image: illustration2, title: "Cidade em Quadrinhos" },
  { image: illustration3, title: "Floresta Encantada" },
  { image: illustration4, title: "Humor Cotidiano" },
];

const featuredBooks = [
  {
    image: bookYang1,
    title: "O Mundo de Yang - Vol. 1",
    price: "R$ 49,90",
    link: "/loja"
  },
  {
    image: book2,
    title: "Crônicas Urbanas",
    price: "R$ 39,90",
    link: "/loja"
  },
  {
    image: book3,
    title: "Bichos da Floresta",
    price: "R$ 35,90",
    link: "/loja"
  },
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

  return (
    <Layout>
      {/* Hero Carousel */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${carouselSlides[currentSlide].image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            key={`text-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl text-background"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {carouselSlides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-background/90 mb-8">
              {carouselSlides[currentSlide].subtitle}
            </p>
            <Link to={carouselSlides[currentSlide].cta.link}>
              <Button size="lg" className="btn-wood">
                {carouselSlides[currentSlide].cta.label}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-background/20 hover:bg-background/40 backdrop-blur transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-background" />
          </button>
          <div className="flex gap-2">
            {carouselSlides.map((_, idx) => (
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
            className="p-2 rounded-full bg-background/20 hover:bg-background/40 backdrop-blur transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-background" />
          </button>
        </div>
      </section>

      {/* Illustrations Grid */}
      <section className="py-20 bg-muted">
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
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {illustrations.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-artistic group cursor-pointer overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                </div>
              </motion.div>
            ))}
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
              className="image-frame aspect-square max-w-md mx-auto md:mx-0"
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
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Sobre o Artista
              </h2>
              <div className="section-divider !mx-0" />
              <p className="text-muted-foreground leading-relaxed">
                Walmir Americo Orlandeli mora no Brasil e é um artista de quadrinhos, cartunista e ilustrador.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                É autor de diversas publicações. Como artista de quadrinhos, participou das antologias MSP 50 e Front.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Vencedor do Troféu HQMix em 2002 como "melhor revista de humor" (Grump), 2018 como "melhor publicação juvenil" (Chico Bento - Arvorada) e em 2024 como melhor design gráfico (Lusco-Fusco). Vencedor do CCXP Awards em 2022 (Chico Bento - Verdade).
              </p>
              <Link to="/sobre">
                <Button className="bg-primary hover:bg-primary/90">
                  Conhecer Trajetória
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20 bg-secondary">
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
            <div className="section-divider" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {featuredBooks.map((book, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="card-artistic group"
              >
                <div className="aspect-[2/3] overflow-hidden rounded-t-lg">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-serif font-semibold text-foreground mb-2">{book.title}</h3>
                  <p className="text-primary font-bold text-lg mb-3">{book.price}</p>
                  <Link to={book.link}>
                    <Button variant="outline" size="sm" className="w-full border-wood text-wood-dark hover:bg-wood hover:text-background">
                      Ver na Loja
                    </Button>
                  </Link>
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
