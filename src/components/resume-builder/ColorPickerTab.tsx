
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChromePicker } from "react-color"; // Correct import from react-color
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Circle, Palette } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  colors: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  onChange: (color: string, type: 'primary' | 'secondary' | 'accent') => void;
  presets?: Array<{
    name: string;
    primary: string;
    secondary: string;
    accent: string;
  }>;
}

const ColorPickerTab: React.FC<ColorPickerProps> = ({ 
  colors, 
  onChange,
  presets = [
    { name: "Purple", primary: "#5d4dcd", secondary: "#9b87f5", accent: "#e5deff" },
    { name: "Blue", primary: "#3b82f6", secondary: "#60a5fa", accent: "#dbeafe" },
    { name: "Green", primary: "#10b981", secondary: "#34d399", accent: "#d1fae5" },
    { name: "Red", primary: "#ef4444", secondary: "#f87171", accent: "#fee2e2" },
    { name: "Gray", primary: "#4b5563", secondary: "#9ca3af", accent: "#f3f4f6" },
  ]
}) => {
  const colorConfigs = [
    { type: 'primary', label: 'Primary Color', color: colors.primaryColor },
    { type: 'secondary', label: 'Secondary Color', color: colors.secondaryColor },
    { type: 'accent', label: 'Accent Color', color: colors.accentColor }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-4 w-4 text-resume-purple" />
        <h3 className="font-medium">Theme Colors</h3>
      </div>
      
      {/* Color presets */}
      <div className="space-y-2">
        <Label className="text-sm">Color Presets</Label>
        <div className="grid grid-cols-5 gap-2">
          {presets.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              className="p-0 h-8 w-full relative overflow-hidden border-2"
              style={{ borderColor: preset.primary }}
              onClick={() => {
                onChange(preset.primary, 'primary');
                onChange(preset.secondary, 'secondary');
                onChange(preset.accent, 'accent');
              }}
              title={preset.name}
            >
              <div className="absolute inset-0 flex">
                <div style={{ background: preset.primary }} className="w-1/3 h-full"></div>
                <div style={{ background: preset.secondary }} className="w-1/3 h-full"></div>
                <div style={{ background: preset.accent }} className="w-1/3 h-full"></div>
              </div>
            </Button>
          ))}
        </div>
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
                <ChromePicker 
                  color={color} 
                  onChange={(colorResult) => onChange(colorResult.hex, type as any)} 
                />
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
