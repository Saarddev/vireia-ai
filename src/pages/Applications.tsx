
import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Search, Filter, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import AppSidebar from '@/components/AppSidebar';

const Applications = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Welcome toast
    const timer = setTimeout(() => {
      toast({
        title: "Application Tracker",
        description: "Track and manage your job applications"
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  // Mock data for applications
  const applications = [
    { 
      id: 1, 
      company: "Google", 
      position: "Senior Software Engineer", 
      date: "Apr 15, 2025", 
      status: "Applied",
      logo: "G",
      color: "bg-blue-100 text-blue-600"
    },
    { 
      id: 2, 
      company: "Microsoft", 
      position: "Product Manager", 
      date: "Apr 14, 2025", 
      status: "Interview",
      logo: "M",
      color: "bg-green-100 text-green-600"
    },
    { 
      id: 3, 
      company: "Apple", 
      position: "UX Designer", 
      date: "Apr 12, 2025", 
      status: "Rejected",
      logo: "A",
      color: "bg-red-100 text-red-600"
    },
    { 
      id: 4, 
      company: "Netflix", 
      position: "Data Engineer", 
      date: "Apr 10, 2025", 
      status: "Offer",
      logo: "N",
      color: "bg-purple-100 text-purple-600"
    },
    { 
      id: 5, 
      company: "Amazon", 
      position: "Frontend Developer", 
      date: "Apr 8, 2025", 
      status: "Applied",
      logo: "A",
      color: "bg-orange-100 text-orange-600"
    },
    { 
      id: 6, 
      company: "Meta", 
      position: "Backend Engineer", 
      date: "Apr 6, 2025", 
      status: "Interview",
      logo: "M",
      color: "bg-teal-100 text-teal-600"
    },
  ];

  // Status icon mapping
  const statusIcons = {
    Applied: <Clock className="h-4 w-4 text-yellow-500" />,
    Interview: <CheckCircle className="h-4 w-4 text-green-500" />,
    Rejected: <XCircle className="h-4 w-4 text-red-500" />,
    Offer: <CheckCircle className="h-4 w-4 text-purple-500" />
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-950 dark:to-purple-950">
        <AppSidebar activeSection="/applications" />
        
        <SidebarInset>
          <div className="container max-w-7xl mx-auto px-4 py-8">
            {/* Page Header */}
            <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">
                  Applications
                </h1>
                <p className="text-resume-gray mt-1">Track your job applications and interview progress</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search applications..." 
                    className="pl-8 w-full md:w-[200px] lg:w-[300px]" 
                  />
                </div>
                <Button className="bg-resume-purple hover:bg-resume-purple-dark shadow-lg shadow-resume-purple/20">
                  <Plus className="mr-2 h-4 w-4" /> Add Application
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className={`flex flex-wrap gap-2 mb-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
              <Button variant="outline" size="sm" className="rounded-full">
                <Filter className="mr-2 h-3 w-3" /> All Applications
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Applied
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Interview
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Offer
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Rejected
              </Button>
            </div>

            {/* Applications List */}
            <div className={`space-y-4 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
              {applications.map((application, index) => (
                <Card 
                  key={application.id} 
                  className="border border-purple-100 hover:border-purple-200 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm bg-white/80"
                  style={{ animationDelay: `${index * 50 + 200}ms` }}
                >
                  <CardHeader className="py-4 flex-row items-center gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full ${application.color} flex items-center justify-center font-bold text-lg`}>
                      {application.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{application.position}</h3>
                          <p className="text-resume-gray">{application.company}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
                          {statusIcons[application.status as keyof typeof statusIcons]}
                          <span className="text-sm font-medium">{application.status}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-0 pb-4">
                    <div className="text-sm text-resume-gray">Applied on {application.date}</div>
                  </CardContent>
                  <CardFooter className="border-t py-3 flex justify-between">
                    <Button variant="ghost" size="sm" className="text-resume-gray hover:text-resume-purple">View Details</Button>
                    <Button variant="outline" size="sm" className="border-resume-purple text-resume-purple hover:bg-resume-purple hover:text-white">Update Status</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Applications;
