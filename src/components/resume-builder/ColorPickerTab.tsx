
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { Palette, RotateCcw } from 'lucide-react';

interface ColorPickerTabProps {
  colors: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  onChange: (colors: { primaryColor?: string; secondaryColor?: string; accentColor?: string }) => void;
}

const ColorPickerTab: React.FC<ColorPickerTabProps> = ({ colors, onChange }) => {
  const [activeColor, setActiveColor] = React.useState<'primary' | 'secondary' | 'accent'>('primary');

  const handleColorChange = (color: string) => {
    const updates = {
      primaryColor: activeColor === 'primary' ? color : undefined,
      secondaryColor: activeColor === 'secondary' ? color : undefined,
      accentColor: activeColor === 'accent' ? color : undefined,
    };
    
    // Filter out undefined values
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );
    
    onChange(filteredUpdates);
  };

  const resetToDefaults = () => {
    onChange({
      primaryColor: '#5d4dcd',
      secondaryColor: '#333333',
      accentColor: '#d6bcfa'
    });
  };

  const currentColor = colors[`${activeColor}Color` as keyof typeof colors];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Color Customization</h3>
          <p className="text-sm text-muted-foreground">
            Customize your resume colors to match your personal brand
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={resetToDefaults}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Color Selection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Select Color Type</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={activeColor === 'primary' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveColor('primary')}
                  className="flex items-center gap-2"
                >
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: colors.primaryColor }}
                  />
                  Primary
                </Button>
                <Button
                  variant={activeColor === 'secondary' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveColor('secondary')}
                  className="flex items-center gap-2"
                >
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: colors.secondaryColor }}
                  />
                  Secondary
                </Button>
                <Button
                  variant={activeColor === 'accent' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveColor('accent')}
                  className="flex items-center gap-2"
                >
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: colors.accentColor }}
                  />
                  Accent
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Color Picker</Label>
              <div className="w-full max-w-xs mx-auto">
                <HexColorPicker
                  color={currentColor}
                  onChange={handleColorChange}
                  style={{ width: '100%', height: '200px' }}
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Label>Hex:</Label>
                <input
                  type="text"
                  value={currentColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="flex-1 px-3 py-1 border rounded text-sm"
                  placeholder="#000000"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Color Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border" style={{ backgroundColor: colors.primaryColor }}>
                <div className="text-white font-semibold">Primary Color</div>
                <div className="text-white/80 text-sm">Headers and accents</div>
              </div>
              <div className="p-4 rounded-lg border" style={{ backgroundColor: colors.secondaryColor }}>
                <div className="text-white font-semibold">Secondary Color</div>
                <div className="text-white/80 text-sm">Body text and details</div>
              </div>
              <div className="p-4 rounded-lg border" style={{ backgroundColor: colors.accentColor }}>
                <div className="text-gray-800 font-semibold">Accent Color</div>
                <div className="text-gray-600 text-sm">Highlights and borders</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorPickerTab;
