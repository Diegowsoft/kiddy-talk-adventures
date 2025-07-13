import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import bearCharacter from "@/assets/bear-character.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <img 
          src={bearCharacter} 
          alt="Lost Bear" 
          className="w-32 h-32 mx-auto mb-6 wiggle"
        />
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Ops! Página não encontrada</h2>
        <p className="text-muted-foreground mb-8">
          Parece que esta página foi embora brincar! 🎈
          <br />
          Vamos te levar de volta para casa?
        </p>
        
        <div className="space-y-4">
          <Link to="/">
            <Button className="btn-kiddy-primary w-full">
              <Home className="w-4 h-4 mr-2" />
              Voltar para Casa
            </Button>
          </Link>
          <Link to="/jogos">
            <Button variant="outline" className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Explorar Jogos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
