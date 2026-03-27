import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quadrinhos from "./pages/Quadrinhos";
import Portfolio from "./pages/Portfolio";
import Loja from "./pages/Loja";
import Blog from "./pages/Blog";
import Sobre from "./pages/Sobre";
import Yang from "./pages/Yang";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quadrinhos" element={<Quadrinhos />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/yang" element={<Yang />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
