
import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Wand2, Loader } from "lucide-react";

interface AIHoverMenuProps {
  isGenerating?: boolean;
  onGenerate?: () => void;
  onImprove?: () => void;
  description?: string;
  trigger: React.ReactNode;
}

const AIHoverMenu: React.FC<AIHoverMenuProps> = ({
  isGenerating,
  onGenerate,
  onImprove,
  description,
  trigger
}) => {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {trigger}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-72 p-3">
        <div className="space-y-3">
          <div className="flex items-start">
            <Wand2 className="h-4 w-4 text-resume-purple mt-1 mr-2" />
            <div>
              <h4 className="text-sm font-semibold">AI Assistant</h4>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {onGenerate && (
              <Button 
                size="sm" 
                className="w-full bg-resume-purple hover:bg-resume-purple/90"
                onClick={onGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader className="mr-2 h-3 w-3 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-3 w-3" />
                    Generate
                  </>
                )}
              </Button>
            )}
            {onImprove && (
              <Button 
                size="sm" 
                variant="outline"
                className="w-full border-resume-purple text-resume-purple hover:bg-resume-purple hover:text-white"
                onClick={onImprove}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader className="mr-2 h-3 w-3 animate-spin" />
                    Improving...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-3 w-3" />
                    Improve
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AIHoverMenu;
