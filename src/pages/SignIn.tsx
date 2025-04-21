import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import ResetPasswordDialog from '@/components/auth/ResetPasswordDialog';

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back 👋",
        description: "Signed in successfully!",
        variant: "default",
      });
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message || "An error occurred during sign in");
      toast({
        title: "Sign in failed",
        description: error.message || "An error occurred during sign in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-resume-purple/50 via-white/70 to-resume-violet/30 animate-fade-in">
      <div className="p-4 border-b flex justify-center">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="bg-resume-purple rounded-lg p-1.5 shadow-md animate-float">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">ResumeAI</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center bg-grid-pattern">
        <Card className="w-full max-w-md rounded-2xl shadow-2xl border-0 bg-white/75 backdrop-blur-lg animate-fade-in">
          <CardHeader>
            <div className="flex flex-col items-center gap-2">
              <CardTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center text-base text-resume-gray">
                Sign in with your credentials to access your workspace
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-resume-purple/70" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="pl-10"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-resume-purple/70" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your super secret password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-10"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>
              {error && (
                <div className="text-sm text-red-500 pt-1 text-center font-medium">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-resume-purple to-resume-violet hover:from-resume-purple-dark hover:to-resume-violet transition shadow-md"
                disabled={loading}
                size="lg"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div className="flex flex-col sm:flex-row justify-between mt-4 text-xs sm:text-sm text-resume-gray items-center">
              <div>
                Don't have an account?{' '}
                <Link to="/sign-up" className="text-resume-purple font-semibold hover:underline">Create one</Link>
              </div>
              <button
                onClick={() => setShowResetDialog(true)}
                className="mt-2 sm:mt-0 text-resume-purple hover:underline font-semibold transition-all"
                type="button"
              >Forgot password?</button>
            </div>
          </CardContent>
        </Card>
      </div>
      <ResetPasswordDialog open={showResetDialog} onClose={() => setShowResetDialog(false)} />
    </div>
  );
};

export default SignIn;
