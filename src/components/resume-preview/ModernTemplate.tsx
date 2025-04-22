
import React from 'react';
import { cn } from "@/lib/utils";
import EditableField from './EditableField';
import { Mail, Phone, MapPin, Linkedin, Globe, Award, Briefcase, BookOpen } from 'lucide-react';

interface ModernTemplateProps {
  data: any;
  settings?: any;
  onUpdateData?: (section: string, value: any) => void;
  onGenerateWithAI?: (section: string) => Promise<void>;
}

const placeholderMap = {
  name: "Enter your name",
  title: "Your professional title",
  email: "Email address",
  phone: "Phone number",
  location: "City, State",
  linkedin: "LinkedIn URL",
  website: "Personal website",
  summary: "Add a professional summary...",
  expTitle: "Job Title",
  expDate: "MM/YYYY - Present",
  expCompanyLoc: "Company, Location",
  expDesc: "Describe your responsibilities and achievements...",
  eduDegree: "Degree",
  eduDate: "YYYY - YYYY",
  eduInstLoc: "Institution, Location",
  eduDesc: "Add details about your education...",
  skillsTech: "JavaScript, React, NodeJS...",
  skillsSoft: "Leadership, Communication..."
};

const ModernTemplate: React.FC<ModernTemplateProps> = ({
  data,
  settings = {},
  onUpdateData,
  onGenerateWithAI
}) => {
  const handleFieldUpdate = (section: string, field: string, value: string) => {
    if (onUpdateData) {
      onUpdateData(section, { ...data[section], [field]: value });
    }
  };

  const handleNestedFieldUpdate = (section: string, index: number, field: string, value: string) => {
    if (onUpdateData) {
      const updatedItems = [...data[section]];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value
      };
      onUpdateData(section, updatedItems);
    }
  };

  const wrapAIPromise = (sectionKey: string): (() => Promise<string | undefined>) => {
    return async () => {
      if (onGenerateWithAI) {
        await onGenerateWithAI(sectionKey);
      }
      return ""; // Return empty string as placeholder
    };
  };

  return (
    <div className={cn(
      "p-6 md:p-8 font-sans",
      settings.fontFamily && `font-[${settings.fontFamily}]`,
      settings.fontSize && `text-[${settings.fontSize}pt]`
    )}>
      <div className="max-w-[800px] mx-auto">
        {/* Header section */}
        <div className="space-y-1 mb-4">
          <EditableField
            value={data.personal.name}
            placeholder={placeholderMap.name}
            className="text-2xl font-bold text-gray-800"
            onSave={(val) => handleFieldUpdate("personal", "name", val)}
            onGenerateWithAI={wrapAIPromise("personal-name")}
          />
          <EditableField
            value={data.personal.title}
            placeholder={placeholderMap.title}
            className="text-lg text-resume-purple"
            onSave={(val) => handleFieldUpdate("personal", "title", val)}
            onGenerateWithAI={wrapAIPromise("personal-title")}
          />
          
          {/* Contact info */}
          <div className="flex flex-wrap text-xs text-gray-600 mt-1 gap-x-4 gap-y-1">
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-1 text-resume-purple" />
              <EditableField
                value={data.personal.email}
                placeholder={placeholderMap.email}
                className="inline"
                onSave={(val) => handleFieldUpdate("personal", "email", val)}
                onGenerateWithAI={wrapAIPromise("personal-email")}
              />
            </div>
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1 text-resume-purple" />
              <EditableField
                value={data.personal.phone}
                placeholder={placeholderMap.phone}
                className="inline"
                onSave={(val) => handleFieldUpdate("personal", "phone", val)}
                onGenerateWithAI={wrapAIPromise("personal-phone")}
              />
            </div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1 text-resume-purple" />
              <EditableField
                value={data.personal.location}
                placeholder={placeholderMap.location}
                className="inline"
                onSave={(val) => handleFieldUpdate("personal", "location", val)}
                onGenerateWithAI={wrapAIPromise("personal-location")}
              />
            </div>
            <div className="flex items-center">
              <Linkedin className="h-3 w-3 mr-1 text-resume-purple" />
              <EditableField
                value={data.personal.linkedin}
                placeholder={placeholderMap.linkedin}
                className="inline"
                onSave={(val) => handleFieldUpdate("personal", "linkedin", val)}
                onGenerateWithAI={wrapAIPromise("personal-linkedin")}
              />
            </div>
            {(data.personal.website || "") !== "" && (
              <div className="flex items-center">
                <Globe className="h-3 w-3 mr-1 text-resume-purple" />
                <EditableField
                  value={data.personal.website}
                  placeholder={placeholderMap.website}
                  className="inline"
                  onSave={(val) => handleFieldUpdate("personal", "website", val)}
                  onGenerateWithAI={wrapAIPromise("personal-website")}
                />
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-4"></div>

        {/* Summary */}
        <div className="mb-5">
          <h2 className="text-base font-semibold text-gray-800 mb-1.5">Summary</h2>
          <EditableField
            value={data.summary}
            placeholder={placeholderMap.summary}
            onSave={(val) => onUpdateData?.("summary", val)}
            className="text-sm text-gray-700 leading-relaxed"
            onGenerateWithAI={wrapAIPromise("summary")}
            minRows={2}
            maxRows={5}
          />
        </div>

        {/* Experience */}
        <div className="mb-5">
          <h2 className="text-base font-semibold text-gray-800 mb-1.5 flex items-center">
            <Briefcase className="h-4 w-4 inline mr-1.5 text-resume-purple" /> 
            Experience
          </h2>
          
          {data.experience.map((exp: any, index: number) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <EditableField
                  value={exp.title}
                  placeholder={placeholderMap.expTitle}
                  className="font-medium text-gray-800"
                  onSave={(val) => handleNestedFieldUpdate("experience", index, "title", val)}
                  onGenerateWithAI={wrapAIPromise(`experience-title-${index}`)}
                />
                <EditableField
                  value={`${exp.startDate} - ${exp.endDate}`}
                  placeholder={placeholderMap.expDate}
                  className="text-xs text-gray-500 min-w-[120px] text-right"
                  onSave={(val) => {
                    const [startDate, endDate] = val.split(" - ");
                    handleNestedFieldUpdate("experience", index, "startDate", startDate || "");
                    handleNestedFieldUpdate("experience", index, "endDate", endDate || "");
                  }}
                  onGenerateWithAI={wrapAIPromise(`experience-dates-${index}`)}
                />
              </div>
              
              <div className="text-xs text-resume-purple mb-1">
                <EditableField
                  value={`${exp.company}${exp.location ? ', ' + exp.location : ''}`}
                  placeholder={placeholderMap.expCompanyLoc}
                  className="inline"
                  onSave={(val) => {
                    let [company, ...locParts] = val.split(",");
                    const location = locParts.join(",").trim();
                    handleNestedFieldUpdate("experience", index, "company", company?.trim() || "");
                    handleNestedFieldUpdate("experience", index, "location", location);
                  }}
                  onGenerateWithAI={wrapAIPromise(`experience-company-${index}`)}
                />
              </div>
              
              <EditableField
                value={exp.description}
                placeholder={placeholderMap.expDesc}
                className="text-xs text-gray-700 leading-relaxed"
                onSave={(val) => handleNestedFieldUpdate("experience", index, "description", val)}
                onGenerateWithAI={wrapAIPromise(`experience-${index}`)}
                minRows={2}
                maxRows={4}
              />
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-5">
          <h2 className="text-base font-semibold text-gray-800 mb-1.5 flex items-center">
            <BookOpen className="h-4 w-4 inline mr-1.5 text-resume-purple" /> 
            Education
          </h2>
          
          {data.education.map((edu: any, index: number) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <EditableField
                  value={edu.degree}
                  placeholder={placeholderMap.eduDegree}
                  className="font-medium text-gray-800"
                  onSave={(val) => handleNestedFieldUpdate("education", index, "degree", val)}
                  onGenerateWithAI={wrapAIPromise(`education-degree-${index}`)}
                />
                <EditableField
                  value={`${edu.startDate} - ${edu.endDate}`}
                  placeholder={placeholderMap.eduDate}
                  className="text-xs text-gray-500 min-w-[100px] text-right"
                  onSave={(val) => {
                    const [startDate, endDate] = val.split(" - ");
                    handleNestedFieldUpdate("education", index, "startDate", startDate || "");
                    handleNestedFieldUpdate("education", index, "endDate", endDate || "");
                  }}
                  onGenerateWithAI={wrapAIPromise(`education-dates-${index}`)}
                />
              </div>
              
              <div className="text-xs text-resume-purple mb-1">
                <EditableField
                  value={`${edu.institution}${edu.location ? ', ' + edu.location : ''}`}
                  placeholder={placeholderMap.eduInstLoc}
                  className="inline"
                  onSave={(val) => {
                    let [institution, ...locParts] = val.split(",");
                    const location = locParts.join(",").trim();
                    handleNestedFieldUpdate("education", index, "institution", institution?.trim() || "");
                    if (location) handleNestedFieldUpdate("education", index, "location", location);
                  }}
                  onGenerateWithAI={wrapAIPromise(`education-institution-${index}`)}
                />
              </div>
              
              {(edu.description || "") !== "" && (
                <EditableField
                  value={edu.description || ""}
                  placeholder={placeholderMap.eduDesc}
                  className="text-xs text-gray-700 leading-relaxed"
                  onSave={(val) => handleNestedFieldUpdate("education", index, "description", val)}
                  onGenerateWithAI={wrapAIPromise(`education-${index}`)}
                  minRows={1}
                  maxRows={3}
                />
              )}
            </div>
          ))}
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-1.5 flex items-center">
            <Award className="h-4 w-4 inline mr-1.5 text-resume-purple" /> 
            Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Technical Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                <EditableField
                  value={data.skills.technical.join(", ")}
                  placeholder={placeholderMap.skillsTech}
                  className="text-xs"
                  onSave={(val) => {
                    const skills = val.split(",").map((s: string) => s.trim()).filter(Boolean);
                    onUpdateData?.("skills", { ...data.skills, technical: skills });
                  }}
                  onGenerateWithAI={wrapAIPromise("skills-technical")}
                  minRows={1}
                  maxRows={2}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Soft Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                <EditableField
                  value={data.skills.soft.join(", ")}
                  placeholder={placeholderMap.skillsSoft}
                  className="text-xs"
                  onSave={(val) => {
                    const skills = val.split(",").map((s: string) => s.trim()).filter(Boolean);
                    onUpdateData?.("skills", { ...data.skills, soft: skills });
                  }}
                  onGenerateWithAI={wrapAIPromise("skills-soft")}
                  minRows={1}
                  maxRows={2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
