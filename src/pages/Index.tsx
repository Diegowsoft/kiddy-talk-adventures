import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CharacterCard from "@/components/CharacterCard";
import { BookOpen, MessageCircle, Gamepad2, Star, Users, Trophy } from "lucide-react";
import bearCharacter from "@/assets/bear-character.png";
import kidCharacter from "@/assets/kid-character.png";
import turtleCharacter from "@/assets/turtle-character.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Hello World Kids! 👋
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Aprenda inglês brincando com nossos personagens divertidos!
          </p>
          
          {/* Characters Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <img src={bearCharacter} alt="Bear" className="w-20 h-20 mx-auto mb-4 bounce-slow" />
              <h3 className="text-white font-bold">Buddy Bear</h3>
              <p className="text-white/80 text-sm">Seu professor favorito</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <img src={kidCharacter} alt="Kid" className="w-20 h-20 mx-auto mb-4 bounce-slow" />
              <h3 className="text-white font-bold">Alex</h3>
              <p className="text-white/80 text-sm">Seu amigo de estudos</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
              <img src={turtleCharacter} alt="Turtle" className="w-20 h-20 mx-auto mb-4 bounce-slow" />
              <h3 className="text-white font-bold">Wise Turtle</h3>
              <p className="text-white/80 text-sm">O sábio contador</p>
            </div>
          </div>
          
          <Link to="/ingles">
            <Button size="lg" className="btn-kiddy-secondary text-xl px-8 py-4">
              Começar a Aventura 🚀
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            O que você vai aprender?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CharacterCard
              image={bearCharacter}
              name="Inglês Básico"
              description="Aprenda vocabulário, gramática e pronuncia com nosso urso professor!"
              bgColor="bg-accent"
            />
            <CharacterCard
              image={kidCharacter}
              name="Conversação"
              description="Pratique diálogos reais com nossos personagens inteligentes!"
              bgColor="bg-primary"
            />
            <CharacterCard
              image={turtleCharacter}
              name="Jogos Educativos"
              description="Divirta-se aprendendo com jogos interativos e desafios!"
              bgColor="bg-success"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-kiddy-soft">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
            Junte-se à família Kiddy Talk!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">10,000+</h3>
              <p className="text-muted-foreground">Crianças aprendendo</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success rounded-full mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-success mb-2">50+</h3>
              <p className="text-muted-foreground">Lições interativas</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-warning rounded-full mx-auto mb-4 flex items-center justify-center">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-warning mb-2">15+</h3>
              <p className="text-muted-foreground">Jogos divertidos</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-accent mb-2">4.9★</h3>
              <p className="text-muted-foreground">Avaliação dos pais</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-card text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para começar a jornada? 🌟
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Transforme o aprendizado de inglês em uma aventura inesquecível!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ingles">
              <Button size="lg" variant="secondary" className="btn-kiddy-secondary text-lg px-8">
                <BookOpen className="w-5 h-5 mr-2" />
                Começar Lições
              </Button>
            </Link>
            <Link to="/jogos">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8">
                <Gamepad2 className="w-5 h-5 mr-2" />
                Explorar Jogos
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">&copy; 2025 Kiddy Talk. Todos os direitos reservados.</p>
          <p className="opacity-80 mt-2">Feito com ❤️ para as crianças do mundo todo</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
