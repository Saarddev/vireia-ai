
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown, Award, ThumbsUp, Target, CheckCircle2, AlertCircle, Search } from 'lucide-react';

interface ATSScoreCardProps {
  atsResults: any;
  expandedSection: string | null;
  toggleSection: (section: string) => void;
}

export const ATSScoreCard: React.FC<ATSScoreCardProps> = ({ 
  atsResults, 
  expandedSection, 
  toggleSection 
}) => {
  return (
    <Card className="overflow-hidden border-resume-purple/20 shadow-lg hover:shadow-xl transition-all">
      <div 
        className="p-6 border-b border-resume-purple/10 flex justify-between items-center cursor-pointer bg-gradient-to-r from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80"
        onClick={() => toggleSection("ats")}
      >
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-resume-purple/30 to-blue-400/20 flex items-center justify-center mr-4">
            <Award className="h-5 w-5 text-resume-purple" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">ATS Compatibility Score</h3>
            <p className="text-sm text-muted-foreground">How well your resume performs with Applicant Tracking Systems</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-right mr-4">
            <div className="text-3xl font-bold text-resume-purple">{atsResults.score || 0}</div>
            <Badge variant="outline" className={`
              ${atsResults.score >= 80 ? 'bg-green-50 text-green-600 border-green-200' : 
                atsResults.score >= 60 ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 
                'bg-red-50 text-red-600 border-red-200'}
            `}>
              {atsResults.score >= 80 ? 'Excellent' : 
               atsResults.score >= 60 ? 'Good' : 
               'Needs Improvement'}
            </Badge>
          </div>
          {expandedSection === "ats" ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </div>
      
      {expandedSection === "ats" && (
        <div className="p-6 space-y-6 bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {(atsResults.metrics || []).map((metric: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{metric.name}</span>
                    <span className="text-resume-gray">{metric.score}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ease-out ${
                        metric.score >= 80 ? 'bg-gradient-to-r from-green-400 to-green-500' : 
                        metric.score >= 60 ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 
                        metric.score >= 40 ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 
                        'bg-gradient-to-r from-red-400 to-red-500'
                      }`}
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                <h4 className="font-medium text-sm flex items-center mb-2">
                  <ThumbsUp className="h-4 w-4 mr-2 text-green-500" /> ATS Strengths
                </h4>
                <ul className="text-sm space-y-2">
                  {(atsResults.strengths || []).map((strength: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                  {(!atsResults.strengths || atsResults.strengths.length === 0) && (
                    <li className="text-gray-500 italic">No strengths identified</li>
                  )}
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                <h4 className="font-medium text-sm flex items-center mb-2">
                  <Target className="h-4 w-4 mr-2 text-amber-500" /> Areas for Improvement
                </h4>
                <ul className="text-sm space-y-2">
                  {(atsResults.improvements || []).map((improvement: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                  {(!atsResults.improvements || atsResults.improvements.length === 0) && (
                    <li className="text-gray-500 italic">No areas for improvement identified</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          
          {atsResults.keywords && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
              <h4 className="font-medium text-sm flex items-center mb-3">
                <Search className="h-4 w-4 mr-2 text-resume-purple" /> 
                Recommended Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {atsResults.keywords.map((keyword: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-resume-purple/10 text-resume-purple border-resume-purple/20">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
