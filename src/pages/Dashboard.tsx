
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ChevronUp, Users, BarChart3, Clock, Briefcase, Home, Cog, User, BookOpen, Layers, LogOut, Plus, Sparkles, Heart, Star, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import OnboardingFlow from '@/components/OnboardingFlow';
import { supabase } from '@/integrations/supabase/client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarInset,
} from "@/components/ui/sidebar";
import CreateResumeDialog from '@/components/CreateResumeDialog';

interface Resume {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  template: string;
}

interface JobApplication {
  id: string;
  company_name: string;
  position: string;
  status: string;
  applied_date: string;
}

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Fetch user's resumes
          const { data: resumesData, error: resumesError } = await supabase
            .from('resumes')
            .select('id, title, created_at, updated_at, template')
            .eq('user_id', session.user.id)
            .order('updated_at', { ascending: false });

          if (resumesError) {
            console.error('Error fetching resumes:', resumesError);
          } else {
            setResumes(resumesData || []);
          }

          // Fetch user's job applications
          const { data: applicationsData, error: applicationsError } = await supabase
            .from('job_applications')
            .select('id, company_name, position, status, applied_date')
            .eq('user_id', session.user.id)
            .order('applied_date', { ascending: false })
            .limit(5);

          if (applicationsError) {
            console.error('Error fetching applications:', applicationsError);
          } else {
            setApplications(applicationsData || []);
          }
        }
      } catch (error) {
        console.error('Error initializing dashboard:', error);
      } finally {
        setLoadingData(false);
      }
    };

    // Check if this is the first time user is visiting the dashboard
    const hasVisitedBefore = localStorage.getItem('dashboardVisited');
    
    if (!hasVisitedBefore) {
      setShowOnboarding(true);
      setFirstVisit(true);
    } else {
      setFirstVisit(false);
    }
    
    setIsLoaded(true);
    initializeDashboard();
    
    // Add a small delay before showing any toast notifications for better UX
    const timer = setTimeout(() => {
      if (!hasVisitedBefore) {
        toast({
          title: "Welcome to your Vireia dashboard! ✨",
          description: "Let's create something amazing together!"
        });
      } else {
        toast({
          title: "Welcome back! 🎉",
          description: "Ready to boost your career today?"
        });
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  const calculateStats = () => {
    const interviewInvites = applications.filter(app => 
      app.status === 'interview_scheduled' || app.status === 'interview_completed'
    ).length;
    
    const totalApplications = applications.length;
    
    return {
      resumesCreated: resumes.length,
      interviewInvites,
      totalApplications,
      timeSaved: Math.max(resumes.length * 2, 1) // Assume 2 hours saved per resume
    };
  };

  const stats = calculateStats();

  const completeOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('dashboardVisited', 'true');
    toast({
      title: "You're all set! 🚀",
      description: "Time to create your first amazing resume!"
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const EmptyStateCard = ({ title, description, icon: Icon, action }: any) => (
    <Card className="border-2 border-dashed border-gray-200 bg-white hover:bg-gray-50/50 transition-all duration-300 group">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-8 w-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        {action}
      </CardContent>
    </Card>
  );

  return (
    <>
      {showOnboarding && (
        <OnboardingFlow onComplete={completeOnboarding} />
      )}
      
      {!showOnboarding && (
        <SidebarProvider defaultOpen={true}>
          <div className="min-h-screen flex w-full bg-gray-50">
            <Sidebar>
              <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-2">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-1.5">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Vireia AI</span>
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
                        <SidebarMenuButton tooltip="My Resumes" asChild>
                          <Link to="/resume">
                            <FileText className="h-5 w-5" />
                            <span>My Resumes</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Applications" asChild>
                          <Link to="/applications">
                            <Briefcase className="h-5 w-5" />
                            <span>Applications</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Analytics" asChild>
                          <Link to="/analytics">
                            <BarChart3 className="h-5 w-5" />
                            <span>Analytics</span>
                          </Link>
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
                        <SidebarMenuButton tooltip="Templates" asChild>
                          <Link to="/templates">
                            <Layers className="h-5 w-5" />
                            <span>Templates</span>
                          </Link>
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Dashboard</h1>
                    <p className="text-gray-600 mt-2 text-lg">
                      {resumes.length > 0 
                        ? `Welcome back! You have ${resumes.length} resume${resumes.length > 1 ? 's' : ''} ready to go! 🚀`
                        : "Ready to create something amazing? Let's build your first resume! ✨"
                      }
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setShowCreateDialog(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Resume
                    </Button>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className={`border-0 shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-xl transition-all duration-300 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-purple-100">Resumes Created</CardTitle>
                      <FileText className="h-5 w-5 text-purple-200" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{stats.resumesCreated}</div>
                      <div className="text-xs text-purple-200 mt-1 flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" />
                        <span>Ready to impress!</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`border-0 shadow-lg bg-white text-gray-800 hover:shadow-xl transition-all duration-300 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Interview Invites</CardTitle>
                      <Users className="h-5 w-5 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{stats.interviewInvites}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        <span>Companies love you!</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`border-0 shadow-lg bg-white text-gray-800 hover:shadow-xl transition-all duration-300 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Applications</CardTitle>
                      <BarChart3 className="h-5 w-5 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{stats.totalApplications}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center">
                        <Zap className="h-3 w-3 mr-1" />
                        <span>Keep applying!</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`border-0 shadow-lg bg-white text-gray-800 hover:shadow-xl transition-all duration-300 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">Time Saved</CardTitle>
                      <Clock className="h-5 w-5 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{stats.timeSaved}h</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        <span>Efficiency master!</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Activity */}
                  <Card className={`lg:col-span-1 border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
                    <CardHeader>
                      <CardTitle className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Recent Activity</CardTitle>
                      <CardDescription>Your latest updates and milestones</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {applications.length > 0 ? (
                        <div className="space-y-4">
                          {applications.slice(0, 3).map(app => (
                            <div key={app.id} className="flex items-start border-b border-gray-100 pb-3 last:border-0">
                              <div className="rounded-full p-2 mr-3 bg-gradient-to-r from-purple-100 to-indigo-100">
                                <Briefcase className="h-4 w-4 text-purple-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">{app.position}</div>
                                <div className="text-sm text-gray-600">{app.company_name}</div>
                                <div className="text-xs text-gray-500">{formatDate(app.applied_date)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="h-8 w-8 text-gray-400" />
                          </div>
                          <p className="text-gray-600 mb-2">No applications yet!</p>
                          <p className="text-sm text-gray-500">Start applying to see your activity here</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full hover:bg-purple-50 text-purple-600 hover:text-purple-700">
                        View All Activity
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Resumes Section */}
                  <Card className={`lg:col-span-2 border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '500ms' }}>
                    <CardHeader>
                      <CardTitle className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Your Resumes</CardTitle>
                      <CardDescription>
                        {resumes.length > 0 
                          ? `${resumes.length} resume${resumes.length > 1 ? 's' : ''} ready to land your dream job!`
                          : "Ready to create your first masterpiece?"
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {resumes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {resumes.slice(0, 4).map((resume) => (
                            <div 
                              key={resume.id}
                              className="group relative p-4 rounded-lg border border-gray-200 hover:border-purple-300 bg-white hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-indigo-50/30 transition-all duration-300 hover:shadow-md cursor-pointer"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium group-hover:text-purple-600 transition-colors">{resume.title}</h3>
                                  <p className="text-xs text-gray-500 mt-1">Last edited: {formatDate(resume.updated_at)}</p>
                                </div>
                                <div className="rounded-full p-2 bg-gradient-to-r from-purple-100 to-indigo-100 group-hover:from-purple-200 group-hover:to-indigo-200 transition-colors">
                                  <FileText className="h-4 w-4 text-purple-600" />
                                </div>
                              </div>
                              <div className="mt-3">
                                <span className="inline-block text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full px-2 py-1 capitalize">
                                  {resume.template}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <EmptyStateCard
                          title="No resumes yet? Let's fix that! 🎨"
                          description="Create your first resume in just a few clicks. Our AI will help you craft something amazing!"
                          icon={FileText}
                          action={
                            <Button 
                              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                              onClick={() => setShowCreateDialog(true)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Create My First Resume
                            </Button>
                          }
                        />
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link to="/resume">
                        <Button variant="ghost" className="hover:bg-purple-50 text-purple-600 hover:text-purple-700">
                          View All Resumes
                        </Button>
                      </Link>
                      <Button 
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
                        onClick={() => setShowCreateDialog(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Resume
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </SidebarInset>
          </div>
          
          {/* Create Resume Dialog */}
          <CreateResumeDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
        </SidebarProvider>
      )}
    </>
  );
};

export default Dashboard;
