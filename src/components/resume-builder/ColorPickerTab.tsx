
import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, RotateCcw } from 'lucide-react';

interface ColorPickerTabProps {
  colors: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
  };
  onChange: (colors: { primaryColor?: string; secondaryColor?: string; accentColor?: string }) => void;
}

const defaultColors = {
  primaryColor: '#5d4dcd',
  secondaryColor: '#333333',
  accentColor: '#d6bcfa'
};

const ColorPickerTab: React.FC<ColorPickerTabProps> = ({ colors, onChange }) => {
  const handleColorChange = (colorType: 'primary' | 'secondary' | 'accent', color: string) => {
    const colorKey = `${colorType}Color` as keyof typeof colors;
    onChange({ [colorKey]: color });
  };

  const resetToDefaults = () => {
    onChange(defaultColors);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Color Customization</h3>
        </div>
        <Button variant="outline" size="sm" onClick={resetToDefaults}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Primary Color</Label>
              <div className="flex items-center gap-4">
                <HexColorPicker 
                  color={colors.primaryColor || defaultColors.primaryColor} 
                  onChange={(color) => handleColorChange('primary', color)}
                />
                <div className="flex flex-col gap-2">
                  <div 
                    className="w-16 h-16 rounded-lg border-2 border-gray-200"
                    style={{ backgroundColor: colors.primaryColor || defaultColors.primaryColor }}
                  />
                  <div className="text-xs font-mono text-center">
                    {colors.primaryColor || defaultColors.primaryColor}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Secondary Color</Label>
              <div className="flex items-center gap-4">
                <HexColorPicker 
                  color={colors.secondaryColor || defaultColors.secondaryColor} 
                  onChange={(color) => handleColorChange('secondary', color)}
                />
                <div className="flex flex-col gap-2">
                  <div 
                    className="w-16 h-16 rounded-lg border-2 border-gray-200"
                    style={{ backgroundColor: colors.secondaryColor || defaultColors.secondaryColor }}
                  />
                  <div className="text-xs font-mono text-center">
                    {colors.secondaryColor || defaultColors.secondaryColor}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <Label className="text-sm font-medium">Accent Color</Label>
              <div className="flex items-center gap-4">
                <HexColorPicker 
                  color={colors.accentColor || defaultColors.accentColor} 
                  onChange={(color) => handleColorChange('accent', color)}
                />
                <div className="flex flex-col gap-2">
                  <div 
                    className="w-16 h-16 rounded-lg border-2 border-gray-200"
                    style={{ backgroundColor: colors.accentColor || defaultColors.accentColor }}
                  />
                  <div className="text-xs font-mono text-center">
                    {colors.accentColor || defaultColors.accentColor}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorPickerTab;
