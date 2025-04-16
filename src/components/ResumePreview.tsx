import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ResumePreviewProps {
  data: any;
  template: string;
  settings?: any;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template, settings = {} }) => {
  const { isMobile } = useIsMobile();
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error('Failed to open print window');
      return;
    }
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.personal.name} - Resume</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          ${settings.fontFamily ? 
            `<link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily}:wght@400;500;600;700&display=swap" rel="stylesheet">` 
            : ''
          }
          <style>
            @page {
              size: ${settings.paperSize || 'a4'};
              margin: ${
                settings.margins === 'narrow' ? '0.5in' : 
                settings.margins === 'wide' ? '1.5in' : 
                '1in'
              };
            }
            body {
              font-family: ${settings.fontFamily || 'Inter'}, sans-serif;
              font-size: ${settings.fontSize || 10}pt;
              line-height: 1.5;
              color: #000;
              background: #fff;
            }
            @media print {
              body { margin: 0; }
              .resume-content { padding: 0; }
            }
            .text-resume-purple { color: ${settings.primaryColor}; }
            .border-resume-purple { border-color: ${settings.primaryColor}; }
            .bg-purple-100 { background-color: ${settings.primaryColor}20; }
          </style>
        </head>
        <body class="p-0 m-0">
          <div class="resume-content">
            ${document.querySelector('.resume-content')?.innerHTML || ''}
          </div>
          <script>
            window.onload = () => {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const ResumeContent = () => (
    <div className={cn(
      "p-4",
      settings.fontFamily && `font-[${settings.fontFamily}]`,
      settings.fontSize && `text-[${settings.fontSize}pt]`
    )}>
      {template === 'modern' && (
        <div className="p-4">
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

          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1">Summary</h2>
            <p className="text-sm text-gray-700">{data.summary}</p>
          </div>

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

      {template !== 'modern' && (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">{template.charAt(0).toUpperCase() + template.slice(1)} template preview</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl py-3 px-4 rounded-xl z-10 shadow-sm">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="hover:border-resume-purple hover:text-resume-purple transition-all duration-300"
            >
              <Eye className="h-4 w-4 mr-2" /> Preview
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-7xl w-[95vw] h-[90vh] overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
            <div className="flex justify-end gap-2 mb-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownloadPDF}
                className="hover:border-resume-purple hover:text-resume-purple transition-all duration-300"
              >
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            </div>
            <Card className="h-full bg-white p-8 shadow-md">
              <ResumeContent />
            </Card>
          </DialogContent>
        </Dialog>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.5}
            className="hover:border-resume-purple hover:text-resume-purple transition-all duration-300"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs font-medium w-16 text-center">{Math.round(zoomLevel * 100)}%</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleZoomIn}
            disabled={zoomLevel >= 2}
            className="hover:border-resume-purple hover:text-resume-purple transition-all duration-300"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadPDF}
            className="ml-2 hover:border-resume-purple hover:text-resume-purple transition-all duration-300"
          >
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto relative bg-gray-50 dark:bg-gray-800/30 rounded-xl p-6">
        <Card className={cn(
          "resume-content bg-white rounded-lg shadow-lg p-0 transition-all duration-200 mx-auto",
          "hover:shadow-xl"
        )} style={{ 
          width: '100%',
          maxWidth: '1200px',
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center top',
        }}>
          <ResumeContent />
        </Card>
      </div>
    </div>
  );
};

export default ResumePreview;
