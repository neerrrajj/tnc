import { Json } from "@/integrations/supabase/types";

export interface RedFlag {
  id?: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  clause: string;
  simplifiedExplanation: string;
}

export interface PrivacyAlert {
  id?: string;
  title: string;
  description: string;
  dataCollected?: string[];
  dataPurpose?: string;
  dataSharing?: string;
  clause: string;
}

export interface AutoRenewal {
  id?: string;
  description: string;
  period: string;
  cancellationTerms: string;
  clause: string;
}

export interface KeyPoint {
  id?: string;
  title: string;
  description: string;
  category: string;
}

export interface AnalysisItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  riskScore: number;
  redFlags: RedFlag[];
  privacyAlerts: PrivacyAlert[];
  autoRenewals: AutoRenewal[];
  keyPoints: KeyPoint[];
}

export interface AnalysisState {
  isAnalyzing: boolean;
  result: AnalysisItem | null;
  history: AnalysisItem[];
  isLoadingHistory: boolean;
}

// Helper function to convert JSON data from Supabase to strongly typed objects
export function convertFromDatabase(data: any): AnalysisItem {
  // Default empty arrays for collections
  const defaultRedFlags: RedFlag[] = [];
  const defaultPrivacyAlerts: PrivacyAlert[] = [];
  const defaultAutoRenewals: AutoRenewal[] = [];
  const defaultKeyPoints: KeyPoint[] = [];

  // Ensure proper typing for redFlags
  const redFlags: RedFlag[] = Array.isArray(data.red_flags)
    ? data.red_flags.map((flag: any) => ({
        id: flag.id || `rf-${Math.random().toString(36).substr(2, 9)}`,
        title: flag.title || "",
        description: flag.description || "",
        severity: (flag.severity as "low" | "medium" | "high") || "medium",
        clause: flag.clause || "",
        simplifiedExplanation: flag.simplifiedExplanation || "",
      }))
    : defaultRedFlags;

  // Ensure proper typing for privacyAlerts
  const privacyAlerts: PrivacyAlert[] = Array.isArray(data.privacy_alerts)
    ? data.privacy_alerts.map((alert: any) => ({
        id: alert.id || `pa-${Math.random().toString(36).substr(2, 9)}`,
        title: alert.title || "",
        description: alert.description || "",
        dataCollected: Array.isArray(alert.dataCollected)
          ? alert.dataCollected
          : [],
        dataPurpose: alert.dataPurpose || "",
        dataSharing: alert.dataSharing || "",
        clause: alert.clause || "",
      }))
    : defaultPrivacyAlerts;

  // Ensure proper typing for autoRenewals
  const autoRenewals: AutoRenewal[] = Array.isArray(data.auto_renewals)
    ? data.auto_renewals.map((renewal: any) => ({
        id: renewal.id || `ar-${Math.random().toString(36).substr(2, 9)}`,
        description: renewal.description || "",
        period: renewal.period || "",
        cancellationTerms: renewal.cancellationTerms || "",
        clause: renewal.clause || "",
      }))
    : defaultAutoRenewals;

  // Ensure proper typing for keyPoints
  const keyPoints: KeyPoint[] = Array.isArray(data.key_points)
    ? data.key_points.map((point: any) => ({
        id: point.id || `kp-${Math.random().toString(36).substr(2, 9)}`,
        title: point.title || "",
        description: point.description || "",
        category: point.category || "",
      }))
    : defaultKeyPoints;

  return {
    id: data.id,
    title: data.title || "Untitled Document",
    date: data.created_at || new Date().toISOString(),
    summary: data.summary || "",
    riskScore: typeof data.risk_score === "number" ? data.risk_score : 0,
    redFlags,
    privacyAlerts,
    autoRenewals,
    keyPoints,
  };
}
