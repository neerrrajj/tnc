import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import AnalysisForm from "@/components/AnalysisForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import { useAnalysis } from "@/hooks/useAnalysis";
import { Shield, AlertTriangle, Eye, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Index: React.FC = () => {
  const { isAnalyzing, result, analyzeDocument, clearResult, fetchHistory } =
    useAnalysis();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const handleAnalyze = (document: string, title: string) => {
    analyzeDocument(document, title);
  };

  const handleNewAnalysis = () => {
    clearResult();
  };

  return (
    <>
      <Navbar />

      {/* Hero section with gentle gradient background */}
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container max-w-5xl mx-auto">
          {!result ? (
            <>
              <div className="text-center mb-10 fade-in">
                <Shield className="h-16 w-16 mx-auto text-primary mb-4" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
                  Decode complex legal agreements with AI
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Watchdog analyzes EULAs and Terms of Service to highlight
                  important clauses and potential concerns in seconds.
                </p>
              </div>

              <div className="mb-16">
                <AnalysisForm
                  onAnalyze={handleAnalyze}
                  isAnalyzing={isAnalyzing}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 slide-in">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    Red Flag Detection
                  </h3>
                  <p className="text-muted-foreground">
                    Identify clauses that may compromise privacy, impose hidden
                    charges, or limit your legal rights.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Privacy Alerts</h3>
                  <p className="text-muted-foreground">
                    Highlights sections where companies may track, share, or
                    sell your personal data.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <RefreshCw className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    Subscription Tracking
                  </h3>
                  <p className="text-muted-foreground">
                    Flags auto-renewal clauses and identifies potential
                    cancellation difficulties.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <ResultsDisplay result={result} onNewAnalysis={handleNewAnalysis} />
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
