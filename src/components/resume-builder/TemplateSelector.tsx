
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from '../ui/image';
import { FileImage } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelect: (template: string) => void;
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

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate,
  onSelect
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <FileImage className="h-4 w-4 text-resume-purple" />
        <h3 className="font-medium">Resume Templates</h3>
      </div>

      <RadioGroup 
        value={selectedTemplate} 
        onValueChange={(value) => onSelect(value)}
        className="grid grid-cols-3 gap-3"
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
              className={cn(
                "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2",
                "hover:bg-accent hover:text-accent-foreground",
                "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                "cursor-pointer transition-all duration-200"
              )}
            >
              <div className="mb-2 overflow-hidden rounded-md border border-gray-200 w-full h-24 relative">
                <Image
                  src={template.image}
                  alt={template.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full text-center">
                <div className="font-medium relative text-sm">
                  {template.name}
                  {template.new && (
                    <span className="absolute -top-1 -right-4 bg-resume-purple text-white text-xs px-1 py-0.5 rounded">
                      NEW
                    </span>
                  )}
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
