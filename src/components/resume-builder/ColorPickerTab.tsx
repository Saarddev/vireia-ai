
import React from 'react';
import { ChromePicker } from 'react-color';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

export interface ColorPickerTabProps {
  primaryColor: string;
  secondaryColor: string;
  onColorChange: (colors: any) => void;
}

const ColorPickerTab: React.FC<ColorPickerTabProps> = ({
  primaryColor,
  secondaryColor,
  onColorChange
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="primary-color">Primary Color</Label>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="primary-color"
                variant="outline"
                className="w-8 h-8 p-0"
                style={{ backgroundColor: primaryColor }}
              >
                <span className="sr-only">Pick primary color</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <ChromePicker
                color={primaryColor}
                onChange={(color) => onColorChange({ primaryColor: color.hex, secondaryColor })}
              />
            </PopoverContent>
          </Popover>
          <span className="text-sm text-muted-foreground">{primaryColor}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="secondary-color">Secondary Color</Label>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="secondary-color"
                variant="outline"
                className="w-8 h-8 p-0"
                style={{ backgroundColor: secondaryColor }}
              >
                <span className="sr-only">Pick secondary color</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <ChromePicker
                color={secondaryColor}
                onChange={(color) => onColorChange({ primaryColor, secondaryColor: color.hex })}
              />
            </PopoverContent>
          </Popover>
          <span className="text-sm text-muted-foreground">{secondaryColor}</span>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerTab;
