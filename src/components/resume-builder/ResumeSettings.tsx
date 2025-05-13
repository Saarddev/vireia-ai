
import React from 'react';
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import ColorPickerTab from './ColorPickerTab';
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";

// Update the ResumeSettings type to match and be compatible with the type from resume.ts
export interface ResumeSettings {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  margins: "narrow" | "normal" | "wide";
  primaryColor: string;
  secondaryColor?: string;
  showBullets?: boolean;
  showIcons?: boolean;
  paperSize: "a4" | "letter" | "legal";
}

const fontOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Garamond', label: 'Garamond' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Calibri', label: 'Calibri' },
];

const marginOptions = [
  { value: 'narrow', label: 'Narrow' },
  { value: 'normal', label: 'Normal' },
  { value: 'wide', label: 'Wide' },
];

const paperSizeOptions = [
  { value: 'a4', label: 'A4' },
  { value: 'letter', label: 'Letter' },
  { value: 'legal', label: 'Legal' },
];

interface ResumeSettingsProps {
  settings: Partial<ResumeSettings>;
  onChange: (settings: Partial<ResumeSettings>) => void;
  compact?: boolean;
}

const ResumeSettings: React.FC<ResumeSettingsProps> = ({ 
  settings = {}, 
  onChange,
  compact = false 
}) => {
  // Provide default values for required properties to prevent type errors
  const safeSettings: ResumeSettings = {
    fontFamily: settings.fontFamily || 'Inter',
    fontSize: settings.fontSize || 10,
    lineHeight: settings.lineHeight || 1.5,
    margins: settings.margins || 'normal',
    primaryColor: settings.primaryColor || '#5d4dcd',
    secondaryColor: settings.secondaryColor || '#6e59a5',
    showBullets: settings.showBullets !== undefined ? settings.showBullets : true,
    showIcons: settings.showIcons !== undefined ? settings.showIcons : true,
    paperSize: (settings.paperSize as "a4" | "letter" | "legal") || 'letter'
  };

  const handleFontSizeChange = (value: number[]) => {
    onChange({ fontSize: value[0] });
  };

  const handleLineHeightChange = (value: number[]) => {
    onChange({ lineHeight: value[0] });
  };

  return (
    <div className={cn("space-y-4", compact ? "text-sm" : "")}>
      <div className="space-y-2">
        <Label htmlFor="font-family">Font</Label>
        <Select 
          value={safeSettings.fontFamily} 
          onValueChange={(value) => onChange({ fontFamily: value })}
        >
          <SelectTrigger id="font-family" className={compact ? "h-8" : ""}>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map(font => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="font-size">Font Size: {safeSettings.fontSize}pt</Label>
        <Slider 
          id="font-size"
          value={[safeSettings.fontSize]} 
          min={8} 
          max={14} 
          step={0.5}
          onValueChange={handleFontSizeChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="line-height">Line Spacing: {safeSettings.lineHeight}</Label>
        <Slider 
          id="line-height"
          value={[safeSettings.lineHeight]} 
          min={1} 
          max={2} 
          step={0.1}
          onValueChange={handleLineHeightChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="margins">Margins</Label>
        <Select 
          value={safeSettings.margins} 
          onValueChange={(value: "narrow" | "normal" | "wide") => onChange({ margins: value })}
        >
          <SelectTrigger id="margins" className={compact ? "h-8" : ""}>
            <SelectValue placeholder="Select margins" />
          </SelectTrigger>
          <SelectContent>
            {marginOptions.map(margin => (
              <SelectItem key={margin.value} value={margin.value}>
                {margin.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="paper-size">Paper Size</Label>
        <Select 
          value={safeSettings.paperSize} 
          onValueChange={(value: "a4" | "letter" | "legal") => onChange({ paperSize: value })}
        >
          <SelectTrigger id="paper-size" className={compact ? "h-8" : ""}>
            <SelectValue placeholder="Select paper size" />
          </SelectTrigger>
          <SelectContent>
            {paperSizeOptions.map(size => (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Colors</Label>
        <Card className="p-3">
          <ColorPickerTab
            primaryColor={safeSettings.primaryColor}
            secondaryColor={safeSettings.secondaryColor || "#6e59a5"}
            onColorChange={(colors) => onChange(colors)}
          />
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="show-bullets" className="cursor-pointer">Show Bullets</Label>
        <Switch 
          id="show-bullets"
          checked={safeSettings.showBullets}
          onCheckedChange={(checked) => onChange({ showBullets: checked })}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="show-icons" className="cursor-pointer">Show Icons</Label>
        <Switch 
          id="show-icons"
          checked={safeSettings.showIcons}
          onCheckedChange={(checked) => onChange({ showIcons: checked })}
        />
      </div>
    </div>
  );
};

export default ResumeSettings;
