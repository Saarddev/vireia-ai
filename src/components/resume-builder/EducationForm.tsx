
import React, { useState } from 'react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  GraduationCap, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown,
  Wand2, 
  Calendar,
  Building2,
  BookOpen,
  Text
} from 'lucide-react';
import { useForm } from "react-hook-form";
import AIHoverToolkit from "@/components/AIHoverToolkit";
import { v4 as uuidv4 } from 'uuid';

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate: string;
  description?: string;
  level?: string;
}

interface EducationFormProps {
  data: EducationItem[];
  onChange: (data: EducationItem[]) => void;
  onGenerateWithAI?: (section: string) => Promise<string>;
}

const EducationForm: React.FC<EducationFormProps> = ({ 
  data, 
  onChange,
  onGenerateWithAI
}) => {
  const [activeEducationIndex, setActiveEducationIndex] = useState(data.length > 0 ? 0 : -1);
  const [hoverToolkitField, setHoverToolkitField] = useState("");
  
  const form = useForm({
    defaultValues: {
      education: data
    }
  });

  const handleAddEducation = () => {
    const newEducation = {
      id: uuidv4(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      level: "Bachelor's"
    };
    
    const updatedEducation = [...data, newEducation];
    onChange(updatedEducation);
    setActiveEducationIndex(updatedEducation.length - 1);
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = [...data];
    updatedEducation.splice(index, 1);
    onChange(updatedEducation);
    
    if (activeEducationIndex >= updatedEducation.length) {
      setActiveEducationIndex(updatedEducation.length - 1);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    
    const updatedEducation = [...data];
    const temp = updatedEducation[index - 1];
    updatedEducation[index - 1] = updatedEducation[index];
    updatedEducation[index] = temp;
    
    onChange(updatedEducation);
    setActiveEducationIndex(index - 1);
  };

  const handleMoveDown = (index: number) => {
    if (index >= data.length - 1) return;
    
    const updatedEducation = [...data];
    const temp = updatedEducation[index + 1];
    updatedEducation[index + 1] = updatedEducation[index];
    updatedEducation[index] = temp;
    
    onChange(updatedEducation);
    setActiveEducationIndex(index + 1);
  };

  const handleFieldChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...data];
    (updatedEducation[index] as any)[field] = value;
    onChange(updatedEducation);
  };

  const generateWithAI = async (field: string) => {
    if (!onGenerateWithAI) return "";
    
    try {
      const result = await onGenerateWithAI(`education-${activeEducationIndex}-${field}`);
      if (result) {
        handleFieldChange(activeEducationIndex, field, result);
      }
      return result;
    } catch (error) {
      console.error("Error generating with AI:", error);
      return "";
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <GraduationCap className="mr-2 h-5 w-5 text-resume-purple" />
        Education
      </h2>
      <p className="text-sm text-resume-gray mb-6">
        Add your educational background, including degrees, institutions, and relevant coursework
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {data.map((education, index) => (
          <Button
            key={education.id || index}
            type="button"
            variant={activeEducationIndex === index ? "default" : "outline"}
            size="sm"
            className={activeEducationIndex === index ? "bg-resume-purple" : ""}
            onClick={() => setActiveEducationIndex(index)}
          >
            {education.institution || education.degree || `Education ${index + 1}`}
          </Button>
        ))}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-dashed border-resume-purple text-resume-purple"
          onClick={handleAddEducation}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Education
        </Button>
      </div>
      
      {activeEducationIndex >= 0 && activeEducationIndex < data.length && (
        <Card className="border border-gray-200">
          <CardContent className="pt-6">
            <Form {...form}>
              <form className="space-y-4">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveUp(activeEducationIndex)}
                    disabled={activeEducationIndex <= 0}
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveDown(activeEducationIndex)}
                    disabled={activeEducationIndex >= data.length - 1}
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveEducation(activeEducationIndex)}
                    disabled={data.length <= 1}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormItem className="relative">
                    <FormLabel>Institution*</FormLabel>
                    <div 
                      className="relative group"
                      onMouseEnter={() => setHoverToolkitField("institution")}
                      onMouseLeave={() => setHoverToolkitField("")}
                    >
                      <div className={`absolute -top-12 right-0 z-10 transform transition-opacity transition-transform duration-300 ease-out ${hoverToolkitField === "institution" ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                        <AIHoverToolkit 
                          onComplete={async () => generateWithAI("institution")}
                          icon={<Building2 className="h-3.5 w-3.5" />}
                          label="Generate Institution"
                        />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="E.g. Harvard University"
                          value={data[activeEducationIndex]?.institution || ""}
                          onChange={(e) => handleFieldChange(activeEducationIndex, "institution", e.target.value)}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                  
                  <FormItem className="relative">
                    <FormLabel>Degree*</FormLabel>
                    <div 
                      className="relative group"
                      onMouseEnter={() => setHoverToolkitField("degree")}
                      onMouseLeave={() => setHoverToolkitField("")}
                    >
                      <div className={`absolute -top-12 right-0 z-10 transform transition-opacity transition-transform duration-300 ease-out ${hoverToolkitField === "degree" ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                        <AIHoverToolkit 
                          onComplete={async () => generateWithAI("degree")}
                          icon={<BookOpen className="h-3.5 w-3.5" />}
                          label="Generate Degree"
                        />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="E.g. Bachelor of Science"
                          value={data[activeEducationIndex]?.degree || ""}
                          onChange={(e) => handleFieldChange(activeEducationIndex, "degree", e.target.value)}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Field of Study</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g. Computer Science"
                        value={data[activeEducationIndex]?.field || ""}
                        onChange={(e) => handleFieldChange(activeEducationIndex, "field", e.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                  
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g. Cambridge, MA"
                        value={data[activeEducationIndex]?.location || ""}
                        onChange={(e) => handleFieldChange(activeEducationIndex, "location", e.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MM YYYY"
                          value={data[activeEducationIndex]?.startDate || ""}
                          onChange={(e) => handleFieldChange(activeEducationIndex, "startDate", e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                  
                  <div className="relative">
                    <FormItem>
                      <FormLabel>End Date (or "Present")</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MM YYYY or Present"
                          value={data[activeEducationIndex]?.endDate || ""}
                          onChange={(e) => handleFieldChange(activeEducationIndex, "endDate", e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                </div>

                <div className="relative group">
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Dates</FormLabel>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => generateWithAI("dates")}
                        className="h-7 text-xs text-resume-purple hover:text-white hover:bg-resume-purple"
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        Generate Dates
                      </Button>
                    </div>
                    <FormDescription>
                      Fill start and end dates automatically
                    </FormDescription>
                  </FormItem>
                </div>
                
                <FormItem className="relative">
                  <div className="flex justify-between items-center">
                    <FormLabel>Description</FormLabel>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => generateWithAI("description")}
                      className="h-7 text-xs text-resume-purple hover:text-white hover:bg-resume-purple"
                    >
                      <Text className="h-3 w-3 mr-1" />
                      Generate Description
                    </Button>
                  </div>
                  <div 
                    className="relative group"
                    onMouseEnter={() => setHoverToolkitField("description")}
                    onMouseLeave={() => setHoverToolkitField("")}
                  >
                    <div className={`absolute -top-12 right-0 z-10 transform transition-opacity transition-transform duration-300 ease-out ${hoverToolkitField === "description" ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                      <AIHoverToolkit 
                        onComplete={async () => generateWithAI("description")}
                        icon={<Wand2 className="h-3.5 w-3.5" />}
                        label="Generate Description"
                      />
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your academic achievements, relevant coursework, honors, etc."
                        value={data[activeEducationIndex]?.description || ""}
                        onChange={(e) => handleFieldChange(activeEducationIndex, "description", e.target.value)}
                        className="min-h-[120px] resize-none"
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Focus on achievements, relevant coursework, and academic distinctions.
                  </FormDescription>
                </FormItem>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      
      {data.length === 0 && (
        <div className="text-center py-8">
          <GraduationCap className="h-12 w-12 mx-auto text-resume-purple/40" />
          <p className="mt-4 text-resume-gray">No education added yet</p>
          <Button
            type="button"
            className="mt-4 bg-resume-purple"
            onClick={handleAddEducation}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Education
          </Button>
        </div>
      )}
    </div>
  );
};

export default EducationForm;
