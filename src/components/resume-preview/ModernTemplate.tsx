
import React from 'react';
import { cn } from "@/lib/utils";
import EditableContent from './EditableResumePreview';

interface ModernTemplateProps {
  data: any;
  settings?: any;
  onUpdateData?: (section: string, value: any) => void;
  onGenerateWithAI?: (section: string) => Promise<void>;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ 
  data, 
  settings = {},
  onUpdateData,
  onGenerateWithAI
}) => {
  const handleNameUpdate = (name: string) => {
    if (onUpdateData) {
      onUpdateData("personal", { ...data.personal, name });
    }
  };

  const handleTitleUpdate = (title: string) => {
    if (onUpdateData) {
      onUpdateData("personal", { ...data.personal, title });
    }
  };

  const handleContactUpdate = (field: string, value: string) => {
    if (onUpdateData) {
      onUpdateData("personal", { ...data.personal, [field]: value });
    }
  };

  const handleSummaryUpdate = (summary: string) => {
    if (onUpdateData) {
      onUpdateData("summary", summary);
    }
  };

  const handleExperienceUpdate = (index: number, description: string) => {
    if (onUpdateData) {
      const updatedExperience = [...data.experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        description
      };
      onUpdateData("experience", updatedExperience);
    }
  };

  const handleEducationUpdate = (index: number, description: string) => {
    if (onUpdateData) {
      const updatedEducation = [...data.education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        description
      };
      onUpdateData("education", updatedEducation);
    }
  };

  return (
    <div className={cn(
      "p-4",
      settings.fontFamily && `font-[${settings.fontFamily}]`,
      settings.fontSize && `text-[${settings.fontSize}pt]`
    )}>
      <div className="p-4">
        <div className="border-b border-resume-purple pb-4 mb-4">
          <EditableContent 
            content={data.personal.name}
            onSave={handleNameUpdate}
            className="text-2xl font-bold text-gray-800"
            onGenerateWithAI={() => onGenerateWithAI?.("personal-name")}
          />
          <EditableContent 
            content={data.personal.title}
            onSave={handleTitleUpdate}
            className="text-resume-purple font-medium"
            onGenerateWithAI={() => onGenerateWithAI?.("personal-title")}
          />
          <div className="flex flex-wrap mt-2 text-sm text-gray-600 gap-3">
            <EditableContent 
              content={data.personal.email}
              onSave={(value) => handleContactUpdate("email", value)}
              className="inline"
              onGenerateWithAI={() => onGenerateWithAI?.("personal-contact")}
            />
            <span>|</span>
            <EditableContent 
              content={data.personal.phone}
              onSave={(value) => handleContactUpdate("phone", value)}
              className="inline"
              onGenerateWithAI={() => onGenerateWithAI?.("personal-contact")}
            />
            <span>|</span>
            <EditableContent 
              content={data.personal.location}
              onSave={(value) => handleContactUpdate("location", value)}
              className="inline"
              onGenerateWithAI={() => onGenerateWithAI?.("personal-contact")}
            />
            {data.personal.linkedin && (
              <>
                <span>|</span>
                <EditableContent 
                  content={data.personal.linkedin}
                  onSave={(value) => handleContactUpdate("linkedin", value)}
                  className="inline"
                  onGenerateWithAI={() => onGenerateWithAI?.("personal-contact")}
                />
              </>
            )}
            {data.personal.website && (
              <>
                <span>|</span>
                <EditableContent 
                  content={data.personal.website}
                  onSave={(value) => handleContactUpdate("website", value)}
                  className="inline"
                  onGenerateWithAI={() => onGenerateWithAI?.("personal-contact")}
                />
              </>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Summary</h2>
          <EditableContent 
            content={data.summary} 
            onSave={handleSummaryUpdate} 
            className="text-sm text-gray-700"
            onGenerateWithAI={() => onGenerateWithAI?.("summary")}
          />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Experience</h2>
          {data.experience.map((exp: any, index: number) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <EditableContent 
                  content={exp.title}
                  onSave={(value) => {
                    const updatedExp = [...data.experience];
                    updatedExp[index] = { ...exp, title: value };
                    onUpdateData?.("experience", updatedExp);
                  }}
                  className="font-semibold text-gray-800"
                  onGenerateWithAI={() => onGenerateWithAI?.(`experience-title-${index}`)}
                />
                <span className="text-sm text-gray-600">
                  <EditableContent 
                    content={`${exp.startDate} - ${exp.endDate}`}
                    onSave={(value) => {
                      const [startDate, endDate] = value.split(" - ");
                      const updatedExp = [...data.experience];
                      updatedExp[index] = { ...exp, startDate, endDate };
                      onUpdateData?.("experience", updatedExp);
                    }}
                    className="inline"
                    onGenerateWithAI={() => onGenerateWithAI?.(`experience-dates-${index}`)}
                  />
                </span>
              </div>
              <div className="text-sm font-medium text-resume-purple">
                <EditableContent 
                  content={`${exp.company}, ${exp.location}`}
                  onSave={(value) => {
                    const [company, location] = value.split(", ");
                    const updatedExp = [...data.experience];
                    updatedExp[index] = { ...exp, company, location };
                    onUpdateData?.("experience", updatedExp);
                  }}
                  className="inline"
                  onGenerateWithAI={() => onGenerateWithAI?.(`experience-company-${index}`)}
                />
              </div>
              <EditableContent 
                content={exp.description} 
                onSave={(content) => handleExperienceUpdate(index, content)} 
                className="text-sm text-gray-700 mt-1"
                onGenerateWithAI={() => onGenerateWithAI?.(`experience-${index}`)}
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Education</h2>
          {data.education.map((edu: any, index: number) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <EditableContent 
                  content={edu.degree}
                  onSave={(value) => {
                    const updatedEdu = [...data.education];
                    updatedEdu[index] = { ...edu, degree: value };
                    onUpdateData?.("education", updatedEdu);
                  }}
                  className="font-semibold text-gray-800"
                  onGenerateWithAI={() => onGenerateWithAI?.(`education-degree-${index}`)}
                />
                <span className="text-sm text-gray-600">
                  <EditableContent 
                    content={`${edu.startDate} - ${edu.endDate}`}
                    onSave={(value) => {
                      const [startDate, endDate] = value.split(" - ");
                      const updatedEdu = [...data.education];
                      updatedEdu[index] = { ...edu, startDate, endDate };
                      onUpdateData?.("education", updatedEdu);
                    }}
                    className="inline"
                    onGenerateWithAI={() => onGenerateWithAI?.(`education-dates-${index}`)}
                  />
                </span>
              </div>
              <div className="text-sm font-medium text-resume-purple">
                <EditableContent 
                  content={`${edu.institution}, ${edu.location || ""}`}
                  onSave={(value) => {
                    const [institution, location] = value.split(", ");
                    const updatedEdu = [...data.education];
                    updatedEdu[index] = { ...edu, institution, location };
                    onUpdateData?.("education", updatedEdu);
                  }}
                  className="inline"
                  onGenerateWithAI={() => onGenerateWithAI?.(`education-institution-${index}`)}
                />
              </div>
              <EditableContent 
                content={edu.description || ""} 
                onSave={(content) => handleEducationUpdate(index, content)} 
                className="text-sm text-gray-700 mt-1"
                onGenerateWithAI={() => onGenerateWithAI?.(`education-${index}`)}
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Skills</h2>
          <div className="mb-2">
            <h3 className="font-semibold text-gray-800 text-sm">Technical Skills</h3>
            <EditableContent 
              content={data.skills.technical.join(", ")}
              onSave={(value) => {
                const skills = value.split(",").map(s => s.trim()).filter(Boolean);
                onUpdateData?.("skills", { ...data.skills, technical: skills });
              }}
              className="flex flex-wrap gap-1 mt-1"
              onGenerateWithAI={() => onGenerateWithAI?.("skills-technical")}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">Soft Skills</h3>
            <EditableContent 
              content={data.skills.soft.join(", ")}
              onSave={(value) => {
                const skills = value.split(",").map(s => s.trim()).filter(Boolean);
                onUpdateData?.("skills", { ...data.skills, soft: skills });
              }}
              className="flex flex-wrap gap-1 mt-1"
              onGenerateWithAI={() => onGenerateWithAI?.("skills-soft")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
