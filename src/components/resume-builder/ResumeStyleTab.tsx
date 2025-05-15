
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeSettings } from "@/types/resume";
import ColorPickerTab from './ColorPickerTab';
import TemplateSelector from './TemplateSelector';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Type, Layout } from 'lucide-react';

interface ResumeStyleTabProps {
  settings: ResumeSettings;
  onSettingsChange: (newSettings: Partial<ResumeSettings>) => void;
}

const ResumeStyleTab: React.FC<ResumeStyleTabProps> = ({ settings, onSettingsChange }) => {
  const [fontSize, setFontSize] = React.useState(settings.fontSize);
  
  const handleFontChange = (value: string) => {
    onSettingsChange({ fontFamily: value });
  };

  const handleFontSizeChange = (values: number[]) => {
    const newSize = values[0];
    setFontSize(newSize);
    onSettingsChange({ fontSize: newSize });
  };

  const handlePaperSizeChange = (value: string) => {
    onSettingsChange({ paperSize: value });
  };

  const handleMarginsChange = (value: string) => {
    onSettingsChange({ margins: value });
  };

  const handleColorChange = (color: string, type: 'primary' | 'secondary' | 'accent') => {
    const key = `${type}Color` as keyof ResumeSettings;
    onSettingsChange({ [key]: color } as Partial<ResumeSettings>);
  };

  const handleTemplateSelect = (template: string) => {
    onSettingsChange({ template });
  };

  return (
    <div className="px-4 py-2 space-y-6">
      <Tabs defaultValue="template" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="template" className="text-xs">Template</TabsTrigger>
          <TabsTrigger value="colors" className="text-xs">Colors</TabsTrigger>
          <TabsTrigger value="typography" className="text-xs">Typography</TabsTrigger>
        </TabsList>
        
        <TabsContent value="template" className="pt-4">
          <TemplateSelector 
            selectedTemplate={settings.template || 'modern'} 
            onSelect={handleTemplateSelect}
          />

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Layout className="h-4 w-4 text-resume-purple" />
              <h3 className="font-medium">Layout Options</h3>
            </div>

            <div className="space-y-2">
              <Label>Paper Size</Label>
              <Select 
                value={settings.paperSize || 'letter'} 
                onValueChange={handlePaperSizeChange}
              >
                <SelectTrigger className="w-full">
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
                value={settings.margins || 'normal'} 
                onValueChange={handleMarginsChange}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="narrow" id="narrow" />
                  <Label htmlFor="narrow" className="text-sm">Narrow</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="text-sm">Normal</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="wide" id="wide" />
                  <Label htmlFor="wide" className="text-sm">Wide</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="colors" className="pt-4">
          <ColorPickerTab
            colors={{
              primaryColor: settings.primaryColor || '#5d4dcd',
              secondaryColor: settings.secondaryColor || '#9b87f5',
              accentColor: settings.accentColor || '#e5deff'
            }}
            onChange={handleColorChange}
          />
        </TabsContent>
        
        <TabsContent value="typography" className="pt-4 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Type className="h-4 w-4 text-resume-purple" />
            <h3 className="font-medium">Typography</h3>
          </div>
          
          <div className="space-y-2">
            <Label>Font Family</Label>
            <Select 
              value={settings.fontFamily || 'Inter'} 
              onValueChange={handleFontChange}
            >
              <SelectTrigger className="w-full">
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
              <Label>Font Size</Label>
              <span className="text-sm text-muted-foreground">{fontSize}pt</span>
            </div>
            <Slider 
              min={8} 
              max={14} 
              step={0.5} 
              value={[fontSize]} 
              onValueChange={handleFontSizeChange}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeStyleTab;
