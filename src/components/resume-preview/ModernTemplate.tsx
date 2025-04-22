
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

  // STYLE CONSTANTS
  const nameClass = "text-[2.7rem] sm:text-5xl font-extrabold text-[#232323] leading-tight tracking-tight pb-0 mb-2";
  const subtitleClass =
    "text-xl font-semibold text-[#7061e7] mt-1 transition-all";
  const subtitleInputStyle = { color: '#7061e7', fontWeight: 600 };
  const contactFieldClass =
    "inline px-2 py-0.5 rounded bg-transparent border-none text-[15px] focus:bg-gray-100 text-[#232323] min-w-[90px] max-w-[190px]";
  const contactDivider = <span className="mx-2 text-[#aaa] font-semibold select-none">|</span>;
  const sectionHeader =
    "text-lg font-bold text-[#232323] mb-2 border-b border-[#e4e4e4] pb-1 tracking-normal";

  // Horizontal contact row layout for mobile/desktop
  const contactItems = [
    {
      key: 'email',
      value: data.personal.email,
      placeholder: "john.smith@example.com",
      ai: "personal-email"
    },
    {
      key: 'phone',
      value: data.personal.phone,
      placeholder: "(555) 123-4567",
      ai: "personal-phone"
    },
    {
      key: 'location',
      value: data.personal.location,
      placeholder: "San Francisco, CA",
      ai: "personal-location"
    },
    ...(data.personal.linkedin ? [{
      key: 'linkedin',
      value: data.personal.linkedin,
      placeholder: "linkedin.com/in/johnsmith",
      ai: "personal-linkedin"
    }] : []),
    ...(data.personal.website ? [{
      key: 'website',
      value: data.personal.website,
      placeholder: "johnsmith.dev",
      ai: "personal-website"
    }] : []),
  ];

  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-lg border border-[#ede9f7] max-w-[720px] mx-auto",
        settings.fontFamily && `font-[${settings.fontFamily}]`,
        settings.fontSize && `text-[${settings.fontSize}pt]`
      )}
      style={{
        padding: "48px 56px 38px 56px",
        background: "#fff"
      }}
    >
      {/* HEADER */}
      <div className="pb-6 border-b-4 border-resume-purple mb-10">
        <EditableField
          value={data.personal.name}
          placeholder="John Smith"
          className={nameClass}
          onSave={val => onUpdateData?.("personal", { ...data.personal, name: val })}
          onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("personal-name") : undefined}
          minRows={1}
          maxRows={1}
        />
        {/* Subtitle - styled output & input both purple */}
        <EditableField
          value={data.personal.title}
          placeholder="Software Engineer"
          className={subtitleClass}
          onSave={val => onUpdateData?.("personal", { ...data.personal, title: val })}
          onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("personal-title") : undefined}
          minRows={1}
          maxRows={1}
          inputStyle={subtitleInputStyle}
          outputStyle={subtitleInputStyle}
        />
        {/* Contact Row: horizontal, responsive, no vertical stacking except on mobile */}
        <div className="flex flex-wrap text-[15px] text-[#232323] mt-4 gap-y-2 items-center">
          <div className="flex flex-wrap items-center gap-x-1">
            {contactItems.map((item, idx) => (
              <React.Fragment key={item.key}>
                {idx > 0 && contactDivider}
                <EditableField
                  value={item.value}
                  placeholder={item.placeholder}
                  className={contactFieldClass}
                  onSave={val =>
                    onUpdateData?.("personal", { ...data.personal, [item.key]: val })
                  }
                  onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(item.ai) : undefined}
                  minRows={1}
                  maxRows={1}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mb-12 section-gap">
        <h2 className={sectionHeader}>Summary</h2>
        <EditableField
          value={data.summary}
          placeholder="Experienced software engineer with 5+ years of experience in full-stack development. ..."
          onSave={val => onUpdateData?.("summary", val)}
          className="text-[15px] text-gray-800 font-normal leading-normal"
          onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("summary") : undefined}
          minRows={2}
          maxRows={4}
        />
      </div>

      {/* EXPERIENCE */}
      <div className="mb-12 section-gap">
        <h2 className={sectionHeader}>Experience</h2>
        {data.experience.map((exp: any, index: number) => (
          <div key={exp.id} className="mb-8 last:mb-0">
            <div className="flex items-baseline justify-between flex-wrap gap-x-4">
              <EditableField
                value={exp.title}
                placeholder="Senior Software Engineer"
                className="font-semibold text-gray-900 text-[1.07rem]"
                onSave={val => onUpdateData?.("experience", [
                  ...data.experience.slice(0, index),
                  { ...exp, title: val },
                  ...data.experience.slice(index + 1)
                ])}
                onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`experience-title-${index}`) : undefined}
                minRows={1}
                maxRows={1}
              />
              <EditableField
                value={`${exp.startDate} - ${exp.endDate}`}
                placeholder="Jan 2022 - Present"
                className="inline text-[15px] text-gray-700 ml-4 whitespace-nowrap min-w-[120px] max-w-[180px]"
                onSave={val => {
                  const [startDate, endDate] = val.split(" - ");
                  onUpdateData?.("experience", [
                    ...data.experience.slice(0, index),
                    {
                      ...exp,
                      startDate: startDate || "",
                      endDate: endDate || ""
                    },
                    ...data.experience.slice(index + 1)
                  ]);
                }}
                onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`experience-dates-${index}`) : undefined}
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
              onSave={val => {
                let [company, ...locParts] = val.split(",");
                const location = locParts.join(",").trim();
                onUpdateData?.("experience", [
                  ...data.experience.slice(0, index),
                  { ...exp, company: (company?.trim() || ""), location: location },
                  ...data.experience.slice(index + 1)
                ]);
              }}
              onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`experience-company-${index}`) : undefined}
              minRows={1}
              maxRows={1}
            />
            <EditableField
              value={exp.description}
              placeholder="Lead developer for the company's flagship product..."
              className="text-[15px] text-gray-700 mt-0.5 font-normal"
              onSave={val => onUpdateData?.("experience", [
                ...data.experience.slice(0, index),
                { ...exp, description: val },
                ...data.experience.slice(index + 1)
              ])}
              onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`experience-desc-${index}`) : undefined}
              minRows={1}
              maxRows={3}
            />
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div className="mb-12 section-gap">
        <h2 className={sectionHeader}>Education</h2>
        {data.education.map((edu: any, index: number) => (
          <div key={edu.id} className="mb-8 last:mb-0">
            <div className="flex items-baseline justify-between flex-wrap gap-x-4">
              <EditableField
                value={edu.degree}
                placeholder="Master of Science in Computer Science"
                className="font-semibold text-gray-900 text-[1.07rem]"
                onSave={val => onUpdateData?.("education", [
                  ...data.education.slice(0, index),
                  { ...edu, degree: val },
                  ...data.education.slice(index + 1)
                ])}
                onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-degree-${index}`) : undefined}
                minRows={1}
                maxRows={1}
              />
              <EditableField
                value={`${edu.startDate} - ${edu.endDate}`}
                placeholder="Sep 2017 - May 2019"
                className="inline text-[15px] text-gray-700 ml-4 whitespace-nowrap min-w-[120px] max-w-[180px]"
                onSave={val => {
                  const [startDate, endDate] = val.split(" - ");
                  onUpdateData?.("education", [
                    ...data.education.slice(0, index),
                    {
                      ...edu,
                      startDate: startDate || "",
                      endDate: endDate || ""
                    },
                    ...data.education.slice(index + 1)
                  ]);
                }}
                onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-dates-${index}`) : undefined}
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
              onSave={val => {
                let [inst, ...locParts] = val.split(",");
                const location = locParts.join(",").trim();
                onUpdateData?.("education", [
                  ...data.education.slice(0, index),
                  { ...edu, institution: (inst?.trim() || ""), location: location },
                  ...data.education.slice(index + 1)
                ]);
              }}
              onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-institution-${index}`) : undefined}
              minRows={1}
              maxRows={1}
            />
            <EditableField
              value={edu.description || ""}
              placeholder="Specialization in Artificial Intelligence. GPA: 3.8/4.0"
              className="text-[15px] text-gray-700 mt-0.5 font-normal"
              onSave={val => onUpdateData?.("education", [
                ...data.education.slice(0, index),
                { ...edu, description: val },
                ...data.education.slice(index + 1)
              ])}
              onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-desc-${index}`) : undefined}
              minRows={1}
              maxRows={2}
            />
          </div>
        ))}
      </div>

      {/* SKILLS - DISPLAY ONLY, NO EDIT */}
      <div className="mb-2 pb-2 border-b border-[#e4e4e4] section-gap">
        <h2 className={sectionHeader}>Skills</h2>
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
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
