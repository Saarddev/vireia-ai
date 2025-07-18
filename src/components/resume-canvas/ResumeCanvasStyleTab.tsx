
import React from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from '@/components/ui/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Type, LayoutTemplate, Palette } from 'lucide-react';
import ColorPickerTab from '../resume-builder/ColorPickerTab';
import { ResumeSettings } from '@/types/resume';
import { toast } from '@/hooks/use-toast';

interface ResumeCanvasStyleTabProps {
  settings: ResumeSettings;
  onSettingsChange: (settings: Partial<ResumeSettings>) => void;
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional design with a modern touch.',
    image: 'https://cdn.sanity.io/images/mrfd4see/production/7bee3ab82621809917eb51dcc2f65d2cac32ebb5-1024x1024.jpg?w=2000&fit=max&auto=format'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Classic and traditional layout for formal applications.',
    image: 'https://cdn.sanity.io/images/mrfd4see/production/65b061ed4d6eff782eb44904ce5ada83ecd7cadf-1024x1024.jpg?w=2000&fit=max&auto=format'
  },
  {
    id: 'customizable',
    name: 'Customizable',
    description: 'Let your creativity shine with a customizable template.',
    image: 'https://cdn.sanity.io/images/mrfd4see/production/5ce30c8c48bcf7879a2629428e9d2bd93311e2c7-1024x1024.jpg?w=2000&fit=max&auto=format',
    new: true
  }
];

const ResumeCanvasStyleTab: React.FC<ResumeCanvasStyleTabProps> = ({
  settings,
  onSettingsChange,
  selectedTemplate,
  onTemplateChange
}) => {
  const handleTemplateSelect = (templateId: string) => {
    // Update both the template and settings
    onTemplateChange(templateId);
    onSettingsChange({ template: templateId });

    toast({
      title: "Template changed",
      description: `Resume template updated to ${templateId.charAt(0).toUpperCase() + templateId.slice(1)}`,
    });
  };

  const handleColorChange = (colors: { primaryColor?: string, secondaryColor?: string, accentColor?: string }) => {
    // Update colors in settings directly as individual properties
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
            <LayoutTemplate className="h-4 w-4" />
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
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Choose Template</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select a template that best fits your style and industry
              </p>
            </div>

            <RadioGroup
              value={selectedTemplate}
              onValueChange={handleTemplateSelect}
              className="grid grid-cols-1 gap-4"
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
                    className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className="overflow-hidden rounded-md border border-gray-200 w-16 h-20 relative flex-shrink-0">
                        <Image
                          src={template.image}
                          alt={template.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium relative flex items-center">
                          {template.name}
                          {template.new && (
                            <span className="ml-2 bg-[#5d4dcd] text-white text-xs px-2 py-0.5 rounded">
                              WIP
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {template.description}
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </TabsContent>

        <TabsContent value="colors" className="mt-4">
          <ColorPickerTab
            colors={{
              primaryColor: settings.primaryColor || '#5d4dcd',
              secondaryColor: settings.secondaryColor || '#333333',
              accentColor: settings.accentColor || '#d6bcfa'
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
                value={settings.fontFamily || 'Inter'}
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
                <span className="text-sm text-muted-foreground">{settings.fontSize || 11}pt</span>
              </div>
              <input
                id="font-size"
                type="range"
                min={8}
                max={14}
                step={0.5}
                value={settings.fontSize || 11}
                onChange={(e) => handleFontSizeChange([parseFloat(e.target.value)])}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paper-size">Paper Size</Label>
              <select
                id="paper-size"
                value={settings.paperSize || 'letter'}
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
