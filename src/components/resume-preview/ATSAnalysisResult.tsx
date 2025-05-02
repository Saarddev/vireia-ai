
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, AlertCircle, X, ArrowRight, Download, FileDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ATSScanResult } from '@/utils/resumeATSScanner';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface ATSAnalysisResultProps {
  result: ATSScanResult;
  jobTitle?: string;
  onOptimize?: () => void;
  onClose?: () => void;
  loading?: boolean;
}

const scoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-amber-500';
  return 'text-red-500';
};

const scoreBackground = (score: number): string => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
};

const ATSAnalysisResult: React.FC<ATSAnalysisResultProps> = ({ 
  result, 
  jobTitle, 
  onOptimize, 
  onClose,
  loading = false
}) => {
  if (!result) return null;
  
  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Resume ATS Analysis</CardTitle>
            {jobTitle && (
              <CardDescription className="text-sm text-gray-600">
                Analyzed for: <span className="font-medium">{jobTitle}</span>
              </CardDescription>
            )}
          </div>
          <div className="flex items-center justify-center">
            <div className={cn(
              "text-2xl font-bold rounded-full p-5 w-16 h-16 flex items-center justify-center",
              scoreBackground(result.overallScore),
              "text-white"
            )}>
              {Math.round(result.overallScore)}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Keyword Match</h4>
              <span className={cn("text-sm font-bold", scoreColor(result.keywordMatch.score))}>
                {Math.round(result.keywordMatch.score)}%
              </span>
            </div>
            <Progress value={result.keywordMatch.score} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Format Score</h4>
              <span className={cn("text-sm font-bold", scoreColor(result.formatScore))}>
                {Math.round(result.formatScore)}%
              </span>
            </div>
            <Progress value={result.formatScore} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Content Quality</h4>
              <span className={cn("text-sm font-bold", scoreColor(result.contentScore))}>
                {Math.round(result.contentScore)}%
              </span>
            </div>
            <Progress value={result.contentScore} className="h-2" />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Key Findings</h3>
            <div className="space-y-2">
              {result.feedback.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <div className="mt-0.5">
                    {item.startsWith('+') ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                  <p className="text-gray-700">{item.replace(/^[+\-] /, '')}</p>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Keyword Analysis</h3>
            <div className="flex flex-wrap gap-2">
              <div>
                <h4 className="text-xs text-gray-600 mb-1">Found Keywords</h4>
                <div className="flex flex-wrap gap-1.5">
                  {result.keywordMatch.found.map((keyword, i) => (
                    <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Check className="h-3 w-3 mr-1" />
                      {keyword}
                    </Badge>
                  ))}
                  {result.keywordMatch.found.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No matching keywords found</p>
                  )}
                </div>
              </div>
              
              {result.keywordMatch.missing.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-xs text-gray-600 mb-1">Missing Keywords</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.keywordMatch.missing.map((keyword, i) => (
                      <Badge key={i} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <X className="h-3 w-3 mr-1" />
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {result.improvements.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Suggested Improvements</h3>
                <div className="space-y-2">
                  {result.improvements.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="h-4 w-4 text-purple-500 mt-0.5" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end space-x-2 pt-2">
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
        {onOptimize && (
          <Button 
            onClick={onOptimize}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Optimizing...
              </>
            ) : (
              <>
                <FileDown className="mr-2 h-4 w-4" />
                Optimize Resume
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ATSAnalysisResult;
