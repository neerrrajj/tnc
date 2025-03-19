import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RiskScoreProps {
  score: number;
  className?: string;
}

const RiskScore: React.FC<RiskScoreProps> = ({ score, className }) => {
  // Determine risk level and color
  const getRiskLevel = () => {
    if (score <= 30)
      return { level: "Low Risk", color: "text-green-500", bg: "bg-green-500" };
    if (score <= 60)
      return {
        level: "Moderate Risk",
        color: "text-amber-500",
        bg: "bg-amber-500",
      };
    return { level: "High Risk", color: "text-red-500", bg: "bg-red-500" };
  };

  const { level, color, bg } = getRiskLevel();

  return (
    <Card className={cn("glass-card p-6 overflow-hidden", className)}>
      <div className="space-y-3">
        <h3 className="text-lg font-semibold font-display tracking-tight">
          Risk Assessment
        </h3>

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Background circle */}
            <div className="absolute w-full h-full rounded-full bg-secondary opacity-20" />

            {/* Animated progress arc */}
            <svg
              className="absolute w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                className="text-secondary opacity-30"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="42"
                cx="50"
                cy="50"
              />
              <circle
                className={`transition-all duration-1000 ease-out-expo ${color}`}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - score / 100)}`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="42"
                cx="50"
                cy="50"
              />
            </svg>

            {/* Score display */}
            <div className="flex flex-col items-center justify-center z-10">
              <span className={`text-3xl font-bold transition-colors ${color}`}>
                {score}
              </span>
              <span className="text-xs text-muted-foreground mt-1">/100</span>
            </div>
          </div>

          <div className="text-center">
            <span className={`font-medium ${color}`}>{level}</span>
            <p className="text-sm text-muted-foreground mt-1">
              {score <= 30
                ? "This agreement appears to be relatively user-friendly."
                : score <= 60
                  ? "This agreement has some concerning terms to be aware of."
                  : "This agreement contains significant risks to users."}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RiskScore;
