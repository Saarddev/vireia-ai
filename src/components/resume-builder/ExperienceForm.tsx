import React, { useState, useEffect } from 'react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, CalendarIcon } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import AIHoverToolkit from "@/components/AIHoverToolkit";

interface ExperienceFormProps {
  data: any[];
  onChange: (data: any[]) => void;
  onGenerateWithAI: (text: string) => Promise<string>;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ 
  data, 
  onChange,
  onGenerateWithAI
}) => {
  const [experiences, setExperiences] = useState(data);
  const [openFields, setOpenFields] = useState<Record<number | string, boolean>>({});
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    setExperiences(data);
  }, [data]);

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setExperiences([...experiences, newExperience]);
    setOpenFields({ ...openFields, [newExperience.id]: true });
    setUnsavedChanges(true);
  };

  const removeExperience = (id: number) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    onChange(updatedExperiences);
    setExperiences(updatedExperiences);
    const { [id]: removed, ...rest } = openFields;
    setOpenFields(rest);
    setUnsavedChanges(true);
  };

  const updateExperience = (id: number, field: string, value: any) => {
    const updatedExperiences = experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
    setUnsavedChanges(true);
  };

  const toggleField = (id: number) => {
    setOpenFields({ ...openFields, [id]: !openFields[id] });
  };

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, 'MM/yyyy') : '';
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
      <p className="text-sm text-resume-gray mb-6">
        Showcase your work history, highlighting key responsibilities and achievements
      </p>

      {experiences.map((experience) => (
        <Card key={experience.id} className="mb-4">
          <div className="flex items-center justify-between p-4">
            <h3 className="text-lg font-medium">{experience.title || 'Untitled'}</h3>
            <div className="flex items-center gap-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={() => toggleField(experience.id)}
              >
                {openFields[experience.id] ? 'Collapse' : 'Expand'}
              </Button>
              <Button 
                type="button" 
                variant="destructive" 
                size="sm"
                onClick={() => removeExperience(experience.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>

          {openFields[experience.id] && (
            <Card className="p-4 bg-purple-50 border-t border-resume-purple/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormLabel>Job Title*</FormLabel>
                  <Input
                    type="text"
                    placeholder="Software Engineer"
                    value={experience.title || ''}
                    onChange={(e) => updateExperience(experience.id, 'title', e.target.value)}
                  />
                </div>
                <div>
                  <FormLabel>Company*</FormLabel>
                  <Input
                    type="text"
                    placeholder="Acme Corp"
                    value={experience.company || ''}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  />
                </div>
                <div>
                  <FormLabel>Location</FormLabel>
                  <Input
                    type="text"
                    placeholder="New York, NY"
                    value={experience.location || ''}
                    onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <div>
                    <FormLabel>Start Date*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !experience.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {experience.startDate ? formatDate(new Date(experience.startDate)) : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <DatePicker
                          mode="single"
                          date={experience.startDate ? new Date(experience.startDate) : undefined}
                          onSelect={(date) => updateExperience(experience.id, 'startDate', date?.toISOString())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !experience.endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {experience.endDate ? formatDate(new Date(experience.endDate)) : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <DatePicker
                          mode="single"
                          date={experience.endDate ? new Date(experience.endDate) : undefined}
                          onSelect={(date) => updateExperience(experience.id, 'endDate', date?.toISOString())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="mt-4 relative">
                <FormLabel>Job Description*</FormLabel>
                <div className="relative group">
                  <Textarea
                    placeholder="Describe your responsibilities and achievements"
                    className="min-h-[100px] resize-none"
                    value={experience.description || ''}
                    onChange={(e) => {
                      updateExperience(experience.id, 'description', e.target.value);
                      setUnsavedChanges(true);
                    }}
                  />
                  <div className={`absolute -top-10 left-0 z-10 transform transition-all duration-300 ease-out ${
                    openFields[experience.id + '_toolbar'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}>
                    {onGenerateWithAI && (
                      <AIHoverToolkit 
                        onComplete={async () => {
                          try {
                            const result = await onGenerateWithAI(experience.description || "");
                            if (result) {
                              updateExperience(experience.id, 'description', result);
                              setUnsavedChanges(true);
                            }
                            return result || "";
                          } catch (error) {
                            console.error('Error enhancing description:', error);
                            return "";
                          }
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </Card>
      ))}

      <Button type="button" variant="outline" onClick={addExperience} className="w-full justify-center gap-2">
        <Plus className="h-4 w-4" />
        Add Experience
      </Button>
    </div>
  );
};

export default ExperienceForm;
