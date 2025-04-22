import React from 'react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Wand2, Loader } from 'lucide-react';
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import AIHoverToolkit from "@/components/AIHoverToolkit";
import { useToast } from "@/hooks/use-toast";

interface SummaryFormProps {
  data: string;
  onChange: (data: string) => void;
  onGenerateWithAI: () => Promise<void>;
  isGenerating?: boolean;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ 
  data, 
  onChange,
  onGenerateWithAI,
  isGenerating = false
}) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      summary: data
    }
  });

  const handleSubmit = (formData: { summary: string }) => {
    onChange(formData.summary);
  };

  const handleExplain = () => {
    toast({
      title: "Professional Summary",
      description: "This section gives recruiters a quick overview of your skills and experience. Keep it concise and impactful.",
    });
  };

  const handleAskAI = () => {
    onGenerateWithAI();
  };

  const handleComment = () => {
    toast({
      description: "Comments feature coming soon!",
    });
  };

  const handleIntroduction = () => {
    toast({
      title: "Writing Tips",
      description: "Start with your professional identity, highlight key achievements, and end with your career goals.",
    });
  };

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 z-10">
        <AIHoverToolkit
          onExplain={handleExplain}
          onAskAI={handleAskAI}
          onComment={handleComment}
          onIntroduction={handleIntroduction}
        />
      </div>

      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FileText className="mr-2 h-5 w-5 text-resume-purple" />
        Professional Summary
      </h2>
      <p className="text-sm text-resume-gray mb-6">
        Write a compelling summary that highlights your experience and skills
      </p>

      <Card className="p-4 bg-purple-50 border-resume-purple mb-6">
        <div className="flex items-start">
          <Wand2 className="h-5 w-5 text-resume-purple mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-resume-purple">AI Summary Assistant</h3>
            <p className="text-xs text-resume-gray mt-1">
              Let our AI help you craft a compelling professional summary based on your experience and skills.
            </p>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-2 border-resume-purple text-resume-purple hover:bg-resume-purple hover:text-white transition-all duration-300"
              onClick={onGenerateWithAI}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader className="mr-2 h-3 w-3 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-3 w-3" />
                  Generate Summary
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      <Form {...form}>
        <form onChange={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Summary*</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Summarize your professional background, key skills, and career achievements in 3-5 sentences"
                    className="min-h-[150px] resize-none"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Keep your summary concise (50-200 words) and focused on your most relevant qualifications.
                </FormDescription>
              </FormItem>
            )}
          />
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-resume-gray">
              <span className={form.watch("summary").length > 50 ? "text-resume-purple" : "text-resume-gray"}>
                {form.watch("summary").length}
              </span> / 200 recommended
            </div>
            <Button 
              type="button" 
              variant="outline"
              size="sm"
              onClick={() => form.reset({ summary: "" })}
              className="text-resume-gray hover:text-resume-purple"
            >
              Clear
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Writing Tips:</h3>
        <ul className="list-disc list-inside text-sm text-resume-gray space-y-1">
          <li>Start with your professional identity and years of experience</li>
          <li>Highlight 2-3 key achievements or core skills relevant to the job</li>
          <li>Mention any specialized knowledge or certifications that set you apart</li>
          <li>End with your career goals or what you're passionate about</li>
        </ul>
      </div>
    </div>
  );
};

export default SummaryForm;
