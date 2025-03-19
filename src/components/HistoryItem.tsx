import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, ArrowRight } from "lucide-react";
import { AnalysisItem } from "@/types/analysis";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HistoryItemProps {
  item: AnalysisItem;
  index: number;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, index }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRiskClass = (score: number) => {
    if (score <= 30)
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (score <= 60)
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  };

  return (
    <Card
      className={cn(
        "glass-card overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/50",
        index === 0 ? "scale-in" : "fade-in",
      )}
      style={{
        animationDelay: `${index * 0.05}s`,
        transitionDelay: `${index * 0.05}s`,
      }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-medium font-display text-lg tracking-tight">
                {item.title}
              </h3>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {formatDate(item.date)}
              </div>
            </div>

            <Badge className={getRiskClass(item.riskScore)}>
              Risk: {item.riskScore}/100
            </Badge>
          </div>

          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {item.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.redFlags.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {item.redFlags.length} Red Flag
                {item.redFlags.length !== 1 ? "s" : ""}
              </Badge>
            )}

            {item.privacyAlerts.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {item.privacyAlerts.length} Privacy Alert
                {item.privacyAlerts.length !== 1 ? "s" : ""}
              </Badge>
            )}

            {item.autoRenewals.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {item.autoRenewals.length} Auto-Renewal
                {item.autoRenewals.length !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>
        </div>

        <Link
          to={`/history/${item.id}`}
          className="flex items-center justify-center p-4 bg-secondary/50 text-primary hover:bg-primary/10 transition-colors md:w-16"
        >
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </Card>
  );
};

export default HistoryItem;
