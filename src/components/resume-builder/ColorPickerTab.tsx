import React, { useState, useRef, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";

interface ColorPickerTabProps {
  colors: Partial<ResumeSettings>;
  onChange: (settings: Partial<ResumeSettings>) => void;
  compact?: boolean;
}

const ColorPickerTab: React.FC<ColorPickerTabProps> = ({ 
  colors, 
  onChange,
  compact = false 
}) => {
  const [showPicker, setShowPicker] = useState<string | null>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const handleColorPickerToggle = (field: string) => {
    setShowPicker(showPicker === field ? null : field);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowPicker(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3")}>
        <div className="space-y-2">
          <Label htmlFor="primaryColor">Primary Color</Label>
          <div className="flex items-center">
            <div
              className="w-8 h-8 rounded border mr-2"
              style={{ backgroundColor: colors.primaryColor || '#5d4dcd' }}
              onClick={() => handleColorPickerToggle('primary')}
            />
            <Input
              id="primaryColor"
              value={colors.primaryColor || '#5d4dcd'}
              onChange={(e) => onChange({ primaryColor: e.target.value })}
              className="font-mono"
            />
            {showPicker === 'primary' && (
              <div className="absolute z-50 mt-2" ref={colorPickerRef}>
                <HexColorPicker
                  color={colors.primaryColor || '#5d4dcd'}
                  onChange={(color) => onChange({ primaryColor: color })}
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondaryColor">Secondary Color</Label>
          <div className="flex items-center">
            <div
              className="w-8 h-8 rounded border mr-2"
              style={{ backgroundColor: colors.secondaryColor || '#3a3a3c' }}
              onClick={() => handleColorPickerToggle('secondary')}
            />
            <Input
              id="secondaryColor"
              value={colors.secondaryColor || '#3a3a3c'}
              onChange={(e) => onChange({ secondaryColor: e.target.value })}
              className="font-mono"
            />
            {showPicker === 'secondary' && (
              <div className="absolute z-50 mt-2" ref={colorPickerRef}>
                <HexColorPicker
                  color={colors.secondaryColor || '#3a3a3c'}
                  onChange={(color) => onChange({ secondaryColor: color })}
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accentColor">Accent Color</Label>
          <div className="flex items-center">
            <div
              className="w-8 h-8 rounded border mr-2"
              style={{ backgroundColor: colors.accentColor || '#f7f7f7' }}
              onClick={() => handleColorPickerToggle('accent')}
            />
            <Input
              id="accentColor"
              value={colors.accentColor || '#f7f7f7'}
              onChange={(e) => onChange({ accentColor: e.target.value })}
              className="font-mono"
            />
            {showPicker === 'accent' && (
              <div className="absolute z-50 mt-2" ref={colorPickerRef}>
                <HexColorPicker
                  color={colors.accentColor || '#f7f7f7'}
                  onChange={(color) => onChange({ accentColor: color })}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerTab;
