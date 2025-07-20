
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from '../ui/image';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelect: (template: string) => void;
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

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelect
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-3">Template Selection</h2>
        <p className="text-sm text-muted-foreground">
          Choose a template that best represents your style and experience
        </p>
      </div>

      <RadioGroup
        value={selectedTemplate}
        onValueChange={(value) => onSelect(value)}
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
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
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
    </div>
  );
};

export default TemplateSelector;
