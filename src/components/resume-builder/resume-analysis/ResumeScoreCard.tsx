
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, ChevronDown, ChevronUp, Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

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
  if (!atsResults) return null;
  
  // Prepare data for the line chart
  const chartData = scoreHistory.slice(0, 7).map(entry => ({
    date: format(new Date(entry.date), 'MMM d'),
    score: entry.score,
  })).reverse();
  
  return (
    <Card className="border border-gray-200 dark:border-gray-700 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader 
        className="cursor-pointer pb-3 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
        onClick={() => toggleSection('score')}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-resume-purple/10 p-2 rounded-full">
              <Sparkles className="h-5 w-5 text-resume-purple" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold flex items-center">
                Resume Score Analysis
                <Badge 
                  className="ml-2 bg-resume-purple/10 text-resume-purple dark:text-resume-purple-light border-resume-purple/30"
                >
                  Score: {atsResults.score}/100
                </Badge>
              </CardTitle>
              <p className="text-sm text-resume-gray mt-1">
                AI-powered resume strength metrics and optimization suggestions
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            {expandedSection === 'score' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
        <div className="mt-3 px-1">
          <Progress 
            value={atsResults.score} 
            max={100} 
            className="h-2.5 rounded-full bg-gray-100 dark:bg-gray-700" 
            indicatorClassName={`${
              atsResults.score < 60 ? 'bg-red-500' :
              atsResults.score < 80 ? 'bg-yellow-500' :
              'bg-green-500'
            }`}
          />
          <div className="flex justify-between mt-1 text-xs text-resume-gray">
            <span>Needs Work</span>
            <span>Good</span>
            <span>Excellent</span>
          </div>
        </div>
      </CardHeader>
      
      {expandedSection === 'score' && (
        <CardContent className="pt-4 pb-6 bg-white dark:bg-gray-800 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Metrics Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Key Metrics</h3>
                <div className="space-y-3">
                  {atsResults.metrics && atsResults.metrics.map((metric: any, i: number) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{metric.name}</span>
                        <span className={`font-medium ${
                          metric.score < 60 ? 'text-red-500' :
                          metric.score < 80 ? 'text-yellow-500' :
                          'text-green-500'
                        }`}>{metric.score}/100</span>
                      </div>
                      <Progress 
                        value={metric.score} 
                        max={100} 
                        className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700" 
                        indicatorClassName={`${
                          metric.score < 60 ? 'bg-red-500' :
                          metric.score < 80 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Keywords Section */}
              <div>
                <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Top Keywords Detected</h3>
                <div className="flex flex-wrap gap-2">
                  {atsResults.keywords && atsResults.keywords.slice(0, 10).map((keyword: string, i: number) => (
                    <Badge 
                      key={i}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Chart Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Score History</h3>
              {chartData.length > 1 ? (
                <div className="h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                      <XAxis dataKey="date" tick={{fontSize: 12}} stroke="#9ca3af" />
                      <YAxis domain={[0, 100]} tick={{fontSize: 12}} stroke="#9ca3af" />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[140px] bg-gray-50 dark:bg-gray-900/50 rounded-md">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <Clock className="mx-auto h-6 w-6 mb-2 opacity-70" />
                    <p className="text-sm">Score history will appear after multiple analyses</p>
                  </div>
                </div>
              )}
              
              {/* AI Suggestions */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">AI Suggestions</h3>
                {aiSuggestions.length > 0 ? (
                  <div className="space-y-3">
                    {aiSuggestions.map((suggestion, i) => (
                      <div 
                        key={i}
                        className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/30 rounded-md p-3 relative"
                      >
                        <div className="pr-16">
                          <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion.text}</p>
                          <Badge className="mt-2 bg-resume-purple/20 text-resume-purple border-none">
                            {suggestion.section.charAt(0).toUpperCase() + suggestion.section.slice(1)}
                          </Badge>
                        </div>
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-7 w-7 p-0 rounded-full text-green-600 hover:text-green-700 hover:bg-green-100"
                            onClick={() => onApplySuggestion(suggestion.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-7 w-7 p-0 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            onClick={() => onRemoveSuggestion(suggestion.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center text-gray-500 dark:text-gray-400">
                    No suggestions available at this time
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
