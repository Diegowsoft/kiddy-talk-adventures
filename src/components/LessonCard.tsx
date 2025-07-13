import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, PlayCircle } from "lucide-react";

interface LessonCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isCompleted?: boolean;
  onClick: () => void;
  bgColor?: string;
}

const LessonCard = ({ 
  title, 
  description, 
  icon, 
  isCompleted = false, 
  onClick,
  bgColor = "bg-white"
}: LessonCardProps) => {
  return (
    <Card className={`card-kiddy ${bgColor} cursor-pointer group relative`} onClick={onClick}>
      {/* Completion badge */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2 bg-success text-success-foreground rounded-full p-1">
          <CheckCircle className="w-6 h-6" />
        </div>
      )}
      
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:wiggle text-primary">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
        </div>
        <Button 
          className={`w-full ${isCompleted ? "btn-kiddy-success" : "btn-kiddy-primary"}`}
        >
          <PlayCircle className="w-4 h-4 mr-2" />
          {isCompleted ? "Revisar" : "Começar"}
        </Button>
      </div>
    </Card>
  );
};

export default LessonCard;