
import React from 'react';
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageSquareCode, MessageCircle, Lightbulb } from 'lucide-react';

interface AIHoverToolkitProps {
  onExplain?: () => void;
  onAskAI?: () => void;
  onComment?: () => void;
  onIntroduction?: () => void;
  className?: string;
}

const AIHoverToolkit: React.FC<AIHoverToolkitProps> = ({
  onExplain,
  onAskAI,
  onComment,
  onIntroduction,
  className
}) => {
  return (
    <div className={`flex items-center gap-1 p-1 rounded-lg bg-background/95 border border-border/50 shadow-lg backdrop-blur-sm ${className}`}>
      {onExplain && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-1.5"
          onClick={onExplain}
        >
          <HelpCircle className="h-4 w-4" />
          <span className="text-sm">Explain</span>
        </Button>
      )}
      
      {onAskAI && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-1.5"
          onClick={onAskAI}
        >
          <MessageSquareCode className="h-4 w-4" />
          <span className="text-sm">Ask AI</span>
        </Button>
      )}
      
      {onComment && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-accent flex items-center gap-1.5"
          onClick={onComment}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">Comment</span>
        </Button>
      )}

      {onIntroduction && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-resume-purple hover:text-resume-purple-dark hover:bg-resume-purple/10 flex items-center gap-1.5"
          onClick={onIntroduction}
        >
          <Lightbulb className="h-4 w-4" />
          <span className="text-sm">Introduction</span>
        </Button>
      )}
    </div>
  );
};

export default AIHoverToolkit;
