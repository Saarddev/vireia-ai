
import React from 'react';
import { useParams } from 'react-router-dom';
import { useResumeData } from '@/hooks/use-resume-data';
import { Project } from '@/types/resume';

const ResumePDF = () => {
  const { resumeId } = useParams();
  const { resumeData, isLoading, resumeSettings } = useResumeData(resumeId);

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

  return (
    <div 
      className="max-w-[800px] mx-auto p-8 bg-white print:p-0 my-8 shadow-lg" 
      style={{
        fontFamily: resumeSettings.fontFamily || 'Inter',
        fontSize: `${resumeSettings.fontSize || 10}pt`,
        lineHeight: "1.5",
        // Properties to help with page sizing
        pageBreakInside: "avoid",
        printColorAdjust: "exact",
        minHeight: "100%",
        overflowY: "auto"
      }}
    >
      {/* Header */}
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

      {/* Summary - Limited to exactly 3 bullet points */}
      {resumeData.summary && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-1 border-b border-gray-200 pb-0.5 uppercase tracking-wide">
            Summary
          </h2>
          <ul className="list-disc pl-4 text-sm text-gray-700 font-normal leading-relaxed">
            {formatBulletPoints(resumeData.summary, 3).map((point, index) => (
              <li key={index} className="mb-1">{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience - Slightly more compact */}
      {resumeData.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-1 border-b border-gray-200 pb-0.5 uppercase tracking-wide">
            Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex items-baseline justify-between flex-wrap gap-x-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 text-sm">{exp.title}</h3>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-sm text-[#5d4dcd] font-medium my-0.5">
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

      {/* Projects - More compact */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-1 border-b border-gray-200 pb-0.5 uppercase tracking-wide">
            Projects
          </h2>
          {resumeData.projects.map((project: Project, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex items-baseline justify-between flex-wrap gap-x-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 text-sm">{project.title}</h3>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {project.startDate} - {project.endDate}
                </span>
              </div>
              <ul className="list-disc pl-4 text-sm text-gray-700 mt-1 font-normal leading-relaxed">
                {formatBulletPoints(project.description).map((point, i) => (
                  <li key={i} className="mb-1">{point}</li>
                ))}
              </ul>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-[#efeafc] rounded-sm text-xs border-[0.5px] border-[#dad3f8] shadow-xs text-violet-400 font-normal">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#5d4dcd] hover:text-[#4a3da3] mt-1 inline-block"
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education - More compact */}
      {resumeData.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-1 border-b border-gray-200 pb-0.5 uppercase tracking-wide">
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-3 last:mb-0">
              <div className="flex items-baseline justify-between flex-wrap gap-x-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 text-sm">{edu.degree}</h3>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="text-sm text-[#5d4dcd] font-medium my-0.5">
                {edu.institution}, {edu.location}
              </p>
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

      {/* Skills - More compact */}
      {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-1 border-b border-gray-200 pb-0.5 uppercase tracking-wide">
            Skills
          </h2>
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
  );
};

export default ResumePDF;
