import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HistoryItem from "@/components/HistoryItem";
import ResultsDisplay from "@/components/ResultsDisplay";
import { useAnalysis } from "@/hooks/useAnalysis";
import { Button } from "@/components/ui/button";
import { ArrowLeft, History as HistoryIcon, Loader2 } from "lucide-react";

const History: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    history,
    clearResult,
    getHistoryItem,
    fetchHistory,
    isLoadingHistory,
  } = useAnalysis();

  useEffect(() => {
    fetchHistory();
  }, []);

  // If an ID is provided, show the specific history item result
  if (id) {
    const historyItem = history.find((item) => item.id === id);

    if (isLoadingHistory) {
      return (
        <>
          <Navbar />
          <div className="container max-w-5xl mx-auto px-4 pt-24 pb-16">
            <div className="mt-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
              <p className="text-muted-foreground">Loading analysis...</p>
            </div>
          </div>
        </>
      );
    }

    if (!historyItem) {
      return (
        <>
          <Navbar />
          <div className="container max-w-5xl mx-auto px-4 pt-24 pb-16">
            <div className="mt-12 text-center">
              <h1 className="text-2xl font-bold mb-4">Analysis Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The analysis you're looking for doesn't exist or has been
                removed.
              </p>
              <Link to="/history">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to History
                </Button>
              </Link>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <Navbar />
        <div className="container max-w-5xl mx-auto px-4 pt-24 pb-16">
          <div className="mb-6">
            <Link
              to="/history"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to History
            </Link>
          </div>
          <ResultsDisplay
            result={historyItem}
            onNewAnalysis={() => clearResult()}
          />
        </div>
      </>
    );
  }

  // If no ID is provided, show the history list
  return (
    <>
      <Navbar />
      <div className="container max-w-5xl mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
              Analysis History
            </h1>
            <p className="text-muted-foreground mt-1">
              Review your previously analyzed documents
            </p>
          </div>
          <Link to="/">
            <Button variant="outline">Analyze New Document</Button>
          </Link>
        </div>

        {isLoadingHistory ? (
          <div className="mt-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
            <p className="text-muted-foreground">
              Loading your analysis history...
            </p>
          </div>
        ) : history.length === 0 ? (
          <div className="mt-12 text-center">
            <HistoryIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h2 className="text-xl font-medium mb-2">No Analysis History</h2>
            <p className="text-muted-foreground mb-6">
              You haven't analyzed any documents yet.
            </p>
            <Link to="/">
              <Button>Analyze Your First Document</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <HistoryItem key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default History;
