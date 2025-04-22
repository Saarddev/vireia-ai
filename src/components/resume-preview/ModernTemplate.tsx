
import React from 'react';
import { cn } from "@/lib/utils";
import EditableField from './EditableField';

interface ModernTemplateProps {
  data: any;
  settings?: any;
  onUpdateData?: (section: string, value: any) => void;
  onGenerateWithAI?: (section: string) => Promise<void>;
}

const placeholderMap = {
  name: "John Smith",
  title: "Software Engineer",
  email: "email@example.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/johnsmith",
  website: "johnsmith.dev",
  summary: "Experienced professional with a track record of success...",
  expTitle: "Job Title",
  expDate: "Jan 2022 - Present",
  expCompanyLoc: "Company, Location",
  expDesc: "Describe your responsibilities and achievements...",
  eduDegree: "Master of Science in Computer Science",
  eduDate: "Sep 2017 - May 2019",
  eduInstLoc: "University, Location",
  eduDesc: "Specialization details...",
  skillsTech: "JavaScript, TypeScript, React...",
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

  const wrapAIPromise = (sectionKey: string): (() => Promise<string>) => {
    return async () => {
      if (onGenerateWithAI) {
        await onGenerateWithAI(sectionKey);
      }
      return ""; // Return empty string as required by TypeScript
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
        <div className="space-y-2 mb-6">
          <div className="flex flex-col">
            <EditableField
              value={data.personal.name}
              placeholder={placeholderMap.name}
              className="text-xl font-bold text-gray-800"
              onSave={(val) => handleFieldUpdate("personal", "name", val)}
              onGenerateWithAI={wrapAIPromise("personal-name")}
            />
            <EditableField
              value={data.personal.title}
              placeholder={placeholderMap.title}
              className="text-md text-resume-purple"
              onSave={(val) => handleFieldUpdate("personal", "title", val)}
              onGenerateWithAI={wrapAIPromise("personal-title")}
            />
          </div>
          
          {/* Contact info - simplified horizontal layout */}
          <div className="text-xs text-gray-600 flex flex-wrap gap-x-3">
            <EditableField
              value={data.personal.email}
              placeholder={placeholderMap.email}
              className="inline-block"
              onSave={(val) => handleFieldUpdate("personal", "email", val)}
              onGenerateWithAI={wrapAIPromise("personal-email")}
            />
            <span className="text-gray-300">|</span>
            <EditableField
              value={data.personal.phone}
              placeholder={placeholderMap.phone}
              className="inline-block"
              onSave={(val) => handleFieldUpdate("personal", "phone", val)}
              onGenerateWithAI={wrapAIPromise("personal-phone")}
            />
            <span className="text-gray-300">|</span>
            <EditableField
              value={data.personal.location}
              placeholder={placeholderMap.location}
              className="inline-block"
              onSave={(val) => handleFieldUpdate("personal", "location", val)}
              onGenerateWithAI={wrapAIPromise("personal-location")}
            />
            <span className="text-gray-300">|</span>
            <EditableField
              value={data.personal.linkedin}
              placeholder={placeholderMap.linkedin}
              className="inline-block"
              onSave={(val) => handleFieldUpdate("personal", "linkedin", val)}
              onGenerateWithAI={wrapAIPromise("personal-linkedin")}
            />
            {(data.personal.website || "") !== "" && (
              <>
                <span className="text-gray-300">|</span>
                <EditableField
                  value={data.personal.website}
                  placeholder={placeholderMap.website}
                  className="inline-block"
                  onSave={(val) => handleFieldUpdate("personal", "website", val)}
                  onGenerateWithAI={wrapAIPromise("personal-website")}
                />
              </>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-5"></div>

        {/* Summary */}
        <div className="mb-5">
          <h2 className="text-base font-semibold text-gray-800 mb-2">Summary</h2>
          <EditableField
            value={data.summary}
            placeholder={placeholderMap.summary}
            onSave={(val) => onUpdateData?.("summary", val)}
            className="text-sm text-gray-700 leading-relaxed"
            onGenerateWithAI={wrapAIPromise("summary")}
            minRows={2}
            maxRows={4}
          />
        </div>

        {/* Experience */}
        <div className="mb-5">
          <h2 className="text-base font-semibold text-gray-800 mb-3">Experience</h2>
          
          {data.experience.map((exp: any, index: number) => (
            <div key={exp.id} className="mb-4">
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
                minRows={1}
                maxRows={3}
              />
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-5">
          <h2 className="text-base font-semibold text-gray-800 mb-3">Education</h2>
          
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
              
              <EditableField
                value={edu.description || ""}
                placeholder={placeholderMap.eduDesc}
                className="text-xs text-gray-700 leading-relaxed"
                onSave={(val) => handleNestedFieldUpdate("education", index, "description", val)}
                onGenerateWithAI={wrapAIPromise(`education-${index}`)}
                minRows={1}
                maxRows={2}
              />
            </div>
          ))}
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Technical Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.technical.map((skill: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-md text-xs">
                    {skill}
                  </span>
                ))}
                <EditableField
                  value={data.skills.technical.join(", ")}
                  placeholder={placeholderMap.skillsTech}
                  className="text-xs sr-only"
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
              <h3 className="text-sm font-medium text-gray-700 mb-2">Soft Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.soft.map((skill: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-md text-xs">
                    {skill}
                  </span>
                ))}
                <EditableField
                  value={data.skills.soft.join(", ")}
                  placeholder={placeholderMap.skillsSoft}
                  className="text-xs sr-only"
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
