
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Download, Printer } from 'lucide-react';

export interface PreviewControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownload: () => void;
  onPrint?: () => void;
  children?: React.ReactNode;
}

const PreviewControls: React.FC<PreviewControlsProps> = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onDownload,
  onPrint,
  children
}) => {
  return (
    <div className="flex items-center justify-between p-2 bg-white border-b sticky top-0 z-10">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomOut}
          disabled={zoomLevel <= 0.5}
          className="text-gray-600 hover:text-gray-900"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <div className="flex items-center mx-1">
          {children}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomIn}
          disabled={zoomLevel >= 2}
          className="text-gray-600 hover:text-gray-900"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        {onPrint && (
          <Button
            variant="outline"
            size="sm"
            onClick={onPrint}
            className="text-gray-600 hover:text-gray-900"
          >
            <Printer className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Print</span>
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={onDownload}
          className="text-gray-600 hover:text-gray-900"
        >
          <Download className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Download PDF</span>
        </Button>
      </div>
    </div>
  );
};

export default PreviewControls;
