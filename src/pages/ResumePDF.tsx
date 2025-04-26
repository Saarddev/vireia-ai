
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

  return (
    <div className="max-w-[800px] mx-auto p-8 bg-white print:p-0" style={{
      fontFamily: resumeSettings.fontFamily || 'Inter',
      fontSize: `${resumeSettings.fontSize || 10}pt`,
      lineHeight: "1.5"
    }}>
      {/* Header */}
      <div className="pb-4 border-b-2 border-[#5d4dcd] mb-4">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight pb-0 mb-1">
          {resumeData.personal.name}
        </h1>
        <p className="text-lg font-medium text-[#5d4dcd] mt-1">{resumeData.personal.title}</p>
        <div className="flex flex-wrap text-sm text-gray-700 mt-2 gap-x-2 gap-y-1 items-center">
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

      {/* Summary */}
      {resumeData.summary && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1 uppercase tracking-wide">
            Summary
          </h2>
          <p className="text-sm text-gray-700 font-normal leading-relaxed">{resumeData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1 uppercase tracking-wide">
            Experience
          </h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-5 last:mb-0">
              <div className="flex items-baseline justify-between flex-wrap gap-x-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 text-sm">{exp.title}</h3>
                </div>
                <span className="text-sm text-gray-600 ml-3 whitespace-nowrap">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-sm text-[#5d4dcd] font-medium my-0.5">
                {exp.company}, {exp.location}
              </p>
              <p className="text-sm text-gray-700 mt-1 font-normal leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1 uppercase tracking-wide">
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-5 last:mb-0">
              <div className="flex items-baseline justify-between flex-wrap gap-x-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 text-sm">{edu.degree}</h3>
                </div>
                <span className="text-sm text-gray-600 ml-3 whitespace-nowrap">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="text-sm text-[#5d4dcd] font-medium my-0.5">
                {edu.institution}, {edu.location}
              </p>
              {edu.description && (
                <p className="text-sm text-gray-700 mt-1 font-normal leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1 uppercase tracking-wide">
            Skills
          </h2>
          {resumeData.skills.technical.length > 0 && (
            <div className="mb-3">
              <div className="font-medium text-gray-700 text-sm mb-1.5">Technical Skills</div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {resumeData.skills.technical.map((skill, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#efeafc] rounded-sm text-sm border-[0.5px] border-[#dad3f8] shadow-xs text-violet-400 font-normal">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {resumeData.skills.soft.length > 0 && (
            <div>
              <div className="font-medium text-gray-700 text-sm mb-1.5">Soft Skills</div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {resumeData.skills.soft.map((skill, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#f3f3f3] text-gray-600 font-medium rounded-sm text-sm border-[0.5px] border-[#e5e5e5]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Projects */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1 uppercase tracking-wide">
            Projects
          </h2>
          {resumeData.projects.map((project: Project, index) => (
            <div key={index} className="mb-5 last:mb-0">
              <div className="flex items-baseline justify-between flex-wrap gap-x-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 text-sm">{project.title}</h3>
                </div>
                <span className="text-sm text-gray-600 ml-3 whitespace-nowrap">
                  {project.startDate} - {project.endDate}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-1 font-normal leading-relaxed">
                {project.description}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#efeafc] rounded-sm text-sm border-[0.5px] border-[#dad3f8] shadow-xs text-violet-400 font-normal">
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
                  className="text-sm text-[#5d4dcd] hover:text-[#4a3da3] mt-1 inline-block"
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
