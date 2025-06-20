
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
  Loader,
  FolderKanban
} from 'lucide-react';

interface BuilderSidebarProps {
  progress: number;
  activeSection: string;
  aiEnabled: boolean;
  aiGenerating: boolean;
  onSectionChange: (section: string) => void;
  onGenerateWithAI?: () => void;
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
      <SidebarHeader className="px-5 py-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent font-display">
            Cadina AI
          </h3>
          <SidebarTrigger />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500">Completion</span>
            <span className="text-xs font-medium text-gray-500">{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 bg-gray-100" 
            indicatorClassName="bg-gradient-to-r from-purple-600 to-indigo-500"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 font-medium px-5">
            Resume Sections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "personal"}
                  onClick={() => onSectionChange("personal")}
                  className={cn(
                    "transition-all duration-200 flex items-center gap-3 px-5 py-2.5 rounded-lg",
                    activeSection === "personal" 
                      ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 font-medium" 
                      : "hover:bg-gray-50"
                  )}
                >
                  <UserRound className={cn(
                    "h-4 w-4 transition-colors",
                    activeSection === "personal" ? "text-purple-500" : "text-gray-500"
                  )} />
                  <span>Personal Info</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "summary"}
                  onClick={() => onSectionChange("summary")}
                  className={cn(
                    "transition-all duration-200 flex items-center gap-3 px-5 py-2.5 rounded-lg",
                    activeSection === "summary" 
                      ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 font-medium" 
                      : "hover:bg-gray-50"
                  )}
                >
                  <FileText className={cn(
                    "h-4 w-4 transition-colors",
                    activeSection === "summary" ? "text-purple-500" : "text-gray-500"
                  )} />
                  <span>Summary</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "experience"}
                  onClick={() => onSectionChange("experience")}
                  className={cn(
                    "transition-all duration-200 flex items-center gap-3 px-5 py-2.5 rounded-lg",
                    activeSection === "experience" 
                      ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 font-medium" 
                      : "hover:bg-gray-50"
                  )}
                >
                  <Briefcase className={cn(
                    "h-4 w-4 transition-colors",
                    activeSection === "experience" ? "text-purple-500" : "text-gray-500"
                  )} />
                  <span>Experience</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "education"}
                  onClick={() => onSectionChange("education")}
                  className={cn(
                    "transition-all duration-200 flex items-center gap-3 px-5 py-2.5 rounded-lg",
                    activeSection === "education" 
                      ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 font-medium" 
                      : "hover:bg-gray-50"
                  )}
                >
                  <GraduationCap className={cn(
                    "h-4 w-4 transition-colors",
                    activeSection === "education" ? "text-purple-500" : "text-gray-500"
                  )} />
                  <span>Education</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "skills"}
                  onClick={() => onSectionChange("skills")}
                  className={cn(
                    "transition-all duration-200 flex items-center gap-3 px-5 py-2.5 rounded-lg",
                    activeSection === "skills" 
                      ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 font-medium" 
                      : "hover:bg-gray-50"
                  )}
                >
                  <Code className={cn(
                    "h-4 w-4 transition-colors",
                    activeSection === "skills" ? "text-purple-500" : "text-gray-500"
                  )} />
                  <span>Skills</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "projects"}
                  onClick={() => onSectionChange("projects")}
                  className={cn(
                    "transition-all duration-200 flex items-center gap-3 px-5 py-2.5 rounded-lg",
                    activeSection === "projects" 
                      ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 font-medium" 
                      : "hover:bg-gray-50"
                  )}
                >
                  <FolderKanban className={cn(
                    "h-4 w-4 transition-colors",
                    activeSection === "projects" ? "text-purple-500" : "text-gray-500"
                  )} />
                  <span>Projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator className="my-4" />
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 font-medium px-5">
            Customization
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "templates"}
                  onClick={() => onSectionChange("templates")}
                  className={cn(
                    "transition-all duration-200 flex items-center gap-3 px-5 py-2.5 rounded-lg",
                    activeSection === "templates" 
                      ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 font-medium" 
                      : "hover:bg-gray-50"
                  )}
                >
                  <LayoutPanelLeft className={cn(
                    "h-4 w-4 transition-colors",
                    activeSection === "templates" ? "text-purple-500" : "text-gray-500"
                  )} />
                  <span>Templates</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "settings"}
                  onClick={() => onSectionChange("settings")}
                  className={cn(
                    "transition-all duration-200 flex items-center gap-3 px-5 py-2.5 rounded-lg",
                    activeSection === "settings" 
                      ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 font-medium" 
                      : "hover:bg-gray-50"
                  )}
                >
                  <Settings className={cn(
                    "h-4 w-4 transition-colors",
                    activeSection === "settings" ? "text-purple-500" : "text-gray-500"
                  )} />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === "ai"}
                  onClick={() => onSectionChange("ai")}
                  className={cn(
                    "transition-all duration-200 flex items-center gap-3 px-5 py-2.5 rounded-lg",
                    activeSection === "ai" 
                      ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 font-medium" 
                      : "hover:bg-gray-50"
                  )}
                >
                  <div className="relative">
                    <Wand2 className={cn(
                      "h-4 w-4 transition-colors",
                      activeSection === "ai" ? "text-purple-500" : "text-gray-500"
                    )} />
                    {aiEnabled && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full" />
                    )}
                  </div>
                  <span>Cadina AI</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          size="sm"
          className={cn(
            "w-full justify-center gap-2 border border-transparent",
            "bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200",
            "text-purple-600 font-medium",
            "transition-all duration-300 shadow-sm",
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
              <span>Generate with Cadina AI</span>
            </>
          )}
        </Button>
      </SidebarFooter>
    </>
  );
};

export default BuilderSidebar;
