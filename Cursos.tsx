import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, Play, Search, Users, GraduationCap, Award, Zap, LayoutGrid, Star, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mockCourses = [
  { id: 1, title: "Fundamentos de Arquitetura Residencial — ABNT 15575", instructor: "Arq. Marina Costa", price: "297.00", duration: "12h 30min", lessons: 24, students: 1240, rating: 4.9, category: "Arquitetura", level: "Iniciante" },
  { id: 2, title: "AutoCAD Avançado para Engenheiros Estruturais", instructor: "Eng. Carlos Mendes", price: "197.00", duration: "8h 45min", lessons: 18, students: 890, rating: 4.7, category: "Software", level: "Avançado" },
  { id: 3, title: "Gestão de Obras e Cronograma Físico-Financeiro", instructor: "Eng. Rafael Souza", price: "247.00", duration: "15h 20min", lessons: 30, students: 620, rating: 4.8, category: "Gestão", level: "Intermediário" },
  { id: 4, title: "Design de Interiores Contemporâneo e Iluminação", instructor: "Des. Ana Lima", price: "347.00", duration: "20h 10min", lessons: 40, students: 2100, rating: 5.0, category: "Design", level: "Intermediário" },
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
        {/* Header Imersivo */}
        <div className="brand-gradient py-24 relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <LayoutGrid size={400} className="absolute -right-20 -bottom-20 text-white" />
           </div>
          <div className="container relative z-10">
            <div className="max-w-3xl space-y-8">
               <Badge className="bg-white/10 text-white border-white/20 px-6 py-2 rounded-full backdrop-blur-md gap-3 font-black uppercase tracking-[0.3em] text-[10px]">
                  <Award size={14} className="text-cyan-300 fill-cyan-300" /> Formação Continuada PRODIN
               </Badge>
               <h1 className="text-6xl md:text-7xl font-black text-white leading-none tracking-tighter">Educação <br/><span className="text-cyan-400">Técnica.</span></h1>
               <p className="text-white/70 text-2xl font-medium leading-relaxed max-w-2xl">
                 Aprenda com profissionais auditados que dominam as normas ABNT e as melhores práticas de mercado em um ambiente EaD de alta performance.
               </p>
            </div>
          </div>
        </div>

        <div className="container py-24">
          <div className="flex flex-col lg:flex-row gap-16">
             {/* Sidebar Filters */}
             <div className="lg:w-80 shrink-0 space-y-10">
                <div className="space-y-4">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">O que deseja aprender?</h3>
                   <div className="relative">
                      <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        placeholder="Busque por software, norma..." 
                        className="pl-14 h-16 rounded-[1.5rem] border-border/60 font-bold text-lg" 
                      />
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Especialidades</h3>
                   <div className="flex flex-col gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={cn(
                            "text-left px-6 py-4 rounded-2xl text-sm font-black transition-all border uppercase tracking-widest",
                            category === cat 
                              ? "brand-gradient text-white border-transparent shadow-xl" 
                              : "bg-background text-muted-foreground hover:text-foreground border-border/60 hover:border-primary/40"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                   </div>
                </div>

                <Card className="p-10 border-primary/20 bg-primary/5 rounded-[3rem] relative overflow-hidden">
                   <Zap size={120} className="absolute -right-10 -bottom-10 text-primary opacity-10 rotate-12" />
                   <h4 className="text-2xl font-black text-foreground mb-3 relative z-10 tracking-tight">Instrutor?</h4>
                   <p className="text-xs font-bold text-muted-foreground mb-8 relative z-10 leading-relaxed uppercase tracking-widest">
                      Publique seu curso auditado e alcance milhares de profissionais do ecossistema.
                   </p>
                   <Button className="w-full h-14 brand-gradient text-white border-0 font-black rounded-2xl relative z-10 shadow-2xl hover:scale-105 transition-transform">
                      COMEÇAR AGORA
                   </Button>
                </Card>
             </div>

             {/* Main Content */}
             <div className="flex-1">
                <div className="flex items-center justify-between mb-12 bg-muted/30 p-5 rounded-[2rem] border border-border/60">
                   <h2 className="text-sm font-black text-foreground uppercase tracking-[0.2em] ml-3">
                      {category === "Todos" ? "Catálogo Completo" : `Especialidade: ${category}`}
                      <span className="ml-4 text-primary opacity-60">[{filtered.length}]</span>
                   </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {filtered.map((course) => (
                    <Card key={course.id} className="overflow-hidden border-border/60 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] transition-all group rounded-[3rem] bg-background border-2">
                      <div className="aspect-[16/10] brand-gradient flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                           <Button className="rounded-full w-20 h-20 bg-white text-primary hover:scale-110 transition-transform shadow-2xl border-0">
                              <Play size={32} fill="currentColor" className="ml-1" />
                           </Button>
                        </div>
                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                           <GraduationCap size={200} className="absolute -right-10 -bottom-10 text-white" />
                        </div>
                        <BookOpen size={80} className="text-white/30 group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-8 left-8 flex gap-3">
                           <Badge className="bg-black/40 backdrop-blur-md text-white border-0 font-black text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full">
                              {course.category}
                           </Badge>
                           <Badge className="bg-primary text-white border-0 font-black text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full shadow-lg">
                              {course.level}
                           </Badge>
                        </div>
                      </div>
                      <div className="p-10 space-y-6">
                        <div className="space-y-2">
                           <h3 className="text-2xl font-black text-foreground leading-tight group-hover:text-primary transition-colors tracking-tight line-clamp-2">
                             {course.title}
                           </h3>
                           <div className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-widest">
                              <ShieldCheck size={14} className="text-primary" />
                              {course.instructor}
                           </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-6 py-6 border-y border-border/40">
                           <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                              <Clock size={16} className="text-primary" /> {course.duration}
                           </div>
                           <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                              <Users size={16} className="text-primary" /> {course.students.toLocaleString("pt-BR")} ALUNOS
                           </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <div>
                             <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Matrícula</p>
                             <p className="text-3xl font-black text-foreground tracking-tighter">
                                {parseFloat(course.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                             </p>
                          </div>
                          <Button className="brand-gradient text-white border-0 font-black px-10 h-16 rounded-2xl shadow-2xl hover:scale-110 transition-transform text-lg">
                            MATRICULAR
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {filtered.length === 0 && (
                  <Card className="p-32 text-center border-dashed border-2 border-border/60 rounded-[4rem] bg-muted/5">
                    <Search size={80} className="text-muted-foreground mx-auto mb-8 opacity-10" />
                    <h3 className="text-3xl font-black text-foreground mb-4 tracking-tight">Nenhum curso auditado</h3>
                    <p className="text-muted-foreground font-medium text-lg max-w-md mx-auto">
                      Tente ajustar seus filtros técnicos ou buscar por outras especialidades da matriz PRODIN.
                    </p>
                    <Button variant="outline" className="mt-10 h-16 px-12 rounded-2xl font-black border-primary/20 text-primary text-lg" onClick={() => {setQuery(""); setCategory("Todos");}}>
                      LIMPAR BUSCA
                    </Button>
                  </Card>
                )}
             </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
