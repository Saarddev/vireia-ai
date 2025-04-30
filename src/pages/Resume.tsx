
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, Edit, Download, Eye } from 'lucide-react';

const Resume = () => {
  const navigate = useNavigate();
  
  // Mock resume data (in a real app this would come from a database)
  const resumes = [
    { id: "1", name: "Software Developer Resume" },
    { id: "2", name: "UX Designer Resume" }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Resumes</h1>
          <p className="text-muted-foreground">Manage and customize your professional profiles</p>
        </div>
        <Button onClick={() => navigate('/jobs')}>
          <Briefcase className="h-4 w-4 mr-2" />
          Browse Jobs
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <Card key={resume.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                {resume.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/resume/builder/${resume.id}`)}
                  className="justify-start"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Resume
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/resume/canvas/${resume.id}`)}
                  className="justify-start"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Create new resume card */}
        <Card className="border-dashed hover:border-solid hover:shadow-md transition-all cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-full py-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-1">Create New Resume</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Start from scratch or use a template
            </p>
            <Button>
              Create Resume
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resume;
