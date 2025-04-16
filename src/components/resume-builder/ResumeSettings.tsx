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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorPickerTab from './ColorPickerTab';
import { Type, Layout, Palette } from 'lucide-react';

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

  const handleColorChange = (color: string, type: 'primary' | 'secondary' | 'accent') => {
    onChange({ ...settings, [`${type}Color`]: color });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Resume Settings</h2>
        <p className="text-sm text-muted-foreground">
          Customize your resume's appearance and layout.
        </p>
      </div>

      <Tabs defaultValue="typography" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <span>Type</span>
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Colors</span>
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            <span>Layout</span>
          </TabsTrigger>
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

        <TabsContent value="colors" className="mt-4">
          <ColorPickerTab 
            colors={{
              primaryColor: settings.primaryColor,
              secondaryColor: settings.secondaryColor,
              accentColor: settings.accentColor
            }}
            onChange={handleColorChange}
          />
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
