
import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Sparkles, Target, PieChart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from '@/components/AppSidebar';

const Analytics = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Welcome toast
    const timer = setTimeout(() => {
      toast({
        title: "Coming Soon!",
        description: "Advanced analytics dashboard is in development"
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950">
        <AppSidebar currentPage="analytics" />
        
        <SidebarInset>
          <div className="container max-w-7xl mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
            <Card className={`max-w-2xl w-full border border-blue-100 shadow-2xl backdrop-blur-sm bg-white/80 ${isLoaded ? 'animate-scale-up' : 'opacity-0'}`}>
              <CardContent className="p-12 text-center">
                {/* Animated Icon */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-float">
                    <BarChart3 className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="h-4 w-4 text-green-600" />
                  </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                      Coming Soon
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-700">
                      Analytics Dashboard
                    </h2>
                  </div>

                  <p className="text-lg text-resume-gray leading-relaxed">
                    Get ready for powerful insights into your resume performance, application success rates, 
                    and career progress with our advanced analytics platform.
                  </p>

                  {/* Features Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-700">Success Metrics</span>
                      </div>
                      <p className="text-sm text-resume-gray">Track application response rates and trends</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-gray-700">Goal Tracking</span>
                      </div>
                      <p className="text-sm text-resume-gray">Set and monitor your career objectives</p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="flex items-center gap-3 mb-2">
                        <PieChart className="h-5 w-5 text-purple-600" />
                        <span className="font-medium text-gray-700">Resume Performance</span>
                      </div>
                      <p className="text-sm text-resume-gray">Analyze which resumes get the best results</p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="flex items-center gap-3 mb-2">
                        <BarChart3 className="h-5 w-5 text-orange-600" />
                        <span className="font-medium text-gray-700">Industry Insights</span>
                      </div>
                      <p className="text-sm text-resume-gray">Compare your progress with industry standards</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/20 px-8"
                      onClick={() => toast({
                        title: "Thanks for your interest!",
                        description: "We'll notify you when analytics are ready"
                      })}
                    >
                      Get Early Access
                    </Button>
                  </div>

                  {/* Progress Indicator */}
                  <div className="pt-4">
                    <div className="flex items-center justify-center gap-2 text-sm text-resume-gray">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span>Building Amazing Analytics</span>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
