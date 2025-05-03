import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChromePicker } from "react-color"; // Correct import from react-color
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Circle, Palette } from 'lucide-react';

interface ColorPickerProps {
  colors: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  onChange: (color: string, type: 'primary' | 'secondary' | 'accent') => void;
}

const ColorPickerTab: React.FC<ColorPickerProps> = ({ colors, onChange }) => {
  const colorConfigs = [
    { type: 'primary', label: 'Primary Color', color: colors.primaryColor },
    { type: 'secondary', label: 'Secondary Color', color: colors.secondaryColor },
    { type: 'accent', label: 'Accent Color', color: colors.accentColor }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-4 w-4 text-resume-purple" />
        <h3 className="font-medium">Theme Colors</h3>
      </div>
      
      <div className="grid gap-4">
        {colorConfigs.map(({ type, label, color }) => (
          <div key={type} className="space-y-2">
            <Label className="text-sm font-medium">{label}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="w-full h-10 rounded-md border border-input bg-background hover:bg-accent/10 transition-colors flex items-center justify-between px-3 py-2 relative overflow-hidden"
                >
                  <div className="flex items-center gap-2">
                    <Circle className="h-4 w-4" style={{ color: color }} fill={color} />
                    <span className="text-sm text-muted-foreground">{color}</span>
                  </div>
                  <div 
                    className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity" 
                    style={{ backgroundColor: color }}
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3">
                <ChromePicker color={color} onChange={(newColor) => onChange(newColor, type as any)} />
                <Input
                  value={color}
                  onChange={(e) => onChange(e.target.value, type as any)}
                  className="h-8 mt-2"
                />
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPickerTab;
