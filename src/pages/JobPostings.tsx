
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building2, MapPin, Clock } from 'lucide-react';

const JobPostings = () => {
  const navigate = useNavigate();

  // Mock job data - in a real application this would come from an API
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "We're looking for a talented frontend developer with React experience."
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignStudio",
      location: "Remote",
      type: "Contract",
      description: "Join our team to create beautiful and functional user interfaces."
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "StartupX",
      location: "New York, NY",
      type: "Full-time",
      description: "Build our next generation of web applications using modern technologies."
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Job Postings</h1>
          <p className="text-muted-foreground">Find the perfect role for your next career move</p>
        </div>
        <Button onClick={() => navigate('/resume')}>
          <Briefcase className="h-4 w-4 mr-2" />
          Back to Resume
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription className="flex items-center">
                <Building2 className="h-4 w-4 mr-1" /> {job.company}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <MapPin className="h-4 w-4 mr-1" /> {job.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Clock className="h-4 w-4 mr-1" /> {job.type}
              </div>
              <p className="text-sm">{job.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">Apply Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobPostings;
