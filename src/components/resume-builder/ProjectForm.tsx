import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription
} from "@/components/ui/form";
import { Code, ArrowUpDown, GripVertical } from "lucide-react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Project } from '@/types/resume.d';
import { cn } from '@/lib/utils';

interface ProjectFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ data = [], onChange }) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(data.length > 0 ? 0 : -1);
  
  const form = useForm({
    defaultValues: {
      projects: data
    }
  });

  const handleAddProject = () => {
    const newProject = {
      id: uuidv4(),
      title: "",
      description: "",
      technologies: [],
      link: "",
      startDate: "",
      endDate: ""
    };
    
    const updatedProjects = [...data, newProject];
    onChange(updatedProjects);
    setActiveProjectIndex(updatedProjects.length - 1);
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = [...data];
    updatedProjects.splice(index, 1);
    onChange(updatedProjects);
    
    if (activeProjectIndex >= updatedProjects.length) {
      setActiveProjectIndex(updatedProjects.length - 1);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    
    const updatedProjects = [...data];
    const temp = updatedProjects[index - 1];
    updatedProjects[index - 1] = updatedProjects[index];
    updatedProjects[index] = temp;
    
    onChange(updatedProjects);
    setActiveProjectIndex(index - 1);
  };

  const handleMoveDown = (index: number) => {
    if (index >= data.length - 1) return;
    
    const updatedProjects = [...data];
    const temp = updatedProjects[index + 1];
    updatedProjects[index + 1] = updatedProjects[index];
    updatedProjects[index] = temp;
    
    onChange(updatedProjects);
    setActiveProjectIndex(index + 1);
  };

  const handleFieldChange = (index: number, field: string, value: string | string[]) => {
    const updatedProjects = [...data];
    (updatedProjects[index] as any)[field] = value;
    onChange(updatedProjects);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Code className="mr-2 h-5 w-5 text-resume-purple" />
        Projects
      </h2>
      <p className="text-sm text-resume-gray mb-6">
        Add your notable projects, including personal and professional work
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {data.map((project, index) => (
          <Button
            key={project.id}
            type="button"
            variant={activeProjectIndex === index ? "default" : "outline"}
            size="sm"
            className={activeProjectIndex === index ? "bg-resume-purple" : ""}
            onClick={() => setActiveProjectIndex(index)}
          >
            {project.title || `Project ${index + 1}`}
          </Button>
        ))}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-dashed border-resume-purple text-resume-purple"
          onClick={handleAddProject}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Project
        </Button>
      </div>
      
      {activeProjectIndex >= 0 && activeProjectIndex < data.length && (
        <Card className="border border-gray-200">
          <CardContent className="pt-6">
            <Form {...form}>
              <form className="space-y-4">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveUp(activeProjectIndex)}
                    disabled={activeProjectIndex <= 0}
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoveDown(activeProjectIndex)}
                    disabled={activeProjectIndex >= data.length - 1}
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveProject(activeProjectIndex)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <FormItem>
                    <FormLabel>Project Title*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g. E-commerce Platform"
                        value={data[activeProjectIndex]?.title || ""}
                        onChange={(e) => handleFieldChange(activeProjectIndex, "title", e.target.value)}
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the project, its goals, and your role..."
                        value={data[activeProjectIndex]?.description || ""}
                        onChange={(e) => handleFieldChange(activeProjectIndex, "description", e.target.value)}
                        className="min-h-[120px]"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Technologies Used</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="React, Node.js, MongoDB (comma separated)"
                        value={data[activeProjectIndex]?.technologies.join(", ") || ""}
                        onChange={(e) => handleFieldChange(activeProjectIndex, "technologies", 
                          e.target.value.split(",").map(tech => tech.trim()).filter(Boolean)
                        )}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter technologies separated by commas
                    </FormDescription>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Project Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/yourusername/project"
                        value={data[activeProjectIndex]?.link || ""}
                        onChange={(e) => handleFieldChange(activeProjectIndex, "link", e.target.value)}
                      />
                    </FormControl>
                  </FormItem>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MM YYYY"
                          value={data[activeProjectIndex]?.startDate || ""}
                          onChange={(e) => handleFieldChange(activeProjectIndex, "startDate", e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>End Date (or "Present")</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MM YYYY or Present"
                          value={data[activeProjectIndex]?.endDate || ""}
                          onChange={(e) => handleFieldChange(activeProjectIndex, "endDate", e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      
      {data.length === 0 && (
        <div className="text-center py-8">
          <Code className="h-12 w-12 mx-auto text-resume-purple/40" />
          <p className="mt-4 text-resume-gray">No projects added yet</p>
          <Button
            type="button"
            className="mt-4 bg-resume-purple"
            onClick={handleAddProject}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
