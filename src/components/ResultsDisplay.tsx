import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  RefreshCw,
  Calendar,
  Check,
  FileText,
  ArrowRight,
} from "lucide-react";
import { AnalysisItem, RedFlag, AutoRenewal, KeyPoint } from "@/types/analysis";
import RiskScore from "./RiskScore";
import PrivacyAlerts from "./PrivacyAlerts";

interface ResultsDisplayProps {
  result: AnalysisItem;
  onNewAnalysis: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  result,
  onNewAnalysis,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "medium":
        return "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200";
      case "high":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      default:
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
    }
  };

  return (
    <div className="fade-in">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
              {result.title}
            </h1>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              Analyzed on {formatDate(result.date)}
            </div>
          </div>
          <Button
            variant="outline"
            onClick={onNewAnalysis}
            className="transition-all duration-300"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            New Analysis
          </Button>
        </div>

        <Card className="mt-6 glass-card p-6">
          <h2 className="text-lg font-semibold font-display tracking-tight mb-2">
            Summary
          </h2>
          <p className="text-muted-foreground">{result.summary}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <RiskScore score={result.riskScore} />

        <PrivacyAlerts
          alerts={result.privacyAlerts}
          className="col-span-1 md:col-span-2"
        />
      </div>

      <Tabs defaultValue="red-flags" className="mb-6">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger
            value="red-flags"
            className="transition-all duration-300"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Red Flags
          </TabsTrigger>
          <TabsTrigger value="renewals" className="transition-all duration-300">
            <RefreshCw className="h-4 w-4 mr-2" />
            Auto-Renewals
          </TabsTrigger>
          <TabsTrigger
            value="key-points"
            className="transition-all duration-300"
          >
            <Check className="h-4 w-4 mr-2" />
            Key Points
          </TabsTrigger>
        </TabsList>

        <TabsContent value="red-flags" className="space-y-4 slide-in">
          {result.redFlags.length === 0 ? (
            <Alert>
              <Check className="h-4 w-4 text-green-500" />
              <AlertTitle>No Red Flags Detected</AlertTitle>
              <AlertDescription>
                This document appears to have no significant red flags.
              </AlertDescription>
            </Alert>
          ) : (
            result.redFlags.map((flag: RedFlag) => (
              <Card key={flag.id} className="overflow-hidden">
                <div
                  className={`px-4 py-3 ${getSeverityClass(flag.severity)} flex items-center justify-between`}
                >
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <h3 className="font-medium">{flag.title}</h3>
                  </div>
                  <Badge
                    className={
                      flag.severity === "high"
                        ? "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 hover:bg-red-300"
                        : flag.severity === "medium"
                          ? "bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 hover:bg-orange-300"
                          : "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-300"
                    }
                  >
                    {flag.severity.charAt(0).toUpperCase() +
                      flag.severity.slice(1)}{" "}
                    Severity
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    {flag.description}
                  </p>

                  <div className="bg-secondary/50 rounded p-3 mb-3">
                    <p className="text-xs italic text-muted-foreground">
                      "{flag.clause}"
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <p>
                      <span className="font-medium">In simple terms:</span>{" "}
                      {flag.simplifiedExplanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="renewals" className="space-y-4 slide-in">
          {result.autoRenewals.length === 0 ? (
            <Alert>
              <Check className="h-4 w-4 text-green-500" />
              <AlertTitle>No Automatic Renewals Detected</AlertTitle>
              <AlertDescription>
                This document does not appear to contain any automatic renewal
                clauses.
              </AlertDescription>
            </Alert>
          ) : (
            result.autoRenewals.map((renewal: AutoRenewal) => (
              <Card key={renewal.id} className="overflow-hidden">
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-3 flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Automatic Renewal</h3>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    {renewal.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="bg-secondary/30 rounded p-3">
                      <p className="text-xs font-medium">Renewal Period</p>
                      <p className="text-sm">{renewal.period}</p>
                    </div>
                    <div className="bg-secondary/30 rounded p-3">
                      <p className="text-xs font-medium">Cancellation Terms</p>
                      <p className="text-sm">{renewal.cancellationTerms}</p>
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded p-3">
                    <p className="text-xs italic text-muted-foreground">
                      "{renewal.clause}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="key-points" className="space-y-4 slide-in">
          {result.keyPoints.length === 0 ? (
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertTitle>No Key Points Extracted</AlertTitle>
              <AlertDescription>
                No additional key points were extracted from this document.
              </AlertDescription>
            </Alert>
          ) : (
            result.keyPoints.map((point: KeyPoint) => (
              <Card key={point.id} className="overflow-hidden">
                <div className="bg-secondary px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    <h3 className="font-medium">{point.title}</h3>
                  </div>
                  <Badge>
                    {point.category.charAt(0).toUpperCase() +
                      point.category.slice(1)}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    {point.description}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsDisplay;
