
import React, { useState, useEffect } from 'react';
import { BarChart3, FileText, PieChart, TrendingUp, Calendar, Users, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Home, Cog, User, BookOpen, Layers, Briefcase, LogOut } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as PieChartComponent, Pie, Cell } from 'recharts';

const Analytics = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Welcome toast
    const timer = setTimeout(() => {
      toast({
        title: "Resume Analytics",
        description: "Track your resume performance and application insights"
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  // Mock data for charts
  const applicationData = [
    { name: 'Jan', applications: 5, interviews: 2, offers: 0 },
    { name: 'Feb', applications: 8, interviews: 3, offers: 1 },
    { name: 'Mar', applications: 12, interviews: 5, offers: 2 },
    { name: 'Apr', applications: 15, interviews: 7, offers: 3 },
  ];

  const statusData = [
    { name: 'Applied', value: 45 },
    { name: 'Interview', value: 25 },
    { name: 'Rejected', value: 20 },
    { name: 'Offer', value: 10 },
  ];

  const resumePerformanceData = [
    { name: 'Technical Resume', views: 42, downloads: 12, interviews: 5 },
    { name: 'Creative Portfolio', views: 28, downloads: 8, interviews: 3 },
    { name: 'Management Resume', views: 36, downloads: 15, interviews: 7 },
  ];

  const COLORS = ['#9B87F5', '#36B9CC', '#E74A3B', '#1CC88A'];

  // Stats data
  const stats = [
    { id: 1, title: 'Total Applications', value: '72', icon: <Clock className="h-6 w-6 text-resume-purple" /> },
    { id: 2, title: 'Interview Invites', value: '23', icon: <Users className="h-6 w-6 text-blue-500" /> },
    { id: 3, title: 'Job Offers', value: '6', icon: <CheckCircle className="h-6 w-6 text-green-500" /> },
    { id: 4, title: 'Response Rate', value: '32%', icon: <TrendingUp className="h-6 w-6 text-yellow-500" /> },
  ];

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
                    <SidebarMenuButton tooltip="Analytics" isActive={true}>
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
            {/* Page Header */}
            <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">
                  Analytics
                </h1>
                <p className="text-resume-gray mt-1">Track your resume performance and application insights</p>
              </div>
              <div>
                <Button variant="outline" className="border-resume-purple text-resume-purple">
                  <Calendar className="mr-2 h-4 w-4" /> Last 30 Days
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
              {stats.map((stat, index) => (
                <Card 
                  key={stat.id} 
                  className="border border-purple-100 hover:border-purple-200 shadow-sm hover:shadow transition-all duration-300 backdrop-blur-sm bg-white/80"
                  style={{ animationDelay: `${index * 50 + 100}ms` }}
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-resume-gray">{stat.title}</CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Row 1 */}
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
              {/* Application Trend */}
              <Card className="lg:col-span-2 border border-purple-100 hover:border-purple-200 shadow-sm hover:shadow transition-all duration-300 backdrop-blur-sm bg-white/80">
                <CardHeader>
                  <CardTitle className="text-xl">Application Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={applicationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="applications" name="Applications" fill="#9B87F5" />
                        <Bar dataKey="interviews" name="Interviews" fill="#36B9CC" />
                        <Bar dataKey="offers" name="Offers" fill="#1CC88A" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Application Status */}
              <Card className="border border-purple-100 hover:border-purple-200 shadow-sm hover:shadow transition-all duration-300 backdrop-blur-sm bg-white/80">
                <CardHeader>
                  <CardTitle className="text-xl">Application Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChartComponent>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChartComponent>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resume Performance */}
            <div className={`${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '500ms' }}>
              <Card className="border border-purple-100 hover:border-purple-200 shadow-sm hover:shadow transition-all duration-300 backdrop-blur-sm bg-white/80">
                <CardHeader>
                  <CardTitle className="text-xl">Resume Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left py-3 px-4 border-b">Resume</th>
                          <th className="text-center py-3 px-4 border-b">Views</th>
                          <th className="text-center py-3 px-4 border-b">Downloads</th>
                          <th className="text-center py-3 px-4 border-b">Interviews</th>
                          <th className="text-center py-3 px-4 border-b">Conversion Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resumePerformanceData.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-3 px-4 border-b">{item.name}</td>
                            <td className="text-center py-3 px-4 border-b">{item.views}</td>
                            <td className="text-center py-3 px-4 border-b">{item.downloads}</td>
                            <td className="text-center py-3 px-4 border-b">{item.interviews}</td>
                            <td className="text-center py-3 px-4 border-b">
                              {((item.interviews / item.views) * 100).toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
