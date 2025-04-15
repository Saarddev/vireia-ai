
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, Maximize2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ResumePreviewProps {
  data: any;
  template: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {
  const handleDownloadPDF = () => {
    // Create a new window with just the resume content
    const printWindow = window.open('', '', 'height=800,width=600');
    if (!printWindow) return;
    
    // Write the resume content to the new window
    printWindow.document.write('<html><head><title>Resume</title>');
    printWindow.document.write('<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">');
    printWindow.document.write('</head><body>');
    printWindow.document.write(document.querySelector('.resume-content')?.innerHTML || '');
    printWindow.document.write('</body></html>');
    
    // Wait for content to load then print
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const ResumeContent = () => (
    <div className="p-4">
      {/* Modern template */}
      {template === 'modern' && (
        <div className="p-4">
          {/* Header */}
          <div className="border-b border-resume-purple pb-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{data.personal.name}</h1>
            <p className="text-resume-purple font-medium">{data.personal.title}</p>
            <div className="flex flex-wrap mt-2 text-sm text-gray-600 gap-3">
              <span>{data.personal.email}</span>
              <span>|</span>
              <span>{data.personal.phone}</span>
              <span>|</span>
              <span>{data.personal.location}</span>
              {data.personal.linkedin && (
                <>
                  <span>|</span>
                  <span>{data.personal.linkedin}</span>
                </>
              )}
              {data.personal.website && (
                <>
                  <span>|</span>
                  <span>{data.personal.website}</span>
                </>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Summary</h2>
            <p className="text-sm text-gray-700">{data.summary}</p>
          </div>

          {/* Experience */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Experience</h2>
            {data.experience.map((exp: any) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                  <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-sm font-medium text-resume-purple">{exp.company}, {exp.location}</div>
                <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Education</h2>
            {data.education.map((edu: any) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="text-sm font-medium text-resume-purple">{edu.institution}, {edu.location}</div>
                <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Skills</h2>
            <div className="mb-2">
              <h3 className="font-semibold text-gray-800 text-sm">Technical Skills</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.skills.technical.map((skill: string, index: number) => (
                  <span key={index} className="inline-block bg-purple-100 text-resume-purple rounded px-2 py-1 text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Soft Skills</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.skills.soft.map((skill: string, index: number) => (
                  <span key={index} className="inline-block bg-gray-100 text-gray-700 rounded px-2 py-1 text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for other templates */}
      {template !== 'modern' && (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">{template.charAt(0).toUpperCase() + template.slice(1)} template preview</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-2 rounded-lg z-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="hover:border-resume-purple hover:text-resume-purple"
            >
              <Eye className="h-4 w-4 mr-2" /> Preview
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-7xl w-[95vw] h-[90vh] overflow-y-auto">
            <Card className="h-full bg-white p-8">
              <ResumeContent />
            </Card>
          </DialogContent>
        </Dialog>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDownloadPDF}
          className="hover:border-resume-purple hover:text-resume-purple"
        >
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </div>

      <div className="flex-1 overflow-auto relative">
        <Card className={cn(
          "resume-content w-full bg-white rounded shadow-sm p-4 min-h-[842px] mx-auto transition-transform duration-200",
          "hover:shadow-lg"
        )} style={{ 
          maxWidth: '595px',
        }}>
          <ResumeContent />
        </Card>
      </div>
    </div>
  );
};

export default ResumePreview;
