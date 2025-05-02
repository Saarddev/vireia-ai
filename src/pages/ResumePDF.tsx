
import React from 'react';
import { useParams } from 'react-router-dom';
import { useResumeData } from '@/hooks/use-resume-data';
import { Project } from '@/types/resume';

const ResumePDF = () => {
  const { resumeId } = useParams();
  const { resumeData, isLoading, resumeSettings, selectedTemplate } = useResumeData(resumeId);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const formatBulletPoints = (text: string, limit?: number) => {
    if (!text) return [];
    
    // Handle text that already has bullet points
    const points = text
      .split('\n')
      .filter(point => point.trim() !== '')
      .map(point => {
        // Clean up the point by removing any existing bullet symbols
        let cleanPoint = point.trim().replace(/^[-•*]\s*/, '');
        
        // Ensure point starts with an action verb if possible
        if (!/^[A-Z][a-z]+ed|^[A-Z][a-z]+ing|^[A-Z][a-z]+s\b/.test(cleanPoint)) {
          cleanPoint = cleanPoint.charAt(0).toUpperCase() + cleanPoint.slice(1);
        }
        
        return cleanPoint;
      });
    
    // Apply limit if specified
    return limit ? points.slice(0, limit) : points;
  };

  // Professional template specific styles
  const isProfessional = selectedTemplate === 'professional';
  const primaryColor = resumeSettings.primaryColor || (isProfessional ? '#004466' : '#5d4dcd');

  return (
    <div className="max-w-[800px] mx-auto p-8 bg-white print:p-0" style={{
      fontFamily: resumeSettings.fontFamily || 'Inter',
      fontSize: `${resumeSettings.fontSize || 10}pt`,
      lineHeight: isProfessional ? "1.6" : "1.5",
      // Added properties to help with page sizing
      pageBreakInside: "avoid",
      printColorAdjust: "exact"
    }}>
      {/* Header - Professional layout has centered info */}
      {isProfessional ? (
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2" style={{ color: primaryColor }}>
            {resumeData.personal.name}
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm">
            {resumeData.personal.email && (
              <span className="text-[#007acc]">{resumeData.personal.email}</span>
            )}
            {resumeData.personal.phone && (
              <><span className="text-gray-400">|</span> <span className="text-[#007acc]">{resumeData.personal.phone}</span></>
            )}
            {resumeData.personal.location && (
              <><span className="text-gray-400">|</span> <span className="text-[#007acc]">{resumeData.personal.location}</span></>
            )}
            {resumeData.personal.linkedin && (
              <><span className="text-gray-400">|</span> <a href={resumeData.personal.linkedin} className="text-[#007acc]">LinkedIn</a></>
            )}
            {resumeData.personal.website && (
              <><span className="text-gray-400">|</span> <a href={resumeData.personal.website} className="text-[#007acc]">{resumeData.personal.website}</a></>
            )}
          </div>
        </div>
      ) : (
        <div className="pb-2 border-b-2 border-[#5d4dcd] mb-3">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight pb-0 mb-1">
            {resumeData.personal.name}
          </h1>
          <p className="text-lg font-medium text-[#5d4dcd] mt-0.5">{resumeData.personal.title}</p>
          <div className="flex flex-wrap text-sm text-gray-700 mt-1.5 gap-x-2 gap-y-1 items-center">
            {resumeData.personal.email && (
              <span className="inline-flex items-center">
                <span>{resumeData.personal.email}</span>
              </span>
            )}
            {resumeData.personal.phone && (
              <>
                <span className="text-gray-400">•</span>
                <span className="inline-flex items-center">
                  <span>{resumeData.personal.phone}</span>
                </span>
              </>
            )}
            {resumeData.personal.location && (
              <>
                <span className="text-gray-400">•</span>
                <span className="inline-flex items-center">
                  <span>{resumeData.personal.location}</span>
                </span>
              </>
            )}
            {resumeData.personal.linkedin && (
              <>
                <span className="text-gray-400">•</span>
                <span className="inline-flex items-center">
                  <a href={resumeData.personal.linkedin} target="_blank" rel="noopener noreferrer" 
                    className="text-[#5d4dcd] hover:text-[#4a3da3]">
                    LinkedIn
                  </a>
                </span>
              </>
            )}
            {resumeData.personal.website && (
              <>
                <span className="text-gray-400">•</span>
                <span className="inline-flex items-center">
                  <a href={resumeData.personal.website} target="_blank" rel="noopener noreferrer"
                    className="text-[#5d4dcd] hover:text-[#4a3da3]">
                    Portfolio
                  </a>
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      {resumeData.summary && (
        <div className="mb-4">
          <h2 className={`text-sm font-semibold ${isProfessional ? 'text-lg mb-2 pb-1 border-b' : 'text-gray-800 mb-1 border-b border-gray-200 pb-0.5 uppercase tracking-wide'}`}
              style={{ color: primaryColor }}>
            Summary
          </h2>
          {isProfessional ? (
            <p className="text-sm text-gray-700 font-normal leading-relaxed">
              {resumeData.summary}
            </p>
          ) : (
            <ul className="list-disc pl-4 text-sm text-gray-700 font-normal leading-relaxed">
              {formatBulletPoints(resumeData.summary, 3).map((point, index) => (
                <li key={index} className="mb-1">{point}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Skills - Professional has them all in one paragraph */}
      {((resumeData.skills.technical && resumeData.skills.technical.length > 0) || 
        (resumeData.skills.soft && resumeData.skills.soft.length > 0)) && (
        <div className="mb-4">
          <h2 className={`text-sm font-semibold ${isProfessional ? 'text-lg mb-2 pb-1 border-b' : 'text-gray-800 mb-1 border-b border-gray-200 pb-0.5 uppercase tracking-wide'}`}
              style={{ color: primaryColor }}>
            Skills
          </h2>
          
          {isProfessional ? (
            <>
              {resumeData.skills.technical.length > 0 && (
                <p className="mb-1">{resumeData.skills.technical.join(', ')}</p>
              )}
              {resumeData.skills.soft.length > 0 && (
                <p>{resumeData.skills.soft.join(', ')}</p>
              )}
            </>
          ) : (
            <div className="mb-2">
              {resumeData.skills.technical.length > 0 && (
                <div className="mb-2">
                  <div className="font-medium text-gray-700 text-sm mb-1">Technical Skills</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {resumeData.skills.technical.map((skill, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-[#efeafc] rounded-sm text-xs border-[0.5px] border-[#dad3f8] shadow-xs text-violet-400 font-normal">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {resumeData.skills.soft.length > 0 && (
                <div>
                  <div className="font-medium text-gray-700 text-sm mb-1">Soft Skills</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {resumeData.skills.soft.map((skill, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-[#f3f3f3] text-gray-600 font-medium rounded-sm text-xs border-[0.5px] border-[#e5e5e5]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-4">
          <h2 className={`text-sm font-semibold ${isProfessional ? 'text-lg mb-2 pb-1 border-b' : 'text-gray-800 mb-1 border-b border-gray-200 pb-0.5 uppercase tracking-wide'}`}
              style={{ color: primaryColor }}>
            Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex items-baseline justify-between flex-wrap gap-x-2">
                <div className="flex-1 min-w-0">
                  <h3 className={isProfessional ? "font-bold text-gray-700" : "font-medium text-gray-800 text-sm"}>
                    {exp.title}
                  </h3>
                </div>
                <span className={`text-sm ${isProfessional ? "text-gray-500 italic" : "text-gray-600"} whitespace-nowrap`}>
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className={`${isProfessional ? "text-sm italic text-gray-600 mb-1" : "text-sm text-[#5d4dcd] font-medium my-0.5"}`}>
                {exp.company}, {exp.location}
              </p>
              <ul className="list-disc pl-4 text-sm text-gray-700 mt-1 font-normal leading-relaxed">
                {formatBulletPoints(exp.description).map((point, i) => (
                  <li key={i} className="mb-1">{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-4">
          <h2 className={`text-sm font-semibold ${isProfessional ? 'text-lg mb-2 pb-1 border-b' : 'text-gray-800 mb-1 border-b border-gray-200 pb-0.5 uppercase tracking-wide'}`}
              style={{ color: primaryColor }}>
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex items-baseline justify-between flex-wrap gap-x-2">
                <div className="flex-1 min-w-0">
                  <h3 className={isProfessional ? "font-semibold" : "font-medium text-gray-800 text-sm"}>
                    {edu.degree}
                  </h3>
                  {isProfessional && (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm">{edu.institution}</span>
                      {edu.location && (
                        <>
                          <span className="text-sm">-</span>
                          <span className="text-sm">{edu.location}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <span className={`text-sm ${isProfessional ? "text-gray-500 italic" : "text-gray-600"} whitespace-nowrap`}>
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              {!isProfessional && (
                <p className="text-sm text-[#5d4dcd] font-medium my-0.5">
                  {edu.institution}, {edu.location}
                </p>
              )}
              {edu.description && (
                <ul className="list-disc pl-4 text-sm text-gray-700 mt-1 font-normal leading-relaxed">
                  {formatBulletPoints(edu.description).map((point, i) => (
                    <li key={i} className="mb-1">{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="mb-4">
          <h2 className={`text-sm font-semibold ${isProfessional ? 'text-lg mb-2 pb-1 border-b' : 'text-gray-800 mb-1 border-b border-gray-200 pb-0.5 uppercase tracking-wide'}`}
              style={{ color: primaryColor }}>
            Projects
          </h2>
          {resumeData.projects.map((project: Project, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex items-baseline justify-between flex-wrap gap-x-2">
                <div className="flex-1 min-w-0">
                  <h3 className={isProfessional ? "font-semibold" : "font-medium text-gray-800 text-sm"}>
                    {project.title}
                  </h3>
                </div>
                <span className={`text-sm ${isProfessional ? "text-gray-500 italic" : "text-gray-600"} whitespace-nowrap`}>
                  {project.startDate} - {project.endDate}
                </span>
              </div>
              <ul className="list-disc pl-4 text-sm text-gray-700 mt-1 font-normal leading-relaxed">
                {formatBulletPoints(project.description).map((point, i) => (
                  <li key={i} className="mb-1">{point}</li>
                ))}
              </ul>
              
              {project.technologies && project.technologies.length > 0 && (
                isProfessional ? (
                  <p className="text-xs mt-1 text-gray-500">
                    <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-[#efeafc] rounded-sm text-xs border-[0.5px] border-[#dad3f8] shadow-xs text-violet-400 font-normal">
                        {tech}
                      </span>
                    ))}
                  </div>
                )
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs ${isProfessional ? "text-[#007acc]" : "text-[#5d4dcd]"} hover:underline mt-1 inline-block`}
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumePDF;
