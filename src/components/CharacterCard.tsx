import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CharacterCardProps {
  image: string;
  name: string;
  description: string;
  bgColor?: string;
  onSelect?: () => void;
  isSelected?: boolean;
}

const CharacterCard = ({ 
  image, 
  name, 
  description, 
  bgColor = "bg-primary", 
  onSelect,
  isSelected 
}: CharacterCardProps) => {
  return (
    <Card className={`card-kiddy text-center cursor-pointer ${bgColor} text-white ${
      isSelected ? "ring-4 ring-secondary scale-105" : ""
    }`} onClick={onSelect}>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 rounded-full bg-white/20 p-4 flex items-center justify-center">
          <img 
            src={image} 
            alt={name}
            className="w-16 h-16 object-contain bounce-slow"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
        {onSelect && (
          <Button 
            variant="secondary" 
            className="btn-kiddy-secondary mt-4"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            {isSelected ? "Selecionado" : "Conversar"}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CharacterCard;