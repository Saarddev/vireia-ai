
import React from 'react';
import { ResumeData } from '@/types/resume';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { 
  UserRound, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderKanban,
  Languages
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ResumeContentTabProps {
  data: ResumeData;
  activeSection: string;
  onSectionChange: (section: string) => void;
  aiEnabled?: boolean;
}

const ResumeContentTab: React.FC<ResumeContentTabProps> = ({
  data,
  activeSection,
  onSectionChange,
  aiEnabled = false
}) => {
  // Calculate completeness for each section
  const calculateCompleteness = (section: string): number => {
    switch(section) {
      case 'personal':
        const personalFields = Object.values(data.personal).filter(Boolean).length;
        return Math.round((personalFields / 7) * 100);
      case 'summary':
        return data.summary ? 100 : 0;
      case 'experience':
        return data.experience.length > 0 ? 100 : 0;
      case 'education':
        return data.education.length > 0 ? 100 : 0;
      case 'skills':
        const hasSkills = (data.skills.technical.length > 0 || data.skills.soft.length > 0);
        return hasSkills ? 100 : 0;
      case 'projects':
        return data.projects.length > 0 ? 100 : 0;
      case 'languages':
        return data.languages.length > 0 ? 100 : 0;
      default:
        return 0;
    }
  };

  // Menu items config
  const sections = [
    { id: 'personal', label: 'Personal Info', icon: UserRound },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'languages', label: 'Languages', icon: Languages }
  ];

  return (
    <div className="px-4 py-2">
      <SidebarMenu>
        {sections.map((section) => {
          const completeness = calculateCompleteness(section.id);
          const Icon = section.icon;
          
          return (
            <SidebarMenuItem key={section.id}>
              <SidebarMenuButton 
                isActive={activeSection === section.id}
                onClick={() => onSectionChange(section.id)}
                className={cn(
                  "transition-all duration-200 flex items-center justify-between gap-3 py-2.5 rounded-lg",
                  activeSection === section.id 
                    ? "bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 font-medium" 
                    : "hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn(
                    "h-4 w-4 transition-colors",
                    activeSection === section.id ? "text-purple-500" : "text-gray-500"
                  )} />
                  <span>{section.label}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {completeness > 0 && (
                    <Badge 
                      variant={completeness === 100 ? "default" : "outline"}
                      className={cn(
                        "text-xs px-1.5 py-0 h-5",
                        completeness === 100 
                          ? "bg-green-500" 
                          : "border-amber-500 text-amber-500"
                      )}
                    >
                      {completeness}%
                    </Badge>
                  )}
                  {aiEnabled && section.id !== 'personal' && (
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full" />
                  )}
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </div>
  );
};

export default ResumeContentTab;
