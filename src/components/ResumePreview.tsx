
import React, { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import ModernTemplate from './resume-preview/ModernTemplate';
import PreviewControls from './resume-preview/PreviewControls';

interface ResumePreviewProps {
  data: any;
  template: string;
  settings?: any;
  onDataChange?: (section: string, data: any) => void;
  onGenerateWithAI?: (section: string) => Promise<string>;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  data, 
  template, 
  settings = {},
  onDataChange,
  onGenerateWithAI
}) => {
  const { isMobile } = useIsMobile();
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const resumeContentRef = useRef<HTMLDivElement>(null);

  const handleGenerateWithAI = async (section: string): Promise<string> => {
    if (onGenerateWithAI) {
      return await onGenerateWithAI(section);
    }
    return '';
  };

  const handleDownloadPDF = () => {
    // PDF rendering uses the exact HTML/CSS from preview by cloning resumeContentRef
    const printWindow = window.open('', '_blank');
    if (!printWindow || !resumeContentRef.current) {
      console.error('Failed to open print window or find resume content');
      return;
    }

    // Get font family from settings or use default
    const fontFamily = settings.fontFamily || 'Inter';
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.personal.name} - Resume</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=${fontFamily}:wght@400;500;600;700&display=swap" rel="stylesheet">
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
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              background: white;
            }
            .resume-content {
              font-family: '${fontFamily}', sans-serif !important;
              font-size: ${settings.fontSize || 11}pt !important;
              line-height: 1.5 !important;
              color: #232323 !important;
              background: #fff !important;
              box-shadow: none !important;
              border: none !important;
              padding: 0 !important;
              max-width: 100% !important;
              margin: 0 !important;
            }
            .text-resume-purple { color: ${settings.primaryColor || '#7061e7'} !important; }
            .border-resume-purple { border-color: ${settings.primaryColor || '#7061e7'} !important; }
            .bg-purple-100 { background-color: ${settings.primaryColor || '#7061e7'}20 !important; }
            .highlight { background: ${settings.primaryColor || '#9b87f5'}22 !important; }
            
            /* Section spacing */
            .section-gap { margin-bottom: 16px !important; }
            
            h1, h2, h3, h4, h5, h6 {
              margin-top: 0;
              margin-bottom: 8px;
              line-height: 1.2;
            }
            
            /* Proper spacing for sections */
            .resume-section {
              margin-bottom: 16px;
            }
            
            /* Proper spacing for experience and education items */
            .resume-item {
              margin-bottom: 12px;
              page-break-inside: avoid;
            }
            
            /* Print optimization */
            @media print {
              html, body {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
              }
              
              .resume-content {
                width: 100%;
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="resume-content">
            ${resumeContentRef.current.innerHTML}
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

  return (
    <div className="relative h-full flex flex-col">
      <PreviewControls
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onDownload={handleDownloadPDF}
      >
        <div className="resume-content">
          {template === 'modern' ? (
            <ModernTemplate
              data={data}
              settings={settings}
              onUpdateData={onDataChange}
              onGenerateWithAI={handleGenerateWithAI}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">{template.charAt(0).toUpperCase() + template.slice(1)} template preview</p>
            </div>
          )}
        </div>
      </PreviewControls>

      <div className="flex-1 overflow-auto relative bg-[#f9f7fd] dark:bg-gray-800/30 rounded-xl p-4">
        <Card className={cn(
          "resume-content bg-white rounded-lg shadow-md p-0 transition-all duration-200 mx-auto",
          "border border-gray-200"
        )} style={{
          width: '100%',
          maxWidth: '720px',
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center top',
          background: '#fff',
        }}>
          <div ref={resumeContentRef} className="resume-content">
            {template === 'modern' ? (
              <ModernTemplate
                data={data}
                settings={settings}
                onUpdateData={onDataChange}
                onGenerateWithAI={handleGenerateWithAI}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">{template.charAt(0).toUpperCase() + template.slice(1)} template preview</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResumePreview;
