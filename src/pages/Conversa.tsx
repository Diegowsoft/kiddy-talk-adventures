import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import CharacterCard from "@/components/CharacterCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  RotateCcw,
  MessageCircle 
} from "lucide-react";
import bearCharacter from "@/assets/bear-character.png";
import kidCharacter from "@/assets/kid-character.png";
import turtleCharacter from "@/assets/turtle-character.png";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Conversa = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isCharacterSpeaking, setIsCharacterSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const characters = {
    bear: {
      name: "Buddy Bear",
      image: bearCharacter,
      personality: "Amigável e encorajador, professor paciente",
      color: "bg-primary",
      responses: {
        "hello": "Hello there! I'm so happy to meet you! 🐻",
        "how are you": "I'm doing great! How are you feeling today?",
        "goodbye": "Goodbye! See you soon, my friend! 👋",
        "default": "That's interesting! Can you tell me more about it?"
      }
    },
    kid: {
      name: "Alex",
      image: kidCharacter,
      personality: "Energético e curioso, amigo da mesma idade",
      color: "bg-accent",
      responses: {
        "hello": "Hi! Wanna be friends? Let's play! 😊",
        "how are you": "I'm awesome! Want to learn something cool?",
        "goodbye": "Bye! This was super fun! See you later! 🎉",
        "default": "Wow, that's cool! I love learning new things!"
      }
    },
    turtle: {
      name: "Wise Turtle",
      image: turtleCharacter,
      personality: "Sábio e calmo, conta histórias interessantes",
      color: "bg-success",
      responses: {
        "hello": "Greetings, young one. Welcome to our learning journey! 🐢",
        "how are you": "I am well, taking life one step at a time. And you?",
        "goodbye": "Remember, slow and steady wins the race. Until we meet again! 🌟",
        "default": "Hmm, very thoughtful. Let me share some wisdom about that..."
      }
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startListening = () => {
    if (recognitionRef.current && selectedCharacter) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsCharacterSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.onend = () => setIsCharacterSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const getCharacterResponse = (userMessage: string): string => {
    if (!selectedCharacter) return "";
    
    const character = characters[selectedCharacter as keyof typeof characters];
    const message = userMessage.toLowerCase();
    
    if (message.includes("hello") || message.includes("hi")) {
      return character.responses.hello;
    } else if (message.includes("how are you") || message.includes("how do you")) {
      return character.responses["how are you"];
    } else if (message.includes("goodbye") || message.includes("bye")) {
      return character.responses.goodbye;
    } else {
      return character.responses.default;
    }
  };

  const sendMessage = () => {
    if (!inputText.trim() || !selectedCharacter) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate character response
    const response = getCharacterResponse(inputText);
    
    setTimeout(() => {
      const characterMessage: Message = {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, characterMessage]);
      speakText(response);
    }, 1000);

    setInputText("");
  };

  const resetConversation = () => {
    setMessages([]);
    setSelectedCharacter(null);
    window.speechSynthesis.cancel();
    setIsCharacterSpeaking(false);
  };

  const startConversation = (characterKey: string) => {
    setSelectedCharacter(characterKey);
    const character = characters[characterKey as keyof typeof characters];
    const welcomeMessage: Message = {
      id: Date.now(),
      text: `Hi! I'm ${character.name}. Let's have a conversation in English! Try saying "Hello" to start! 😊`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    speakText(welcomeMessage.text);
  };

  if (!selectedCharacter) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Conversação em Inglês 💬
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Escolha um personagem e pratique inglês com conversas reais!
                Use sua voz ou digite suas mensagens.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {Object.entries(characters).map(([key, character]) => (
                <CharacterCard
                  key={key}
                  image={character.image}
                  name={character.name}
                  description={character.personality}
                  bgColor={character.color}
                  onSelect={() => startConversation(key)}
                />
              ))}
            </div>
            
            <div className="mt-16 max-w-2xl mx-auto">
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
                <h3 className="text-xl font-bold mb-4 text-center">
                  🎤 Funcionalidades Especiais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <Mic className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="font-semibold">Speech-to-Text</p>
                    <p className="text-sm text-muted-foreground">Fale e suas palavras aparecerão</p>
                  </div>
                  <div className="text-center">
                    <Volume2 className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <p className="font-semibold">Text-to-Speech</p>
                    <p className="text-sm text-muted-foreground">Ouça a pronuncia correta</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const currentCharacter = characters[selectedCharacter as keyof typeof characters];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Character Header */}
            <Card className="mb-6 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={currentCharacter.image} 
                    alt={currentCharacter.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{currentCharacter.name}</h2>
                    <p className="text-muted-foreground">{currentCharacter.personality}</p>
                  </div>
                  {isCharacterSpeaking && (
                    <Badge variant="secondary" className="animate-pulse">
                      <Volume2 className="w-4 h-4 mr-1" />
                      Falando...
                    </Badge>
                  )}
                </div>
                <Button variant="outline" onClick={resetConversation}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reiniciar
                </Button>
              </div>
            </Card>

            {/* Chat Area */}
            <Card className="h-96 mb-6">
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.isUser
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </Card>

            {/* Input Area */}
            <Card className="p-4">
              <div className="flex space-x-2">
                <div className="flex-1 flex space-x-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Digite sua mensagem ou use o microfone..."
                    className="flex-1"
                  />
                  <Button
                    variant={isListening ? "destructive" : "outline"}
                    onClick={isListening ? stopListening : startListening}
                    disabled={!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
                <Button onClick={sendMessage} disabled={!inputText.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="mt-2 text-center">
                <p className="text-sm text-muted-foreground">
                  💡 Dica: Tente dizer "Hello", "How are you?" ou "Goodbye"
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Conversa;