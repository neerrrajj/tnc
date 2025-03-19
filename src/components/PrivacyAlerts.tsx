import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Eye, Database, Share2 } from "lucide-react";
import { PrivacyAlert } from "@/types/analysis";
import { cn } from "@/lib/utils";

interface PrivacyAlertsProps {
  alerts: PrivacyAlert[];
  className?: string;
}

const PrivacyAlerts: React.FC<PrivacyAlertsProps> = ({ alerts, className }) => {
  return (
    <Card className={cn("glass-card p-6", className)}>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold font-display tracking-tight">
            Privacy Alerts
          </h3>
        </div>

        {alerts.length === 0 ? (
          <p className="text-muted-foreground text-sm italic">
            No privacy concerns detected in this document.
          </p>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Collapsible
                key={alert.id}
                className="border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="destructive"
                      className="uppercase text-xs font-medium"
                    >
                      Alert
                    </Badge>
                    <span className="font-medium">{alert.title}</span>
                  </div>
                  <ChevronDown className="h-5 w-5 transition-transform duration-200 ease-in-out" />
                </CollapsibleTrigger>

                <CollapsibleContent className="px-4 pb-4 pt-1 space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {alert.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Database className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Data Collected</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {alert.dataCollected.map((item, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs"
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Eye className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Data Purpose</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {alert.dataPurpose}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Share2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Data Sharing</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {alert.dataSharing}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded p-3 mt-2">
                    <p className="text-xs italic text-muted-foreground">
                      "{alert.clause}"
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PrivacyAlerts;
