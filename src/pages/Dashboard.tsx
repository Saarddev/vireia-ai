
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ChevronUp, Users, BarChart3, Clock, Briefcase, PlusCircle, Home, Cog, User, BookOpen, Layers, Star, LogOut } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import OnboardingFlow from '@/components/OnboardingFlow';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarInset,
} from "@/components/ui/sidebar";

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if this is the first time user is visiting the dashboard
    const hasVisitedBefore = localStorage.getItem('dashboardVisited');
    
    if (!hasVisitedBefore) {
      setShowOnboarding(true);
      setFirstVisit(true);
    } else {
      setFirstVisit(false);
    }
    
    setIsLoaded(true);
    
    // Add a small delay before showing any toast notifications for better UX
    const timer = setTimeout(() => {
      if (!hasVisitedBefore) {
        toast({
          title: "Welcome to your ResumeAI dashboard!",
          description: "We'll guide you through creating your first resume."
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Continue building your career journey with ResumeAI."
        });
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  // Mock data for the dashboard
  const stats = [
    { id: 1, title: "Resumes Created", value: "12", icon: FileText, change: "+3", changeType: "increase" },
    { id: 2, title: "Interview Invites", value: "8", icon: Users, change: "+5", changeType: "increase" },
    { id: 3, title: "Application Tracking", value: "24", icon: BarChart3, change: "-2", changeType: "decrease" },
    { id: 4, title: "Time Saved", value: "18h", icon: Clock, change: "+4h", changeType: "increase" },
  ];

  const recentActivity = [
    { id: 1, type: "Resume", title: "Software Engineer Resume", date: "Today, 10:30 AM" },
    { id: 2, type: "Application", title: "Google - Front-end Developer", date: "Yesterday, 3:45 PM" },
    { id: 3, type: "Resume", title: "Product Manager Resume", date: "Apr 10, 2:15 PM" },
  ];

  const completeOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('dashboardVisited', 'true');
    toast({
      title: "Onboarding completed!",
      description: "You're all set to create amazing resumes."
    });
  };

  return (
    <>
      {showOnboarding && (
        <OnboardingFlow onComplete={completeOnboarding} />
      )}
      
      {!showOnboarding && (
        <SidebarProvider defaultOpen={true}>
          <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-950 dark:to-purple-950">
            <Sidebar>
              <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="bg-resume-purple rounded-lg p-1.5">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-xl bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">ResumeAI</span>
                </div>
              </SidebarHeader>
              
              <SidebarContent className="px-2">
                <SidebarGroup>
                  <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Home" isActive={true}>
                          <Home className="h-5 w-5" />
                          <span>Home</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="My Resumes">
                          <FileText className="h-5 w-5" />
                          <span>My Resumes</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Applications">
                          <Briefcase className="h-5 w-5" />
                          <span>Applications</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Analytics">
                          <BarChart3 className="h-5 w-5" />
                          <span>Analytics</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                
                <SidebarSeparator />
                
                <SidebarGroup>
                  <SidebarGroupLabel>Resources</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Learn">
                          <BookOpen className="h-5 w-5" />
                          <span>Learning Center</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Templates">
                          <Layers className="h-5 w-5" />
                          <span>Templates</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              
              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">
                      <Cog className="h-5 w-5" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Account">
                      <User className="h-5 w-5" />
                      <span>Account</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Log Out">
                      <LogOut className="h-5 w-5" />
                      <span>Log Out</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </Sidebar>
            
            <SidebarInset>
              <div className="container max-w-7xl mx-auto px-4 py-8">
                {/* Dashboard Header */}
                <div className={`flex items-center justify-between mb-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">
                      Dashboard
                    </h1>
                    <p className="text-resume-gray mt-1">Welcome back! Here's your resume progress</p>
                  </div>
                  <div>
                    <Button className="bg-resume-purple hover:bg-resume-purple-dark shadow-lg shadow-resume-purple/20">
                      Create Resume
                    </Button>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <Card 
                      key={stat.id} 
                      className={`border border-purple-100 hover:border-purple-200 shadow-sm hover:shadow transition-all duration-300 backdrop-blur-sm bg-white/80 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-resume-gray">{stat.title}</CardTitle>
                        <stat.icon className="h-5 w-5 text-resume-purple" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className={`text-xs flex items-center mt-1 ${
                          stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          <ChevronUp className={`h-4 w-4 ${
                            stat.changeType === 'decrease' && 'rotate-180'
                          }`} />
                          <span>{stat.change} this week</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Activity & Resume List */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card 
                    className={`lg:col-span-1 border border-purple-100 hover:border-purple-200 shadow-sm hover:shadow transition-all duration-300 backdrop-blur-sm bg-white/80 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: '400ms' }}
                  >
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest resume updates and applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map(activity => (
                          <div key={activity.id} className="flex items-start border-b border-gray-100 pb-3 last:border-0">
                            <div className={`rounded-full p-2 mr-3 ${
                              activity.type === 'Resume' ? 'bg-purple-100' : 'bg-blue-100'
                            }`}>
                              {activity.type === 'Resume' ? (
                                <FileText className="h-4 w-4 text-resume-purple" />
                              ) : (
                                <Briefcase className="h-4 w-4 text-blue-500" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{activity.title}</div>
                              <div className="text-xs text-resume-gray">{activity.date}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full hover:bg-resume-purple/10 text-resume-gray hover:text-resume-purple">
                        View All Activity
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card 
                    className={`lg:col-span-2 border border-purple-100 hover:border-purple-200 shadow-sm hover:shadow transition-all duration-300 backdrop-blur-sm bg-white/80 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: '500ms' }}
                  >
                    <CardHeader>
                      <CardTitle>Your Resumes</CardTitle>
                      <CardDescription>Manage and update your resume collection</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[1, 2, 3, 4].map(id => (
                            <div 
                              key={id}
                              className="group relative p-4 rounded-lg border border-purple-100 hover:border-resume-purple bg-white transition-all duration-300 hover:shadow-md cursor-pointer"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium group-hover:text-resume-purple transition-colors">Software Engineer Resume</h3>
                                  <p className="text-xs text-resume-gray mt-1">Last edited: Apr {id + 8}, 2025</p>
                                </div>
                                <div className="rounded-full p-2 bg-purple-50 group-hover:bg-resume-purple/20 transition-colors">
                                  <FileText className="h-4 w-4 text-resume-purple" />
                                </div>
                              </div>
                              <div className="mt-3">
                                <span className="inline-block text-xs bg-purple-50 text-resume-purple rounded-full px-2 py-1">ATS-Optimized</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="ghost" className="hover:bg-resume-purple/10 text-resume-gray hover:text-resume-purple">
                        View All Resumes
                      </Button>
                      <Button className="bg-resume-purple hover:bg-resume-purple-dark shadow-lg shadow-resume-purple/20">
                        Create New Resume
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      )}
    </>
  );
};

export default Dashboard;
