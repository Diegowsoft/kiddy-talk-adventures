import { useState } from "react";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Gamepad2, 
  Target, 
  Shuffle, 
  ArrowLeft,
  Volume2,
  Star,
  Trophy,
  CheckCircle,
  X
} from "lucide-react";

interface GameState {
  score: number;
  level: number;
  lives: number;
  isPlaying: boolean;
}

const Jogos = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    lives: 3,
    isPlaying: false
  });

  // Memory Game State
  const [memoryCards, setMemoryCards] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  // Word Match State
  const [currentWord, setCurrentWord] = useState("");
  const [wordOptions, setWordOptions] = useState<string[]>([]);
  const [wordScore, setWordScore] = useState(0);

  // Spelling Game State
  const [spellingWord, setSpellingWord] = useState("");
  const [userSpelling, setUserSpelling] = useState("");
  const [spellingHint, setSpellingHint] = useState("");

  const games = [
    {
      id: "memory",
      title: "Jogo da Memória",
      description: "Encontre os pares de palavras em inglês",
      icon: <Target className="w-8 h-8" />,
      bgColor: "bg-primary",
      difficulty: "Fácil" as const
    },
    {
      id: "wordmatch",
      title: "Palavra Certa",
      description: "Escolha a tradução correta",
      icon: <Shuffle className="w-8 h-8" />,
      bgColor: "bg-accent",
      difficulty: "Médio" as const
    },
    {
      id: "spelling",
      title: "Soletração",
      description: "Digite a palavra corretamente",
      icon: <Gamepad2 className="w-8 h-8" />,
      bgColor: "bg-success",
      difficulty: "Difícil" as const
    }
  ];

  // Memory Game Logic
  const initMemoryGame = () => {
    const words = [
      { english: "Cat", portuguese: "Gato" },
      { english: "Dog", portuguese: "Cão" },
      { english: "Bird", portuguese: "Pássaro" },
      { english: "Fish", portuguese: "Peixe" },
      { english: "Apple", portuguese: "Maçã" },
      { english: "Water", portuguese: "Água" }
    ];

    const cards = [];
    words.forEach((word, index) => {
      cards.push({ id: index * 2, word: word.english, type: "english", matched: false });
      cards.push({ id: index * 2 + 1, word: word.portuguese, type: "portuguese", matched: false });
    });

    const shuffled = cards.sort(() => Math.random() - 0.5);
    setMemoryCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setGameState({ ...gameState, isPlaying: true, score: 0 });
  };

  const flipMemoryCard = (cardId: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedCards.includes(cardId)) {
      return;
    }

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = memoryCards.find(c => c.id === first);
      const secondCard = memoryCards.find(c => c.id === second);

      // Check if cards match (same word pair)
      if (Math.floor(first / 2) === Math.floor(second / 2)) {
        setMatchedCards([...matchedCards, first, second]);
        setGameState({ ...gameState, score: gameState.score + 10 });
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Word Match Game Logic
  const initWordMatchGame = () => {
    const words = [
      { english: "House", portuguese: "Casa", options: ["Casa", "Carro", "Livro", "Mesa"] },
      { english: "Book", portuguese: "Livro", options: ["Casa", "Livro", "Água", "Gato"] },
      { english: "Car", portuguese: "Carro", options: ["Carro", "Casa", "Árvore", "Flor"] },
      { english: "Tree", portuguese: "Árvore", options: ["Mesa", "Árvore", "Porta", "Janela"] }
    ];

    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord.english);
    setWordOptions(randomWord.options.sort(() => Math.random() - 0.5));
    setWordScore(0);
    setGameState({ ...gameState, isPlaying: true });
  };

  const checkWordMatch = (selectedOption: string) => {
    const words = [
      { english: "House", portuguese: "Casa" },
      { english: "Book", portuguese: "Livro" },
      { english: "Car", portuguese: "Carro" },
      { english: "Tree", portuguese: "Árvore" }
    ];

    const correctWord = words.find(w => w.english === currentWord);
    if (correctWord && selectedOption === correctWord.portuguese) {
      setWordScore(wordScore + 10);
      // Load next word
      setTimeout(() => initWordMatchGame(), 1000);
    } else {
      setGameState({ ...gameState, lives: gameState.lives - 1 });
    }
  };

  // Spelling Game Logic
  const initSpellingGame = () => {
    const words = [
      { word: "HELLO", hint: "👋 Cumprimento em inglês" },
      { word: "WORLD", hint: "🌍 Nosso planeta" },
      { word: "HAPPY", hint: "😊 Sentimento de alegria" },
      { word: "FRIEND", hint: "👫 Pessoa querida" }
    ];

    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSpellingWord(randomWord.word);
    setSpellingHint(randomWord.hint);
    setUserSpelling("");
    setGameState({ ...gameState, isPlaying: true });
  };

  const checkSpelling = () => {
    if (userSpelling.toUpperCase() === spellingWord) {
      setGameState({ ...gameState, score: gameState.score + 15 });
      setTimeout(() => initSpellingGame(), 1000);
    } else {
      setGameState({ ...gameState, lives: gameState.lives - 1 });
    }
    setUserSpelling("");
  };

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      window.speechSynthesis.speak(utterance);
    }
  };

  const resetGame = () => {
    setSelectedGame(null);
    setGameState({ score: 0, level: 1, lives: 3, isPlaying: false });
    setMemoryCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setCurrentWord("");
    setWordOptions([]);
    setWordScore(0);
    setSpellingWord("");
    setUserSpelling("");
    setSpellingHint("");
  };

  if (!selectedGame) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Jogos Educativos 🎮
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Aprenda inglês brincando! Escolha um jogo e teste seus conhecimentos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  title={game.title}
                  description={game.description}
                  icon={game.icon}
                  bgColor={game.bgColor}
                  difficulty={game.difficulty}
                  onClick={() => setSelectedGame(game.id)}
                />
              ))}
            </div>
            
            <div className="mt-16 max-w-2xl mx-auto">
              <Card className="p-6 bg-gradient-to-br from-success/10 to-primary/10">
                <h3 className="text-xl font-bold mb-4 text-center">
                  🏆 Sistema de Pontuação
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <Star className="w-8 h-8 mx-auto mb-2 text-warning" />
                    <p className="font-semibold">Memória: 10pts</p>
                    <p className="text-sm text-muted-foreground">Por par encontrado</p>
                  </div>
                  <div>
                    <Target className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <p className="font-semibold">Palavra: 10pts</p>
                    <p className="text-sm text-muted-foreground">Por acerto</p>
                  </div>
                  <div>
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-success" />
                    <p className="font-semibold">Soletração: 15pts</p>
                    <p className="text-sm text-muted-foreground">Por palavra completa</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const currentGame = games.find(g => g.id === selectedGame);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Game Header */}
            <Card className="mb-6 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" onClick={resetGame}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold">{currentGame?.title}</h2>
                    <p className="text-muted-foreground">{currentGame?.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">
                    Pontos: {gameState.score}
                  </Badge>
                  <Badge variant="destructive">
                    Vidas: {gameState.lives}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Memory Game */}
            {selectedGame === "memory" && (
              <Card className="p-6">
                {!gameState.isPlaying ? (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Jogo da Memória</h3>
                    <p className="mb-6">Encontre os pares de palavras em inglês e português!</p>
                    <Button onClick={initMemoryGame} className="btn-kiddy-primary">
                      Começar Jogo
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="text-center mb-6">
                      <Progress value={(matchedCards.length / memoryCards.length) * 100} className="mb-2" />
                      <p>Pares encontrados: {matchedCards.length / 2} / {memoryCards.length / 2}</p>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4">
                      {memoryCards.map((card) => (
                        <div
                          key={card.id}
                          className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center text-center p-2 ${
                            flippedCards.includes(card.id) || matchedCards.includes(card.id)
                              ? card.type === "english" 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-accent text-accent-foreground"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                          onClick={() => flipMemoryCard(card.id)}
                        >
                          {flippedCards.includes(card.id) || matchedCards.includes(card.id) ? (
                            <span className="font-bold text-sm">{card.word}</span>
                          ) : (
                            <span className="text-2xl">?</span>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {matchedCards.length === memoryCards.length && (
                      <div className="text-center mt-6">
                        <h3 className="text-2xl font-bold text-success mb-2">
                          🎉 Parabéns! Você completou o jogo!
                        </h3>
                        <Button onClick={initMemoryGame} className="btn-kiddy-success">
                          Jogar Novamente
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            )}

            {/* Word Match Game */}
            {selectedGame === "wordmatch" && (
              <Card className="p-6">
                {!gameState.isPlaying ? (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Palavra Certa</h3>
                    <p className="mb-6">Escolha a tradução correta para a palavra em inglês!</p>
                    <Button onClick={initWordMatchGame} className="btn-kiddy-primary">
                      Começar Jogo
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold mb-4 text-primary">{currentWord}</h3>
                      <Button
                        variant="outline"
                        onClick={() => speakWord(currentWord)}
                        className="mb-4"
                      >
                        <Volume2 className="w-4 h-4 mr-2" />
                        Ouvir Pronuncia
                      </Button>
                      <p className="text-muted-foreground">Qual é a tradução em português?</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      {wordOptions.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="p-6 text-lg hover:scale-105 transition-transform"
                          onClick={() => checkWordMatch(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    
                    <p className="mt-6 text-muted-foreground">
                      Pontuação: {wordScore} pontos
                    </p>
                  </div>
                )}
              </Card>
            )}

            {/* Spelling Game */}
            {selectedGame === "spelling" && (
              <Card className="p-6">
                {!gameState.isPlaying ? (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Soletração</h3>
                    <p className="mb-6">Digite a palavra corretamente em inglês!</p>
                    <Button onClick={initSpellingGame} className="btn-kiddy-primary">
                      Começar Jogo
                    </Button>
                  </div>
                ) : (
                  <div className="text-center max-w-md mx-auto">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-4">Dica:</h3>
                      <p className="text-xl mb-4">{spellingHint}</p>
                      <Button
                        variant="outline"
                        onClick={() => speakWord(spellingWord)}
                        className="mb-6"
                      >
                        <Volume2 className="w-4 h-4 mr-2" />
                        Ouvir Palavra
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={userSpelling}
                        onChange={(e) => setUserSpelling(e.target.value.toUpperCase())}
                        onKeyPress={(e) => e.key === 'Enter' && checkSpelling()}
                        placeholder="Digite a palavra..."
                        className="w-full p-4 text-center text-2xl font-bold border-2 rounded-lg uppercase tracking-widest"
                        maxLength={spellingWord.length}
                      />
                      
                      <div className="flex space-x-2 justify-center">
                        <Button onClick={checkSpelling} className="btn-kiddy-success">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Verificar
                        </Button>
                        <Button variant="outline" onClick={() => setUserSpelling("")}>
                          <X className="w-4 h-4 mr-2" />
                          Limpar
                        </Button>
                      </div>
                    </div>
                    
                    <p className="mt-6 text-muted-foreground">
                      Pontuação: {gameState.score} pontos
                    </p>
                  </div>
                )}
              </Card>
            )}

            {gameState.lives <= 0 && (
              <Card className="mt-6 p-6 text-center bg-destructive/10">
                <h3 className="text-2xl font-bold text-destructive mb-4">
                  Game Over! 😔
                </h3>
                <p className="mb-4">Pontuação final: {gameState.score}</p>
                <Button onClick={resetGame} className="btn-kiddy-primary">
                  Tentar Novamente
                </Button>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jogos;