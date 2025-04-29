
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Briefcase, 
  MapPin, 
  Search,
  Building,
  Clock,
  CalendarRange, 
  Filter,
  X,
  FileText
} from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  postDate: string;
  jobType: string;
  salary?: string;
  url?: string;
}

// Mock data for now - will be replaced with Google Talent Solution API
const mockJobs: JobPosting[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Innovators Inc.',
    location: 'New York, NY',
    description: 'We are looking for a skilled Frontend Developer with experience in React and TypeScript to join our growing team.',
    requirements: ['3+ years of React experience', 'TypeScript knowledge', 'CSS/SCSS proficiency', 'Good communication skills'],
    postDate: '2023-04-25',
    jobType: 'Full-time',
    salary: '$90,000 - $120,000'
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'DataFlow Systems',
    location: 'Remote',
    description: 'Join our backend team to build scalable APIs and services using Node.js and PostgreSQL.',
    requirements: ['Node.js experience', 'Database design', 'RESTful API development', 'AWS knowledge'],
    postDate: '2023-04-27',
    jobType: 'Full-time',
    salary: '$95,000 - $130,000'
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Creative Solutions',
    location: 'San Francisco, CA',
    description: 'Design beautiful and intuitive user interfaces for our web and mobile applications.',
    requirements: ['Figma proficiency', 'UI/UX principles', 'Prototyping skills', 'User research experience'],
    postDate: '2023-04-26',
    jobType: 'Contract',
    salary: '$85,000 - $110,000'
  },
  {
    id: '4',
    title: 'Full Stack Developer',
    company: 'WebSphere Technologies',
    location: 'Austin, TX',
    description: 'Build complete web applications from database design to frontend implementation.',
    requirements: ['React', 'Node.js', 'MongoDB', 'AWS', 'CI/CD pipelines'],
    postDate: '2023-04-28',
    jobType: 'Full-time',
    salary: '$100,000 - $140,000'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'Cloud Native Inc.',
    location: 'Remote',
    description: 'Manage our cloud infrastructure and CI/CD pipelines to ensure smooth deployments.',
    requirements: ['Kubernetes', 'Docker', 'AWS/GCP', 'Terraform', 'CI/CD tools'],
    postDate: '2023-04-29',
    jobType: 'Full-time',
    salary: '$110,000 - $150,000'
  }
];

const JobPostings: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
    datePosted: ''
  });

  // Simulate loading jobs data
  useEffect(() => {
    const timer = setTimeout(() => {
      setJobs(mockJobs);
      setSelectedJob(mockJobs[0]);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesJobType = !filters.jobType || job.jobType === filters.jobType;
    const matchesLocation = !filters.location || job.location.includes(filters.location);
    
    // For simplicity, this is a basic filter. In a real app we'd have proper date filtering
    return matchesSearch && matchesJobType && matchesLocation;
  });

  const calculateDaysAgo = (dateString: string) => {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - postDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    
    if (differenceInDays === 0) return 'Today';
    if (differenceInDays === 1) return 'Yesterday';
    return `${differenceInDays} days ago`;
  };

  const handleTailorResume = (job: JobPosting) => {
    // Navigate to resume builder with this job context
    // This will be implemented later
    navigate('/resume');
  };

  const clearFilters = () => {
    setFilters({
      jobType: '',
      location: '',
      datePosted: ''
    });
    setSearchTerm('');
  };

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 min-h-screen">
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Job Postings</h1>
        <p className="text-gray-600 mb-6">Find your next opportunity and tailor your resume for the perfect application</p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search jobs by title or company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-1.5"
              onClick={clearFilters}
            >
              <Filter className="h-4 w-4" /> Filters
              {(filters.jobType || filters.location || filters.datePosted) && (
                <Badge variant="secondary" className="ml-1">
                  <X className="h-3 w-3 mr-1" /> Clear
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Listings */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-resume-purple" />
                Available Positions
              </CardTitle>
              <CardDescription>
                {filteredJobs.length} jobs found
              </CardDescription>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="px-1">
                {loading ? (
                  // Loading skeleton
                  Array(5).fill(0).map((_, idx) => (
                    <div key={idx} className="p-4 border-b border-gray-100">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-1" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  ))
                ) : filteredJobs.length > 0 ? (
                  filteredJobs.map(job => (
                    <div 
                      key={job.id}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${selectedJob?.id === job.id ? 'bg-resume-purple/5 border-l-4 border-l-resume-purple' : ''}`}
                      onClick={() => setSelectedJob(job)}
                    >
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Building className="h-3.5 w-3.5 mr-1" />
                        {job.company}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline" className="bg-resume-purple/10 text-resume-purple border-resume-purple/20">
                          {job.jobType}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {calculateDaysAgo(job.postDate)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No jobs found matching your search criteria
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>
        
        {/* Job Details */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm h-full">
            {selectedJob ? (
              <>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">{selectedJob.title}</CardTitle>
                      <CardDescription className="text-lg">{selectedJob.company}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-resume-purple/10 text-resume-purple border-resume-purple/20">
                      {selectedJob.jobType}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                      {selectedJob.location}
                    </div>
                    <div className="flex items-center">
                      <CalendarRange className="h-4 w-4 mr-1 text-gray-500" />
                      Posted {calculateDaysAgo(selectedJob.postDate)}
                    </div>
                    {selectedJob.salary && (
                      <div className="flex items-center">
                        <span className="font-medium text-resume-purple">{selectedJob.salary}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-370px)]">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Description</h3>
                        <p className="text-gray-700 whitespace-pre-line">{selectedJob.description}</p>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Requirements</h3>
                        <ul className="list-disc pl-6 space-y-1">
                          {selectedJob.requirements.map((req, i) => (
                            <li key={i} className="text-gray-700">{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button 
                    variant="outline" 
                    className="text-resume-purple border-resume-purple/20 hover:bg-resume-purple/10"
                    onClick={() => window.open(selectedJob.url || '#', '_blank')}
                  >
                    Apply Now
                  </Button>
                  <Button 
                    className="bg-resume-purple hover:bg-resume-purple/80 text-white"
                    onClick={() => handleTailorResume(selectedJob)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Tailor Resume
                  </Button>
                </CardFooter>
              </>
            ) : loading ? (
              <div className="p-6">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-8" />
                <Skeleton className="h-32 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                Select a job to view details
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobPostings;
