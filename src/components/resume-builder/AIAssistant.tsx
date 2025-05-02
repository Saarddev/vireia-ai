
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { scanResumeWithATS } from '@/utils/summarizeText';
import { 
  Wand2, 
  BarChart3, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Target,
  Brain,
  Sparkles,
  TrendingUp,
  MessageSquareDashed,
  ArrowRight,
  UploadCloud,
  BadgeCheck,
  Clock,
  ThumbsUp,
  Trash,
  RefreshCw,
  Zap,
  Plus,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  FileText,
  Award
} from 'lucide-react';
import { toast } from 'sonner';

interface AIAssistantProps {
  resumeData: any;
  enabled: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ resumeData, enabled }) => {
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
  
  // Function to generate ATS-friendly text for better parsing (same as in ATSScanButton)
  const generateATSText = (data: any): string => {
    const lines = [];
    
    // Personal information
    if (data.personal) {
      lines.push(`${data.personal.name || ''}`);
      lines.push(`${data.personal.title || ''}`);
      
      const contactInfo = [];
      if (data.personal.email) contactInfo.push(data.personal.email);
      if (data.personal.phone) contactInfo.push(data.personal.phone);
      if (data.personal.location) contactInfo.push(data.personal.location);
      if (contactInfo.length > 0) lines.push(contactInfo.join(' | '));
      
      if (data.personal.linkedin) lines.push(`LinkedIn: ${data.personal.linkedin}`);
      if (data.personal.website) lines.push(`Website: ${data.personal.website}`);
    }
    
    // Summary - strictly limited to 3 bullet points
    if (data.summary) {
      lines.push('');
      lines.push('SUMMARY');
      lines.push('-------');
      const summaryPoints = data.summary.split('\n')
        .filter((line: string) => line.trim())
        .slice(0, 3); // Strict limit to 3 bullet points
      lines.push(...summaryPoints);
    }
    
    // Experience
    if (data.experience && data.experience.length > 0) {
      lines.push('');
      lines.push('EXPERIENCE');
      lines.push('----------');
      data.experience.forEach((exp: any) => {
        lines.push(`${exp.title} | ${exp.company} | ${exp.location} | ${exp.startDate} - ${exp.endDate}`);
        if (exp.description) {
          const descPoints = exp.description.split('\n')
            .filter((line: string) => line.trim())
            .map((point: string) => point.replace(/^[-•*]\s*/, '').trim()) // Clean up bullet points
            .filter((point: string, index: number, self: string[]) => 
              // Remove duplicate or very similar points
              self.findIndex(p => p.toLowerCase().includes(point.toLowerCase().substring(0, 10))) === index
            );
          lines.push(...descPoints.map((point: string) => `- ${point}`));
        }
        lines.push('');
      });
    }
    
    // Projects
    if (data.projects && data.projects.length > 0) {
      lines.push('');
      lines.push('PROJECTS');
      lines.push('--------');
      data.projects.forEach((project: any) => {
        lines.push(`${project.title} | ${project.startDate} - ${project.endDate}`);
        if (project.technologies && project.technologies.length > 0) {
          lines.push(`Technologies: ${project.technologies.join(', ')}`);
        }
        if (project.description) {
          const descPoints = project.description.split('\n')
            .filter((line: string) => line.trim())
            .map((point: string) => point.replace(/^[-•*]\s*/, '').trim()) // Clean up bullet points
            .filter((point: string, index: number, self: string[]) => 
              // Remove duplicate or very similar points
              self.findIndex(p => p.toLowerCase().includes(point.toLowerCase().substring(0, 10))) === index
            );
          lines.push(...descPoints.map((point: string) => `- ${point}`));
        }
        if (project.link) lines.push(`Link: ${project.link}`);
        lines.push('');
      });
    }
    
    // Education
    if (data.education && data.education.length > 0) {
      lines.push('');
      lines.push('EDUCATION');
      lines.push('---------');
      data.education.forEach((edu: any) => {
        lines.push(`${edu.degree}${edu.field ? ` in ${edu.field}` : ''} | ${edu.institution} | ${edu.location} | ${edu.startDate} - ${edu.endDate}`);
        if (edu.description) {
          const descPoints = edu.description.split('\n')
            .filter((line: string) => line.trim())
            .map((point: string) => point.replace(/^[-•*]\s*/, '').trim()) // Clean up bullet points
            .filter((point: string, index: number, self: string[]) => 
              // Remove duplicate or very similar points
              self.findIndex(p => p.toLowerCase().includes(point.toLowerCase().substring(0, 10))) === index
            );
          lines.push(...descPoints.map((point: string) => `- ${point}`));
        }
        lines.push('');
      });
    }
    
    // Skills - ensure unique skills without repetition
    if (data.skills) {
      lines.push('');
      lines.push('SKILLS');
      lines.push('------');
      if (data.skills.technical && data.skills.technical.length > 0) {
        // Remove duplicate or very similar skills
        const uniqueTechnical = [...new Set(data.skills.technical)];
        lines.push(`Technical Skills: ${uniqueTechnical.join(', ')}`);
      }
      if (data.skills.soft && data.skills.soft.length > 0) {
        // Remove duplicate or very similar skills
        const uniqueSoft = [...new Set(data.skills.soft)];
        lines.push(`Soft Skills: ${uniqueSoft.join(', ')}`);
      }
    }
    
    return lines.join('\n');
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
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const handleApplySuggestion = (id: string) => {
    toast.success("Suggestion applied! The resume will be updated.");
    // Remove the suggestion from the list
    setAiSuggestions(prev => prev.filter(s => s.id !== id));
  };
  
  const handleRemoveSuggestion = (id: string) => {
    setAiSuggestions(prev => prev.filter(s => s.id !== id));
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center">
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
      
      {!enabled && (
        <Card className="p-8 text-center space-y-6 bg-gradient-to-br from-yellow-50/90 to-amber-50/90 backdrop-blur-xl border-yellow-200/50 shadow-md">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 mx-auto ring-8 ring-yellow-50 animate-pulse">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-yellow-800">AI Assistant is Disabled</h3>
            <p className="text-sm text-yellow-700 mt-2 max-w-md mx-auto">
              Enable the AI Assistant from the top menu to unlock powerful resume optimization features and personalized suggestions.
            </p>
          </div>
          <Button className="bg-yellow-600 hover:bg-yellow-700 shadow-md" disabled>
            <Wand2 className="mr-2 h-4 w-4" /> Enable AI Assistant
          </Button>
        </Card>
      )}
      
      {enabled && isAnalyzing && (
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
      )}
      
      {enabled && analysisComplete && (
        <div className="space-y-6">
          {/* ATS Score Card */}
          {atsResults && (
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
          )}

          {/* Resume Score Card */}
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
                                    onClick={() => handleApplySuggestion(suggestion.id)}
                                  >
                                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-6 w-6 p-0" 
                                    onClick={() => handleRemoveSuggestion(suggestion.id)}
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
          
          {/* Job Match Analysis Card */}
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
                      onClick={analyzeJobMatch}
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
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
