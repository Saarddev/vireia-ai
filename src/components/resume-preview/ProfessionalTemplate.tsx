import React from 'react';
import EditableField from './EditableField';
import { useResumeAI } from '@/hooks/use-resume-ai';

interface ProfessionalTemplateProps {
  data: any;
  settings?: any; // Add the missing settings prop
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

  // Update handlers for each section
  const handleUpdateSummary = (value: string) => {
    onUpdateData('summary', value);
  };

  const handleUpdateExperience = (index: number, field: string, value: string) => {
    const updatedExperiences = [...data.experience];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    onUpdateData('experience', updatedExperiences);
  };

  const handleUpdateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...data.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    onUpdateData('education', updatedEducation);
  };

  const handleUpdateSkill = (type: 'technical' | 'soft', index: number, value: string) => {
    const updatedSkills = { ...data.skills };
    updatedSkills[type][index] = value;
    onUpdateData('skills', updatedSkills);
  };

  const handleUpdateProject = (index: number, field: string, value: string) => {
    const updatedProjects = [...data.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    onUpdateData('projects', updatedProjects);
  };

  // Generate AI-enhanced description for an experience entry
  const handleGenerateWithAI = (description: string) => {
    return improveDescription(description);
  };

  // Fix the type error when handling technologies
  const formatTechnologies = (technologies: string[] | undefined): string => {
    if (!technologies || technologies.length === 0) {
      return '';
    }
    return technologies.join(', ');
  };

  return (
    <div className="max-w-[800px] mx-auto p-4 pb-12 bg-white print:p-0 print:pb-0" style={{
      fontFamily: 'Segoe UI, sans-serif',
      lineHeight: 1.6,
      color: '#333'
    }}>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1" style={{ color: '#004466' }}>
          {isEditMode ? (
            <EditableField
              value={data.personal.name}
              placeholder="Your Name"
              className="text-center"
              onSave={(value) => onUpdateData('personal', { ...data.personal, name: value })}
              inputStyle={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center' }}
            />
          ) : (
            data.personal.name
          )}
        </h1>
        <div className="text-lg text-gray-600">
          {isEditMode ? (
            <EditableField
              value={data.personal.title}
              placeholder="Professional Title"
              className="text-center"
              onSave={(value) => onUpdateData('personal', { ...data.personal, title: value })}
              inputStyle={{ textAlign: 'center' }}
            />
          ) : (
            data.personal.title
          )}
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-x-2 text-sm">
          {data.personal.email && (
            <span className="text-[#007acc] hover:underline">
              {data.personal.email}
            </span>
          )}
          {data.personal.phone && (
            <span className="text-[#007acc] hover:underline">
              {data.personal.phone}
            </span>
          )}
          {data.personal.location && (
            <span className="text-[#007acc] hover:underline">
              {data.personal.location}
            </span>
          )}
          {data.personal.linkedin && (
            <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#007acc] hover:underline">
              LinkedIn
            </a>
          )}
          {data.personal.website && (
            <a href={data.personal.website} target="_blank" rel="noopener noreferrer" className="text-[#007acc] hover:underline">
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2" style={{ color: '#004466' }}>Summary</h2>
          {isEditMode ? (
            <EditableField
              value={data.summary}
              placeholder="Your professional summary"
              className="text-gray-700"
              onSave={handleUpdateSummary}
              onGenerateWithAI={() => handleGenerateWithAI(data.summary)}
              minRows={2}
              maxRows={5}
              outputStyle={{ color: '#444' }}
            />
          ) : (
            <p className="text-gray-700">{data.summary}</p>
          )}
        </div>
      )}

      {/* Skills */}
      {(data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2" style={{ color: '#004466' }}>Skills</h2>
          {data.skills.technical.length > 0 && (
            <div className="mb-2">
              <div className="flex flex-wrap gap-2">
                {data.skills.technical.map((skill: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">
                    {isEditMode ? (
                      <EditableField
                        value={skill}
                        placeholder="Skill"
                        className="inline-block"
                        onSave={(value) => handleUpdateSkill('technical', index, value)}
                      />
                    ) : skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div className="mb-2">
              <div className="flex flex-wrap gap-2">
                {data.skills.soft.map((skill: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-gray-50 rounded text-sm text-gray-600">
                    {isEditMode ? (
                      <EditableField
                        value={skill}
                        placeholder="Skill"
                        className="inline-block"
                        onSave={(value) => handleUpdateSkill('soft', index, value)}
                      />
                    ) : skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2" style={{ color: '#004466' }}>Experience</h2>
          {data.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="font-bold text-gray-800">
                  {isEditMode ? (
                    <EditableField
                      value={exp.title}
                      placeholder="Job Title"
                      className="font-bold"
                      onSave={(value) => handleUpdateExperience(index, 'title', value)}
                    />
                  ) : exp.title}
                </div>
                <div className="text-gray-600 italic">
                  {isEditMode ? (
                    <EditableField
                      value={`${exp.startDate} - ${exp.endDate}`}
                      placeholder="Date Range"
                      className="italic"
                      onSave={(value) => {
                        const dates = value.split(' - ');
                        if (dates.length === 2) {
                          handleUpdateExperience(index, 'startDate', dates[0]);
                          handleUpdateExperience(index, 'endDate', dates[1]);
                        }
                      }}
                    />
                  ) : `${exp.startDate} - ${exp.endDate}`}
                </div>
              </div>
              <div className="text-gray-700 italic">
                {isEditMode ? (
                  <EditableField
                    value={`${exp.company}, ${exp.location}`}
                    placeholder="Company, Location"
                    className="italic"
                    onSave={(value) => {
                      const parts = value.split(', ');
                      if (parts.length === 2) {
                        handleUpdateExperience(index, 'company', parts[0]);
                        handleUpdateExperience(index, 'location', parts[1]);
                      }
                    }}
                  />
                ) : `${exp.company}, ${exp.location}`}
              </div>
              <div className="mt-1">
                {isEditMode ? (
                  <EditableField
                    value={exp.description}
                    placeholder="Job responsibilities and achievements"
                    className="text-gray-700"
                    onSave={(value) => handleUpdateExperience(index, 'description', value)}
                    onGenerateWithAI={() => handleGenerateWithAI(exp.description)}
                    minRows={2}
                    maxRows={6}
                  />
                ) : (
                  <ul className="list-disc pl-5 text-gray-700">
                    {exp.description.split('\n').filter((line: string) => line.trim() !== '').map((point: string, i: number) => (
                      <li key={i} className="mb-1">{point.replace(/^[-•*]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2" style={{ color: '#004466' }}>Education</h2>
          {data.education.map((edu: any, index: number) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="font-bold text-gray-800">
                  {isEditMode ? (
                    <EditableField
                      value={edu.degree}
                      placeholder="Degree"
                      className="font-bold"
                      onSave={(value) => handleUpdateEducation(index, 'degree', value)}
                    />
                  ) : edu.degree}
                </div>
                <div className="text-gray-600 italic">
                  {isEditMode ? (
                    <EditableField
                      value={`${edu.startDate} - ${edu.endDate}`}
                      placeholder="Date Range"
                      className="italic"
                      onSave={(value) => {
                        const dates = value.split(' - ');
                        if (dates.length === 2) {
                          handleUpdateEducation(index, 'startDate', dates[0]);
                          handleUpdateEducation(index, 'endDate', dates[1]);
                        }
                      }}
                    />
                  ) : `${edu.startDate} - ${edu.endDate}`}
                </div>
              </div>
              <div className="text-gray-700 italic">
                {isEditMode ? (
                  <EditableField
                    value={`${edu.institution}, ${edu.location}`}
                    placeholder="Institution, Location"
                    className="italic"
                    onSave={(value) => {
                      const parts = value.split(', ');
                      if (parts.length === 2) {
                        handleUpdateEducation(index, 'institution', parts[0]);
                        handleUpdateEducation(index, 'location', parts[1]);
                      }
                    }}
                  />
                ) : `${edu.institution}, ${edu.location}`}
              </div>
              {edu.description && (
                <div className="mt-1">
                  {isEditMode ? (
                    <EditableField
                      value={edu.description}
                      placeholder="Education details"
                      className="text-gray-700"
                      onSave={(value) => handleUpdateEducation(index, 'description', value)}
                      onGenerateWithAI={() => handleGenerateWithAI(edu.description)}
                      minRows={2}
                      maxRows={4}
                    />
                  ) : (
                    <ul className="list-disc pl-5 text-gray-700">
                      {edu.description.split('\n').filter((line: string) => line.trim() !== '').map((point: string, i: number) => (
                        <li key={i} className="mb-1">{point.replace(/^[-•*]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2" style={{ color: '#004466' }}>Projects</h2>
          {data.projects.map((project: any, index: number) => (
            <div key={index} className="mb-4 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div className="font-bold text-gray-800">
                  {isEditMode ? (
                    <EditableField
                      value={project.title}
                      placeholder="Project Title"
                      className="font-bold"
                      onSave={(value) => handleUpdateProject(index, 'title', value)}
                    />
                  ) : project.title}
                </div>
                {(project.startDate || project.endDate) && (
                  <div className="text-gray-600 italic">
                    {isEditMode ? (
                      <EditableField
                        value={`${project.startDate || ''} - ${project.endDate || ''}`}
                        placeholder="Date Range"
                        className="italic"
                        onSave={(value) => {
                          const dates = value.split(' - ');
                          if (dates.length === 2) {
                            handleUpdateProject(index, 'startDate', dates[0]);
                            handleUpdateProject(index, 'endDate', dates[1]);
                          }
                        }}
                      />
                    ) : `${project.startDate || ''} - ${project.endDate || ''}`}
                  </div>
                )}
              </div>
              <div className="mt-1">
                {isEditMode ? (
                  <EditableField
                    value={project.description}
                    placeholder="Project description"
                    className="text-gray-700"
                    onSave={(value) => handleUpdateProject(index, 'description', value)}
                    onGenerateWithAI={() => handleGenerateWithAI(project.description)}
                    minRows={2}
                    maxRows={4}
                  />
                ) : (
                  <ul className="list-disc pl-5 text-gray-700">
                    {project.description.split('\n').filter((line: string) => line.trim() !== '').map((point: string, i: number) => (
                      <li key={i} className="mb-1">{point.replace(/^[-•*]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech: string, techIndex: number) => (
                    <span key={techIndex} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                      {isEditMode ? (
                        <EditableField
                          value={tech}
                          placeholder="Tech"
                          className="inline-block text-xs"
                          onSave={(value) => {
                            const updatedTech = [...project.technologies];
                            updatedTech[techIndex] = value;
                            handleUpdateProject(index, 'technologies', updatedTech);
                          }}
                        />
                      ) : tech}
                    </span>
                  ))}
                </div>
              )}
              {project.link && (
                <div className="mt-1">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-[#007acc] hover:underline"
                  >
                    {isEditMode ? (
                      <EditableField
                        value={project.link}
                        placeholder="Project URL"
                        className="text-sm text-[#007acc]"
                        onSave={(value) => handleUpdateProject(index, 'link', value)}
                      />
                    ) : "View Project →"}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
