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
import { FileText, Wand2 } from 'lucide-react';
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import AIHoverMenu from './AIHoverMenu';

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
  const form = useForm({
    defaultValues: {
      summary: data
    }
  });

  const handleSubmit = (formData: { summary: string }) => {
    onChange(formData.summary);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FileText className="mr-2 h-5 w-5 text-resume-purple" />
        Professional Summary
      </h2>
      <p className="text-sm text-resume-gray mb-6">
        Write a compelling summary that highlights your experience and skills
      </p>

      <Form {...form}>
        <form onChange={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Professional Summary*</FormLabel>
                  <AIHoverMenu
                    isGenerating={isGenerating}
                    onGenerate={onGenerateWithAI}
                    description="Generate a compelling professional summary based on your experience and skills."
                    trigger={
                      <Button variant="ghost" size="sm" className="h-8 text-resume-purple">
                        <Wand2 className="h-4 w-4" />
                      </Button>
                    }
                  />
                </div>
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
