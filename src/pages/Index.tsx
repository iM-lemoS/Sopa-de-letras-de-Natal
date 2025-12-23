import { Snowflakes } from "@/components/Snowflakes";
import { WordSearchGame } from "@/components/WordSearchGame";
import { Heart, Sparkles, TreePine } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-snow relative overflow-hidden">
      <Snowflakes />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 animate-twinkle" style={{ animationDelay: "0s" }}>
        <Sparkles className="w-6 h-6 text-christmas-gold" />
      </div>
      <div className="absolute top-20 right-20 animate-twinkle" style={{ animationDelay: "0.5s" }}>
        <Sparkles className="w-4 h-4 text-christmas-gold" />
      </div>
      <div className="absolute bottom-20 left-20 animate-twinkle" style={{ animationDelay: "1s" }}>
        <Sparkles className="w-5 h-5 text-christmas-gold" />
      </div>
      <div className="absolute top-32 left-1/4 animate-float" style={{ animationDelay: "0.3s" }}>
        <TreePine className="w-8 h-8 text-christmas-green opacity-30" />
      </div>
      <div className="absolute bottom-32 right-1/4 animate-float" style={{ animationDelay: "0.8s" }}>
        <Heart className="w-6 h-6 text-primary opacity-40" />
      </div>

      {/* Main content */}
      <div className="relative z-20 container mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <TreePine className="w-8 h-8 sm:w-10 sm:h-10 text-christmas-green" />
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
            <TreePine className="w-8 h-8 sm:w-10 sm:h-10 text-christmas-green" />
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            Sopa de Letras
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 text-gradient-gold">
              de Natal
            </span>
          </h1>
          
          <p className="text-muted-foreground text-lg sm:text-xl max-w-md mx-auto">
            Encontra todas as palavras escondidas neste jogo festivo cheio de amor e magia natalícia!
          </p>
        </header>

        {/* Instructions */}
        <div 
          className="max-w-lg mx-auto mb-8 p-4 bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 text-center animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Como jogar:</span> Clica e arrasta para selecionar as letras. 
            As palavras podem estar na horizontal, vertical ou diagonal!
          </p>
        </div>

        {/* Game */}
        <div 
          className="animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <WordSearchGame />
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>e espírito natalício</span>
            <Sparkles className="w-4 h-4 text-christmas-gold" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
