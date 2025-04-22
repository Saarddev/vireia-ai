
import React from 'react';
import { cn } from "@/lib/utils";
import EditableField from './EditableField';

interface ModernTemplateProps {
  data: any;
  settings?: any;
  onUpdateData?: (section: string, value: any) => void;
  onGenerateWithAI?: (section: string) => Promise<string>;
}

const placeholderMap = {
  name: "John Smith",
  title: "Software Engineer",
  email: "john.smith@example.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/johnsmith",
  website: "johnsmith.dev",
  summary: "Experienced software engineer with 5+ years of experience in full-stack development. Passionate about building scalable web applications and solving complex problems.",
  expTitle: "Senior Software Engineer",
  expCompany: "Tech Solutions Inc.",
  expLocation: "San Francisco, CA",
  expDesc: "Lead developer for the company's flagship product. Managed a team of 5 engineers and implemented CI/CD pipelines that reduced deployment time by 40%.",
  eduDegree: "Master of Science in Computer Science",
  eduInst: "Stanford University",
  eduLocation: "Stanford, CA",
  eduDesc: "Specialization in Artificial Intelligence. GPA: 3.8/4.0",
  skillsTech: "JavaScript, TypeScript, React, Node.js, Python",
  skillsSoft: "Leadership, Communication, Problem Solving"
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
        const result = await onGenerateWithAI(sectionKey);
        return result ?? "";
      }
      return "";
    };
  };

  // Styling helpers
  const sectionDivider = <hr className="border-t border-[#9b87f5]/60 my-4" />;

  return (
    <div className={cn(
      "p-6 md:p-8 font-sans",
      settings.fontFamily && `font-[${settings.fontFamily}]`,
      settings.fontSize && `text-[${settings.fontSize}pt]`
    )}>
      <div className="max-w-[800px] mx-auto">

        {/* HEADER */}
        <div className="mb-2">
          {/* Name and title */}
          <EditableField
            value={data.personal.name}
            placeholder={placeholderMap.name}
            className="text-[2rem] font-extrabold text-gray-900 pb-0.5"
            onSave={(val) => handleFieldUpdate("personal", "name", val)}
            onGenerateWithAI={wrapAIPromise("personal-name")}
            minRows={1}
            maxRows={1}
          />
          <EditableField
            value={data.personal.title}
            placeholder={placeholderMap.title}
            className="text-lg text-[#9b87f5] font-medium mb-1"
            onSave={(val) => handleFieldUpdate("personal", "title", val)}
            onGenerateWithAI={wrapAIPromise("personal-title")}
            minRows={1}
            maxRows={1}
          />

          {/* Contact section, fully horizontal */}
          <div className="flex flex-wrap items-center text-sm text-gray-700 leading-tight gap-x-2 gap-y-1 mb-1">
            <EditableField
              value={data.personal.email}
              placeholder={placeholderMap.email}
              className="inline pr-2"
              onSave={(val) => handleFieldUpdate("personal", "email", val)}
              onGenerateWithAI={wrapAIPromise("personal-email")}
              minRows={1}
              maxRows={1}
            />
            <span className="text-gray-300">|</span>
            <EditableField
              value={data.personal.phone}
              placeholder={placeholderMap.phone}
              className="inline px-2"
              onSave={(val) => handleFieldUpdate("personal", "phone", val)}
              onGenerateWithAI={wrapAIPromise("personal-phone")}
              minRows={1}
              maxRows={1}
            />
            <span className="text-gray-300">|</span>
            <EditableField
              value={data.personal.location}
              placeholder={placeholderMap.location}
              className="inline px-2"
              onSave={(val) => handleFieldUpdate("personal", "location", val)}
              onGenerateWithAI={wrapAIPromise("personal-location")}
              minRows={1}
              maxRows={1}
            />
            <span className="text-gray-300">|</span>
            <EditableField
              value={data.personal.linkedin}
              placeholder={placeholderMap.linkedin}
              className="inline px-2"
              onSave={(val) => handleFieldUpdate("personal", "linkedin", val)}
              onGenerateWithAI={wrapAIPromise("personal-linkedin")}
              minRows={1}
              maxRows={1}
            />
          </div>

          {/* Website horizontally aligned */}
          <div className="flex items-center text-sm text-gray-700 pl-2 pb-0.5">
            <span className="text-gray-300 mr-2">|</span>
            <EditableField
              value={data.personal.website}
              placeholder={placeholderMap.website}
              className="inline"
              onSave={(val) => handleFieldUpdate("personal", "website", val)}
              onGenerateWithAI={wrapAIPromise("personal-website")}
              minRows={1}
              maxRows={1}
            />
          </div>
          <hr className="border-t border-[#9b87f5]/60 mt-2" />
        </div>

        {/* SUMMARY */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Summary</h2>
          <hr className="border-t border-gray-200 mb-1" />
          <EditableField
            value={data.summary}
            placeholder={placeholderMap.summary}
            onSave={(val) => onUpdateData?.("summary", val)}
            className="text-[1rem] text-gray-800 leading-snug mb-3"
            onGenerateWithAI={wrapAIPromise("summary")}
            minRows={2}
            maxRows={3}
          />
        </div>

        {/* EXPERIENCE */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Experience</h2>
          <hr className="border-t border-gray-200 mb-2" />

          {data.experience.map((exp: any, index: number) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-start">
                <EditableField
                  value={exp.title}
                  placeholder={placeholderMap.expTitle}
                  className="font-semibold text-[1.08rem] text-gray-900"
                  onSave={(val) => handleNestedFieldUpdate("experience", index, "title", val)}
                  onGenerateWithAI={wrapAIPromise(`experience-title-${index}`)}
                  minRows={1}
                  maxRows={1}
                />
                <EditableField
                  value={`${exp.startDate} - ${exp.endDate}`}
                  placeholder="Jan 2022 - Present"
                  className="text-sm text-gray-600 font-medium min-w-[120px] text-right"
                  onSave={(val) => {
                    const [startDate, endDate] = val.split(" - ");
                    handleNestedFieldUpdate("experience", index, "startDate", startDate || "");
                    handleNestedFieldUpdate("experience", index, "endDate", endDate || "");
                  }}
                  onGenerateWithAI={wrapAIPromise(`experience-dates-${index}`)}
                  minRows={1}
                  maxRows={1}
                />
              </div>
              <div className="mb-0.5">
                <EditableField
                  value={
                    exp.company && exp.location 
                      ? `${exp.company}, ${exp.location}`
                      : exp.company || exp.location
                  }
                  placeholder="Tech Solutions Inc., San Francisco, CA"
                  className="inline-block text-[#9b87f5] font-medium"
                  onSave={(val) => {
                    let [company, ...locParts] = val.split(",");
                    const location = locParts.join(",").trim();
                    handleNestedFieldUpdate("experience", index, "company", company?.trim() || "");
                    handleNestedFieldUpdate("experience", index, "location", location);
                  }}
                  onGenerateWithAI={wrapAIPromise(`experience-company-${index}`)}
                  minRows={1}
                  maxRows={1}
                />
              </div>
              <EditableField
                value={exp.description}
                placeholder={placeholderMap.expDesc}
                className="text-[.98rem] text-gray-800 mt-0.5 mb-1"
                onSave={(val) => handleNestedFieldUpdate("experience", index, "description", val)}
                onGenerateWithAI={wrapAIPromise(`experience-desc-${index}`)}
                minRows={1}
                maxRows={3}
              />
            </div>
          ))}
        </div>

        {/* EDUCATION */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Education</h2>
          <hr className="border-t border-gray-200 mb-2" />
          {data.education.map((edu: any, index: number) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <EditableField
                  value={edu.degree}
                  placeholder={placeholderMap.eduDegree}
                  className="font-semibold text-[1.08rem] text-gray-900"
                  onSave={(val) => handleNestedFieldUpdate("education", index, "degree", val)}
                  onGenerateWithAI={wrapAIPromise(`education-degree-${index}`)}
                  minRows={1}
                  maxRows={1}
                />
                <EditableField
                  value={`${edu.startDate} - ${edu.endDate}`}
                  placeholder="Sep 2017 - May 2019"
                  className="text-sm text-gray-600 font-medium min-w-[130px] text-right"
                  onSave={(val) => {
                    const [startDate, endDate] = val.split(" - ");
                    handleNestedFieldUpdate("education", index, "startDate", startDate || "");
                    handleNestedFieldUpdate("education", index, "endDate", endDate || "");
                  }}
                  onGenerateWithAI={wrapAIPromise(`education-dates-${index}`)}
                  minRows={1}
                  maxRows={1}
                />
              </div>
              <div>
                <EditableField
                  value={
                    edu.institution && edu.location
                      ? `${edu.institution}, ${edu.location}`
                      : edu.institution || edu.location
                  }
                  placeholder="Stanford University, Stanford, CA"
                  className="inline-block text-[#9b87f5] font-medium"
                  onSave={(val) => {
                    let [inst, ...locParts] = val.split(",");
                    const location = locParts.join(",").trim();
                    handleNestedFieldUpdate("education", index, "institution", inst?.trim() || "");
                    handleNestedFieldUpdate("education", index, "location", location || "");
                  }}
                  onGenerateWithAI={wrapAIPromise(`education-institution-${index}`)}
                  minRows={1}
                  maxRows={1}
                />
              </div>
              <EditableField
                value={edu.description || ""}
                placeholder={placeholderMap.eduDesc}
                className="text-[.98rem] text-gray-800 mt-0.5 mb-0"
                onSave={(val) => handleNestedFieldUpdate("education", index, "description", val)}
                onGenerateWithAI={wrapAIPromise(`education-desc-${index}`)}
                minRows={1}
                maxRows={2}
              />
            </div>
          ))}
        </div>

        {/* SKILLS */}
        <div className="mb-0">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Skills</h2>
          <hr className="border-t border-gray-200 mb-2" />

          {/* Technical skills in chips, colored */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Technical Skills</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {data.skills.technical.map((skill: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-[#9b87f5]/15 text-[#9b87f5] font-medium rounded-lg text-sm transition border border-[#9b87f5]/30">
                  {skill}
                </span>
              ))}
            </div>
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

          {/* Soft skills */}
          <div className="mb-1">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.soft.map((skill: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 font-normal rounded-lg text-sm transition border border-gray-200">
                  {skill}
                </span>
              ))}
            </div>
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
  );
};

export default ModernTemplate;
