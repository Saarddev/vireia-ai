
import React from 'react';
import { useParams } from 'react-router-dom';
import { useResumeData } from '@/hooks/use-resume-data';

const ResumePDF = () => {
  const { resumeId } = useParams();
  const { resumeData, isLoading } = useResumeData(resumeId);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-[800px] mx-auto p-8 bg-white print:p-0">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">{resumeData.personal.name}</h1>
        <p className="text-gray-600">{resumeData.personal.title}</p>
        <div className="text-sm mt-2">
          <span>{resumeData.personal.email}</span>
          {resumeData.personal.phone && <span className="mx-2">•</span>}
          <span>{resumeData.personal.phone}</span>
          {resumeData.personal.location && <span className="mx-2">•</span>}
          <span>{resumeData.personal.location}</span>
        </div>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 border-b pb-1">Professional Summary</h2>
          <p className="text-sm leading-relaxed">{resumeData.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 border-b pb-1">Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{exp.title}</h3>
                <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
              </div>
              <p className="text-sm text-gray-700">{exp.company}, {exp.location}</p>
              <p className="text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 border-b pb-1">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{edu.degree}</h3>
                <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-sm text-gray-700">{edu.institution}, {edu.location}</p>
              {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 border-b pb-1">Skills</h2>
          {resumeData.skills.technical.length > 0 && (
            <div className="mb-2">
              <h3 className="text-sm font-medium">Technical Skills</h3>
              <p className="text-sm">{resumeData.skills.technical.join(", ")}</p>
            </div>
          )}
          {resumeData.skills.soft.length > 0 && (
            <div>
              <h3 className="text-sm font-medium">Soft Skills</h3>
              <p className="text-sm">{resumeData.skills.soft.join(", ")}</p>
            </div>
          )}
        </div>
      )}

      {/* Projects */}
      {resumeData.projects?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 border-b pb-1">Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{project.title}</h3>
                <span className="text-sm text-gray-600">{project.startDate} - {project.endDate}</span>
              </div>
              <p className="text-sm mt-1">{project.description}</p>
              {project.technologies && (
                <p className="text-sm text-gray-600 mt-1">
                  Technologies: {project.technologies.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumePDF;
