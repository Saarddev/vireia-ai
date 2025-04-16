
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ResumeSettingsProps {
  settings: {
    fontFamily: string;
    fontSize: number;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    paperSize: string;
    margins: string;
  };
  onChange: (newSettings: any) => void;
}

const ResumeSettings: React.FC<ResumeSettingsProps> = ({ settings, onChange }) => {
  const [fontSizeValue, setFontSizeValue] = useState(settings.fontSize);
  
  const handleFontFamilyChange = (value: string) => {
    onChange({ ...settings, fontFamily: value });
  };

  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFontSizeValue(newSize);
    onChange({ ...settings, fontSize: newSize });
  };

  const handleColorChange = (color: string, type: 'primary' | 'secondary' | 'accent') => {
    onChange({ ...settings, [`${type}Color`]: color });
  };

  const handlePaperSizeChange = (value: string) => {
    onChange({ ...settings, paperSize: value });
  };

  const handleMarginsChange = (value: string) => {
    onChange({ ...settings, margins: value });
  };

  const ColorPicker = ({ 
    color, 
    onChange, 
    label 
  }: { 
    color: string; 
    onChange: (color: string) => void; 
    label: string 
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="w-full h-10 rounded-md border border-input flex items-center justify-between px-3 py-2 relative overflow-hidden group"
          >
            <span className="text-sm text-muted-foreground">{color}</span>
            <div className="flex space-x-2">
              <div
                className="w-5 h-5 rounded-full border shadow-sm"
                style={{ backgroundColor: color }}
              />
            </div>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" 
              style={{ backgroundColor: color }}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <HexColorPicker color={color} onChange={onChange} />
          <Input
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 mt-2"
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Resume Settings</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Customize how your resume looks. These settings will be applied to your exported PDF.
        </p>
      </div>

      <Tabs defaultValue="typography" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>
        
        <TabsContent value="typography" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <Select 
                value={settings.fontFamily} 
                onValueChange={handleFontFamilyChange}
              >
                <SelectTrigger id="font-family" className="w-full">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Open+Sans">Open Sans</SelectItem>
                  <SelectItem value="Lato">Lato</SelectItem>
                  <SelectItem value="Poppins">Poppins</SelectItem>
                  <SelectItem value="Montserrat">Montserrat</SelectItem>
                  <SelectItem value="Source+Sans+Pro">Source Sans Pro</SelectItem>
                  <SelectItem value="Playfair+Display">Playfair Display</SelectItem>
                  <SelectItem value="Merriweather">Merriweather</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="font-size">Font Size</Label>
                <span className="text-sm text-muted-foreground">{fontSizeValue}pt</span>
              </div>
              <Slider 
                id="font-size"
                min={8} 
                max={14} 
                step={0.5}
                value={[settings.fontSize]} 
                onValueChange={handleFontSizeChange}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4 mt-4">
          <div className="space-y-4">
            <ColorPicker
              color={settings.primaryColor}
              onChange={(color) => handleColorChange(color, 'primary')}
              label="Primary Color"
            />
            <ColorPicker
              color={settings.secondaryColor}
              onChange={(color) => handleColorChange(color, 'secondary')}
              label="Secondary Color"
            />
            <ColorPicker
              color={settings.accentColor}
              onChange={(color) => handleColorChange(color, 'accent')}
              label="Accent Color"
            />
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paper-size">Paper Size</Label>
              <Select 
                value={settings.paperSize} 
                onValueChange={handlePaperSizeChange}
              >
                <SelectTrigger id="paper-size" className="w-full">
                  <SelectValue placeholder="Select paper size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4</SelectItem>
                  <SelectItem value="letter">Letter</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Margins</Label>
              <RadioGroup 
                value={settings.margins}
                onValueChange={handleMarginsChange}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="narrow" id="narrow" />
                  <Label htmlFor="narrow">Narrow</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal">Normal</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="wide" id="wide" />
                  <Label htmlFor="wide">Wide</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeSettings;
