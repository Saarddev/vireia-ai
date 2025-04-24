
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AddSectionItemProps {
  onAdd: () => void;
  className?: string;
}

const AddSectionItem: React.FC<AddSectionItemProps> = ({ onAdd, className }) => {
  return (
    <div 
      className={cn(
        "group opacity-0 hover:opacity-100 transition-opacity duration-200",
        "border border-dashed border-gray-200 hover:border-[#5d4dcd] rounded-lg",
        "flex items-center justify-center py-2 mt-2 cursor-pointer",
        "bg-gray-50/50 hover:bg-[#5d4dcd]/5",
        className
      )}
      onClick={onAdd}
    >
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-gray-400 group-hover:text-[#5d4dcd] transition-colors h-7 px-2"
      >
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        <span className="text-xs font-medium">Add Entry</span>
      </Button>
    </div>
  );
};

export default AddSectionItem;
