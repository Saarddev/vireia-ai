
import React, { useState, useRef, useEffect } from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { 
  Wand2, 
  Type, 
  ArrowUpRight, 
  MessageSquarePlus, 
  SparkleIcon, 
  ZapIcon,
  LayoutIcon
} from "lucide-react";

interface AICommandMenuProps {
  isVisible: boolean;
  position: { x: number; y: number };
  selectedText: string;
  onCommand: (command: string, text: string) => void;
  onClose: () => void;
}

const AICommandMenu: React.FC<AICommandMenuProps> = ({
  isVisible,
  position,
  selectedText,
  onCommand,
  onClose
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [isVisible]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isVisible) return null;

  const commands = [
    { id: 'improve', icon: <Wand2 className="h-4 w-4" />, label: 'Improve writing', description: 'Enhance the quality and clarity of your text' },
    { id: 'shorten', icon: <ZapIcon className="h-4 w-4" />, label: 'Make concise', description: 'Shorten while preserving key information' },
    { id: 'expand', icon: <ArrowUpRight className="h-4 w-4" />, label: 'Expand', description: 'Add more details to this section' },
    { id: 'professional', icon: <Type className="h-4 w-4" />, label: 'More professional', description: 'Adjust tone for professional settings' },
    { id: 'keywords', icon: <SparkleIcon className="h-4 w-4" />, label: 'Add keywords', description: 'Insert industry-relevant keywords' },
    { id: 'rewrite', icon: <MessageSquarePlus className="h-4 w-4" />, label: 'Rewrite completely', description: 'Generate a new version of this section' },
    { id: 'format', icon: <LayoutIcon className="h-4 w-4" />, label: 'Format', description: 'Improve the structure and layout' }
  ];

  return (
    <div 
      ref={menuRef}
      className="absolute z-50 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-1 w-56"
      style={{ 
        top: `${position.y}px`, 
        left: `${position.x}px`,
        opacity: isMenuOpen ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
      }}
    >
      <div className="flex items-center px-2 py-1 mb-1 border-b border-gray-100 dark:border-gray-800">
        <SparkleIcon className="h-3.5 w-3.5 text-resume-purple mr-1.5" />
        <span className="text-xs font-medium">AI Suggestions</span>
      </div>
      <div className="space-y-0.5">
        {commands.map((command) => (
          <HoverCard key={command.id} openDelay={300} closeDelay={100}>
            <HoverCardTrigger asChild>
              <button
                className="w-full text-left px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center text-sm transition-colors"
                onClick={() => onCommand(command.id, selectedText)}
              >
                <span className="text-resume-purple mr-2">{command.icon}</span>
                <span>{command.label}</span>
              </button>
            </HoverCardTrigger>
            <HoverCardContent side="right" align="start" className="text-xs p-2 w-64">
              {command.description}
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default AICommandMenu;
