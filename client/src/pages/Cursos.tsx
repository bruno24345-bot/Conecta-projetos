import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, Play, Search, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockCourses = [
  { id: 1, title: "Fundamentos de Arquitetura Residencial", instructor: "Arq. Marina Costa", price: "297.00", duration: "12h 30min", lessons: 24, students: 1240, rating: 4.9, category: "Arquitetura", level: "Iniciante" },
  { id: 2, title: "AutoCAD Avançado para Engenheiros", instructor: "Eng. Carlos Mendes", price: "197.00", duration: "8h 45min", lessons: 18, students: 890, rating: 4.7, category: "Software", level: "Avançado" },
  { id: 3, title: "Gestão de Obras e Cronograma", instructor: "Eng. Rafael Souza", price: "247.00", duration: "15h 20min", lessons: 30, students: 620, rating: 4.8, category: "Gestão", level: "Intermediário" },
  { id: 4, title: "Design de Interiores Contemporâneo", instructor: "Des. Ana Lima", price: "347.00", duration: "20h 10min", lessons: 40, students: 2100, rating: 5.0, category: "Design", level: "Intermediário" },
  { id: 5, title: "Projetos Sustentáveis e Eficiência Energética", instructor: "Arq. Fernanda Dias", price: "197.00", duration: "10h 00min", lessons: 20, students: 450, rating: 4.6, category: "Sustentabilidade", level: "Iniciante" },
  { id: 6, title: "Orçamento e Precificação de Projetos", instructor: "Eng. Paulo Ferreira", price: "147.00", duration: "6h 30min", lessons: 14, students: 380, rating: 4.5, category: "Gestão", level: "Iniciante" },
];

const categories = ["Todos", "Arquitetura", "Engenharia", "Software", "Gestão", "Design", "Sustentabilidade"];

export default function Cursos() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  const filtered = mockCourses.filter((c) => {
    if (query && !c.title.toLowerCase().includes(query.toLowerCase())) return false;
    if (category !== "Todos" && c.category !== category) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="brand-gradient py-12">
          <div className="container">
            <h1 className="text-3xl font-black text-white mb-2">Cursos de Arquitetura e Engenharia</h1>
            <p className="text-white/70">Aprenda com os melhores profissionais do mercado</p>
          </div>
        </div>
        <div className="container py-8">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar cursos..." className="pl-9" />
            </div>
          </div>
          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === cat ? "brand-gradient text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video brand-gradient flex items-center justify-center">
                  <BookOpen size={36} className="text-white/60" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-[10px]">{course.category}</Badge>
                    <Badge variant="outline" className="text-[10px]">{course.level}</Badge>
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{course.instructor}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                    <span className="flex items-center gap-1"><Play size={11} /> {course.lessons} aulas</span>
                    <span className="flex items-center gap-1"><Users size={11} /> {course.students.toLocaleString("pt-BR")}</span>
                  </div>
                  <StarRating rating={course.rating} size="sm" showValue />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-black text-foreground">
                      {parseFloat(course.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                    <Button size="sm" className="brand-gradient text-white border-0 text-xs" onClick={() => toast.info("Redirecionando para o checkout do curso...")}>
                      Matricular
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
