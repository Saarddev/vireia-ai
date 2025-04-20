
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash, Download, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResumeProps {
  resume: {
    id: number;
    name: string;
    lastEdited: string;
    tags: string[];
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

const ResumeCard: React.FC<ResumeProps> = ({ resume, onEdit, onDelete }) => {
  const navigate = useNavigate();
  
  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else {
      navigate(`/resume-builder/${resume.id}`);
    }
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle download logic
  };

  return (
    <Card className="border border-gray-200 hover:border-purple-200 transition-all duration-300 hover:shadow-lg cursor-pointer dashboard-card-hover"
         onClick={handleEdit}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-lg truncate">{resume.name}</h3>
            <p className="text-resume-gray text-sm mt-1">Last edited: {resume.lastEdited}</p>
          </div>
          <div className="rounded-full bg-purple-100 p-1.5 flex-shrink-0">
            <FileText className="h-4 w-4 text-resume-purple" />
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {resume.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-white hover:bg-white">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-4 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleDelete}>
          <Trash className="h-4 w-4 mr-1" /> Delete
        </Button>
        <Button 
          size="sm" 
          className="bg-resume-purple hover:bg-resume-purple-dark"
          onClick={handleEdit}
        >
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResumeCard;
