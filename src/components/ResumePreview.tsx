
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import ModernTemplate from './resume-preview/ModernTemplate';
import PreviewControls from './resume-preview/PreviewControls';

interface ResumePreviewProps {
  data: any;
  template: string;
  settings?: any;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ 
  data, 
  template, 
  settings = {}
}) => {
  const { isMobile } = useIsMobile();
  const [zoomLevel, setZoomLevel] = useState(1);
  const resumeContentRef = useRef<HTMLDivElement>(null);

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
    <div ref={resumeContentRef}>
      {template === 'modern' ? (
        <ModernTemplate data={data} settings={settings} />
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">{template.charAt(0).toUpperCase() + template.slice(1)} template preview</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative h-full flex flex-col">
      <PreviewControls
        zoomLevel={zoomLevel}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onDownload={handleDownloadPDF}
      >
        <ResumeContent />
      </PreviewControls>

      <div className="flex-1 overflow-auto relative bg-gray-50 dark:bg-gray-800/30 rounded-xl p-4">
        <Card className={cn(
          "resume-content bg-white rounded-lg shadow-lg p-0 transition-all duration-200 mx-auto",
          "hover:shadow-xl"
        )} style={{ 
          width: '100%',
          maxWidth: '720px',
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
