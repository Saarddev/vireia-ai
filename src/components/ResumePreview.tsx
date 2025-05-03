import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import ModernTemplate from './resume-preview/ModernTemplate';
import ProfessionalTemplate from './resume-preview/ProfessionalTemplate';
import PreviewControls from './resume-preview/PreviewControls';
import { ResumeData } from '@/types/resume.d';

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
  settings?: any;
  resumeId?: string;
  onDataChange?: (section: string, data: any) => void;
  onGenerateWithAI?: (section: string) => Promise<string>;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  template,
  settings = {},
  resumeId,
  onDataChange,
  onGenerateWithAI
}) => {
  // Ensure data is valid and complete with defaults
  const safeData: ResumeData = React.useMemo(() => {
    return {
      personal: data.personal || {
        name: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: ""
      },
      summary: data.summary || "",
      experience: Array.isArray(data.experience) ? data.experience : [],
      education: Array.isArray(data.education) ? data.education : [],
      skills: data.skills || { technical: [], soft: [] },
      languages: Array.isArray(data.languages) ? data.languages : [],
      certifications: Array.isArray(data.certifications) ? data.certifications : [],
      projects: Array.isArray(data.projects) ? data.projects : []
    };
  }, [data]);

  const { isMobile } = useIsMobile();
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const resumeContentRef = useRef<HTMLDivElement>(null);

  const handleGenerateWithAI = async (section: string): Promise<string> => {
    if (onGenerateWithAI) {
      return await onGenerateWithAI(section);
    }
    return '';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !resumeContentRef.current) {
      console.error('Failed to open print window or find resume content');
      return;
    }

    const fontFamily = settings.fontFamily || 'Inter';
    const primaryColor = settings.primaryColor || '#5d4dcd';

    // Clone the resume content node to avoid modifying the original
    const clonedResumeContent = resumeContentRef.current.cloneNode(true) as HTMLDivElement;
    
    // Fix the bullet points display to prevent double rendering
    const bulletElements = clonedResumeContent.querySelectorAll('.bullet-line');
    bulletElements.forEach(bulletEl => {
      const textContent = bulletEl.textContent || '';
      if (textContent.startsWith('• ')) {
        bulletEl.textContent = textContent;
      }
    });

    // Generate a machine-readable version for ATS parsing
    const atsText = generateATSFriendlyText(safeData);
    
    const resumeHTMLContent = clonedResumeContent.outerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.personal.name} - Resume</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="description" content="${atsText.substring(0, 150)}...">
          <style>
            @page {
              size: letter; /* Use US Letter or A4 */
              margin: ${settings.margins === 'narrow' ? '0.3in' :
                settings.margins === 'wide' ? '0.75in' :
                '0.5in'
              };
            }
            body {
              font-family: ${settings.fontFamily || 'Inter'}, sans-serif;
              font-size: ${settings.fontSize || 10}pt;
              line-height: 1.3;
              color: #000;
              background: #fff;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @media print {
              body { margin: 0; }
              .resume-content { 
                padding: 0 !important; 
                max-width: 100%;
                page-break-inside: avoid;
              }
              * {
                box-sizing: border-box;
                max-width: 100%;
              }
            }
            /* Ensure bullet points are rendered correctly */
            ul.list-disc {
              padding-left: 1.5rem;
              list-style-type: disc;
            }
            ul.list-disc li {
              display: list-item;
              margin-bottom: 0.25rem;
            }
            /* Fix for bullet points in PDF export */
            .bullet-line:before {
              content: "" !important;
              margin-right: 0 !important;
            }
            .bullet-line {
              display: list-item !important;
              list-style-position: outside !important;
              margin-left: 1em !important;
            }
            
            /* Hidden ATS-friendly content */
            .ats-content {
              position: absolute;
              top: -9999px;
              left: -9999px;
              color: transparent;
              font-size: 0;
              height: 0;
              width: 0;
              overflow: hidden;
              z-index: -999;
            }
          </style>
          ${settings.fontFamily ?
            `<link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily}:wght@400;500;600;700&display=swap" rel="stylesheet">`
            : ''
          }
        </head>
        <body class="p-0 m-0">
          <!-- Hidden content for ATS parsers -->
          <div class="ats-content" aria-hidden="true">
            ${atsText.split('\n').map(line => `<p>${line}</p>`).join('')}
          </div>
          
          ${resumeHTMLContent}
          <script>
            window.onload = () => {
              // Fix bullet points display before printing
              document.querySelectorAll('.bullet-line').forEach(item => {
                if (item.textContent && item.textContent.startsWith('• • ')) {
                  item.textContent = item.textContent.replace('• • ', '• ');
                }
              });
              
              setTimeout(() => {
                window.print();
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  // Function to generate ATS-friendly plain text from resume data
  const generateATSFriendlyText = (data: ResumeData): string => {
    const lines = [];
    
    // Personal information
    lines.push(`${data.personal.name || 'Name'}`);
    lines.push(`${data.personal.title || 'Title'}`);
    
    const contactInfo = [];
    if (data.personal.email) contactInfo.push(data.personal.email);
    if (data.personal.phone) contactInfo.push(data.personal.phone);
    if (data.personal.location) contactInfo.push(data.personal.location);
    lines.push(contactInfo.join(' | '));
    
    if (data.personal.linkedin) lines.push(`LinkedIn: ${data.personal.linkedin}`);
    if (data.personal.website) lines.push(`Website: ${data.personal.website}`);
    
    // Summary
    if (data.summary) {
      lines.push('');
      lines.push('SUMMARY');
      lines.push('-------');
      const summaryPoints = data.summary.split('\n').filter(line => line.trim());
      lines.push(...summaryPoints.slice(0, 3)); // Limit to 3 bullet points
    }
    
    // Experience
    if (data.experience && data.experience.length > 0) {
      lines.push('');
      lines.push('EXPERIENCE');
      lines.push('----------');
      data.experience.forEach(exp => {
        lines.push(`${exp.title} | ${exp.company} | ${exp.location} | ${exp.startDate} - ${exp.endDate}`);
        const descPoints = exp.description.split('\n').filter(line => line.trim());
        lines.push(...descPoints.map(point => `- ${point.replace(/^[-•*]\s*/, '')}`));
        lines.push('');
      });
    }
    
    // Projects
    if (data.projects && data.projects.length > 0) {
      lines.push('');
      lines.push('PROJECTS');
      lines.push('--------');
      data.projects.forEach(project => {
        lines.push(`${project.title} | ${project.startDate} - ${project.endDate}`);
        if (project.technologies && project.technologies.length > 0) {
          lines.push(`Technologies: ${project.technologies.join(', ')}`);
        }
        const descPoints = project.description.split('\n').filter(line => line.trim());
        lines.push(...descPoints.map(point => `- ${point.replace(/^[-•*]\s*/, '')}`));
        if (project.link) lines.push(`Link: ${project.link}`);
        lines.push('');
      });
    }
    
    // Education
    if (data.education && data.education.length > 0) {
      lines.push('');
      lines.push('EDUCATION');
      lines.push('---------');
      data.education.forEach(edu => {
        lines.push(`${edu.degree}${edu.field ? ` in ${edu.field}` : ''} | ${edu.institution} | ${edu.location} | ${edu.startDate} - ${edu.endDate}`);
        if (edu.description) {
          const descPoints = edu.description.split('\n').filter(line => line.trim());
          lines.push(...descPoints.map(point => `- ${point.replace(/^[-•*]\s*/, '')}`));
        }
        lines.push('');
      });
    }
    
    // Skills
    if (data.skills) {
      lines.push('');
      lines.push('SKILLS');
      lines.push('------');
      if (data.skills.technical && data.skills.technical.length > 0) {
        lines.push(`Technical Skills: ${data.skills.technical.join(', ')}`);
      }
      if (data.skills.soft && data.skills.soft.length > 0) {
        lines.push(`Soft Skills: ${data.skills.soft.join(', ')}`);
      }
    }
    
    return lines.join('\n');
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="relative h-full flex flex-col overflow-hidden">
      <PreviewControls
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onDownload={handleDownloadPDF}
        onPrint={handlePrint}
      >
        <span className="text-sm text-gray-600 ml-2">
          {Math.round(zoomLevel * 100)}%
        </span>
      </PreviewControls>
      
      <div className="flex-1 overflow-auto p-4 relative scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {resumeId && (
          <div className="absolute top-2 right-2 z-10">
            <Link to={`/resume/builder/${resumeId}?section=ai`}>
              <Button 
                className="bg-resume-purple hover:bg-resume-purple/90 text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2" 
                size="sm"
              >
                <Brain className="h-4 w-4" />
                AI Analysis
              </Button>
            </Link>
          </div>
        )}
        
        <div className="min-h-full flex items-start justify-center pb-20">
          <Card
            className={cn(
              "resume-content bg-white rounded-lg shadow-md p-6 md:p-8 transition-all duration-200 mx-auto",
              "border border-gray-200 w-full max-w-[21cm]"
            )}
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top center',
              marginBottom: `${(zoomLevel - 1) * 100}%`
            }}
          >
            <div ref={resumeContentRef} className="resume-content">
              {template === 'modern' ? (
                <ModernTemplate
                  data={safeData}
                  settings={settings}
                  onUpdateData={onDataChange}
                  onGenerateWithAI={handleGenerateWithAI}
                />
              ) : template === 'professional' ? (
                <ProfessionalTemplate
                  data={safeData}
                  onUpdateData={onDataChange}
                  isEditMode={!!onDataChange}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">
                    {template.charAt(0).toUpperCase() + template.slice(1)} template preview
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
