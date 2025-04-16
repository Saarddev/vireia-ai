
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
import { cn } from "@/lib/utils";

interface ResumeSettingsProps {
  settings: {
    fontFamily: string;
    fontSize: number;
    primaryColor: string;
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

  const handleColorChange = (color: string) => {
    onChange({ ...settings, primaryColor: color });
  };

  const handlePaperSizeChange = (value: string) => {
    onChange({ ...settings, paperSize: value });
  };

  const handleMarginsChange = (value: string) => {
    onChange({ ...settings, margins: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Resume Settings</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Customize how your resume looks. These settings will be applied to your exported PDF.
        </p>
      </div>

      {/* Font Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Typography</h3>
        
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
            defaultValue={[settings.fontSize]} 
            onValueChange={handleFontSizeChange}
          />
        </div>
      </div>

      {/* Color Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Colors</h3>
        
        <div className="space-y-2">
          <Label>Primary Color</Label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="w-full h-10 rounded-md border border-input flex items-center justify-between px-3 py-2"
                style={{ backgroundColor: settings.primaryColor }}
              >
                <span className="text-white shadow-sm">{settings.primaryColor}</span>
                <div
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: settings.primaryColor }}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3">
              <HexColorPicker color={settings.primaryColor} onChange={handleColorChange} />
              <div className="flex mt-2">
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="h-8"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Layout Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Layout</h3>
        
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
            defaultValue={settings.margins}
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
    </div>
  );
};

export default ResumeSettings;
