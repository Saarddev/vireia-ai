
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { GitHubCommit, fetchLatestCommit } from '@/services/githubService';
import { GitBranch, ClockIcon, User, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface GitHubLatestCommitProps {
  owner: string;
  repo: string;
  className?: string;
}

const GitHubLatestCommit: React.FC<GitHubLatestCommitProps> = ({ 
  owner, 
  repo,
  className = ""
}) => {
  const [commit, setCommit] = useState<GitHubCommit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLatestCommit = async () => {
      setLoading(true);
      setError(null);
      try {
        const latestCommit = await fetchLatestCommit(owner, repo);
        setCommit(latestCommit);
      } catch (err) {
        setError('Failed to load commit data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getLatestCommit();
  }, [owner, repo]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center mb-4">
          <Skeleton className="h-8 w-8 rounded-full mr-3" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-12 w-full mb-3" />
        <div className="flex justify-between">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </Card>
    );
  }

  if (error || !commit) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center py-4">
          <p className="text-resume-gray">Unable to load latest commit information.</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  const shortSha = commit.sha.substring(0, 7);
  const commitUrl = commit.html_url;

  return (
    <Card className={`p-6 overflow-hidden transition-all hover:shadow-md ${className}`}>
      <div className="flex items-center mb-4">
        <div className="bg-resume-purple/10 p-2 rounded-full mr-3">
          <GitBranch className="h-5 w-5 text-resume-purple" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Latest GitHub Commit</h3>
          <p className="text-sm text-resume-gray">
            {owner}/{repo}
          </p>
        </div>
      </div>

      <div className="p-3 bg-gray-50 rounded-lg mb-4 border border-gray-100">
        <p className="font-medium text-gray-800">
          {commit.commit.message}
        </p>
      </div>
      
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center mb-2 sm:mb-0">
          <User className="h-4 w-4 mr-1 text-resume-gray" />
          <span className="text-sm mr-3">
            {commit.author?.login || commit.commit.author.name}
          </span>
          
          <ClockIcon className="h-4 w-4 mr-1 text-resume-gray" />
          <span className="text-sm">
            {formatDate(commit.commit.author.date)}
          </span>
        </div>
        
        <div className="flex items-center">
          <Badge className="mr-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">
            #{shortSha}
          </Badge>
          <a 
            href={commitUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center gap-1 text-resume-purple border-resume-purple/20 hover:bg-resume-purple/5"
            >
              View on GitHub
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
};

export default GitHubLatestCommit;
