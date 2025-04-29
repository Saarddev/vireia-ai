
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { 
  UserRound, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Code, 
  LayoutPanelLeft, 
  Settings, 
  Wand2,
  CloudLightning,
  Loader,
  Search,
  ScrollText,
  MapPin,
  Award,
  Globe,
  FolderKanban,
  PenTool,
  Palette
} from 'lucide-react';

interface BuilderSidebarProps {
  progress: number;
  activeSection: string;
  aiEnabled: boolean;
  aiGenerating: boolean;
  onSectionChange: (section: string) => void;
  onGenerateWithAI?: () => Promise<void>;
}

const BuilderSidebar: React.FC<BuilderSidebarProps> = ({
  progress,
  activeSection,
  aiEnabled,
  aiGenerating,
  onSectionChange,
  onGenerateWithAI
}) => {
  return (
    <>
      <SidebarHeader className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-resume-purple dark:text-resume-purple-light font-display">
            Resume Builder
          </h3>
          <SidebarTrigger />
        </div>
        
        <div className="flex gap-2 items-center bg-muted/30 rounded-lg p-2">
          <Progress 
            value={progress} 
            className="h-2" 
            indicatorClassName="bg-resume-purple"
          />
          <span className="text-xs font-medium text-muted-foreground">{progress}%</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Resume Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "personal"}
                  onClick={() => onSectionChange("personal")}
                >
                  <UserRound className="h-4 w-4 text-resume-purple" />
                  <span>Personal Info</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "summary"}
                  onClick={() => onSectionChange("summary")}
                >
                  <ScrollText className="h-4 w-4 text-resume-purple" />
                  <span>Summary</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "experience"}
                  onClick={() => onSectionChange("experience")}
                >
                  <Briefcase className="h-4 w-4 text-resume-purple" />
                  <span>Experience</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "education"}
                  onClick={() => onSectionChange("education")}
                >
                  <GraduationCap className="h-4 w-4 text-resume-purple" />
                  <span>Education</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "skills"}
                  onClick={() => onSectionChange("skills")}
                >
                  <Award className="h-4 w-4 text-resume-purple" />
                  <span>Skills</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "projects"}
                  onClick={() => onSectionChange("projects")}
                >
                  <FolderKanban className="h-4 w-4 text-resume-purple" />
                  <span>Projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "languages"}
                  onClick={() => onSectionChange("languages")}
                >
                  <Globe className="h-4 w-4 text-resume-purple" />
                  <span>Languages</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Customization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "templates"}
                  onClick={() => onSectionChange("templates")}
                >
                  <LayoutPanelLeft className="h-4 w-4 text-resume-purple" />
                  <span>Templates</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "settings"}
                  onClick={() => onSectionChange("settings")}
                >
                  <Settings className="h-4 w-4 text-resume-purple" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "design"}
                  onClick={() => onSectionChange("design")}
                >
                  <Palette className="h-4 w-4 text-resume-purple" />
                  <span>Design</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "ai"}
                  onClick={() => onSectionChange("ai")}
                  className={cn(
                    "w-full gap-2",
                    activeSection === "ai" ? "text-resume-purple" : "text-muted-foreground"
                  )}
                >
                  <div className="relative">
                    <Wand2 className="h-4 w-4" />
                    {aiEnabled && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-resume-purple rounded-full" />
                    )}
                  </div>
                  <span>AI Assistant</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-3">
        <Button 
          variant="outline" 
          size="sm"
          className={cn(
            "w-full justify-center gap-2 border-resume-purple/20 text-resume-purple",
            "hover:bg-resume-purple/10 hover:border-resume-purple transition-all duration-300",
            "dark:border-resume-purple-light/20 dark:text-resume-purple-light dark:hover:bg-resume-purple-light/10",
            aiGenerating && "animate-pulse"
          )}
          onClick={onGenerateWithAI}
          disabled={aiGenerating || !aiEnabled}
        >
          {aiGenerating ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4" />
              <span>Generate with AI</span>
            </>
          )}
        </Button>
      </SidebarFooter>
    </>
  );
};

export default BuilderSidebar;
