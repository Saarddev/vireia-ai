
import React from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from '@/components/ui/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Type, Layout, Palette } from 'lucide-react';
import ColorPickerTab from '../resume-builder/ColorPickerTab';
import { ResumeSettings } from '@/types/resume';
import { toast } from '@/components/ui/use-toast';

interface ResumeCanvasStyleTabProps {
  settings: ResumeSettings;
  onSettingsChange: (settings: Partial<ResumeSettings>) => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional design with a modern touch.',
    image: '/placeholder.svg'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Classic and traditional layout for formal applications.',
    image: '/placeholder.svg'
  },
  {
    id: 'customizable',
    name: 'Customizable',
    description: 'Fully customizable template with adjustable segments.',
    image: '/placeholder.svg',
    new: true
  }
];

const ResumeCanvasStyleTab: React.FC<ResumeCanvasStyleTabProps> = ({ 
  settings, 
  onSettingsChange 
}) => {
  const handleTemplateSelect = (templateId: string) => {
    onSettingsChange({ template: templateId });
    toast({
      title: "Template changed",
      description: `Resume template updated to ${templateId.charAt(0).toUpperCase() + templateId.slice(1)}`,
    });
  };

  const handleColorChange = (colors: { primaryColor?: string, secondaryColor?: string, accentColor?: string }) => {
    onSettingsChange(colors);
  };

  const handleFontFamilyChange = (value: string) => {
    onSettingsChange({ fontFamily: value });
  };

  const handleFontSizeChange = (values: number[]) => {
    onSettingsChange({ fontSize: values[0] });
  };

  const handlePaperSizeChange = (value: string) => {
    onSettingsChange({ paperSize: value });
  };

  const handleMarginsChange = (value: string) => {
    onSettingsChange({ margins: value });
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h2 className="text-xl font-semibold mb-3">Style Settings</h2>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of your resume
        </p>
      </div>
      
      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            <span>Templates</span>
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Colors</span>
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <span>Typography</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-4 mt-4">
          <RadioGroup 
            value={settings.template} 
            onValueChange={handleTemplateSelect}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {templates.map((template) => (
              <div key={template.id} className="relative">
                <RadioGroupItem
                  value={template.id}
                  id={`template-${template.id}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`template-${template.id}`}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <div className="mb-3 overflow-hidden rounded-md border border-gray-200 w-full h-40 relative">
                    <Image
                      src={template.image}
                      alt={template.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="w-full text-center">
                    <div className="font-medium relative">
                      {template.name}
                      {template.new && (
                        <span className="absolute -top-1 -right-8 bg-resume-purple text-white text-xs px-1 py-0.5 rounded">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {template.description}
                    </div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
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
        
        <TabsContent value="typography" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <select 
                id="font-family"
                value={settings.fontFamily} 
                onChange={(e) => handleFontFamilyChange(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open+Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Poppins">Poppins</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Source+Sans+Pro">Source Sans Pro</option>
                <option value="Playfair+Display">Playfair Display</option>
                <option value="Merriweather">Merriweather</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="font-size">Font Size</Label>
                <span className="text-sm text-muted-foreground">{settings.fontSize}pt</span>
              </div>
              <input 
                id="font-size"
                type="range"
                min={8}
                max={14}
                step={0.5}
                value={settings.fontSize} 
                onChange={(e) => handleFontSizeChange([parseFloat(e.target.value)])}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paper-size">Paper Size</Label>
              <select 
                id="paper-size"
                value={settings.paperSize} 
                onChange={(e) => handlePaperSizeChange(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="legal">Legal</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Margins</Label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="narrow" 
                    name="margins" 
                    value="narrow"
                    checked={settings.margins === "narrow"} 
                    onChange={() => handleMarginsChange("narrow")}
                  />
                  <Label htmlFor="narrow">Narrow</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="normal" 
                    name="margins" 
                    value="normal"
                    checked={settings.margins === "normal"} 
                    onChange={() => handleMarginsChange("normal")}
                  />
                  <Label htmlFor="normal">Normal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="wide" 
                    name="margins" 
                    value="wide"
                    checked={settings.margins === "wide"} 
                    onChange={() => handleMarginsChange("wide")}
                  />
                  <Label htmlFor="wide">Wide</Label>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeCanvasStyleTab;
