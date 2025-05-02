
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Download, Printer, Check, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface PreviewControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownload: () => void;
  onPrint?: () => void;
  pageCount?: number;
  children?: React.ReactNode;
}

const PreviewControls: React.FC<PreviewControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onDownload,
  onPrint,
  pageCount = 1,
  children
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomOut}
          disabled={zoomLevel <= 0.5}
          className="text-gray-600 hover:text-gray-900 h-8 w-8 p-0"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <div className="flex items-center mx-1 min-w-[60px] justify-center">
          {children}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomIn}
          disabled={zoomLevel >= 2}
          className="text-gray-600 hover:text-gray-900 h-8 w-8 p-0"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>
      
      {pageCount > 1 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-amber-500 text-xs font-medium">
                <AlertCircle className="w-3.5 h-3.5 mr-1" />
                <span>Content exceeds one page</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Your resume is longer than one page. Consider condensing your content.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      <div className="flex items-center space-x-2">
        {onPrint && (
          <Button
            variant="outline"
            size="sm"
            onClick={onPrint}
            className="text-gray-600 hover:bg-gray-50 border-gray-200"
          >
            <Printer className="w-4 h-4 mr-1.5" />
            <span className="hidden sm:inline">Print</span>
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={onDownload}
          className="text-purple-600 hover:bg-purple-50 border-purple-200 hover:border-purple-300"
        >
          <Download className="w-4 h-4 mr-1.5" />
          <span className="hidden sm:inline">Download PDF</span>
        </Button>
      </div>
    </div>
  );
};

export default PreviewControls;
