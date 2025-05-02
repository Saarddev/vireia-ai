
import React from 'react';
import { cn } from "@/lib/utils";
import EditableField from './EditableField';
import AddSectionItem from './AddSectionItem';
import { v4 as uuidv4 } from 'uuid';
import { Experience, Education, Project } from '@/types/resume.d';

interface ProfessionalTemplateProps {
  data: any;
  settings?: any;
  onUpdateData?: (section: string, value: any) => void;
  onGenerateWithAI?: (section: string) => Promise<string>;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({
  data,
  settings = {},
  onUpdateData,
  onGenerateWithAI
}) => {
  // Ensure data has all required properties with defaults
  const safeData = React.useMemo(() => {
    return {
      ...data,
      experience: Array.isArray(data.experience) ? data.experience : [],
      education: Array.isArray(data.education) ? data.education : [],
      projects: Array.isArray(data.projects) ? data.projects : [],
      skills: data.skills || { technical: [], soft: [] },
      personal: data.personal || {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: ""
      },
      summary: data.summary || ""
    };
  }, [data]);

  const handleFieldUpdate = (section: string, field: string, value: string, itemId?: string) => {
    if (onUpdateData) {
      if (itemId && ['experience', 'education', 'projects'].includes(section)) {
        // Handling array items (experience, education, projects)
        const items = [...safeData[section]];
        const itemIndex = items.findIndex((item: any) => item.id === itemId);
        
        if (itemIndex >= 0) {
          const updatedItem = { ...items[itemIndex], [field]: value };
          items[itemIndex] = updatedItem;
          onUpdateData(section, items);
        }
      } else {
        // Handling other sections (personal, summary, skills)
        onUpdateData(section, {
          ...safeData[section],
          [field]: value
        });
      }
    }
  };

  const handleAddExperience = () => {
    if (onUpdateData) {
      onUpdateData("experience", [
        ...safeData.experience,
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
        ...safeData.education,
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

  const primaryColor = settings.primaryColor || '#004466';
  
  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 max-w-full", 
      settings.fontFamily && `font-[${settings.fontFamily}]`)}
      style={{
        padding: "28px",
        background: "#fff",
        fontSize: `${settings.fontSize || 11}pt`,
        lineHeight: "1.6"
      }}>
      
      {/* Header with name and contact info */}
      <div className="text-center mb-6">
        <EditableField
          value={safeData.personal.name}
          placeholder="John Smith"
          className="text-2xl font-bold"
          style={{ color: primaryColor }}
          onSave={val => onUpdateData?.("personal", { ...safeData.personal, name: val })}
          onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("personal-name") : undefined}
          minRows={1}
          maxRows={1}
        />
        
        <div className="flex flex-wrap justify-center items-center gap-2 mt-2 text-sm">
          {safeData.personal.email && (
            <span className="inline-flex items-center">
              <EditableField
                value={safeData.personal.email}
                placeholder="email@example.com"
                className="text-[#007acc] hover:underline"
                onSave={val => onUpdateData?.("personal", { ...safeData.personal, email: val })}
                minRows={1}
                maxRows={1}
              />
            </span>
          )}
          
          {safeData.personal.phone && (
            <>
              <span className="text-gray-400">|</span>
              <span className="inline-flex items-center">
                <EditableField
                  value={safeData.personal.phone}
                  placeholder="(123) 456-7890"
                  className="text-[#007acc] hover:underline"
                  onSave={val => onUpdateData?.("personal", { ...safeData.personal, phone: val })}
                  minRows={1}
                  maxRows={1}
                />
              </span>
            </>
          )}
          
          {safeData.personal.location && (
            <>
              <span className="text-gray-400">|</span>
              <span className="inline-flex items-center">
                <EditableField
                  value={safeData.personal.location}
                  placeholder="San Francisco, CA"
                  className="text-[#007acc] hover:underline"
                  onSave={val => onUpdateData?.("personal", { ...safeData.personal, location: val })}
                  minRows={1}
                  maxRows={1}
                />
              </span>
            </>
          )}
          
          {safeData.personal.linkedin && (
            <>
              <span className="text-gray-400">|</span>
              <span className="inline-flex items-center">
                <EditableField
                  value={safeData.personal.linkedin}
                  placeholder="linkedin.com/in/johnsmith"
                  className="text-[#007acc] hover:underline"
                  onSave={val => onUpdateData?.("personal", { ...safeData.personal, linkedin: val })}
                  minRows={1}
                  maxRows={1}
                />
              </span>
            </>
          )}
          
          {safeData.personal.website && (
            <>
              <span className="text-gray-400">|</span>
              <span className="inline-flex items-center">
                <EditableField
                  value={safeData.personal.website}
                  placeholder="johnsmith.com"
                  className="text-[#007acc] hover:underline"
                  onSave={val => onUpdateData?.("personal", { ...safeData.personal, website: val })}
                  minRows={1}
                  maxRows={1}
                />
              </span>
            </>
          )}
        </div>
      </div>
      
      {/* Summary Section */}
      {safeData.summary && (
        <div className="mb-5">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ color: primaryColor }}>Summary</h2>
          <EditableField 
            value={safeData.summary} 
            placeholder="Experienced software engineer with 5+ years of experience..." 
            onSave={val => onUpdateData?.("summary", val)} 
            className="text-sm text-gray-700" 
            onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI("summary") : undefined} 
            minRows={2} 
            maxRows={4} 
          />
        </div>
      )}
      
      {/* Skills Section */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ color: primaryColor }}>Skills</h2>
        
        {safeData.skills.technical && safeData.skills.technical.length > 0 && (
          <p className="mb-1">
            {safeData.skills.technical.join(', ')}
          </p>
        )}
        
        {safeData.skills.soft && safeData.skills.soft.length > 0 && (
          <p>
            {safeData.skills.soft.join(', ')}
          </p>
        )}
      </div>
      
      {/* Experience Section */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ color: primaryColor }}>Experience</h2>
        
        {safeData.experience.map((exp: Experience) => (
          <div key={exp.id} className="mb-4">
            <div className="flex flex-wrap justify-between items-baseline">
              <EditableField
                value={exp.title}
                placeholder="Senior Software Engineer"
                className="font-bold text-gray-700"
                onSave={val => handleFieldUpdate("experience", "title", val, exp.id)}
                onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`experience-title`) : undefined}
                minRows={1}
                maxRows={1}
              />
              
              <EditableField
                value={`${exp.startDate} - ${exp.endDate}`}
                placeholder="Jan 2022 - Present"
                className="text-sm text-gray-500 italic"
                onSave={val => {
                  const [startDate, endDate] = val.split(" - ");
                  handleFieldUpdate("experience", "startDate", startDate || "", exp.id);
                  handleFieldUpdate("experience", "endDate", endDate || "", exp.id);
                }}
                minRows={1}
                maxRows={1}
              />
            </div>
            
            <EditableField
              value={exp.company && exp.location ? `${exp.company}, ${exp.location}` : exp.company || exp.location || ""}
              placeholder="Tech Solutions Inc., San Francisco, CA"
              className="text-sm italic text-gray-600 mb-1"
              onSave={val => {
                let [company, ...locParts] = val.split(",");
                const location = locParts.join(",").trim();
                handleFieldUpdate("experience", "company", company?.trim() || "", exp.id);
                handleFieldUpdate("experience", "location", location, exp.id);
              }}
              minRows={1}
              maxRows={1}
            />
            
            <EditableField
              value={exp.description}
              placeholder="• Led development of a key product feature that increased user engagement by 25%..."
              className="text-sm"
              onSave={val => handleFieldUpdate("experience", "description", val, exp.id)}
              onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`experience-desc`) : undefined}
              minRows={1}
              maxRows={5}
            />
          </div>
        ))}
        <AddSectionItem onAdd={handleAddExperience} />
      </div>
      
      {/* Education Section */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ color: primaryColor }}>Education</h2>
        
        {safeData.education.map((edu: Education) => (
          <div key={edu.id} className="mb-3">
            <div className="flex flex-wrap justify-between items-baseline">
              <div>
                <EditableField
                  value={edu.degree}
                  placeholder="Bachelor of Science in Computer Science"
                  className="font-semibold"
                  onSave={val => handleFieldUpdate("education", "degree", val, edu.id)}
                  minRows={1}
                  maxRows={1}
                />
                
                <div className="flex items-baseline gap-1.5">
                  <EditableField
                    value={edu.institution}
                    placeholder="University of California"
                    className="text-sm"
                    onSave={val => handleFieldUpdate("education", "institution", val, edu.id)}
                    minRows={1}
                    maxRows={1}
                  />
                  
                  {edu.location && (
                    <>
                      <span className="text-sm">-</span>
                      <EditableField
                        value={edu.location}
                        placeholder="Berkeley, CA"
                        className="text-sm"
                        onSave={val => handleFieldUpdate("education", "location", val, edu.id)}
                        minRows={1}
                        maxRows={1}
                      />
                    </>
                  )}
                </div>
              </div>
              
              <EditableField
                value={`${edu.startDate} - ${edu.endDate}`}
                placeholder="Sep 2018 - Jun 2022"
                className="text-sm text-gray-500 italic"
                onSave={val => {
                  const [startDate, endDate] = val.split(" - ");
                  handleFieldUpdate("education", "startDate", startDate || "", edu.id);
                  handleFieldUpdate("education", "endDate", endDate || "", edu.id);
                }}
                minRows={1}
                maxRows={1}
              />
            </div>
            
            {edu.description && (
              <EditableField
                value={edu.description}
                placeholder="GPA: 3.8/4.0, Dean's List, Relevant coursework: Data Structures, Algorithms"
                className="text-sm mt-1"
                onSave={val => handleFieldUpdate("education", "description", val, edu.id)}
                onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`education-desc`) : undefined}
                minRows={1}
                maxRows={2}
              />
            )}
          </div>
        ))}
        <AddSectionItem onAdd={handleAddEducation} />
      </div>
      
      {/* Projects Section (if available) */}
      {safeData.projects && safeData.projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-semibold mb-2 pb-1 border-b" style={{ color: primaryColor }}>Projects</h2>
          
          {safeData.projects.map((project: Project) => (
            <div key={project.id} className="mb-3">
              <div className="flex flex-wrap justify-between items-baseline">
                <EditableField
                  value={project.title}
                  placeholder="E-Commerce Platform"
                  className="font-semibold"
                  onSave={val => handleFieldUpdate("projects", "title", val, project.id)}
                  minRows={1}
                  maxRows={1}
                />
                
                <EditableField
                  value={`${project.startDate} - ${project.endDate}`}
                  placeholder="Jan 2023 - Mar 2023"
                  className="text-sm text-gray-500 italic"
                  onSave={val => {
                    const [startDate, endDate] = val.split(" - ");
                    handleFieldUpdate("projects", "startDate", startDate || "", project.id);
                    handleFieldUpdate("projects", "endDate", endDate || "", project.id);
                  }}
                  minRows={1}
                  maxRows={1}
                />
              </div>
              
              <EditableField
                value={project.description}
                placeholder="• Built a full-stack e-commerce application with React and Node.js..."
                className="text-sm"
                onSave={val => handleFieldUpdate("projects", "description", val, project.id)}
                onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(`project-desc`) : undefined}
                minRows={1}
                maxRows={3}
              />
              
              {project.technologies && project.technologies.length > 0 && (
                <p className="text-xs mt-1 text-gray-500">
                  <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
                </p>
              )}
              
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#007acc] hover:underline mt-1 inline-block"
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
          <AddSectionItem onAdd={() => {
            const newProject = {
              id: uuidv4(),
              title: "",
              description: "",
              technologies: [],
              startDate: "",
              endDate: "",
              link: ""
            };
            onUpdateData?.("projects", [...(safeData.projects || []), newProject]);
          }} />
        </div>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
