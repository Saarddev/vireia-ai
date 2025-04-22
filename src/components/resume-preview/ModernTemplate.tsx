import React from 'react';
import { cn } from "@/lib/utils";
import EditableContent from './EditableResumePreview';
import EditableField from './EditableField';

interface ModernTemplateProps {
  data: any;
  settings?: any;
  onUpdateData?: (section: string, value: any) => void;
  onGenerateWithAI?: (section: string) => Promise<void>;
}

const placeholderMap = {
  name: "Enter your name",
  title: "Your professional title (e.g. Product Designer)",
  email: "Email address",
  phone: "Phone number",
  location: "City, State",
  linkedin: "LinkedIn URL",
  website: "Personal website",
  summary: "Add a short professional summary...",
  expTitle: "Job Title",
  expDate: "MM YYYY - MM YYYY",
  expCompanyLoc: "Company, Location",
  expDesc: "Describe your achievements, responsibilities, and skills...",
  eduDegree: "Degree (e.g. B.Sc. Computer Science)",
  eduDate: "Start - End",
  eduInstLoc: "Institution, Location",
  eduDesc: "Add details, major projects, honors, or activities…",
  skillsTech: "Technical skills (comma separated)",
  skillsSoft: "Soft skills (comma separated)"
};

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
          <EditableField
            value={data.personal.name}
            placeholder={placeholderMap.name}
            className="text-2xl font-bold text-gray-800"
            onSave={handleNameUpdate}
            onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("personal-name") : undefined}
          />
          <EditableField
            value={data.personal.title}
            placeholder={placeholderMap.title}
            className="text-resume-purple font-medium"
            onSave={handleTitleUpdate}
            onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("personal-title") : undefined}
          />
          <div className="flex flex-wrap mt-2 text-sm text-gray-600 gap-3">
            <EditableField
              value={data.personal.email}
              placeholder={placeholderMap.email}
              className="inline min-w-[180px]"
              onSave={(value) => handleContactUpdate("email", value)}
              onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("personal-email") : undefined}
            />
            <span>|</span>
            <EditableField
              value={data.personal.phone}
              placeholder={placeholderMap.phone}
              className="inline min-w-[120px]"
              onSave={(value) => handleContactUpdate("phone", value)}
              onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("personal-phone") : undefined}
            />
            <span>|</span>
            <EditableField
              value={data.personal.location}
              placeholder={placeholderMap.location}
              className="inline min-w-[120px]"
              onSave={(value) => handleContactUpdate("location", value)}
              onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("personal-location") : undefined}
            />
            {data.personal.linkedin ? (
              <>
                <span>|</span>
                <EditableField
                  value={data.personal.linkedin}
                  placeholder={placeholderMap.linkedin}
                  className="inline min-w-[170px]"
                  onSave={(value) => handleContactUpdate("linkedin", value)}
                  onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("personal-linkedin") : undefined}
                />
              </>
            ) : (
              <>
                <span>|</span>
                <EditableField
                  value=""
                  placeholder={placeholderMap.linkedin}
                  className="inline min-w-[170px]"
                  onSave={(value) => handleContactUpdate("linkedin", value)}
                  onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("personal-linkedin") : undefined}
                />
              </>
            )}
            {data.personal.website ? (
              <>
                <span>|</span>
                <EditableField
                  value={data.personal.website}
                  placeholder={placeholderMap.website}
                  className="inline min-w-[150px]"
                  onSave={(value) => handleContactUpdate("website", value)}
                  onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("personal-website") : undefined}
                />
              </>
            ) : (
              <>
                <span>|</span>
                <EditableField
                  value=""
                  placeholder={placeholderMap.website}
                  className="inline min-w-[150px]"
                  onSave={(value) => handleContactUpdate("website", value)}
                  onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("personal-website") : undefined}
                />
              </>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Summary</h2>
          <EditableField
            value={data.summary}
            placeholder={placeholderMap.summary}
            onSave={handleSummaryUpdate}
            className="text-base text-gray-700 leading-tight"
            onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("summary") : undefined}
            minRows={2}
            maxRows={5}
          />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Experience</h2>
          {data.experience.map((exp: any, index: number) => (
            <div key={exp.id} className="mb-3 group">
              <div className="flex justify-between gap-3">
                <EditableField
                  value={exp.title}
                  placeholder={placeholderMap.expTitle}
                  className="font-semibold text-gray-800 flex-1"
                  onSave={(val) => {
                    const updatedExp = [...data.experience];
                    updatedExp[index] = { ...exp, title: val };
                    onUpdateData?.("experience", updatedExp);
                  }}
                  onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`experience-title-${index}`) : undefined}
                />
                <span className="text-sm text-gray-600 shrink-0">
                  <EditableField
                    value={`${exp.startDate} - ${exp.endDate}`}
                    placeholder={placeholderMap.expDate}
                    className="inline"
                    onSave={(val) => {
                      const [startDate, endDate] = val.split(" - ");
                      const updatedExp = [...data.experience];
                      updatedExp[index] = { ...exp, startDate: startDate || "", endDate: endDate || "" };
                      onUpdateData?.("experience", updatedExp);
                    }}
                    onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`experience-dates-${index}`) : undefined}
                  />
                </span>
              </div>
              <div className="text-sm font-medium text-resume-purple">
                <EditableField
                  value={`${exp.company}, ${exp.location || ""}`}
                  placeholder={placeholderMap.expCompanyLoc}
                  className="inline"
                  onSave={(val) => {
                    let [company, ...locParts] = val.split(",");
                    const location = locParts.join(",").trim();
                    const updatedExp = [...data.experience];
                    updatedExp[index] = { ...exp, company: company?.trim() || "", location };
                    onUpdateData?.("experience", updatedExp);
                  }}
                  onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`experience-company-${index}`) : undefined}
                />
              </div>
              <EditableField
                value={exp.description}
                placeholder={placeholderMap.expDesc}
                className="text-sm text-gray-800 mt-1"
                onSave={(content) => {
                  const updatedExp = [...data.experience];
                  updatedExp[index] = { ...exp, description: content };
                  onUpdateData?.("experience", updatedExp);
                }}
                onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`experience-${index}`) : undefined}
                minRows={2}
                maxRows={5}
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Education</h2>
          {data.education.map((edu: any, index: number) => (
            <div key={edu.id} className="mb-3 group">
              <div className="flex justify-between gap-3">
                <EditableField
                  value={edu.degree}
                  placeholder={placeholderMap.eduDegree}
                  className="font-semibold text-gray-800 flex-1"
                  onSave={(val) => {
                    const updatedEdu = [...data.education];
                    updatedEdu[index] = { ...edu, degree: val };
                    onUpdateData?.("education", updatedEdu);
                  }}
                  onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-degree-${index}`) : undefined}
                />
                <span className="text-sm text-gray-600 shrink-0">
                  <EditableField
                    value={`${edu.startDate} - ${edu.endDate}`}
                    placeholder={placeholderMap.eduDate}
                    className="inline"
                    onSave={(val) => {
                      const [startDate, endDate] = val.split(" - ");
                      const updatedEdu = [...data.education];
                      updatedEdu[index] = { ...edu, startDate: startDate || "", endDate: endDate || "" };
                      onUpdateData?.("education", updatedEdu);
                    }}
                    onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-dates-${index}`) : undefined}
                  />
                </span>
              </div>
              <div className="text-sm font-medium text-resume-purple">
                <EditableField
                  value={`${edu.institution}, ${edu.location || ""}`}
                  placeholder={placeholderMap.eduInstLoc}
                  className="inline"
                  onSave={(val) => {
                    let [institution, ...locParts] = val.split(",");
                    const location = locParts.join(",").trim();
                    const updatedEdu = [...data.education];
                    updatedEdu[index] = { ...edu, institution: institution?.trim() || "", location };
                    onUpdateData?.("education", updatedEdu);
                  }}
                  onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-institution-${index}`) : undefined}
                />
              </div>
              <EditableField
                value={edu.description || ""}
                placeholder={placeholderMap.eduDesc}
                className="text-sm text-gray-800 mt-1"
                onSave={(content) => {
                  const updatedEdu = [...data.education];
                  updatedEdu[index] = { ...edu, description: content };
                  onUpdateData?.("education", updatedEdu);
                }}
                onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-${index}`) : undefined}
                minRows={2}
                maxRows={4}
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Skills</h2>
          <div className="mb-2">
            <h3 className="font-semibold text-gray-800 text-sm">Technical Skills</h3>
            <EditableField
              value={data.skills.technical.join(", ")}
              placeholder={placeholderMap.skillsTech}
              className="flex flex-wrap gap-1 mt-1"
              onSave={(val) => {
                const skills = val.split(",").map(s => s.trim()).filter(Boolean);
                onUpdateData?.("skills", { ...data.skills, technical: skills });
              }}
              onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("skills-technical") : undefined}
              minRows={1}
              maxRows={2}
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">Soft Skills</h3>
            <EditableField
              value={data.skills.soft.join(", ")}
              placeholder={placeholderMap.skillsSoft}
              className="flex flex-wrap gap-1 mt-1"
              onSave={(val) => {
                const skills = val.split(",").map(s => s.trim()).filter(Boolean);
                onUpdateData?.("skills", { ...data.skills, soft: skills });
              }}
              onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("skills-soft") : undefined}
              minRows={1}
              maxRows={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
