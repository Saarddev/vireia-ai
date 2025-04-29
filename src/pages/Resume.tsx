import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Briefcase } from 'lucide-react';

const Resume = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Resume Page</h1>
      <Button variant="outline" onClick={() => navigate('/jobs')}>
        <Briefcase className="h-4 w-4 mr-2" />
        Browse Jobs
      </Button>
    </div>
  );
};

export default Resume;
