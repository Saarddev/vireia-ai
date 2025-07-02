
import React, { useState, useEffect } from 'react';
import { Briefcase, Clock, Sparkles, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from '@/components/AppSidebar';

const Applications = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Welcome toast
    const timer = setTimeout(() => {
      toast({
        title: "Coming Soon!",
        description: "Application tracking feature is in development"
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-950 dark:to-purple-950">
        <AppSidebar currentPage="applications" />
        
        <SidebarInset>
          <div className="container max-w-7xl mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
            <Card className={`max-w-2xl w-full border border-purple-100 shadow-2xl backdrop-blur-sm bg-white/80 ${isLoaded ? 'animate-scale-up' : 'opacity-0'}`}>
              <CardContent className="p-12 text-center">
                {/* Animated Icon */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-resume-purple to-resume-violet rounded-full flex items-center justify-center animate-float">
                    <Briefcase className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent mb-2">
                      Coming Soon
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-700">
                      Application Tracker
                    </h2>
                  </div>

                  <p className="text-lg text-resume-gray leading-relaxed">
                    We're building an amazing application tracking system to help you manage your job applications, 
                    track interview progress, and analyze your success rates.
                  </p>

                  {/* Features Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="h-5 w-5 text-resume-purple" />
                        <span className="font-medium text-gray-700">Status Tracking</span>
                      </div>
                      <p className="text-sm text-resume-gray">Track application status from applied to hired</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-700">Interview Scheduler</span>
                      </div>
                      <p className="text-sm text-resume-gray">Manage interview dates and reminders</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-resume-purple to-resume-violet hover:from-resume-purple-dark hover:to-purple-700 shadow-lg shadow-resume-purple/20 px-8"
                      onClick={() => toast({
                        title: "Thanks for your interest!",
                        description: "We'll notify you when this feature is ready"
                      })}
                    >
                      Notify Me When Ready
                    </Button>
                  </div>

                  {/* Progress Indicator */}
                  <div className="pt-4">
                    <div className="flex items-center justify-center gap-2 text-sm text-resume-gray">
                      <div className="w-2 h-2 bg-resume-purple rounded-full animate-pulse"></div>
                      <span>In Development</span>
                      <div className="w-2 h-2 bg-resume-purple rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
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

export default Applications;
