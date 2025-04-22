
import React from 'react';
import { cn } from "@/lib/utils";
import EditableField from './EditableField';

interface ModernTemplateProps {
  data: any;
  settings?: any;
  onUpdateData?: (section: string, value: any) => void;
  onGenerateWithAI?: (section: string) => Promise<string>;
}

// For placeholders in case of empty fields
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
        "bg-white rounded-2xl shadow-sm border border-[#ece6fb] max-w-[850px] mx-auto",
        "transition-all duration-300",
        settings.fontFamily && `font-[${settings.fontFamily}]`,
        settings.fontSize && `text-[${settings.fontSize}pt]`
      )}
      style={{
        padding: "2.7rem 2.2rem 2.4rem 2.2rem",
        boxShadow: "0 4px 44px 0 rgba(155,135,245,0.12)",
      }}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center border-b border-[#e2e1f9] pb-6 mb-6 gap-1.5 md:gap-0">
        {/* Name & Title */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <EditableField
            value={data.personal.name}
            placeholder={placeholderMap.name}
            className="text-[2.15rem] md:text-[2.4rem] font-extrabold text-[#22223B] leading-tight tracking-tight"
            onSave={(val) => handleFieldUpdate("personal", "name", val)}
            onGenerateWithAI={wrapAIPromise("personal-name")}
            minRows={1}
            maxRows={1}
          />
          <EditableField
            value={data.personal.title}
            placeholder={placeholderMap.title}
            className="text-lg font-medium text-[#9b87f5] tracking-wide"
            onSave={(val) => handleFieldUpdate("personal", "title", val)}
            onGenerateWithAI={wrapAIPromise("personal-title")}
            minRows={1}
            maxRows={1}
          />
        </div>
        {/* Main contact, horizontal layout */}
        <div className="flex flex-row flex-wrap items-center justify-end gap-5 text-gray-600 mt-2 md:mt-0 ml-0 md:ml-16 min-w-0 max-w-full">
          <EditableField
            value={data.personal.email}
            placeholder={placeholderMap.email}
            className="inline font-normal text-[0.98rem] min-w-[90px] max-w-[130px] truncate"
            onSave={(val) => handleFieldUpdate("personal", "email", val)}
            onGenerateWithAI={wrapAIPromise("personal-email")}
            minRows={1}
            maxRows={1}
          />
          <span className="h-4 w-[1.2px] bg-[#e2e1f9] rounded block"></span>
          <EditableField
            value={data.personal.phone}
            placeholder={placeholderMap.phone}
            className="inline font-normal text-[0.98rem] min-w-[70px] max-w-[110px] truncate"
            onSave={(val) => handleFieldUpdate("personal", "phone", val)}
            onGenerateWithAI={wrapAIPromise("personal-phone")}
            minRows={1}
            maxRows={1}
          />
          {data.personal.location && (
            <>
              <span className="h-4 w-[1.2px] bg-[#e2e1f9] rounded block"></span>
              <EditableField
                value={data.personal.location}
                placeholder={placeholderMap.location}
                className="inline font-normal text-[0.98rem] min-w-[80px] max-w-[120px] truncate"
                onSave={(val) => handleFieldUpdate("personal", "location", val)}
                onGenerateWithAI={wrapAIPromise("personal-location")}
                minRows={1}
                maxRows={1}
              />
            </>
          )}
          {data.personal.linkedin && (
            <>
              <span className="h-4 w-[1.2px] bg-[#e2e1f9] rounded block"></span>
              <EditableField
                value={data.personal.linkedin}
                placeholder={placeholderMap.linkedin}
                className="inline font-normal text-[0.98rem] min-w-[90px] max-w-[120px] truncate"
                onSave={(val) => handleFieldUpdate("personal", "linkedin", val)}
                onGenerateWithAI={wrapAIPromise("personal-linkedin")}
                minRows={1}
                maxRows={1}
              />
            </>
          )}
          {data.personal.website && (
            <>
              <span className="h-4 w-[1.2px] bg-[#e2e1f9] rounded block"></span>
              <EditableField
                value={data.personal.website}
                placeholder={placeholderMap.website}
                className="inline font-normal text-[0.98rem] min-w-[90px] max-w-[120px] truncate"
                onSave={(val) => handleFieldUpdate("personal", "website", val)}
                onGenerateWithAI={wrapAIPromise("personal-website")}
                minRows={1}
                maxRows={1}
              />
            </>
          )}
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mb-7">
        <h2 className="text-md font-semibold text-[#9b87f5] mb-1 tracking-wide uppercase leading-none">
          Summary
        </h2>
        <EditableField
          value={data.summary}
          placeholder={placeholderMap.summary}
          onSave={(val) => onUpdateData?.("summary", val)}
          className="text-base text-gray-700 font-[500] tracking-tight"
          onGenerateWithAI={wrapAIPromise("summary")}
          minRows={2}
          maxRows={3}
        />
      </div>

      {/* EXPERIENCE */}
      <div className="mb-7">
        <h2 className="text-md font-semibold text-[#9b87f5] mb-3 tracking-wide uppercase leading-none">
          Experience
        </h2>
        <div className="flex flex-col gap-4">
        {data.experience.map((exp: any, index: number) => (
          <div
            key={exp.id}
            className="bg-[#f1f0fb] rounded-2xl px-4 py-3 border border-[#e2e1f9] flex flex-col"
          >
            <div className="flex flex-row items-center gap-4">
              <EditableField
                value={exp.title}
                placeholder={placeholderMap.expTitle}
                className="font-semibold text-[1.09rem] text-[#1a1f2c] tracking-tight"
                onSave={(val) => handleNestedFieldUpdate("experience", index, "title", val)}
                onGenerateWithAI={wrapAIPromise(`experience-title-${index}`)}
                minRows={1}
                maxRows={1}
              />
              <span className="ml-auto text-[0.98rem] text-gray-500 font-medium min-w-[115px] text-right">
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
      <div className="mb-7">
        <h2 className="text-md font-semibold text-[#9b87f5] mb-3 tracking-wide uppercase leading-none">
          Education
        </h2>
        <div className="flex flex-col gap-4">
        {data.education.map((edu: any, index: number) => (
          <div
            key={edu.id}
            className="bg-[#f1f0fb] rounded-2xl px-4 py-3 border border-[#e2e1f9] flex flex-col"
          >
            <div className="flex flex-row items-center gap-4">
              <EditableField
                value={edu.degree}
                placeholder={placeholderMap.eduDegree}
                className="font-semibold text-[1.09rem] text-[#1a1f2c] tracking-tight"
                onSave={(val) => handleNestedFieldUpdate("education", index, "degree", val)}
                onGenerateWithAI={wrapAIPromise(`education-degree-${index}`)}
                minRows={1}
                maxRows={1}
              />
              <span className="ml-auto text-[0.98rem] text-gray-500 font-medium min-w-[115px] text-right">
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
      <div>
        <h2 className="text-md font-semibold text-[#9b87f5] mb-3 tracking-wide uppercase leading-none">
          Skills
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Technical */}
          <div className="flex-1">
            <div className="text-[13px] font-medium text-gray-700 mb-1.5">Technical</div>
            <div className="flex flex-wrap gap-2 mb-1">
              {data.skills.technical.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#e5deff] text-[#7e69ab] font-medium rounded-full text-xs border border-[#ece6fb] shadow-sm transition whitespace-nowrap"
                  style={{ background: "linear-gradient(90deg, #f1f0fb 0%, #e5deff 100%)", }}
                >
                  {skill}
                </span>
              ))}
            </div>
            {/* sr-only textarea for editing skills */}
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
            <div className="flex flex-wrap gap-2 mb-1">
              {data.skills.soft.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-[#f1f0fb] text-[#1a1f2c] font-normal rounded-full text-xs border border-[#ece6fb] shadow-sm transition whitespace-nowrap"
                  style={{ background: "linear-gradient(90deg, #f8f6fd 0%, #f1f0fb 100%)", }}
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

