import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Public pages
import Home from "./pages/Home";
import Projetos from "./pages/Projetos";
import ProjetoDetalhe from "./pages/ProjetoDetalhe";
import Planos from "./pages/Planos";
import Cursos from "./pages/Cursos";
import AssistenteIA from "./pages/AssistenteIA";
import Sobre from "./pages/Sobre";

// Legal pages
import PrivacidadeLGPD from "./pages/legal/PrivacidadeLGPD";
import TermosDeUso from "./pages/legal/TermosDeUso";

// Dashboard pages
import PainelCliente from "./pages/painel/PainelCliente";
import PainelProfissional from "./pages/painel/PainelProfissional";
import PainelAdmin from "./pages/painel/PainelAdmin";

function Router() {
  return (
    <Switch>
      {/* Public */}
      <Route path="/" component={Home} />
      <Route path="/projetos" component={Projetos} />
      <Route path="/projetos/:id" component={ProjetoDetalhe} />
      <Route path="/planos" component={Planos} />
      <Route path="/cursos" component={Cursos} />
      <Route path="/assistente-ia" component={AssistenteIA} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/contato" component={Sobre} />

      {/* Legal */}
      <Route path="/privacidade" component={PrivacidadeLGPD} />
      <Route path="/termos" component={TermosDeUso} />
      <Route path="/direitos-autorais" component={TermosDeUso} />

      {/* Dashboards */}
      <Route path="/painel" component={PainelCliente} />
      <Route path="/painel/cliente" component={PainelCliente} />
      <Route path="/painel/profissional" component={PainelProfissional} />
      <Route path="/painel/admin" component={PainelAdmin} />

      {/* Fallback */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
