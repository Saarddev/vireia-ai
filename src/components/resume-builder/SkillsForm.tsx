
import React, { useState } from 'react';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Code, X, Plus, Wand2, Loader } from 'lucide-react';
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Skills {
  technical: string[];
  soft: string[];
}

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
  onExtractSkills?: () => Promise<void>;
  isGenerating?: boolean;
  onGenerateWithAI?: (text: string) => Promise<any>;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ 
  data, 
  onChange, 
  onExtractSkills,
  isGenerating = false,
  onGenerateWithAI
}) => {
  const [skills, setSkills] = useState<Skills>(data);
  const [activeTab, setActiveTab] = useState<string>("technical");
  const [newSkill, setNewSkill] = useState<string>("");
  
  const form = useForm({
    defaultValues: {
      newTechnicalSkill: "",
      newSoftSkill: ""
    }
  });

  const handleAddSkill = (type: 'technical' | 'soft') => {
    if (!newSkill.trim()) return;
    
    const updatedSkills = { ...skills };
    
    if (!updatedSkills[type].includes(newSkill)) {
      updatedSkills[type] = [...updatedSkills[type], newSkill];
      setSkills(updatedSkills);
      onChange(updatedSkills);
    }
    
    setNewSkill("");
  };

  const handleRemoveSkill = (type: 'technical' | 'soft', skillToRemove: string) => {
    const updatedSkills = {
      ...skills,
      [type]: skills[type].filter(skill => skill !== skillToRemove)
    };
    
    setSkills(updatedSkills);
    onChange(updatedSkills);
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: 'technical' | 'soft') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(type);
    }
  };

  const suggestedTechnicalSkills = [
    "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Node.js",
    "Python", "Java", "C#", "Ruby", "PHP", "SQL", "NoSQL", "MongoDB",
    "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Git",
    "REST API", "GraphQL", "HTML", "CSS", "SASS", "Redux", "Express.js"
  ];

  const suggestedSoftSkills = [
    "Communication", "Teamwork", "Problem Solving", "Time Management",
    "Adaptability", "Leadership", "Creativity", "Critical Thinking",
    "Conflict Resolution", "Emotional Intelligence", "Presentation Skills",
    "Project Management", "Mentoring", "Negotiation", "Customer Service"
  ];

  const handleSuggestedSkillClick = (skill: string) => {
    setNewSkill(skill);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Code className="mr-2 h-5 w-5 text-resume-purple" />
        Skills
      </h2>
      <p className="text-sm text-resume-gray mb-6">
        Add your technical and soft skills to showcase your capabilities
      </p>
      
      <Card className="p-4 bg-purple-50 border-resume-purple mb-6">
        <div className="flex">
          <Wand2 className="h-5 w-5 text-resume-purple mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-resume-purple">AI Skills Extraction</h3>
            <p className="text-sm text-gray-500 mt-1">
              Let our AI analyze your experience and automatically extract relevant skills for your profile.
            </p>
            <Button 
              className="mt-2 bg-white text-resume-purple border border-resume-purple hover:bg-resume-purple hover:text-white transition-colors duration-300"
              onClick={onExtractSkills}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Extracting Skills...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Extract Skills
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="technical">Technical Skills</TabsTrigger>
          <TabsTrigger value="soft">Soft Skills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="technical" className="space-y-4">
          <div className="flex items-center">
            <div className="relative flex-1">
              <Input
                placeholder="Add a technical skill (e.g., Python, JavaScript, SQL)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'technical')}
                className="pr-20"
              />
              {newSkill && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setNewSkill("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button
              onClick={() => handleAddSkill('technical')}
              disabled={!newSkill.trim()}
              className="ml-2 bg-resume-purple"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {skills.technical.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="flex items-center gap-1 py-2 group hover:bg-resume-purple hover:text-white"
              >
                {skill}
                <X 
                  className="h-3 w-3 cursor-pointer opacity-60 group-hover:opacity-100" 
                  onClick={() => handleRemoveSkill('technical', skill)}
                />
              </Badge>
            ))}
            {skills.technical.length === 0 && (
              <p className="text-sm text-resume-gray">No technical skills added yet</p>
            )}
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <p className="text-sm font-medium mb-2">Suggested Technical Skills:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedTechnicalSkills
                .filter(skill => !skills.technical.includes(skill))
                .slice(0, 10)
                .map((skill, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-resume-purple hover:text-white transition-colors"
                    onClick={() => handleSuggestedSkillClick(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="soft" className="space-y-4">
          <div className="flex items-center">
            <div className="relative flex-1">
              <Input
                placeholder="Add a soft skill (e.g., Communication, Leadership)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'soft')}
                className="pr-20"
              />
              {newSkill && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setNewSkill("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button
              onClick={() => handleAddSkill('soft')}
              disabled={!newSkill.trim()}
              className="ml-2 bg-resume-purple"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {skills.soft.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="flex items-center gap-1 py-2 group hover:bg-resume-purple hover:text-white"
              >
                {skill}
                <X 
                  className="h-3 w-3 cursor-pointer opacity-60 group-hover:opacity-100" 
                  onClick={() => handleRemoveSkill('soft', skill)}
                />
              </Badge>
            ))}
            {skills.soft.length === 0 && (
              <p className="text-sm text-resume-gray">No soft skills added yet</p>
            )}
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <p className="text-sm font-medium mb-2">Suggested Soft Skills:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedSoftSkills
                .filter(skill => !skills.soft.includes(skill))
                .slice(0, 10)
                .map((skill, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-resume-purple hover:text-white transition-colors"
                    onClick={() => handleSuggestedSkillClick(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Tips for showcasing skills:</h3>
        <ul className="list-disc list-inside text-sm text-resume-gray space-y-1">
          <li>Include 8-12 relevant technical skills for your target role</li>
          <li>Prioritize skills mentioned in the job description</li>
          <li>Include both technical tools and methodologies</li>
          <li>Don't forget to include soft skills that demonstrate your workplace effectiveness</li>
          <li>Be honest about your proficiency level - you may be asked about any skill on your resume</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsForm;
