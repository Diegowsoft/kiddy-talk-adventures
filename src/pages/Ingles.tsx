import { useState } from "react";
import Header from "@/components/Header";
import LessonCard from "@/components/LessonCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Volume2, 
  Zap, 
  Users, 
  Heart, 
  Home,
  PlayCircle,
  CheckCircle,
  Award
} from "lucide-react";

const Ingles = () => {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2]);
  const [currentProgress, setCurrentProgress] = useState(40);

  const lessons = [
    {
      id: 1,
      title: "Alphabet & Numbers",
      description: "Aprenda o alfabeto e números em inglês",
      icon: <BookOpen className="w-8 h-8" />,
      words: ["A", "B", "C", "1", "2", "3"],
      category: "básico"
    },
    {
      id: 2,
      title: "Colors & Shapes",
      description: "Cores e formas básicas",
      icon: <Zap className="w-8 h-8" />,
      words: ["Red", "Blue", "Green", "Circle", "Square"],
      category: "básico"
    },
    {
      id: 3,
      title: "Family & Friends",
      description: "Membros da família e amigos",
      icon: <Users className="w-8 h-8" />,
      words: ["Mother", "Father", "Sister", "Brother", "Friend"],
      category: "família"
    },
    {
      id: 4,
      title: "Animals & Pets",
      description: "Animais e bichinhos de estimação",
      icon: <Heart className="w-8 h-8" />,
      words: ["Dog", "Cat", "Bird", "Fish", "Rabbit"],
      category: "animais"
    },
    {
      id: 5,
      title: "Home & Objects",
      description: "Casa e objetos do dia a dia",
      icon: <Home className="w-8 h-8" />,
      words: ["Table", "Chair", "Bed", "Door", "Window"],
      category: "casa"
    },
    {
      id: 6,
      title: "Food & Drinks",
      description: "Comidas e bebidas favoritas",
      icon: <PlayCircle className="w-8 h-8" />,
      words: ["Apple", "Water", "Bread", "Milk", "Cake"],
      category: "comida"
    }
  ];

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  const completeLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      setCurrentProgress(Math.min(currentProgress + 15, 100));
    }
    setSelectedLesson(null);
  };

  const selectedLessonData = lessons.find(l => l.id === selectedLesson);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {!selectedLesson ? (
        <>
          {/* Progress Section */}
          <section className="bg-gradient-hero py-12">
            <div className="container mx-auto px-4">
              <div className="text-center text-white mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Módulo de Inglês 📚
                </h1>
                <p className="text-xl opacity-90">
                  Aprenda inglês passo a passo com lições divertidas!
                </p>
              </div>
              
              <Card className="max-w-2xl mx-auto p-6 bg-white/95 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Seu Progresso
                  </h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Award className="w-6 h-6 text-warning" />
                    <span className="text-lg font-semibold">{currentProgress}% Completo</span>
                  </div>
                  <Progress value={currentProgress} className="h-3" />
                  <p className="text-muted-foreground mt-2">
                    {completedLessons.length} de {lessons.length} lições concluídas
                  </p>
                </div>
              </Card>
            </div>
          </section>

          {/* Lessons Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                Escolha uma Lição
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    title={lesson.title}
                    description={lesson.description}
                    icon={lesson.icon}
                    isCompleted={completedLessons.includes(lesson.id)}
                    onClick={() => setSelectedLesson(lesson.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        // Lesson Detail View
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button 
                variant="outline" 
                onClick={() => setSelectedLesson(null)}
                className="mb-6"
              >
                ← Voltar às Lições
              </Button>
              
              <Card className="card-kiddy bg-white p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center text-primary">
                    {selectedLessonData?.icon}
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{selectedLessonData?.title}</h1>
                  <p className="text-muted-foreground text-lg">{selectedLessonData?.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {selectedLessonData?.words.map((word, index) => (
                    <Card 
                      key={index}
                      className="p-6 text-center cursor-pointer hover:scale-105 transition-transform bg-gradient-to-br from-primary/10 to-accent/10"
                      onClick={() => speakWord(word)}
                    >
                      <div className="text-2xl font-bold mb-2 text-primary">
                        {word}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                      >
                        <Volume2 className="w-4 h-4 mr-2" />
                        Ouvir
                      </Button>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center">
                  <Button 
                    onClick={() => completeLesson(selectedLesson)}
                    className="btn-kiddy-success px-8 py-3 text-lg"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {completedLessons.includes(selectedLesson) ? "Lição Concluída!" : "Marcar como Concluída"}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Ingles;