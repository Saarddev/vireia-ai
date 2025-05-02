
import { useState, useEffect } from 'react';
import { scanResumeWithATS } from '@/utils/summarizeText';
import { toast } from 'sonner';
import { generateATSText } from '@/utils/resume-analysis-utils';

export function useResumeAnalysis(resumeData: any) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("score");
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [atsResults, setAtsResults] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [jobMatchResults, setJobMatchResults] = useState<any>(null);
  const [jobMatchScore, setJobMatchScore] = useState<number | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [scoreHistory, setScoreHistory] = useState<any[]>([]);
  
  // Animation for progress
  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
        
        // Update stages for animation
        if (progress > 30 && stage === 0) {
          setStage(1);
        } else if (progress > 60 && stage === 1) {
          setStage(2);
        } else if (progress > 90 && stage === 2) {
          setStage(3);
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isAnalyzing, progress, stage]);
  
  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    setStage(0);
    
    try {
      // Create ATS-friendly text for better scanning
      const plainTextResume = generateATSText(resumeData);
      
      // Pass the ATS-friendly text to the scanner
      const results = await scanResumeWithATS({
        ...resumeData,
        plainTextVersion: plainTextResume
      });
      
      if (results) {
        setAtsResults(results);
        
        // Also generate AI suggestions based on the ATS results
        generateAISuggestions(results);
        
        // Add to score history
        const newHistoryEntry = {
          date: new Date().toISOString(),
          score: results.score,
          event: 'Resume Analysis'
        };
        setScoreHistory(prev => [newHistoryEntry, ...prev]);
      }
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast.error("Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }
  };
  
  // Generate AI suggestions based on ATS results
  const generateAISuggestions = (results: any) => {
    const suggestions = [];
    
    // Add suggestions based on improvements
    if (results.improvements && results.improvements.length > 0) {
      results.improvements.forEach((improvement: string, index: number) => {
        // Determine which section this improvement likely applies to
        let section = "general";
        if (improvement.toLowerCase().includes("summary")) section = "summary";
        else if (improvement.toLowerCase().includes("experience")) section = "experience";
        else if (improvement.toLowerCase().includes("skill")) section = "skills";
        else if (improvement.toLowerCase().includes("education")) section = "education";
        else if (improvement.toLowerCase().includes("project")) section = "projects";
        
        suggestions.push({
          id: `imp-${index}`,
          type: "improvement",
          section,
          text: improvement
        });
      });
    }
    
    // Add suggestions based on missing keywords
    if (results.keywords && results.keywords.length > 0) {
      const topKeywords = results.keywords.slice(0, 5);
      suggestions.push({
        id: "keyword-1",
        type: "keyword",
        section: "skills",
        text: `Consider adding these top keywords to strengthen your resume: ${topKeywords.join(", ")}`
      });
    }
    
    // Add suggestions based on score metrics
    if (results.metrics && results.metrics.length > 0) {
      const lowestMetric = [...results.metrics].sort((a, b) => a.score - b.score)[0];
      
      if (lowestMetric && lowestMetric.score < 70) {
        let suggestion = "";
        if (lowestMetric.name === "Impact Statements") {
          suggestion = "Add more quantifiable achievements with metrics to strengthen impact statements.";
        } else if (lowestMetric.name === "Content Quality") {
          suggestion = "Enhance your experience descriptions with more detailed and relevant content.";
        } else if (lowestMetric.name === "Keyword Optimization") {
          suggestion = "Add more industry-specific keywords throughout your resume.";
        } else if (lowestMetric.name === "ATS Compatibility") {
          suggestion = "Improve formatting for better ATS compatibility. Avoid tables, graphics or unusual formatting.";
        }
        
        if (suggestion) {
          suggestions.push({
            id: `metric-${lowestMetric.name}`,
            type: "optimization",
            section: "general",
            text: suggestion
          });
        }
      }
    }
    
    // Limit to 5 suggestions maximum
    setAiSuggestions(suggestions.slice(0, 5));
  };
  
  const analyzeJobMatch = async () => {
    if (!jobDescription || jobDescription.trim() === '') {
      toast.error("Please enter a job description first");
      return;
    }
    
    toast.loading("Analyzing job match...");
    
    try {
      // First get the ATS results if not already available
      let atsData = atsResults;
      if (!atsData) {
        const plainTextResume = generateATSText(resumeData);
        atsData = await scanResumeWithATS({
          ...resumeData,
          plainTextVersion: plainTextResume
        });
      }
      
      // Calculate match score based on keyword presence
      const resumeText = atsData.plainTextVersion || JSON.stringify(resumeData);
      
      // Extract key requirements from job description
      const requirements = extractRequirements(jobDescription);
      
      // Check how many requirements match the resume
      let matchCount = 0;
      const matchDetails = requirements.map(req => {
        const isMatch = resumeText.toLowerCase().includes(req.toLowerCase());
        if (isMatch) matchCount++;
        return { requirement: req, matched: isMatch };
      });
      
      const matchPercentage = requirements.length > 0 ? 
        Math.round((matchCount / requirements.length) * 100) : 0;
      
      // Generate recommendations
      const missingRequirements = matchDetails
        .filter(item => !item.matched)
        .map(item => item.requirement);
      
      // Set job match results
      setJobMatchResults({
        score: matchPercentage,
        matches: matchCount,
        total: requirements.length,
        matched: matchDetails.filter(item => item.matched).map(item => item.requirement),
        missing: missingRequirements,
        recommendations: generateRecommendations(missingRequirements)
      });
      
      setJobMatchScore(matchPercentage);
      setExpandedSection("jobmatch");
      toast.dismiss();
      toast.success("Job match analysis complete!");
      
    } catch (error) {
      console.error("Error analyzing job match:", error);
      toast.dismiss();
      toast.error("Failed to analyze job match");
    }
  };
  
  const extractRequirements = (jobDesc: string): string[] => {
    // Split by common requirement indicators
    const lines = jobDesc
      .split(/\n|•|-|\*|\\|\/|●/)
      .map(line => line.trim())
      .filter(line => line.length > 10); // Filter out short lines
      
    // Identify likely requirements (skills, experiences, education)
    const requirements = lines.filter(line => 
      line.match(/experience|skill|knowledge|proficien|expert|understand|familiar|degree|education|ability/i) 
      && !line.match(/we offer|benefit|opportunit|what you'll get|package/i)
    );
    
    // If we couldn't identify specific requirements, fall back to extracting keywords
    if (requirements.length < 3) {
      const keywordMatches = jobDesc.match(/\b([A-Z][A-Za-z]*|[A-Za-z]{2,}[+#])\b/g) || [];
      const keywords = [...new Set(keywordMatches)]
        .filter(word => word.length > 2) 
        .filter(word => !word.match(/^(The|And|For|With|This|That|Have|From|Will|More|Your|You|Our|Their|About|Which)$/i));
      
      return keywords.slice(0, 10); // Limit to 10 keywords
    }
    
    // Clean up the requirements
    return requirements
      .map(req => req.replace(/^(.*?):/, '').trim()) // Remove prefixes like "Requirements:"
      .filter(req => req.length > 0)
      .slice(0, 15); // Limit to 15 requirements
  };
  
  const generateRecommendations = (missingReqs: string[]): string[] => {
    if (missingReqs.length === 0) return ["Your resume already addresses all key requirements!"];
    
    const recs = [];
    
    if (missingReqs.length > 3) {
      recs.push(`Consider adding these key missing skills: ${missingReqs.slice(0, 3).join(", ")}`);
    } else {
      missingReqs.forEach(req => {
        recs.push(`Add details about your experience with ${req}`);
      });
    }
    
    if (missingReqs.length > 3) {
      recs.push("Customize your summary to better align with the job requirements");
    }
    
    if (recs.length < 2) {
      recs.push("Highlight relevant projects that demonstrate your capabilities in the required areas");
    }
    
    return recs;
  };
  
  const handleApplySuggestion = (id: string) => {
    toast.success("Suggestion applied! The resume will be updated.");
    // Remove the suggestion from the list
    setAiSuggestions(prev => prev.filter(s => s.id !== id));
  };
  
  const handleRemoveSuggestion = (id: string) => {
    setAiSuggestions(prev => prev.filter(s => s.id !== id));
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return {
    isAnalyzing,
    analysisComplete,
    progress,
    stage,
    atsResults,
    expandedSection,
    setExpandedSection,
    jobDescription,
    setJobDescription,
    jobMatchResults,
    jobMatchScore,
    aiSuggestions,
    scoreHistory,
    handleAnalyze,
    handleApplySuggestion,
    handleRemoveSuggestion,
    analyzeJobMatch,
    toggleSection
  };
}
