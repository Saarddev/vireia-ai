
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ChromePicker } from 'react-color';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface ColorPickerTabProps {
  colors: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  onChange: (colors: { primaryColor?: string; secondaryColor?: string; accentColor?: string }) => void;
}

const ColorPickerTab: React.FC<ColorPickerTabProps> = ({ colors, onChange }) => {
  const handleColorChange = (colorType: 'primaryColor' | 'secondaryColor' | 'accentColor', color: string) => {
    onChange({ [colorType]: color });
  };

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Color Scheme</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="primary-color">Primary Color</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-12 h-8 p-0"
                  style={{ backgroundColor: colors.primaryColor }}
                >
                  <span className="sr-only">Pick primary color</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <ChromePicker
                  color={colors.primaryColor}
                  onChange={(colorResult) => handleColorChange('primaryColor', colorResult.hex)}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="secondary-color">Secondary Color</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-12 h-8 p-0"
                  style={{ backgroundColor: colors.secondaryColor }}
                >
                  <span className="sr-only">Pick secondary color</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <ChromePicker
                  color={colors.secondaryColor}
                  onChange={(colorResult) => handleColorChange('secondaryColor', colorResult.hex)}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="accent-color">Accent Color</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-12 h-8 p-0"
                  style={{ backgroundColor: colors.accentColor }}
                >
                  <span className="sr-only">Pick accent color</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <ChromePicker
                  color={colors.accentColor}
                  onChange={(colorResult) => handleColorChange('accentColor', colorResult.hex)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ColorPickerTab;
