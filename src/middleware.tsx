
import { useAuth } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';

// Define public paths for middleware to use
export const publicPaths = ['/', '/sign-in', '/sign-up'];

const isPublic = (path: string) => {
  return publicPaths.some(publicPath => 
    path === publicPath || path.startsWith(`${publicPath}/`));
};

// This is a React component that acts as middleware for route protection
export const RouteMiddleware = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();
  
  // Wait for Clerk to load
  if (!isLoaded) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-pulse bg-resume-purple/20 p-4 rounded-lg">
          <span className="text-resume-purple font-medium">Loading...</span>
        </div>
      </div>
    );
  }
  
  // Allow public paths
  if (isPublic(location.pathname)) {
    return <>{children}</>;
  }
  
  // Protect private paths
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  
  // User is authenticated
  return <>{children}</>;
};

export default RouteMiddleware;
