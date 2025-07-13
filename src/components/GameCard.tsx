import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor?: string;
  onClick: () => void;
  difficulty?: "Fácil" | "Médio" | "Difícil";
}

const GameCard = ({ 
  title, 
  description, 
  icon, 
  bgColor = "bg-primary", 
  onClick,
  difficulty = "Fácil"
}: GameCardProps) => {
  const difficultyColors = {
    "Fácil": "bg-success",
    "Médio": "bg-warning", 
    "Difícil": "bg-destructive"
  };

  return (
    <Card className={`card-kiddy-warm ${bgColor} text-white cursor-pointer group`}>
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center group-hover:wiggle">
          {icon}
        </div>
        <div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <h3 className="text-xl font-bold">{title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${difficultyColors[difficulty]} text-white`}>
              {difficulty}
            </span>
          </div>
          <p className="text-sm opacity-90 mb-4">{description}</p>
        </div>
        <Button 
          variant="secondary" 
          className="btn-kiddy-secondary w-full"
          onClick={onClick}
        >
          Jogar Agora
        </Button>
      </div>
    </Card>
  );
};

export default GameCard;