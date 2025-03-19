import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface AnalysisFormProps {
  onAnalyze: (document: string, title: string) => void;
  isAnalyzing: boolean;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({
  onAnalyze,
  isAnalyzing,
}) => {
  const [document, setDocument] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(document, title);
  };

  const getPlaceholderText = () => {
    return `Paste your Terms of Service or EULA here...

Example content:
1. ACCEPTANCE OF TERMS
By accessing or using this service, you agree to be bound by these Terms of Service.

2. PRIVACY POLICY
Your use of the service is also subject to our Privacy Policy, which can be found at [link].

3. CHANGES TO TERMS
We reserve the right to modify these terms at any time. Changes will be effective upon posting to the website.
`;
  };

  return (
    <div className="fade-in">
      <Card className="glass-card p-6 md:p-8 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-display font-semibold tracking-tight">
              Analyze Terms & Conditions
            </h2>
            <p className="text-muted-foreground">
              Paste any EULA or Terms of Service document to get an instant
              analysis highlighting key points and potential concerns.
            </p>
          </div>

          <div className="space-y-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document Title (optional)"
              className="transition-all duration-300 focus-visible:ring-primary/40"
              disabled={isAnalyzing}
            />

            <Textarea
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              placeholder={getPlaceholderText()}
              className="min-h-[300px] transition-all duration-300 focus-visible:ring-primary/40"
              disabled={isAnalyzing}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full transition-all duration-300"
              disabled={isAnalyzing || !document.trim()}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Document...
                </>
              ) : (
                "Analyze Document"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AnalysisForm;
