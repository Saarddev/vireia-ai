
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const ResumeLoadingSkeleton = () => {
  return (
    <div className="space-y-4 p-5 bg-white rounded-lg">
      {/* Header section */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-5 w-1/3" />
        <div className="flex space-x-2 mt-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      
      {/* Summary section */}
      <div className="space-y-2 mt-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-16 w-full" />
      </div>
      
      {/* Experience section */}
      <div className="space-y-2 mt-4">
        <Skeleton className="h-4 w-24" />
        <div className="space-y-3">
          <div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-32 mt-1" />
            <div className="space-y-1 mt-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Education section */}
      <div className="space-y-2 mt-4">
        <Skeleton className="h-4 w-24" />
        <div className="space-y-3">
          <div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-32 mt-1" />
            <Skeleton className="h-3 w-3/4 mt-2" />
          </div>
        </div>
      </div>
      
      {/* Skills section */}
      <div className="space-y-2 mt-4">
        <Skeleton className="h-4 w-16" />
        <div className="flex flex-wrap gap-1">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
};
