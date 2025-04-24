
import React from 'react';
import { cn } from "@/lib/utils";
import EditableField from './EditableField';
import AddSectionItem from './AddSectionItem';
import { Linkedin, Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

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
  const handleFieldUpdate = (section: string, field: string, value: string) => {
    if (onUpdateData) {
      onUpdateData(section, {
        ...data[section],
        [field]: value
      });
    }
  };

  const nameClass = "text-xl font-bold text-gray-900 leading-tight tracking-tight pb-0 mb-1";
  const subtitleClass = "text-lg font-medium text-[#5d4dcd] mt-1 transition-all";
  const subtitleInputStyle = {
    color: '#5d4dcd',
    fontWeight: 500
  };
  const sectionHeaderClass = "text-sm font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1 uppercase tracking-wide";
  const experienceTitleClass = "font-medium text-gray-800 text-sm";
  const experienceDateClass = "text-sm text-gray-600 ml-3 whitespace-nowrap min-w-[100px] max-w-[160px]";
  const experienceDescriptionClass = "text-sm text-gray-700 mt-1 font-normal leading-relaxed";

  const handleAddExperience = () => {
    if (onUpdateData) {
      onUpdateData("experience", [
        ...data.experience,
        {
          id: uuidv4(),
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: ""
        }
      ]);
    }
  };

  const handleAddEducation = () => {
    if (onUpdateData) {
      onUpdateData("education", [
        ...data.education,
        {
          id: uuidv4(),
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          description: ""
        }
      ]);
    }
  };

  const contactFieldClass = "inline px-1 py-0 rounded bg-transparent border-none text-sm focus:bg-gray-100 text-gray-700 min-w-[60px] max-w-[180px]";
  const contactDivider = <span className="mx-1 text-gray-400">|</span>;

  // Helper function to validate URL strings
  const isValidUrl = (urlString: string): boolean => {
    try {
      if (!urlString || urlString.trim() === '') return false;
      // Add protocol if missing
      const urlToTest = urlString.match(/^https?:\/\//) ? urlString : `https://${urlString}`;
      new URL(urlToTest);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Helper to get URL hostname or original value
  const getDisplayUrl = (url: string): string => {
    try {
      if (!isValidUrl(url)) return url;
      const urlWithProtocol = url.match(/^https?:\/\//) ? url : `https://${url}`;
      return new URL(urlWithProtocol).hostname;
    } catch (e) {
      return url;
    }
  };

  // Helper to format links properly
  const formatLink = (url: string): string => {
    if (!url) return '';
    return url.match(/^https?:\/\//) ? url : `https://${url}`;
  };

  const contactItems = [{
    key: 'email',
    value: data.personal.email,
    placeholder: "john.smith@example.com",
    ai: "personal-email",
    icon: <Mail className="h-3.5 w-3.5 mr-1" />,
    link: data.personal.email ? `mailto:${data.personal.email}` : ''
  }, {
    key: 'phone',
    value: data.personal.phone,
    placeholder: "(555) 123-4567",
    ai: "personal-phone",
    icon: <Phone className="h-3.5 w-3.5 mr-1" />,
    link: data.personal.phone ? `tel:${data.personal.phone}` : ''
  }, {
    key: 'location',
    value: data.personal.location,
    placeholder: "San Francisco, CA",
    ai: "personal-location",
    icon: <MapPin className="h-3.5 w-3.5 mr-1" />
  }, ...(data.personal.linkedin ? [{
    key: 'linkedin',
    value: "LinkedIn",
    placeholder: "linkedin.com/in/johnsmith",
    ai: "personal-linkedin",
    icon: <Linkedin className="h-3.5 w-3.5 mr-1" />,
    link: data.personal.linkedin ? formatLink(
      data.personal.linkedin.includes('linkedin.com') ? 
      data.personal.linkedin : 
      `https://www.linkedin.com/in/${data.personal.linkedin}`
    ) : ''
  }] : []), ...(data.personal.website && isValidUrl(data.personal.website) ? [{
    key: 'website',
    value: getDisplayUrl(data.personal.website),
    placeholder: "johnsmith.dev",
    ai: "personal-website",
    icon: <LinkIcon className="h-3.5 w-3.5 mr-1" />,
    link: formatLink(data.personal.website)
  }] : [])];

  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 max-w-full", settings.fontFamily && `font-[${settings.fontFamily}]`)}
      style={{
        padding: "20px",
        background: "#fff",
        fontSize: `${settings.fontSize || 11}pt`,
        lineHeight: "1.5"
      }}>
      <div className="pb-4 border-b-2 border-[#5d4dcd] mb-4">
        <EditableField
          value={data.personal.name}
          placeholder="John Smith"
          className="text-xl font-bold text-gray-900 leading-tight tracking-tight"
          onSave={val => onUpdateData?.("personal", { ...data.personal, name: val })}
          onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("personal-name") : undefined}
          minRows={1}
          maxRows={1}
        />
        <EditableField
          value={data.personal.title}
          placeholder="Software Engineer"
          className="text-lg font-medium text-[#5d4dcd] mt-1 transition-all"
          onSave={val => onUpdateData?.("personal", { ...data.personal, title: val })}
          onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("personal-title") : undefined}
          minRows={1}
          maxRows={1}
          inputStyle={{ color: '#5d4dcd', fontWeight: 500 }}
          outputStyle={{ color: '#5d4dcd', fontWeight: 500 }}
        />
        <div className="flex flex-wrap text-sm text-gray-700 mt-2 gap-x-2 gap-y-1 items-center print:flex-row print:gap-x-2 print:gap-y-0">
          {contactItems.map((item, idx) => (
            <React.Fragment key={item.key}>
              {idx > 0 && contactDivider}
              <div className="inline-flex items-center">
                {item.icon}
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#5d4dcd] transition-colors"
                  >
                    <EditableField
                      value={item.value}
                      placeholder={item.placeholder}
                      className={contactFieldClass}
                      onSave={val => onUpdateData?.("personal", { 
                        ...data.personal, 
                        [item.key]: item.key === 'linkedin' || item.key === 'website' 
                          ? val 
                          : item.key === 'email' || item.key === 'phone' ? val : data.personal[item.key]
                      })}
                      onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(item.ai) : undefined}
                      minRows={1}
                      maxRows={1}
                    />
                  </a>
                ) : (
                  <EditableField
                    value={item.value}
                    placeholder={item.placeholder}
                    className={contactFieldClass}
                    onSave={val => onUpdateData?.("personal", { ...data.personal, [item.key]: val })}
                    onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(item.ai) : undefined}
                    minRows={1}
                    maxRows={1}
                  />
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mb-6 resume-section">
        <h2 className={sectionHeaderClass}>Summary</h2>
        <EditableField value={data.summary} placeholder="Experienced software engineer with 5+ years of experience in full-stack development. ..." onSave={val => onUpdateData?.("summary", val)} className="text-sm text-gray-700 font-normal leading-relaxed" onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("summary") : undefined} minRows={2} maxRows={4} />
      </div>

      <div className="mb-6 resume-section">
        <h2 className={sectionHeaderClass}>Experience</h2>
        {data.experience.map((exp: any, index: number) => (
          <div key={exp.id} className="mb-5 last:mb-0 resume-item">
            <div className="flex items-baseline justify-between flex-wrap gap-x-2">
              <div className="flex-1 min-w-0">
                <EditableField
                  value={exp.title}
                  placeholder="Senior Software Engineer"
                  className={experienceTitleClass}
                  onSave={val => onUpdateData?.("experience", [...data.experience.slice(0, index), {
                    ...exp,
                    title: val
                  }, ...data.experience.slice(index + 1)])}
                  onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`experience-title-${index}`) : undefined}
                  minRows={1}
                  maxRows={1}
                />
              </div>
              <EditableField
                value={`${exp.startDate} - ${exp.endDate}`}
                placeholder="Jan 2022 - Present"
                className={experienceDateClass}
                onSave={val => {
                  const [startDate, endDate] = val.split(" - ");
                  onUpdateData?.("experience", [...data.experience.slice(0, index), {
                    ...exp,
                    startDate: startDate || "",
                    endDate: endDate || ""
                  }, ...data.experience.slice(index + 1)]);
                }}
                onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`experience-dates-${index}`) : undefined}
                minRows={1}
                maxRows={1}
              />
            </div>
            <EditableField
              value={exp.company && exp.location ? `${exp.company}, ${exp.location}` : exp.company || exp.location || ""}
              placeholder="Tech Solutions Inc., San Francisco, CA"
              className="text-sm text-[#5d4dcd] font-medium my-0.5"
              onSave={val => {
                let [company, ...locParts] = val.split(",");
                const location = locParts.join(",").trim();
                onUpdateData?.("experience", [...data.experience.slice(0, index), {
                  ...exp,
                  company: company?.trim() || "",
                  location: location
                }, ...data.experience.slice(index + 1)]);
              }}
              onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`experience-company-${index}`) : undefined}
              minRows={1}
              maxRows={1}
            />
            <EditableField
              value={exp.description}
              placeholder="Lead developer for the company's flagship product..."
              className={experienceDescriptionClass}
              onSave={val => onUpdateData?.("experience", [...data.experience.slice(0, index), {
                ...exp,
                description: val
              }, ...data.experience.slice(index + 1)])}
              onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`experience-desc-${index}`) : undefined}
              minRows={1}
              maxRows={3}
            />
          </div>
        ))}
        <AddSectionItem onAdd={handleAddExperience} />
      </div>

      <div className="mb-6 resume-section">
        <h2 className={sectionHeaderClass}>Education</h2>
        {data.education.map((edu: any, index: number) => (
          <div key={edu.id} className="mb-5 last:mb-0 resume-item">
            <div className="flex items-baseline justify-between flex-wrap gap-x-2">
              <div className="flex-1 min-w-0">
                <EditableField
                  value={edu.degree}
                  placeholder="Master of Science in Computer Science"
                  className={experienceTitleClass}
                  onSave={val => onUpdateData?.("education", [...data.education.slice(0, index), {
                    ...edu,
                    degree: val
                  }, ...data.education.slice(index + 1)])}
                  onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-degree-${index}`) : undefined}
                  minRows={1}
                  maxRows={1}
                />
                <EditableField
                  value={edu.institution && edu.location ? `${edu.institution}, ${edu.location}` : edu.institution || edu.location || ""}
                  placeholder="Stanford University, Stanford, CA"
                  className="text-sm text-[#5d4dcd] font-medium my-0.5"
                  onSave={val => {
                    let [inst, ...locParts] = val.split(",");
                    const location = locParts.join(",").trim();
                    onUpdateData?.("education", [...data.education.slice(0, index), {
                      ...edu,
                      institution: inst?.trim() || "",
                      location: location
                    }, ...data.education.slice(index + 1)]);
                  }}
                  onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-institution-${index}`) : undefined}
                  minRows={1}
                  maxRows={1}
                />
              </div>
              <EditableField
                value={`${edu.startDate} - ${edu.endDate}`}
                placeholder="Sep 2017 - May 2019"
                className={experienceDateClass}
                onSave={val => {
                  const [startDate, endDate] = val.split(" - ");
                  onUpdateData?.("education", [...data.education.slice(0, index), {
                    ...edu,
                    startDate: startDate || "",
                    endDate: endDate || ""
                  }, ...data.education.slice(index + 1)]);
                }}
                onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-dates-${index}`) : undefined}
                minRows={1}
                maxRows={1}
              />
            </div>
            <EditableField
              value={edu.description || ""}
              placeholder="Specialization in Artificial Intelligence. GPA: 3.8/4.0"
              className={experienceDescriptionClass}
              onSave={val => onUpdateData?.("education", [...data.education.slice(0, index), {
                ...edu,
                description: val
              }, ...data.education.slice(index + 1)])}
              onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-desc-${index}`) : undefined}
              minRows={1}
              maxRows={2}
            />
          </div>
        ))}
        <AddSectionItem onAdd={handleAddEducation} />
      </div>

      <div className="mb-2 pb-2 border-b border-gray-200 resume-section">
        <h2 className={sectionHeaderClass}>Skills</h2>
        <div className="mb-3">
          <div className="font-medium text-gray-700 text-sm mb-1.5">Technical Skills</div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {data.skills.technical.map((skill: string, i: number) => (
              <span key={i} className="px-2 py-0.5 bg-[#efeafc] rounded-sm text-sm border-[0.5px] border-[#dad3f8] shadow-xs transition whitespace-nowrap text-violet-400 font-normal">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="font-medium text-gray-700 text-sm mb-1.5">Soft Skills</div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {data.skills.soft.map((skill: string, i: number) => (
              <span key={i} className="px-2 py-0.5 bg-[#f3f3f3] text-gray-600 font-medium rounded-sm text-sm border-[0.5px] border-[#e5e5e5] transition whitespace-nowrap">
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
