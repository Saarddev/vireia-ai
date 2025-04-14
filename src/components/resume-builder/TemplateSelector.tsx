
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutPanelLeft, Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelect: (template: string) => void;
}

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and professional with a touch of color",
    image: "/placeholder.svg"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional format favored by recruiters",
    image: "/placeholder.svg"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Unique design for standing out in creative fields",
    image: "/placeholder.svg"
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Simple and elegant with focus on content",
    image: "/placeholder.svg"
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior positions",
    image: "/placeholder.svg"
  },
  {
    id: "technical",
    name: "Technical",
    description: "Optimized for technical roles with skills focus",
    image: "/placeholder.svg"
  }
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate, 
  onSelect 
}) => {
  const form = useForm({
    defaultValues: {
      template: selectedTemplate
    }
  });

  const handleTemplateChange = (value: string) => {
    onSelect(value);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <LayoutPanelLeft className="mr-2 h-5 w-5 text-resume-purple" />
        Resume Templates
      </h2>
      <p className="text-sm text-resume-gray mb-6">
        Choose a template that fits your industry and personal style
      </p>

      <Form {...form}>
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleTemplateChange(value);
                  }}
                  defaultValue={field.value}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {templates.map((template) => (
                    <FormItem key={template.id} className="space-y-0">
                      <FormControl>
                        <RadioGroupItem value={template.id} className="sr-only" />
                      </FormControl>
                      <FormLabel className="cursor-pointer">
                        <Card 
                          className={`overflow-hidden h-full transition-all ${
                            selectedTemplate === template.id 
                              ? 'ring-2 ring-resume-purple shadow-md' 
                              : 'hover:border-resume-purple/50'
                          }`}
                        >
                          <div className="relative aspect-[3/4] w-full bg-gray-100">
                            <img 
                              src={template.image} 
                              alt={template.name} 
                              className="w-full h-full object-cover"
                            />
                            {selectedTemplate === template.id && (
                              <div className="absolute inset-0 bg-resume-purple/20 flex items-center justify-center">
                                <div className="bg-resume-purple rounded-full p-2">
                                  <Check className="h-5 w-5 text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium">{template.name}</h3>
                            <p className="text-xs text-resume-gray mt-1">{template.description}</p>
                          </div>
                        </Card>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </Form>

      <div className="mt-8">
        <p className="text-center text-sm text-resume-gray mb-2">
          Can't find the perfect template?
        </p>
        <Button variant="outline" className="w-full">
          Browse more templates
        </Button>
      </div>
    </div>
  );
};

export default TemplateSelector;
