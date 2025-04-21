
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ResetPasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

const ResetPasswordDialog: React.FC<ResetPasswordDialogProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/sign-in"
    });

    if (error) {
      toast({
        title: "Reset failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Check your inbox",
        description: "A password reset link has been sent if the email exists.",
      });
      onClose();
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl shadow-lg">
        <form onSubmit={handleReset} className="space-y-5">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-resume-purple to-resume-violet bg-clip-text text-transparent">
              Reset your password
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="resetEmail">Email Address</Label>
            <Input
              id="resetEmail"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              disabled={loading}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full bg-resume-purple hover:bg-resume-purple-dark" disabled={loading || !email}>
              {loading ? "Sending link..." : "Send Reset Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordDialog;
