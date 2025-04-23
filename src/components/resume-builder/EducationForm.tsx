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
import { GraduationCap, Plus, Trash2, GripVertical, ArrowUpDown, CalendarIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { v4 as uuidv4 } from 'uuid';

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  field?: string;
  level?: string;
}

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
  onGenerateWithAI?: (section: string) => Promise<string>;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onChange, onGenerateWithAI }) => {
  const [educations, setEducations] = useState<Education[]>(data);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const form = useForm({
    defaultValues: {
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    }
  });

  const addEducation = () => {
    const newEducation: Education = {
      id: uuidv4(),
      degree: "Degree Name",
      institution: "Institution Name",
      location: "Location",
      startDate: "MM YYYY",
      endDate: "MM YYYY",
      description: "Describe your studies, achievements, and relevant coursework"
    };
    
    const updatedEducations = [...educations, newEducation];
    setEducations(updatedEducations);
    onChange(updatedEducations);
    setEditingId(newEducation.id);
    setExpandedId(newEducation.id);
  };

  const editEducation = (id: string, updatedEdu: Partial<Education>) => {
    const updatedEducations = educations.map(edu => 
      edu.id === id ? { ...edu, ...updatedEdu } : edu
    );
    setEducations(updatedEducations);
    onChange(updatedEducations);
  };

  const deleteEducation = (id: string) => {
    const updatedEducations = educations.filter(edu => edu.id !== id);
    setEducations(updatedEducations);
    onChange(updatedEducations);
    if (editingId === id) setEditingId(null);
    if (expandedId === id) setExpandedId(null);
  };

  const startEditing = (edu: Education) => {
    form.reset({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: edu.description
    });
    setEditingId(edu.id);
  };

  const saveEditing = (id: string) => {
    const formData = form.getValues();
    editEducation(id, {
      degree: formData.degree,
      institution: formData.institution,
      location: formData.location,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description
    });
    setEditingId(null);
  };

  const moveEducation = (id: string, direction: 'up' | 'down') => {
    const index = educations.findIndex(edu => edu.id === id);
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === educations.length - 1)) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedEducations = [...educations];
    const temp = updatedEducations[index];
    updatedEducations[index] = updatedEducations[newIndex];
    updatedEducations[newIndex] = temp;
    
    setEducations(updatedEducations);
    onChange(updatedEducations);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <GraduationCap className="mr-2 h-5 w-5 text-resume-purple" />
        Education
      </h2>
      <p className="text-sm text-resume-gray mb-6">
        Add your educational background, starting with your most recent degree
      </p>

      {data.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-md mb-4">
          <GraduationCap className="h-10 w-10 text-resume-gray mx-auto mb-2" />
          <p className="text-resume-gray mb-4">No education history added yet</p>
          <Button onClick={addEducation} className="bg-resume-purple">
            <Plus className="mr-2 h-4 w-4" /> Add Education
          </Button>
        </div>
      )}

      {data.length > 0 && (
        <div className="space-y-4 mb-6">
          {data.map((edu, index) => (
            <Card key={edu.id} className="overflow-hidden">
              <div className="p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-800 border-b cursor-pointer"
                onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}>
                <div className="flex items-center gap-3">
                  <div className="flex-none">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{edu.degree}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{edu.institution}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    moveEducation(edu.id, 'up');
                  }}>
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={(e) => {
                    e.stopPropagation();
                    deleteEducation(edu.id);
                  }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {expandedId === edu.id && (
                <div className="p-4">
                  {editingId === edu.id ? (
                    <Form {...form}>
                      <form className="space-y-4">
                        <FormField
                          control={form.control}
                          name="degree"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Degree*</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <EditableField
                                    value={field.value}
                                    placeholder="e.g., Bachelor of Science in Computer Science"
                                    className="w-full px-3 py-2 border rounded-md"
                                    onSave={field.onChange}
                                    onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-${index}-degree`) : undefined}
                                  />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="institution"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Institution*</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Stanford University" {...field} />
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
                                  <Input placeholder="e.g., Stanford, CA" {...field} />
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
                          
                          <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>End Date (or Expected)</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input className="pl-9" placeholder="MM YYYY" {...field} />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <EditableField
                                  value={field.value}
                                  placeholder="Describe your major, GPA, honors, key courses, thesis, etc."
                                  className="w-full min-h-[120px] px-3 py-2 border rounded-md"
                                  onSave={field.onChange}
                                  onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-${index}-description`) : undefined}
                                  minRows={2}
                                  maxRows={4}
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
                            onClick={() => saveEditing(edu.id)}
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
                          <p className="text-sm font-medium text-gray-500">Institution</p>
                          <p className="font-medium">{edu.institution}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Location</p>
                          <p>{edu.location}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Duration</p>
                          <p>{edu.startDate} - {edu.endDate}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="whitespace-pre-line">{edu.description}</p>
                      </div>
                      
                      <div className="flex justify-end pt-2">
                        <Button 
                          variant="outline" 
                          onClick={() => startEditing(edu)}
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
        onClick={addEducation} 
        variant="outline" 
        className="w-full border-dashed border-resume-purple/50 text-resume-purple hover:bg-resume-purple hover:text-white"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Another Education
      </Button>
    </div>
  );
};

export default EducationForm;
