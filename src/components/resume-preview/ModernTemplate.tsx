
import React from 'react';
import { cn } from "@/lib/utils";
import EditableField from './EditableField';

interface ModernTemplateProps {
  data: any;
  settings?: any;
  onUpdateData?: (section: string, value: any) => void;
  onGenerateWithAI?: (section: string) => Promise<string>;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({
  data,
  settings = {},
  onUpdateData,
  onGenerateWithAI
}) => {
  // Helper to handle saving edits for section fields
  const handleFieldUpdate = (section: string, field: string, value: string) => {
    if (onUpdateData) {
      onUpdateData(section, { ...data[section], [field]: value });
    }
  };

  const handleNestedFieldUpdate = (section: string, index: number, field: string, value: string) => {
    if (onUpdateData) {
      const updated = [...data[section]];
      updated[index] = { ...updated[index], [field]: value };
      onUpdateData(section, updated);
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
        "bg-white rounded-none shadow-none border border-[#e3e3e3] max-w-[720px] mx-auto text-[15px]",
        settings.fontFamily && `font-[${settings.fontFamily}]`,
        settings.fontSize && `text-[${settings.fontSize}pt]`
      )}
      style={{
        padding: "40px 48px 32px 48px",
      }}
    >
      {/* HEADER */}
      <div className="pb-4">
        <EditableField
          value={data.personal.name}
          placeholder="John Smith"
          className="text-[2.15rem] font-bold text-[#232323] leading-tight tracking-tight"
          onSave={(val) => handleFieldUpdate("personal", "name", val)}
          onGenerateWithAI={wrapAIPromise("personal-name")}
          minRows={1}
          maxRows={1}
        />
        <EditableField
          value={data.personal.title}
          placeholder="Software Engineer"
          className="text-lg font-medium text-[#7061e7] mt-1"
          onSave={(val) => handleFieldUpdate("personal", "title", val)}
          onGenerateWithAI={wrapAIPromise("personal-title")}
          minRows={1}
          maxRows={1}
        />
        
        {/* Contact Row - Modified to ensure horizontal layout */}
        <div className="flex flex-wrap text-[15px] text-[#232323] mt-3 items-center">
          <div className="flex items-center">
            <EditableField
              value={data.personal.email}
              placeholder="john.smith@example.com"
              className="inline"
              onSave={(val) => handleFieldUpdate("personal", "email", val)}
              onGenerateWithAI={wrapAIPromise("personal-email")}
              minRows={1}
              maxRows={1}
            />
          </div>
          
          <span className="mx-2 text-[#aaa] font-semibold select-none">|</span>
          
          <div className="flex items-center">
            <EditableField
              value={data.personal.phone}
              placeholder="(555) 123-4567"
              className="inline"
              onSave={(val) => handleFieldUpdate("personal", "phone", val)}
              onGenerateWithAI={wrapAIPromise("personal-phone")}
              minRows={1}
              maxRows={1}
            />
          </div>
          
          <span className="mx-2 text-[#aaa] font-semibold select-none">|</span>
          
          <div className="flex items-center">
            <EditableField
              value={data.personal.location}
              placeholder="San Francisco, CA"
              className="inline"
              onSave={(val) => handleFieldUpdate("personal", "location", val)}
              onGenerateWithAI={wrapAIPromise("personal-location")}
              minRows={1}
              maxRows={1}
            />
          </div>
          
          {data.personal.linkedin && (
            <>
              <span className="mx-2 text-[#aaa] font-semibold select-none">|</span>
              <div className="flex items-center">
                <EditableField
                  value={data.personal.linkedin}
                  placeholder="linkedin.com/in/johnsmith"
                  className="inline"
                  onSave={(val) => handleFieldUpdate("personal", "linkedin", val)}
                  onGenerateWithAI={wrapAIPromise("personal-linkedin")}
                  minRows={1}
                  maxRows={1}
                />
              </div>
            </>
          )}
          
          {data.personal.website && (
            <>
              <span className="mx-2 text-[#aaa] font-semibold select-none">|</span>
              <div className="flex items-center">
                <EditableField
                  value={data.personal.website}
                  placeholder="johnsmith.dev"
                  className="inline text-[15px] text-[#232323]"
                  onSave={(val) => handleFieldUpdate("personal", "website", val)}
                  onGenerateWithAI={wrapAIPromise("personal-website")}
                  minRows={1}
                  maxRows={1}
                />
              </div>
            </>
          )}
        </div>
        
        {/* Underline */}
        <div className="border-t border-[#7B61FF] mt-5" />
      </div>

      {/* SUMMARY */}
      <div className="mb-7">
        <h2 className="text-xl font-bold text-[#232323] mb-2 border-b border-[#e4e4e4] pb-1">Summary</h2>
        <EditableField
          value={data.summary}
          placeholder="Experienced software engineer with 5+ years of experience in full-stack development. ..."
          onSave={(val) => onUpdateData?.("summary", val)}
          className="text-[15px] text-gray-800 font-normal leading-normal"
          onGenerateWithAI={wrapAIPromise("summary")}
          minRows={2}
          maxRows={4}
        />
      </div>

      {/* EXPERIENCE */}
      <div className="mb-7">
        <h2 className="text-xl font-bold text-[#232323] mb-2 border-b border-[#e4e4e4] pb-1">Experience</h2>
        {data.experience.map((exp: any, index: number) => (
          <div key={exp.id} className="mb-5 last:mb-0">
            <div className="flex items-baseline justify-between">
              <EditableField
                value={exp.title}
                placeholder="Senior Software Engineer"
                className="font-semibold text-gray-900"
                onSave={(val) => handleNestedFieldUpdate("experience", index, "title", val)}
                onGenerateWithAI={wrapAIPromise(`experience-title-${index}`)}
                minRows={1}
                maxRows={1}
              />
              <EditableField
                value={`${exp.startDate} - ${exp.endDate}`}
                placeholder="Jan 2022 - Present"
                className="inline text-[15px] text-gray-700 ml-4 whitespace-nowrap"
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
            <EditableField
              value={
                exp.company && exp.location
                  ? `${exp.company}, ${exp.location}`
                  : exp.company || exp.location || ""
              }
              placeholder="Tech Solutions Inc., San Francisco, CA"
              className="text-[15px] text-[#7061e7] font-medium my-0.5"
              onSave={(val) => {
                let [company, ...locParts] = val.split(",");
                const location = locParts.join(",").trim();
                handleNestedFieldUpdate("experience", index, "company", company?.trim() || "");
                handleNestedFieldUpdate("experience", index, "location", location || "");
              }}
              onGenerateWithAI={wrapAIPromise(`experience-company-${index}`)}
              minRows={1}
              maxRows={1}
            />
            <EditableField
              value={exp.description}
              placeholder="Lead developer for the company's flagship product..."
              className="text-[15px] text-gray-700 mt-0.5 font-normal"
              onSave={(val) => handleNestedFieldUpdate("experience", index, "description", val)}
              onGenerateWithAI={wrapAIPromise(`experience-desc-${index}`)}
              minRows={1}
              maxRows={3}
            />
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div className="mb-7">
        <h2 className="text-xl font-bold text-[#232323] mb-2 border-b border-[#e4e4e4] pb-1">Education</h2>
        {data.education.map((edu: any, index: number) => (
          <div key={edu.id} className="mb-5 last:mb-0">
            <div className="flex items-baseline justify-between">
              <EditableField
                value={edu.degree}
                placeholder="Master of Science in Computer Science"
                className="font-semibold text-gray-900"
                onSave={(val) => handleNestedFieldUpdate("education", index, "degree", val)}
                onGenerateWithAI={wrapAIPromise(`education-degree-${index}`)}
                minRows={1}
                maxRows={1}
              />
              <EditableField
                value={`${edu.startDate} - ${edu.endDate}`}
                placeholder="Sep 2017 - May 2019"
                className="inline text-[15px] text-gray-700 ml-4 whitespace-nowrap"
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
            <EditableField
              value={
                edu.institution && edu.location
                  ? `${edu.institution}, ${edu.location}`
                  : edu.institution || edu.location || ""
              }
              placeholder="Stanford University, Stanford, CA"
              className="text-[15px] text-[#7061e7] font-medium my-0.5"
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
            <EditableField
              value={edu.description || ""}
              placeholder="Specialization in Artificial Intelligence. GPA: 3.8/4.0"
              className="text-[15px] text-gray-700 mt-0.5 font-normal"
              onSave={(val) => handleNestedFieldUpdate("education", index, "description", val)}
              onGenerateWithAI={wrapAIPromise(`education-desc-${index}`)}
              minRows={1}
              maxRows={2}
            />
          </div>
        ))}
      </div>

      {/* SKILLS - Fixed to remove duplicated text */}
      <div className="mb-2 pb-2 border-b border-[#e4e4e4]">
        <h2 className="text-xl font-bold text-[#232323] mb-2">Skills</h2>
        <div className="mb-2">
          <div className="font-semibold text-gray-800 text-[15px]">Technical Skills</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills.technical.map((skill: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#e7e2fa] text-[#7061e7] font-semibold rounded-md text-xs border border-[#ebe7fd] shadow-xs transition whitespace-nowrap"
                style={{ background: "#eee8ff" }}
              >
                {skill}
              </span>
            ))}
          </div>
          {/* Hidden editable field for AI - Kept to maintain functionality */}
          <EditableField
            value={data.skills.technical.join(", ")}
            placeholder="JavaScript, TypeScript, React, Node.js, Python"
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
        <div>
          <div className="font-semibold text-gray-800 text-[15px]">Soft Skills</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills.soft.map((skill: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#f3f3f3] text-[#333] font-medium rounded-md text-xs border border-[#eaeaea] transition whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
          {/* Hidden editable field for AI - Kept to maintain functionality */}
          <EditableField
            value={data.skills.soft.join(", ")}
            placeholder="Leadership, Communication, Problem Solving"
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
  );
};

export default ModernTemplate;
