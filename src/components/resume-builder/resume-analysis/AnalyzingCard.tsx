
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, FileSpreadsheet, BarChart3, Sparkles } from 'lucide-react';

interface AnalyzingCardProps {
  progress: number;
  stage: number;
}

export const AnalyzingCard: React.FC<AnalyzingCardProps> = ({ progress, stage }) => {
  return (
    <Card className="overflow-hidden border-resume-purple/20 shadow-lg">
      <div className="p-8 space-y-8 bg-gradient-to-r from-purple-50/90 to-blue-50/90 dark:from-purple-900/20 dark:to-blue-900/20 backdrop-blur-xl">
        <div className="flex justify-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-resume-purple/10 animate-pulse">
            <Brain className="h-10 w-10 text-resume-purple animate-pulse" />
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold text-resume-purple">AI Resume Analyzer</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Our AI is analyzing your resume using advanced algorithms to provide personalized insights
          </p>
        </div>
        
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-100">
            <div 
              className="h-full bg-gradient-to-r from-resume-purple to-blue-500 rounded-full transition-all ease-in-out duration-300" 
              style={{ width: `${progress}%` }}
            />
          </Progress>
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className={`rounded-lg border p-2 text-center text-xs ${stage >= 0 ? 'border-resume-purple bg-resume-purple/5' : 'border-gray-200'}`}>
              <div className="flex justify-center mb-1">
                <FileSpreadsheet className={`h-4 w-4 ${stage >= 0 ? 'text-resume-purple' : 'text-gray-400'}`} />
              </div>
              <p className={stage >= 0 ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}>Reading Content</p>
            </div>
            
            <div className={`rounded-lg border p-2 text-center text-xs ${stage >= 1 ? 'border-resume-purple bg-resume-purple/5' : 'border-gray-200'}`}>
              <div className="flex justify-center mb-1">
                <BarChart3 className={`h-4 w-4 ${stage >= 1 ? 'text-resume-purple' : 'text-gray-400'}`} />
              </div>
              <p className={stage >= 1 ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}>Analyzing</p>
            </div>
            
            <div className={`rounded-lg border p-2 text-center text-xs ${stage >= 2 ? 'border-resume-purple bg-resume-purple/5' : 'border-gray-200'}`}>
              <div className="flex justify-center mb-1">
                <Sparkles className={`h-4 w-4 ${stage >= 2 ? 'text-resume-purple' : 'text-gray-400'}`} />
              </div>
              <p className={stage >= 2 ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}>Generating Insights</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
