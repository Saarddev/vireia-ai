
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Wand2 } from 'lucide-react';

export const DisabledCard: React.FC = () => {
  return (
    <Card className="p-8 text-center space-y-6 bg-gradient-to-br from-yellow-50/90 to-amber-50/90 backdrop-blur-xl border-yellow-200/50 shadow-md">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 mx-auto ring-8 ring-yellow-50 animate-pulse">
        <AlertCircle className="h-8 w-8 text-yellow-600" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-yellow-800">AI Assistant is Disabled</h3>
        <p className="text-sm text-yellow-700 mt-2 max-w-md mx-auto">
          Enable the AI Assistant from the top menu to unlock powerful resume optimization features and personalized suggestions.
        </p>
      </div>
      <Button className="bg-yellow-600 hover:bg-yellow-700 shadow-md" disabled>
        <Wand2 className="mr-2 h-4 w-4" /> Enable AI Assistant
      </Button>
    </Card>
  );
};
