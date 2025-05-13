import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import ColorPickerTab from './ColorPickerTab';

interface ResumeSettings {
  fontFamily: string;
  fontSize: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  paperSize: string;
  margins: string;
}

interface ResumeSettingsProps {
  settings: ResumeSettings;
  onChange: (settings: Partial<ResumeSettings>) => void;
  compact?: boolean;
}

const fontOptions = [
  { value: "Inter", label: "Inter" },
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Courier New", label: "Courier New" },
];

const paperSizeOptions = [
  { value: "letter", label: "Letter (8.5 x 11 in)" },
  { value: "a4", label: "A4 (210 x 297 mm)" },
];

const marginOptions = [
  { value: "normal", label: "Normal" },
  { value: "narrow", label: "Narrow" },
  { value: "wide", label: "Wide" },
];

const ResumeSettings: React.FC<ResumeSettingsProps> = ({ 
  settings, 
  onChange,
  compact = false 
}) => {
  return (
    <div className="space-y-6">
      {!compact && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Resume Settings</h2>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of your resume
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fontFamily">Font Family</Label>
          <Select
            value={settings.fontFamily || "Inter"}
            onValueChange={(value) => onChange({ fontFamily: value })}
          >
            <SelectTrigger id="fontFamily">
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fontSize">Font Size: {settings.fontSize || 11}pt</Label>
          <Slider
            id="fontSize"
            min={8}
            max={14}
            step={0.5}
            value={[settings.fontSize || 11]}
            onValueChange={(value) => onChange({ fontSize: value[0] })}
          />
        </div>

        <ColorPickerTab 
          colors={settings}
          onChange={onChange}
          compact={compact}
        />

        <div className="space-y-2">
          <Label htmlFor="paperSize">Paper Size</Label>
          <Select
            value={settings.paperSize || "letter"}
            onValueChange={(value) => onChange({ paperSize: value })}
          >
            <SelectTrigger id="paperSize">
              <SelectValue placeholder="Select a paper size" />
            </SelectTrigger>
            <SelectContent>
              {paperSizeOptions.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="margins">Margins</Label>
          <Select
            value={settings.margins || "normal"}
            onValueChange={(value) => onChange({ margins: value })}
          >
            <SelectTrigger id="margins">
              <SelectValue placeholder="Select margins" />
            </SelectTrigger>
            <SelectContent>
              {marginOptions.map((margin) => (
                <SelectItem key={margin.value} value={margin.value}>
                  {margin.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ResumeSettings;
