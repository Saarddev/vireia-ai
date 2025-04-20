
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Search } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
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
import { Briefcase, Home, Cog, User, BookOpen, Layers, BarChart3, LogOut, Filter } from 'lucide-react';
import CreateResumeDialog from '@/components/CreateResumeDialog';
import ResumeCard from '@/components/resume-listing/ResumeCard';

const Resume = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [userData, setUserData] = useState<{ firstName?: string, email?: string } | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: { user } } = await supabase.auth.getUser();
          const firstName = user?.user_metadata?.first_name || user?.user_metadata?.name || '';
          const email = user?.email || '';
          setUserData({ firstName, email });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      
      setIsLoaded(true);
    };
    
    fetchUserData();
    
    // Welcome toast
    const timer = setTimeout(() => {
      toast({
        title: "Resume Manager",
        description: `Welcome ${userData?.firstName || ''}! Create and manage your professional resumes`
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  // Mock data for the resumes
  const resumes = [
    { id: 1, name: "Software Engineer Resume", lastEdited: "Apr 14, 2025", tags: ["Tech", "ATS-Optimized"] },
    { id: 2, name: "Product Manager Resume", lastEdited: "Apr 12, 2025", tags: ["Management", "Creative"] },
    { id: 3, name: "UX Designer Resume", lastEdited: "Apr 10, 2025", tags: ["Design", "Creative"] },
    { id: 4, name: "Data Analyst Resume", lastEdited: "Apr 8, 2025", tags: ["Analytics", "ATS-Optimized"] },
    { id: 5, name: "Marketing Specialist Resume", lastEdited: "Apr 6, 2025", tags: ["Marketing", "Creative"] },
    { id: 6, name: "Frontend Developer Resume", lastEdited: "Apr 4, 2025", tags: ["Tech", "ATS-Optimized"] },
  ];

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
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
                    <SidebarMenuButton tooltip="Home">
                      <Home className="h-5 w-5" />
                      <span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="My Resumes" isActive={true}>
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
                <SidebarMenuButton tooltip="Log Out" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span>Log Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <div className="container max-w-7xl mx-auto px-4 py-8">
            {/* Page Header */}
            <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">
                  My Resumes
                </h1>
                <p className="text-resume-gray mt-1">Create, manage and optimize your professional resumes</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search resumes..." 
                    className="pl-8 w-full md:w-[200px] lg:w-[300px]" 
                  />
                </div>
                <Button 
                  className="bg-resume-purple hover:bg-resume-purple-dark shadow-lg shadow-resume-purple/20"
                  onClick={() => setShowCreateDialog(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Create Resume
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className={`flex flex-wrap gap-2 mb-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
              <Button variant="outline" size="sm" className="rounded-full">
                <Filter className="mr-2 h-3 w-3" /> All Resumes
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Recent
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                ATS-Optimized
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Creative
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Tech
              </Button>
            </div>

            {/* Resumes Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
              {resumes.map((resume, index) => (
                <ResumeCard 
                  key={resume.id} 
                  resume={resume}
                />
              ))}

              {/* Add New Resume Card */}
              <Card 
                className="border border-dashed border-purple-200 hover:border-purple-300 bg-transparent hover:bg-purple-50/30 flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 dashboard-card-hover"
                onClick={() => setShowCreateDialog(true)}
              >
                <div className="rounded-full bg-purple-100 p-3 mb-3">
                  <Plus className="h-6 w-6 text-resume-purple" />
                </div>
                <p className="text-resume-purple font-medium">Create New Resume</p>
                <p className="text-resume-gray text-sm text-center mt-2">Start from scratch or use a template</p>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </div>
      
      {/* Create Resume Dialog */}
      <CreateResumeDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </SidebarProvider>
  );
};

export default Resume;

