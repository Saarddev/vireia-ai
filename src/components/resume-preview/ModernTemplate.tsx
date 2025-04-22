
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
  summary: "Experienced software engineer with 5+ years of experience in full-stack development.",
  expTitle: "Senior Software Engineer",
  expCompany: "Tech Solutions Inc.",
  expLocation: "San Francisco, CA",
  expDesc: "Lead developer for the company's flagship product. ...",
  eduDegree: "Master of Science in Computer Science",
  eduInst: "Stanford University",
  eduLocation: "Stanford, CA",
  eduDesc: "Specialization in Artificial Intelligence. GPA: 3.8/4.0",
  skillsTech: "JavaScript, TypeScript, React, Node.js, Python",
  skillsSoft: "Leadership, Communication, Problem Solving"
};

const secTitle =
  "uppercase tracking-wide font-semibold text-[#9b87f5] text-xs mb-0.5 letter-spacing-wide";

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
      updatedItems[index] = { ...updatedItems[index], [field]: value };
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

  return (
    <div
      className={cn(
        "p-8 font-sans bg-white rounded-[22px] shadow-md max-w-[820px] mx-auto border border-[#ece6fb]",
        settings.fontFamily && `font-[${settings.fontFamily}]`,
        settings.fontSize && `text-[${settings.fontSize}pt]`
      )}
    >
      {/* HEADER - Horizontal compact info */}
      <div className="flex flex-col mb-1 pb-2 border-b border-[#eee]">
        <div className="flex flex-row items-center w-full gap-6">
          {/* Name & Title left-aligned */}
          <div className="flex-1 min-w-0">
            <EditableField
              value={data.personal.name}
              placeholder={placeholderMap.name}
              className="text-[2.2rem] font-extrabold text-[#1a1f2c] leading-tight pl-1"
              onSave={(val) => handleFieldUpdate("personal", "name", val)}
              onGenerateWithAI={wrapAIPromise("personal-name")}
              minRows={1}
              maxRows={1}
            />
            <EditableField
              value={data.personal.title}
              placeholder={placeholderMap.title}
              className="text-lg font-medium text-[#9b87f5] tracking-wide pl-1 mt-0.5"
              onSave={(val) => handleFieldUpdate("personal", "title", val)}
              onGenerateWithAI={wrapAIPromise("personal-title")}
              minRows={1}
              maxRows={1}
            />
          </div>
          {/* Main contact */}
          <div className="shrink-0 flex flex-col items-end gap-0.5 max-w-[350px]">
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[0.98rem] text-gray-600 items-center">
              <EditableField
                value={data.personal.email}
                placeholder={placeholderMap.email}
                className="inline font-normal"
                onSave={(val) => handleFieldUpdate("personal", "email", val)}
                onGenerateWithAI={wrapAIPromise("personal-email")}
                minRows={1}
                maxRows={1}
              />
              <span className="font-light text-[19px] text-[#e5deff] -mx-0.5">•</span>
              <EditableField
                value={data.personal.phone}
                placeholder={placeholderMap.phone}
                className="inline font-normal"
                onSave={(val) => handleFieldUpdate("personal", "phone", val)}
                onGenerateWithAI={wrapAIPromise("personal-phone")}
                minRows={1}
                maxRows={1}
              />
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[0.98rem] text-gray-600 items-center">
              <EditableField
                value={data.personal.location}
                placeholder={placeholderMap.location}
                className="inline font-normal"
                onSave={(val) => handleFieldUpdate("personal", "location", val)}
                onGenerateWithAI={wrapAIPromise("personal-location")}
                minRows={1}
                maxRows={1}
              />
              <span className="font-light text-[19px] text-[#e5deff] -mx-0.5">•</span>
              <EditableField
                value={data.personal.linkedin}
                placeholder={placeholderMap.linkedin}
                className="inline font-normal"
                onSave={(val) => handleFieldUpdate("personal", "linkedin", val)}
                onGenerateWithAI={wrapAIPromise("personal-linkedin")}
                minRows={1}
                maxRows={1}
              />
              <span className="font-light text-[19px] text-[#e5deff] -mx-0.5">•</span>
              <EditableField
                value={data.personal.website}
                placeholder={placeholderMap.website}
                className="inline font-normal"
                onSave={(val) => handleFieldUpdate("personal", "website", val)}
                onGenerateWithAI={wrapAIPromise("personal-website")}
                minRows={1}
                maxRows={1}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mb-3 pt-3 flex flex-col">
        <span className={secTitle}>Profile</span>
        <EditableField
          value={data.summary}
          placeholder={placeholderMap.summary}
          onSave={(val) => onUpdateData?.("summary", val)}
          className="text-base text-gray-800 font-[500] py-0.5 pl-0.5"
          onGenerateWithAI={wrapAIPromise("summary")}
          minRows={2}
          maxRows={3}
        />
      </div>

      {/* EXPERIENCE */}
      <div className="mb-3 flex flex-col">
        <span className={secTitle}>Experience</span>
        <div className="flex flex-col gap-2">
        {data.experience.map((exp: any, index: number) => (
          <div
            key={exp.id}
            className="bg-[#f1f0fb] rounded-xl p-4 pb-3 flex flex-col border border-[#ece6fb]"
          >
            <div className="flex flex-row items-center gap-4">
              <EditableField
                value={exp.title}
                placeholder={placeholderMap.expTitle}
                className="font-bold text-[1.08rem] text-[#1a1f2c]"
                onSave={(val) => handleNestedFieldUpdate("experience", index, "title", val)}
                onGenerateWithAI={wrapAIPromise(`experience-title-${index}`)}
                minRows={1}
                maxRows={1}
              />
              <span className="ml-auto text-sm text-gray-500 font-medium min-w-[115px] text-right">
                <EditableField
                  value={`${exp.startDate} - ${exp.endDate}`}
                  placeholder="Jan 2022 - Present"
                  className="inline"
                  onSave={(val) => {
                    const [startDate, endDate] = val.split(" - ");
                    handleNestedFieldUpdate("experience", index, "startDate", startDate || "");
                    handleNestedFieldUpdate("experience", index, "endDate", endDate || "");
                  }}
                  onGenerateWithAI={wrapAIPromise(`experience-dates-${index}`)}
                  minRows={1}
                  maxRows={1}
                />
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5 mb-1 text-[#9b87f5] text-sm font-medium">
              <EditableField
                value={
                  exp.company && exp.location
                    ? `${exp.company}, ${exp.location}`
                    : exp.company || exp.location || ""
                }
                placeholder="Tech Solutions Inc., San Francisco, CA"
                className="inline"
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
              className="text-[0.99rem] text-gray-800 mt-0.5 mb-1 pl-1 font-normal"
              onSave={(val) => handleNestedFieldUpdate("experience", index, "description", val)}
              onGenerateWithAI={wrapAIPromise(`experience-desc-${index}`)}
              minRows={1}
              maxRows={3}
            />
          </div>
        ))}
        </div>
      </div>

      {/* EDUCATION */}
      <div className="mb-3 flex flex-col">
        <span className={secTitle}>Education</span>
        <div className="flex flex-col gap-2">
        {data.education.map((edu: any, index: number) => (
          <div
            key={edu.id}
            className="bg-[#f1f0fb] rounded-xl p-4 pb-3 flex flex-col border border-[#ece6fb]"
          >
            <div className="flex flex-row items-center gap-4">
              <EditableField
                value={edu.degree}
                placeholder={placeholderMap.eduDegree}
                className="font-bold text-[1.08rem] text-[#1a1f2c]"
                onSave={(val) => handleNestedFieldUpdate("education", index, "degree", val)}
                onGenerateWithAI={wrapAIPromise(`education-degree-${index}`)}
                minRows={1}
                maxRows={1}
              />
              <span className="ml-auto text-sm text-gray-500 font-medium min-w-[120px] text-right">
                <EditableField
                  value={`${edu.startDate} - ${edu.endDate}`}
                  placeholder="Sep 2017 - May 2019"
                  className="inline"
                  onSave={(val) => {
                    const [startDate, endDate] = val.split(" - ");
                    handleNestedFieldUpdate("education", index, "startDate", startDate || "");
                    handleNestedFieldUpdate("education", index, "endDate", endDate || "");
                  }}
                  onGenerateWithAI={wrapAIPromise(`education-dates-${index}`)}
                  minRows={1}
                  maxRows={1}
                />
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5 mb-1 text-[#9b87f5] text-sm font-medium">
              <EditableField
                value={
                  edu.institution && edu.location
                    ? `${edu.institution}, ${edu.location}`
                    : edu.institution || edu.location || ""
                }
                placeholder="Stanford University, Stanford, CA"
                className="inline"
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
              className="text-[0.99rem] text-gray-800 mt-0.5 pl-1 font-normal"
              onSave={(val) => handleNestedFieldUpdate("education", index, "description", val)}
              onGenerateWithAI={wrapAIPromise(`education-desc-${index}`)}
              minRows={1}
              maxRows={2}
            />
          </div>
        ))}
        </div>
      </div>

      {/* SKILLS */}
      <div className="mb-0 flex flex-col">
        <span className={secTitle}>Skills</span>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Technical */}
          <div className="flex-1">
            <div className="text-[13px] font-medium text-gray-700 mb-1.5">Technical</div>
            <div className="flex flex-wrap gap-1.5 mb-1">
              {data.skills.technical.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-[#e5deff] text-[#7e69ab] font-medium rounded-full text-xs border border-[#ece6fb] transition"
                >
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
          {/* Soft */}
          <div className="flex-1">
            <div className="text-[13px] font-medium text-gray-700 mb-1.5">Soft</div>
            <div className="flex flex-wrap gap-1.5 mb-1">
              {data.skills.soft.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-[#f1f0fb] text-[#1a1f2c] font-normal rounded-full text-xs border border-[#ece6fb] transition"
                >
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

