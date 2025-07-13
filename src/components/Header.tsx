import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import bearCharacter from "@/assets/bear-character.png";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Início" },
    { path: "/ingles", label: "Inglês" },
    { path: "/conversa", label: "Conversa" },
    { path: "/jogos", label: "Jogos" }
  ];
  
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform">
            <img 
              src={bearCharacter} 
              alt="Kiddy Talk Bear" 
              className="w-12 h-12 rounded-full bg-white/20 p-1"
            />
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
              KIDDY TALK
            </h1>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  className={`text-lg font-semibold transition-all hover:scale-105 ${
                    location.pathname === item.path 
                      ? "btn-kiddy-secondary" 
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button 
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                size="sm"
                className={`transition-all hover:scale-105 ${
                  location.pathname === item.path 
                    ? "btn-kiddy-secondary" 
                    : "text-white hover:bg-white/20"
                }`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;