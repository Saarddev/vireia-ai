import React, { useState } from 'react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Briefcase, Plus, Trash2, GripVertical, ArrowUpDown, CalendarIcon, Wand2 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { v4 as uuidv4 } from 'uuid';
import AIHoverMenu from './AIHoverMenu';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  current?: boolean;
}

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
  onGenerateWithAI?: (text: string) => Promise<string>;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange, onGenerateWithAI }) => {
  const [experiences, setExperiences] = useState<Experience[]>(data);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const form = useForm({
    defaultValues: {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false
    }
  });

  const addExperience = () => {
    const newExperience: Experience = {
      id: uuidv4(),
      title: "New Position",
      company: "Company Name",
      location: "Location",
      startDate: "MM YYYY",
      endDate: "Present",
      description: "Describe your responsibilities and achievements",
    };
    
    const updatedExperiences = [...experiences, newExperience];
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
    setEditingId(newExperience.id);
    setExpandedId(newExperience.id);
  };

  const editExperience = (id: string, updatedExp: Partial<Experience>) => {
    const updatedExperiences = experiences.map(exp => 
      exp.id === id ? { ...exp, ...updatedExp } : exp
    );
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
  };

  const deleteExperience = (id: string) => {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
    if (editingId === id) setEditingId(null);
    if (expandedId === id) setExpandedId(null);
  };

  const startEditing = (exp: Experience) => {
    form.reset({
      title: exp.title,
      company: exp.company,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      current: exp.endDate === "Present"
    });
    setEditingId(exp.id);
  };

  const saveEditing = (id: string) => {
    const formData = form.getValues();
    editExperience(id, {
      title: formData.title,
      company: formData.company,
      location: formData.location,
      startDate: formData.startDate,
      endDate: formData.current ? "Present" : formData.endDate,
      description: formData.description,
      current: formData.current
    });
    setEditingId(null);
  };

  const moveExperience = (id: string, direction: 'up' | 'down') => {
    const index = experiences.findIndex(exp => exp.id === id);
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === experiences.length - 1)) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedExperiences = [...experiences];
    const temp = updatedExperiences[index];
    updatedExperiences[index] = updatedExperiences[newIndex];
    updatedExperiences[newIndex] = temp;
    
    setExperiences(updatedExperiences);
    onChange(updatedExperiences);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Briefcase className="mr-2 h-5 w-5 text-resume-purple" />
        Work Experience
      </h2>
      <p className="text-sm text-resume-gray mb-6">
        Add your work experience, starting with your most recent position
      </p>

      {experiences.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-md mb-4">
          <Briefcase className="h-10 w-10 text-resume-gray mx-auto mb-2" />
          <p className="text-resume-gray mb-4">No work experience added yet</p>
          <Button onClick={addExperience} className="bg-resume-purple">
            <Plus className="mr-2 h-4 w-4" /> Add Work Experience
          </Button>
        </div>
      )}

      {experiences.length > 0 && (
        <div className="space-y-4 mb-6">
          {experiences.map((exp) => (
            <Card key={exp.id} className="overflow-hidden">
              <div className="p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-800 border-b cursor-pointer"
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}>
                <div className="flex items-center gap-3">
                  <div className="flex-none">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{exp.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{exp.company}</p>
                  </div>
                  {exp.current && (
                    <Badge variant="outline" className="ml-2 text-xs border-resume-purple text-resume-purple">Current</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    moveExperience(exp.id, 'up');
                  }}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={(e) => {
                    e.stopPropagation();
                    deleteExperience(exp.id);
                  }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {expandedId === exp.id && (
                <div className="p-4">
                  {editingId === exp.id ? (
                    <Form {...form}>
                      <form className="space-y-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Job Title*</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Software Engineer" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company*</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Acme Inc." {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., New York, NY" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date*</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-9" placeholder="MM YYYY" {...field} />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <div className="space-y-2">
                            <FormField
                              control={form.control}
                              name="endDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End Date</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                      <Input 
                                        className="pl-9" 
                                        placeholder="MM YYYY" 
                                        {...field} 
                                        disabled={form.watch("current")}
                                        value={form.watch("current") ? "Present" : field.value}
                                      />
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="current-position" 
                                checked={form.watch("current")}
                                onCheckedChange={(checked) => form.setValue("current", checked)}
                              />
                              <Label htmlFor="current-position">Current Position</Label>
                            </div>
                          </div>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Description*</FormLabel>
                                <AIHoverMenu
                                  onImprove={() => {
                                    if (onGenerateWithAI) {
                                      onGenerateWithAI(field.value).then(improved => {
                                        field.onChange(improved);
                                      });
                                    }
                                  }}
                                  description="Enhance your job description with powerful action verbs and quantifiable achievements."
                                  trigger={
                                    <Button variant="ghost" size="sm" className="h-8 text-resume-purple">
                                      <Wand2 className="h-4 w-4" />
                                    </Button>
                                  }
                                />
                              </div>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your responsibilities and achievements" 
                                  className="min-h-[120px]"
                                  {...field} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end gap-2 pt-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            type="button" 
                            onClick={() => saveEditing(exp.id)}
                            className="bg-resume-purple"
                          >
                            Save
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Company</p>
                          <p className="font-medium">{exp.company}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Location</p>
                          <p>{exp.location}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Duration</p>
                          <p>{exp.startDate} - {exp.endDate}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="whitespace-pre-line">{exp.description}</p>
                      </div>
                      
                      <div className="flex justify-end pt-2">
                        <Button 
                          variant="outline" 
                          onClick={() => startEditing(exp)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
      
      <Button 
        onClick={addExperience} 
        variant="outline" 
        className="w-full border-dashed border-resume-purple/50 text-resume-purple hover:bg-resume-purple hover:text-white"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Another Position
      </Button>
      
      <Separator className="my-6" />
      
      <div className="rounded-md bg-purple-50 p-4">
        <div className="flex">
          <Wand2 className="h-5 w-5 text-resume-purple mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-resume-purple">AI Writing Assistant</h3>
            <p className="text-sm text-gray-500 mt-1">
              Need help crafting compelling job descriptions? Our AI can help you highlight your achievements using strong action verbs and metrics.
            </p>
            <Button className="mt-2 bg-white text-resume-purple border border-resume-purple hover:bg-resume-purple hover:text-white">
              <Wand2 className="mr-2 h-4 w-4" /> Generate Description
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;
