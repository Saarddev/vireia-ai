
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ResumeCardProps {
  resume: {
    id: number;
    name: string;
    lastEdited: string;
    tags: string[];
  };
}

const ResumeCard: React.FC<ResumeCardProps> = ({ resume }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/resume/builder/${resume.id}`);
  };

  return (
    <Card 
      className="border border-purple-100 hover:border-purple-200 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm bg-white/80 dashboard-card-hover"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{resume.name}</CardTitle>
        <CardDescription>Last edited: {resume.lastEdited}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2">
          {resume.tags.map((tag) => (
            <span key={tag} className="inline-block text-xs bg-purple-50 text-resume-purple rounded-full px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" className="text-resume-gray hover:text-resume-purple">Preview</Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-resume-purple text-resume-purple hover:bg-resume-purple hover:text-white"
          onClick={handleEdit}
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResumeCard;
