
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Palette, Type, Layout, FileText } from 'lucide-react';
import ColorPickerTab from './ColorPickerTab';

interface ResumeSettingsProps {
  settings: {
    template?: string;
    fontSize?: number;
    lineHeight?: number;
    showPhoto?: boolean;
    colors?: {
      primaryColor?: string;
      secondaryColor?: string;
      accentColor?: string;
    };
  };
  onSettingsChange: (settings: any) => void;
}

const ResumeSettings: React.FC<ResumeSettingsProps> = ({ settings, onSettingsChange }) => {
  const handleTemplateChange = (template: string) => {
    onSettingsChange({ ...settings, template });
  };

  const handleFontSizeChange = (fontSize: number[]) => {
    onSettingsChange({ ...settings, fontSize: fontSize[0] });
  };

  const handleLineHeightChange = (lineHeight: number[]) => {
    onSettingsChange({ ...settings, lineHeight: lineHeight[0] });
  };

  const handlePhotoToggle = (showPhoto: boolean) => {
    onSettingsChange({ ...settings, showPhoto });
  };

  const handleColorsChange = (colors: { primaryColor?: string; secondaryColor?: string; accentColor?: string }) => {
    onSettingsChange({ 
      ...settings, 
      colors: { 
        ...settings.colors, 
        ...colors 
      } 
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Resume Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="layout" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="layout" className="flex items-center gap-1">
              <Layout className="h-4 w-4" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-1">
              <Type className="h-4 w-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-1">
              <Palette className="h-4 w-4" />
              Colors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="layout" className="space-y-6 mt-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Template</Label>
              <Select value={settings.template || 'modern'} onValueChange={handleTemplateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-photo" className="text-sm font-medium">
                  Show Profile Photo
                </Label>
                <Switch
                  id="show-photo"
                  checked={settings.showPhoto || false}
                  onCheckedChange={handlePhotoToggle}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Display your profile photo on the resume
              </p>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6 mt-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Font Size: {settings.fontSize || 14}px
              </Label>
              <Slider
                value={[settings.fontSize || 14]}
                onValueChange={handleFontSizeChange}
                max={18}
                min={10}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Line Height: {settings.lineHeight || 1.5}
              </Label>
              <Slider
                value={[settings.lineHeight || 1.5]}
                onValueChange={handleLineHeightChange}
                max={2.0}
                min={1.0}
                step={0.1}
                className="w-full"
              />
            </div>
          </TabsContent>

          <TabsContent value="colors" className="mt-4">
            <ColorPickerTab 
              colors={settings.colors || {}}
              onChange={handleColorsChange}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResumeSettings;
