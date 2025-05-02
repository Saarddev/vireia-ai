
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, ChevronUp, ChevronDown, Sparkles, Clock, Trash, CheckCircle2, FileText } from 'lucide-react';

interface ResumeScoreCardProps {
  atsResults: any;
  aiSuggestions: any[];
  scoreHistory: any[];
  expandedSection: string | null;
  toggleSection: (section: string) => void;
  onApplySuggestion: (id: string) => void;
  onRemoveSuggestion: (id: string) => void;
}

export const ResumeScoreCard: React.FC<ResumeScoreCardProps> = ({ 
  atsResults, 
  aiSuggestions,
  scoreHistory,
  expandedSection, 
  toggleSection,
  onApplySuggestion,
  onRemoveSuggestion
}) => {
  return (
    <Card className="overflow-hidden border-resume-purple/20 shadow-lg hover:shadow-xl transition-all">
      <div 
        className="p-6 border-b border-resume-purple/10 flex justify-between items-center cursor-pointer bg-gradient-to-r from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80"
        onClick={() => toggleSection("score")}
      >
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-resume-purple/30 to-blue-400/20 flex items-center justify-center mr-4">
            <BarChart3 className="h-5 w-5 text-resume-purple" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Resume Score</h3>
            <p className="text-sm text-muted-foreground">Industry benchmarked evaluation</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-right mr-4">
            <div className="text-3xl font-bold text-resume-purple">
              {atsResults ? atsResults.score : 76}
            </div>
            <Badge variant="outline" className={`
              ${atsResults && atsResults.score >= 80 ? 'bg-green-50 text-green-600 border-green-200' : 
                atsResults && atsResults.score >= 60 ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 
                'bg-red-50 text-red-600 border-red-200'}
            `}>
              {atsResults && atsResults.score >= 80 ? 'Excellent' : 
               atsResults && atsResults.score >= 60 ? 'Good' : 
               'Needs Improvement'}
            </Badge>
          </div>
          {expandedSection === "score" ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </div>
      
      {expandedSection === "score" && (
        <div className="p-6 space-y-6 bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {(atsResults?.metrics || [
                { name: "Content Quality", score: 85 },
                { name: "ATS Compatibility", score: 92 },
                { name: "Keyword Optimization", score: 68 },
                { name: "Impact Statements", score: 62 }
              ]).map((metric: any) => (
                <div key={metric.name} className="space-y-2">
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
              {/* AI Suggestions */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                <h4 className="font-medium text-sm flex items-center mb-2">
                  <Sparkles className="h-4 w-4 mr-2 text-resume-purple" /> AI Suggestions
                </h4>
                
                {aiSuggestions.length > 0 ? (
                  <div className="space-y-3">
                    {aiSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="bg-resume-purple/5 rounded-md p-3 text-sm">
                        <div className="flex justify-between items-start">
                          <p>{suggestion.text}</p>
                          <div className="flex gap-1 ml-2">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 w-6 p-0" 
                              onClick={() => onApplySuggestion(suggestion.id)}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-6 w-6 p-0" 
                              onClick={() => onRemoveSuggestion(suggestion.id)}
                            >
                              <Trash className="h-3.5 w-3.5 text-red-400" />
                            </Button>
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className="mt-2 text-xs bg-white/50 dark:bg-gray-900/50"
                        >
                          {suggestion.section}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No suggestions available. Run an analysis to generate suggestions.
                  </p>
                )}
              </div>
              
              {/* History Tracking */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                <h4 className="font-medium text-sm flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" /> Resume History
                </h4>
                
                {scoreHistory.length > 0 ? (
                  <div className="space-y-2">
                    {scoreHistory.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between text-sm border-b border-gray-100 dark:border-gray-700 pb-1">
                        <div className="flex items-center">
                          <FileText className="h-3.5 w-3.5 mr-2 text-gray-500" />
                          <span>{entry.event}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium text-resume-purple">{entry.score}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            {new Date(entry.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No history available yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
