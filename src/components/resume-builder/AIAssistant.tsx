
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
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
  FileSpreadsheet
} from 'lucide-react';

interface AIAssistantProps {
  resumeData: any;
  enabled: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ resumeData, enabled }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [expandedSection, setExpandedSection] = useState<string | null>("score");
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  
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
  
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setProgress(0);
    setStage(0);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setAiSuggestions([
        { id: "s1", type: "improvement", section: "summary", text: "Your summary lacks quantifiable achievements. Consider adding metrics to showcase your impact." },
        { id: "s2", type: "improvement", section: "experience", text: "Add more action verbs to your job descriptions to make them more dynamic." },
        { id: "s3", type: "keyword", section: "skills", text: "Consider adding 'Python' to your technical skills to match current job market demands." },
        { id: "s4", type: "optimization", section: "general", text: "Your resume could benefit from a more consistent formatting throughout all sections." },
      ]);
    }, 3000);
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
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
        {enabled && !isAnalyzing && (
          <Button 
            onClick={handleAnalyze} 
            className="bg-resume-purple hover:bg-resume-purple/90 flex items-center gap-2 shadow-md hover:shadow-xl transition-all"
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
              <Progress value={progress} className="h-2" />
              
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
          {/* Resume Score Card */}
          <Card className="overflow-hidden border-resume-purple/20 shadow-lg hover:shadow-xl transition-all">
            <div 
              className="p-6 border-b border-resume-purple/10 flex justify-between items-center cursor-pointer bg-white dark:bg-gray-900"
              onClick={() => toggleSection("score")}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-resume-purple/10 flex items-center justify-center mr-4">
                  <BarChart3 className="h-5 w-5 text-resume-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Resume Score</h3>
                  <p className="text-sm text-muted-foreground">Industry benchmarked evaluation</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-right mr-4">
                  <div className="text-3xl font-bold text-resume-purple">76</div>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Above Average</Badge>
                </div>
                {expandedSection === "score" ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </div>
            
            {expandedSection === "score" && (
              <div className="p-6 space-y-6 bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[
                      { name: "Content Quality", score: 85, color: "bg-green-500" },
                      { name: "ATS Compatibility", score: 92, color: "bg-blue-500" },
                      { name: "Keyword Optimization", score: 68, color: "bg-amber-500" },
                      { name: "Impact Statements", score: 62, color: "bg-red-500" }
                    ].map((metric) => (
                      <div key={metric.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{metric.name}</span>
                          <span className="text-resume-gray">{metric.score}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${metric.color} transition-all duration-1000 ease-out`}
                            style={{ width: `${metric.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <h4 className="font-medium text-sm flex items-center mb-2">
                        <ThumbsUp className="h-4 w-4 mr-2 text-green-500" /> Strengths
                      </h4>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Strong professional experience with clear progression</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Good balance of technical and soft skills</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Clear education section with relevant details</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                      <h4 className="font-medium text-sm flex items-center mb-2">
                        <Target className="h-4 w-4 mr-2 text-amber-500" /> Areas for Improvement
                      </h4>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start">
                          <AlertCircle className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>Add more quantifiable achievements to showcase impact</span>
                        </li>
                        <li className="flex items-start">
                          <AlertCircle className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>Strengthen action verbs in experience descriptions</span>
                        </li>
                        <li className="flex items-start">
                          <AlertCircle className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>Include more industry-specific keywords</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
          
          {/* AI Suggestions */}
          <Card className="overflow-hidden border-resume-purple/20 shadow-lg hover:shadow-xl transition-all">
            <div 
              className="p-6 border-b border-resume-purple/10 flex justify-between items-center cursor-pointer bg-white dark:bg-gray-900"
              onClick={() => toggleSection("suggestions")}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-resume-purple/10 flex items-center justify-center mr-4">
                  <Sparkles className="h-5 w-5 text-resume-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AI Suggestions</h3>
                  <p className="text-sm text-muted-foreground">Smart recommendations to enhance your resume</p>
                </div>
              </div>
              <div>
                {expandedSection === "suggestions" ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </div>
            
            {expandedSection === "suggestions" && (
              <div className="p-6 space-y-4 bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm">
                {aiSuggestions.length > 0 ? (
                  <div className="space-y-3">
                    {aiSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 flex justify-between items-start">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center">
                            <Badge className="bg-resume-purple text-white mr-2">{suggestion.section}</Badge>
                            {suggestion.type === "improvement" && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">improvement</Badge>
                            )}
                            {suggestion.type === "keyword" && (
                              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">keyword</Badge>
                            )}
                            {suggestion.type === "optimization" && (
                              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">optimization</Badge>
                            )}
                          </div>
                          <p className="text-sm">{suggestion.text}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="outline" size="sm" className="h-8 px-2">
                            <Zap className="h-3.5 w-3.5 mr-1 text-resume-purple" /> Apply
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash className="h-3.5 w-3.5 text-gray-400" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full mt-2">
                      <Plus className="mr-2 h-4 w-4" /> Generate More Suggestions
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No suggestions yet. Click "Analyze Resume" to generate recommendations.</p>
                  </div>
                )}
              </div>
            )}
          </Card>
          
          {/* Job Match Analysis */}
          <Card className="overflow-hidden border-resume-purple/20 shadow-lg hover:shadow-xl transition-all">
            <div 
              className="p-6 border-b border-resume-purple/10 flex justify-between items-center cursor-pointer bg-white dark:bg-gray-900"
              onClick={() => toggleSection("jobmatch")}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-resume-purple/10 flex items-center justify-center mr-4">
                  <Target className="h-5 w-5 text-resume-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Job Match Analysis</h3>
                  <p className="text-sm text-muted-foreground">See how your resume matches specific job descriptions</p>
                </div>
              </div>
              <div>
                {expandedSection === "jobmatch" ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </div>
            
            {expandedSection === "jobmatch" && (
              <div className="p-6 space-y-4 bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm">
                <div className="text-sm mb-3">Paste a job description to see how well your resume matches the requirements:</div>
                
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Paste job description here..." 
                    className="min-h-[120px] resize-y border-gray-200 focus:border-resume-purple"
                  />
                  
                  <div className="flex gap-2">
                    <Button className="bg-resume-purple hover:bg-resume-purple-dark flex-1">
                      <Search className="mr-2 h-4 w-4" /> Analyze Match
                    </Button>
                    <Button variant="outline">
                      <UploadCloud className="mr-2 h-4 w-4" /> Upload Job PDF
                    </Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-dashed border-gray-200 dark:border-gray-700 text-center">
                    <div className="flex justify-center mb-2">
                      <BadgeCheck className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                    </div>
                    <h4 className="text-sm font-medium mb-1">Job Match Results</h4>
                    <p className="text-xs text-muted-foreground">Your job match analysis will appear here</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
          
          {/* Resume History */}
          <Card className="overflow-hidden border-resume-purple/20 shadow-lg hover:shadow-xl transition-all">
            <div 
              className="p-6 border-b border-resume-purple/10 flex justify-between items-center cursor-pointer bg-white dark:bg-gray-900"
              onClick={() => toggleSection("history")}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-resume-purple/10 flex items-center justify-center mr-4">
                  <Clock className="h-5 w-5 text-resume-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Resume History</h3>
                  <p className="text-sm text-muted-foreground">Track improvements over time</p>
                </div>
              </div>
              <div>
                {expandedSection === "history" ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </div>
            
            {expandedSection === "history" && (
              <div className="p-6 space-y-4 bg-gray-50/80 dark:bg-gray-800/20 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
                  <div className="text-sm font-medium">Score History</div>
                  <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">Last 30 days</Badge>
                </div>
                
                <div className="h-40 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm">Not enough data to display score history</p>
                    <p className="text-xs text-muted-foreground mt-1">Continue improving your resume to track progress</p>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-resume-purple" /> 
                    Resume Evolution
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs border-b border-gray-100 dark:border-gray-700 pb-2">
                      <div className="flex items-center">
                        <Badge variant="outline" className="h-5 mr-2 bg-gray-50 text-gray-600 border-gray-200">Today</Badge>
                        <span>Initial Analysis</span>
                      </div>
                      <Badge className="bg-resume-purple">76/100</Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
