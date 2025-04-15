import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  MessageSquareDashed
} from 'lucide-react';

interface AIAssistantProps {
  resumeData: any;
  enabled: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ resumeData, enabled }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2500);
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center">
            <Brain className="mr-3 h-6 w-6 text-resume-purple animate-pulse" />
            AI Resume Review
          </h2>
          <p className="text-sm text-resume-gray mt-2">
            Get AI-powered insights to enhance your resume
          </p>
        </div>
        {enabled && !isAnalyzing && (
          <Button 
            onClick={handleAnalyze} 
            className="bg-resume-purple hover:bg-resume-purple/90 shadow-lg hover:shadow-xl transition-all"
          >
            <Sparkles className="mr-2 h-4 w-4" /> 
            {analysisComplete ? "Analyze Again" : "Analyze Resume"}
          </Button>
        )}
      </div>
      
      {!enabled && (
        <Card className="p-8 text-center space-y-6 bg-gradient-to-br from-yellow-50/80 to-amber-50/80 backdrop-blur-xl border-yellow-200/50">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 mx-auto ring-8 ring-yellow-50">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-yellow-800">AI Assistant is Disabled</h3>
            <p className="text-sm text-yellow-700 mt-2 max-w-md mx-auto">
              Enable the AI Assistant from the top menu to unlock powerful resume optimization features and personalized suggestions.
            </p>
          </div>
          <Button className="bg-yellow-600 hover:bg-yellow-700" disabled>
            <Wand2 className="mr-2 h-4 w-4" /> Enable AI Assistant
          </Button>
        </Card>
      )}
      
      {enabled && isAnalyzing && (
        <Card className="p-8 text-center space-y-6 bg-gradient-to-br from-purple-50/80 to-blue-50/80 backdrop-blur-xl border-resume-purple/20">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-resume-purple/10 mx-auto animate-pulse">
            <Sparkles className="h-8 w-8 text-resume-purple animate-bounce" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-resume-purple">Analyzing Your Resume</h3>
            <p className="text-sm text-resume-gray mt-2">
              Our AI is reviewing your resume to provide comprehensive feedback...
            </p>
          </div>
          <div className="max-w-md mx-auto space-y-4">
            <Progress value={65} className="h-2" />
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center justify-center space-x-1 text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span>Content Analysis</span>
              </div>
              <div className="flex items-center justify-center space-x-1 text-amber-600">
                <TrendingUp className="h-4 w-4" />
                <span>Optimization Check</span>
              </div>
            </div>
          </div>
        </Card>
      )}
      
      {enabled && analysisComplete && (
        <div className="space-y-8">
          <Card className="overflow-hidden border-resume-purple/20 hover:border-resume-purple/40 transition-colors">
            <div className="p-8 bg-gradient-to-r from-resume-purple/5 to-purple-50/80 backdrop-blur-xl border-b">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-resume-purple flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" /> Resume Score
                  </h3>
                  <p className="text-sm text-resume-gray">Based on industry standards and best practices</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-resume-purple">76<span className="text-2xl">/100</span></div>
                  <Badge variant="outline" className="mt-2 bg-green-50 text-green-600 border-green-200">Above Average</Badge>
                </div>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
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
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${metric.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-xl border-amber-200/50 hover:border-amber-300/50 transition-colors">
              <div className="p-8">
                <div className="flex items-center space-x-2 text-amber-800">
                  <Target className="h-5 w-5" />
                  <h3 className="font-semibold">Top Suggestions</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    "Add more quantifiable achievements",
                    "Include relevant keywords",
                    "Strengthen action verbs"
                  ].map((suggestion, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <div className="h-5 w-5 mt-0.5 flex-shrink-0">
                        <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                          {i + 1}
                        </Badge>
                      </div>
                      <span className="text-sm text-amber-800">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-xl border-blue-200/50 hover:border-blue-300/50 transition-colors">
              <div className="p-8">
                <div className="flex items-center space-x-2 text-blue-800">
                  <MessageSquareDashed className="h-5 w-5" />
                  <h3 className="font-semibold">AI Feedback</h3>
                </div>
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-blue-800">
                    Your resume shows strong professional experience, but could benefit from more specific achievements and metrics. Consider adding data points to showcase your impact.
                  </p>
                  <Button size="sm" variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-100">
                    <Wand2 className="mr-2 h-4 w-4" /> Get Detailed Analysis
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-xl border-green-200/50 hover:border-green-300/50 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Search className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-800">Job Match Analysis</h3>
                <p className="text-sm text-green-700 mt-1">
                  Paste a job description to see how well your resume matches the requirements
                </p>
                <div className="mt-4">
                  <textarea 
                    className="w-full min-h-[100px] p-3 text-sm rounded-lg border border-green-200 bg-white/50 placeholder:text-green-600/50"
                    placeholder="Paste job description here..."
                  />
                  <Button className="w-full mt-3 bg-green-600 hover:bg-green-700">
                    <Search className="mr-2 h-4 w-4" /> Analyze Match
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
