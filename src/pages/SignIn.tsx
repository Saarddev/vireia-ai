
import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50/80 via-background to-purple-50/60">
      <div className="p-4 border-b">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="bg-resume-purple rounded-lg p-1.5">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">ResumeAI</span>
        </div>
      </div>
      
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">
            Sign In to ResumeAI
          </h1>
          <ClerkSignIn 
            routing="path" 
            path="/sign-in"
            redirectUrl="/dashboard"
            signUpUrl="/sign-up"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
