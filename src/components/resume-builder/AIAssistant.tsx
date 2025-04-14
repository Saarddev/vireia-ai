
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Wand2, BarChart3, FileText, Search, CheckCircle2, AlertCircle, ArrowRight, Briefcase, UserRound, BookOpen, Clock, Target } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface AIAssistantProps {
  resumeData: any;
  enabled: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ resumeData, enabled }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2500);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Wand2 className="mr-2 h-5 w-5 text-resume-purple" />
        AI Resume Review
      </h2>
      <p className="text-sm text-resume-gray mb-6">
        Get AI-powered feedback to improve your resume's effectiveness
      </p>
      
      {!enabled && (
        <Card className="p-6 text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 mx-auto">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-medium">AI Assistant is Disabled</h3>
          <p className="text-sm text-resume-gray">
            Enable the AI Assistant from the top menu to get smart suggestions and improvements for your resume.
          </p>
          <Button className="bg-resume-purple" disabled>
            <Wand2 className="mr-2 h-4 w-4" /> Enable AI Assistant
          </Button>
        </Card>
      )}
      
      {enabled && !analysisComplete && !isAnalyzing && (
        <Card className="p-6 text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mx-auto">
            <Wand2 className="h-6 w-6 text-resume-purple" />
          </div>
          <h3 className="text-lg font-medium">Ready to Optimize Your Resume</h3>
          <p className="text-sm text-resume-gray">
            Our AI can analyze your resume and provide personalized recommendations to make it more effective for your target jobs.
          </p>
          <Button className="bg-resume-purple" onClick={handleAnalyze}>
            <Wand2 className="mr-2 h-4 w-4" /> Analyze My Resume
          </Button>
        </Card>
      )}
      
      {enabled && isAnalyzing && (
        <Card className="p-6 text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mx-auto animate-pulse">
            <Wand2 className="h-6 w-6 text-resume-purple" />
          </div>
          <h3 className="text-lg font-medium">Analyzing Your Resume</h3>
          <p className="text-sm text-resume-gray">
            Our AI is reviewing your resume content and structure to provide personalized feedback...
          </p>
          <Progress value={65} className="h-2 w-3/4 mx-auto" />
          <div className="text-xs text-resume-gray flex flex-wrap justify-center gap-3">
            <span className="flex items-center">
              <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" /> Checking summary
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" /> Analyzing skills
            </span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-amber-500" /> Reviewing experience
            </span>
          </div>
        </Card>
      )}
      
      {enabled && analysisComplete && (
        <div className="space-y-6">
          <Card className="border-resume-purple">
            <div className="p-4 border-b bg-purple-50">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-resume-purple flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" /> Resume Optimization Score
                </h3>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  View Full Report
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="text-4xl font-bold text-resume-purple">76<span className="text-xl">/100</span></div>
                <div className="text-xs text-resume-gray">Above average</div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Content Quality</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>ATS Compatibility</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Keyword Optimization</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Impact Statements</span>
                    <span className="font-medium">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
              </div>
            </div>
          </Card>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Target className="mr-2 h-5 w-5 text-resume-purple" /> Key Recommendations
            </h3>
            
            <Card className="overflow-hidden">
              <div className="p-4 border-b bg-amber-50 flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Strengthen Impact Statements</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Your work experience descriptions could use more quantifiable achievements and metrics.
                  </p>
                </div>
              </div>
              <div className="p-4">
                <h5 className="text-sm font-medium mb-2">AI Suggestions:</h5>
                <div className="space-y-3">
                  <div className="rounded bg-gray-50 p-3 text-sm">
                    <p className="text-gray-500 mb-1">Current:</p>
                    <p>"Managed a team of 5 engineers and implemented CI/CD pipelines."</p>
                  </div>
                  <div className="rounded bg-green-50 p-3 text-sm">
                    <p className="text-green-600 mb-1">Improved:</p>
                    <p>"Led a team of 5 engineers and implemented CI/CD pipelines that reduced deployment time by 40% and increased release frequency from monthly to weekly."</p>
                  </div>
                  <Button className="w-full text-resume-purple bg-white border-resume-purple hover:bg-resume-purple hover:text-white">
                    Apply This Suggestion
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="p-4 border-b bg-amber-50 flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Improve Keyword Optimization</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    Your resume is missing key technical terms that are often searched by recruiters.
                  </p>
                </div>
              </div>
              <div className="p-4">
                <h5 className="text-sm font-medium mb-2">Recommended Keywords:</h5>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="bg-resume-purple/10 border-resume-purple/30 text-resume-purple">CI/CD</Badge>
                  <Badge variant="outline" className="bg-resume-purple/10 border-resume-purple/30 text-resume-purple">Agile Development</Badge>
                  <Badge variant="outline" className="bg-resume-purple/10 border-resume-purple/30 text-resume-purple">REST API Design</Badge>
                  <Badge variant="outline" className="bg-resume-purple/10 border-resume-purple/30 text-resume-purple">Team Leadership</Badge>
                  <Badge variant="outline" className="bg-resume-purple/10 border-resume-purple/30 text-resume-purple">Microservices</Badge>
                </div>
                <Button className="w-full text-resume-purple bg-white border-resume-purple hover:bg-resume-purple hover:text-white">
                  Add Keywords to Skills
                </Button>
              </div>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="p-4 border-b bg-green-50 flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Strong Professional Summary</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Your summary effectively highlights your key qualifications and career focus.
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">
                  Your summary is concise and provides a good overview of your experience and skills. It creates a strong first impression for recruiters.
                </p>
              </div>
            </Card>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-resume-purple" /> Job Match Analysis
            </h3>
            
            <Card>
              <div className="p-4">
                <p className="text-sm text-resume-gray mb-4">
                  Enter a job description to analyze how well your resume matches the requirements
                </p>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <textarea 
                    className="w-full min-h-[100px] pl-10 pr-4 py-2 border rounded-md text-sm"
                    placeholder="Paste job description here for targeted analysis..."
                  />
                </div>
                <Button className="w-full mt-4 bg-resume-purple">
                  <Search className="mr-2 h-4 w-4" /> Analyze Match
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Wand2 className="mr-2 h-5 w-5 text-resume-purple" /> AI Enhancement Actions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start h-auto py-3">
                <UserRound className="h-4 w-4 mr-2 text-resume-purple" />
                <div className="text-left">
                  <div className="font-medium">Enhance Summary</div>
                  <div className="text-xs text-resume-gray">Rewrite for more impact</div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-3">
                <Briefcase className="h-4 w-4 mr-2 text-resume-purple" />
                <div className="text-left">
                  <div className="font-medium">Improve Experience</div>
                  <div className="text-xs text-resume-gray">Add metrics and achievements</div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-3">
                <BookOpen className="h-4 w-4 mr-2 text-resume-purple" />
                <div className="text-left">
                  <div className="font-medium">Optimize Education</div>
                  <div className="text-xs text-resume-gray">Highlight relevant coursework</div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto py-3">
                <FileText className="h-4 w-4 mr-2 text-resume-purple" />
                <div className="text-left">
                  <div className="font-medium">Complete Rewrite</div>
                  <div className="text-xs text-resume-gray">Full resume optimization</div>
                </div>
              </Button>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <Button className="w-full bg-resume-purple py-6 text-lg">
            <Wand2 className="mr-2 h-5 w-5" /> Apply All AI Enhancements
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
