
import React from 'react';
import { useResumeAI } from '@/hooks/use-resume-ai';
import { Experience, Education, Project, SegmentStyles } from '@/types/resume';

interface ProfessionalTemplateProps {
  data: any;
  settings?: any; 
  onUpdateData?: (key: string, value: any) => void;
  onGenerateWithAI?: (section: string) => Promise<string>;
  isEditMode?: boolean;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ 
  data, 
  settings = {},
  onUpdateData = () => {},
  onGenerateWithAI,
  isEditMode = true
}) => {
  const { improveDescription, isGenerating } = useResumeAI();

  const handleUpdateData = (key: string, value: any) => {
    onUpdateData(key, value);
  };

  const handlePrimaryColor = () => {
    return settings?.primaryColor || "#5d4dcd";
  };

  const handleSecondaryColor = () => {
    return settings?.secondaryColor || "#333333";
  };

  const handleDescriptionBlur = async (exp: Experience, newDescription: string) => {
    if (exp.description === newDescription || !newDescription) {
      return;
    }

    try {
      // Update the local state immediately
      const updatedExp = { ...exp, description: newDescription };
      const updatedExperiences = data.experience.map((e: Experience) => 
        e.id === exp.id ? updatedExp : e
      );
      handleUpdateData("experience", updatedExperiences);
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  const formatDate = (startDate?: string, endDate?: string) => {
    if (!startDate) return '';
    return `${startDate}${endDate ? ` - ${endDate}` : ''}`;
  };

  const handleGenerateDescription = async (description: string): Promise<string> => {
    return improveDescription(description);
  };

  // Fix the type error when handling technologies
  const formatTechnologies = (technologies: string[] | undefined): string => {
    if (!technologies || technologies.length === 0) {
      return '';
    }
    return technologies.join(', ');
  };

  // Process custom styles if available
  const getCustomStyle = (section: string, property: string, defaultValue: string) => {
    if (settings?.customStyles && 
        settings.customStyles[section] && 
        settings.customStyles[section][property] !== undefined) {
      return settings.customStyles[section][property];
    }
    return defaultValue;
  };

  // Apply title styles from custom styles
  const getSectionTitleStyle = (section: string) => {
    return {
      color: handlePrimaryColor(),
      textAlign: getCustomStyle(section, 'textAlign', 'left'),
      fontWeight: getCustomStyle(section, 'fontWeight', 'semibold'),
      textDecoration: getCustomStyle(section, 'textDecoration', 'none')
    };
  };

  return (
    <div className="print:p-0" style={{ fontSize: `${settings.fontSize || 11}pt` }}>
      {/* Header Section */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold" style={{ color: handlePrimaryColor() }}>
          {data.personal.name || "Your Name"}
        </h1>
        <p className="text-base font-semibold" style={{ color: handleSecondaryColor() }}>
          {data.personal.title || "Professional Title"}
        </p>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm mt-2">
          {data.personal.email && (
            <span className="flex items-center">
              <span className="mr-1">📧</span> {data.personal.email}
            </span>
          )}
          {data.personal.phone && (
            <span className="flex items-center">
              <span className="mr-1">📱</span> {data.personal.phone}
            </span>
          )}
          {data.personal.location && (
            <span className="flex items-center">
              <span className="mr-1">📍</span> {data.personal.location}
            </span>
          )}
          {data.personal.linkedin && (
            <span className="flex items-center">
              <span className="mr-1">🔗</span> LinkedIn
            </span>
          )}
          {data.personal.website && (
            <span className="flex items-center">
              <span className="mr-1">🌐</span> Portfolio
            </span>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {data.summary && (
        <div className="mb-4">
          <h2 
            className="text-lg font-semibold border-b-2 mb-2" 
            style={{ 
              borderColor: handlePrimaryColor(), 
              color: handlePrimaryColor(),
              textAlign: getCustomStyle('summary', 'textAlign', 'left') as any
            }}
          >
            Summary
          </h2>
          <p className="text-sm">
            {data.summary}
          </p>
        </div>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-4">
          <h2 
            className="text-lg font-semibold border-b-2 mb-2" 
            style={{ 
              borderColor: handlePrimaryColor(), 
              color: handlePrimaryColor(),
              textAlign: getCustomStyle('experience', 'textAlign', 'left') as any
            }}
          >
            Experience
          </h2>
          {data.experience.map((exp: Experience) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold" style={{ color: handleSecondaryColor() }}>
                  {exp.title || "Position Title"}
                </h3>
                <span className="text-sm italic">
                  {formatDate(exp.startDate, exp.endDate)}
                </span>
              </div>
              <p className="text-sm font-medium">
                {exp.company}{exp.location ? `, ${exp.location}` : ''}
              </p>
              <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                {exp.description.split('\n').map((bullet, idx) => (
                  <li key={idx} className="text-sm">
                    {bullet.replace(/^[•-]\s*/, '')}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <div className="mb-4">
          <h2 
            className="text-lg font-semibold border-b-2 mb-2" 
            style={{ 
              borderColor: handlePrimaryColor(), 
              color: handlePrimaryColor(),
              textAlign: getCustomStyle('education', 'textAlign', 'left') as any
            }}
          >
            Education
          </h2>
          {data.education.map((edu: Education) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold" style={{ color: handleSecondaryColor() }}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </h3>
                <span className="text-sm italic">
                  {formatDate(edu.startDate, edu.endDate)}
                </span>
              </div>
              <p className="text-sm font-medium">
                {edu.institution}{edu.location ? `, ${edu.location}` : ''}
              </p>
              {edu.description && (
                <p className="text-sm mt-1">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {data.skills && (data.skills.technical?.length > 0 || data.skills.soft?.length > 0) && (
        <div className="mb-4">
          <h2 
            className="text-lg font-semibold border-b-2 mb-2" 
            style={{ 
              borderColor: handlePrimaryColor(), 
              color: handlePrimaryColor(),
              textAlign: getCustomStyle('skills', 'textAlign', 'left') as any
            }}
          >
            Skills
          </h2>
          {data.skills.technical?.length > 0 && (
            <div className="mb-2">
              <h3 className="text-sm font-semibold">Technical</h3>
              <p className="text-sm">
                {data.skills.technical.join(', ')}
              </p>
            </div>
          )}
          {data.skills.soft?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold">Soft Skills</h3>
              <p className="text-sm">
                {data.skills.soft.join(', ')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-4">
          <h2 
            className="text-lg font-semibold border-b-2 mb-2" 
            style={{ 
              borderColor: handlePrimaryColor(), 
              color: handlePrimaryColor(),
              textAlign: getCustomStyle('projects', 'textAlign', 'left') as any
            }}
          >
            Projects
          </h2>
          {data.projects.map((project: Project) => (
            <div key={project.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold" style={{ color: handleSecondaryColor() }}>
                  {project.title || "Project Name"}
                </h3>
                <span className="text-sm italic">
                  {formatDate(project.startDate, project.endDate)}
                </span>
              </div>
              {project.technologies && project.technologies.length > 0 && (
                <p className="text-sm font-medium">
                  Technologies: {formatTechnologies(project.technologies)}
                </p>
              )}
              <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                {project.description.split('\n').map((bullet: string, idx: number) => (
                  <li key={idx} className="text-sm">
                    {bullet.replace(/^[•-]\s*/, '')}
                  </li>
                ))}
              </ul>
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm hover:underline" 
                  style={{ color: handlePrimaryColor() }}
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Languages Section */}
      {data.languages && data.languages.length > 0 && (
        <div>
          <h2 
            className="text-lg font-semibold border-b-2 mb-2" 
            style={{ 
              borderColor: handlePrimaryColor(), 
              color: handlePrimaryColor(),
              textAlign: getCustomStyle('languages', 'textAlign', 'left') as any
            }}
          >
            Languages
          </h2>
          <p className="text-sm">
            {data.languages.map((lang: any) => `${lang.language} (${lang.proficiency})`).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
