
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useResumeAnalysis } from '@/hooks/use-resume-analysis';
import { Brain, RefreshCw, Sparkles, AlertCircle, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { ATSScoreCard } from './resume-analysis/ATSScoreCard';
import { ResumeScoreCard } from './resume-analysis/ResumeScoreCard';
import { JobMatchCard } from './resume-analysis/JobMatchCard';
import { AnalyzingCard } from './resume-analysis/AnalyzingCard';
import { DisabledCard } from './resume-analysis/DisabledCard';

interface AIAssistantProps {
  resumeData: any;
  enabled: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ resumeData, enabled }) => {
  const {
    isAnalyzing,
    analysisComplete,
    progress,
    stage,
    atsResults,
    expandedSection, 
    setExpandedSection,
    aiSuggestions,
    scoreHistory,
    jobMatchScore,
    jobMatchResults,
    handleAnalyze,
    handleApplySuggestion,
    handleRemoveSuggestion,
    analyzeJobMatch
  } = useResumeAnalysis(resumeData);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center text-gray-800 dark:text-white">
            <Brain className="mr-3 h-6 w-6 text-resume-purple" />
            AI Resume Analysis Hub
          </h2>
          <p className="text-sm text-resume-gray mt-1">
            Get personalized insights to build a standout resume
          </p>
        </div>
        <div className="flex gap-3">
          {enabled && !isAnalyzing && (
            <Button 
              onClick={handleAnalyze} 
              className="bg-gradient-to-r from-resume-purple to-blue-500 hover:from-resume-purple/90 hover:to-blue-600 text-white flex items-center gap-2 shadow-md hover:shadow-xl transition-all"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> 
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> 
                  {analysisComplete ? "Re-Analyze Resume" : "Analyze Resume"}
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      
      {!enabled && <DisabledCard />}
      
      {enabled && isAnalyzing && (
        <AnalyzingCard progress={progress} stage={stage} />
      )}
      
      {enabled && analysisComplete && (
        <div className="space-y-6">
          {/* ATS Score Card */}
          {atsResults && (
            <ATSScoreCard 
              atsResults={atsResults} 
              expandedSection={expandedSection} 
              toggleSection={setExpandedSection} 
            />
          )}

          {/* Resume Score Card */}
          <ResumeScoreCard 
            atsResults={atsResults}
            aiSuggestions={aiSuggestions}
            scoreHistory={scoreHistory}
            expandedSection={expandedSection}
            toggleSection={setExpandedSection}
            onApplySuggestion={handleApplySuggestion}
            onRemoveSuggestion={handleRemoveSuggestion}
          />
          
          {/* Job Match Analysis Card */}
          <JobMatchCard 
            jobMatchScore={jobMatchScore}
            jobMatchResults={jobMatchResults}
            expandedSection={expandedSection}
            toggleSection={setExpandedSection}
            onAnalyze={analyzeJobMatch}
          />
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
