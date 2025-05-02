
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Target, ChevronUp, ChevronDown, TrendingUp, CheckCircle2, AlertCircle, Search, Sparkles, ArrowRight } from 'lucide-react';

interface JobMatchCardProps {
  jobMatchScore: number | null;
  jobMatchResults: any;
  expandedSection: string | null;
  toggleSection: (section: string) => void;
  onAnalyze: () => void;
}

export const JobMatchCard: React.FC<JobMatchCardProps> = ({
  jobMatchScore,
  jobMatchResults,
  expandedSection,
  toggleSection,
  onAnalyze
}) => {
  const [jobDescription, setJobDescription] = useState('');

  return (
    <Card className="overflow-hidden border-resume-purple/20 shadow-lg hover:shadow-xl transition-all">
      <div 
        className="p-6 border-b border-resume-purple/10 flex justify-between items-center cursor-pointer bg-gradient-to-r from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80"
        onClick={() => toggleSection("jobmatch")}
      >
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-resume-purple/30 to-blue-400/20 flex items-center justify-center mr-4">
            <Target className="h-5 w-5 text-resume-purple" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Job Match Analysis</h3>
            <p className="text-sm text-muted-foreground">See how well your resume matches specific job descriptions</p>
          </div>
        </div>
        <div className="flex items-center">
          {jobMatchScore !== null && (
            <div className="text-right mr-4">
              <div className="text-3xl font-bold text-resume-purple">{jobMatchScore}%</div>
              <Badge variant="outline" className={`
                ${jobMatchScore >= 80 ? 'bg-green-50 text-green-600 border-green-200' : 
                  jobMatchScore >= 60 ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 
                  'bg-red-50 text-red-600 border-red-200'}
              `}>
                {jobMatchScore >= 80 ? 'Strong Match' : 
                 jobMatchScore >= 60 ? 'Good Match' : 
                 'Needs Improvement'}
              </Badge>
            </div>
          )}
          {expandedSection === "jobmatch" ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </div>
      
      {expandedSection === "jobmatch" && (
        <div className="p-6 space-y-6 bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Paste a Job Description
              </label>
              <Textarea 
                id="job-description"
                placeholder="Paste the job description here to analyze your resume's match..."
                className="min-h-[150px] resize-none"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={onAnalyze}
                className="bg-resume-purple hover:bg-resume-purple/90 text-white flex items-center gap-2"
                disabled={!jobDescription || jobDescription.trim() === ''}
              >
                <Search className="h-4 w-4" /> 
                Analyze Match
              </Button>
            </div>
          </div>
          
          {jobMatchResults && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                  <h4 className="font-medium text-sm flex items-center mb-3">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> 
                    Requirements You Match ({jobMatchResults.matches} of {jobMatchResults.total})
                  </h4>
                  <div className="max-h-[200px] overflow-y-auto">
                    {jobMatchResults.matched.length > 0 ? (
                      <ul className="space-y-2 text-sm">
                        {jobMatchResults.matched.map((match: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{match}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No matches found.</p>
                    )}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                  <h4 className="font-medium text-sm flex items-center mb-3">
                    <AlertCircle className="h-4 w-4 mr-2 text-amber-500" /> 
                    Missing Requirements
                  </h4>
                  <div className="max-h-[200px] overflow-y-auto">
                    {jobMatchResults.missing.length > 0 ? (
                      <ul className="space-y-2 text-sm">
                        {jobMatchResults.missing.map((missing: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <AlertCircle className="h-3.5 w-3.5 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span>{missing}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-green-500">
                        Excellent! Your resume covers all key requirements.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                  <h4 className="font-medium text-sm flex items-center mb-3">
                    <TrendingUp className="h-4 w-4 mr-2 text-resume-purple" /> 
                    Match Score
                  </h4>
                  <div className="flex flex-col items-center">
                    <div className="relative h-36 w-36 flex items-center justify-center">
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle
                          className="text-gray-100 dark:text-gray-700"
                          strokeWidth="10"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className={`
                            ${jobMatchScore >= 80 ? 'text-green-500' : 
                             jobMatchScore >= 60 ? 'text-blue-500' : 
                             'text-amber-500'}
                          `}
                          strokeWidth="10"
                          strokeDasharray={`${jobMatchScore * 2.51} 251`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute text-3xl font-bold">
                        {jobMatchScore}%
                      </div>
                    </div>
                    <p className="text-sm text-center mt-4">
                      {jobMatchScore >= 80 ? 'Excellent match! Your resume is highly aligned with this job.' : 
                       jobMatchScore >= 60 ? 'Good match. With a few adjustments, your resume would be even stronger for this role.' : 
                       'Your resume needs customization to better match this job description.'}
                    </p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                  <h4 className="font-medium text-sm flex items-center mb-3">
                    <Sparkles className="h-4 w-4 mr-2 text-resume-purple" /> 
                    Recommendations
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {jobMatchResults.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <ArrowRight className="h-3.5 w-3.5 mr-2 text-resume-purple mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
