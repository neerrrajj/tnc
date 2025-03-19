import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import {
  AnalysisItem,
  AnalysisState,
  convertFromDatabase,
} from "@/types/analysis";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: This is not recommended for production
});

export const useAnalysis = () => {
  const [state, setState] = useState<AnalysisState>({
    isAnalyzing: false,
    result: null,
    history: [],
    isLoadingHistory: true,
  });

  const { user, session } = useAuth();

  const fetchHistory = async () => {
    if (!user) return [];

    setState((prev) => ({ ...prev, isLoadingHistory: true }));

    try {
      const { data, error } = await supabase
        .from("analyses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedHistory = data.map((item) => convertFromDatabase(item));

      setState((prev) => ({
        ...prev,
        history: formattedHistory,
        isLoadingHistory: false,
      }));

      return formattedHistory;
    } catch (error) {
      console.error("Error fetching history:", error);
      toast({
        title: "Error",
        description: "Failed to load analysis history",
        variant: "destructive",
      });
      setState((prev) => ({ ...prev, isLoadingHistory: false }));
      return [];
    }
  };

  const analyzeDocument = async (document: string, title: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to analyze documents",
        variant: "destructive",
      });
      return null;
    }

    if (!document.trim()) {
      toast({
        title: "Empty Document",
        description: "Please paste a document to analyze",
        variant: "destructive",
      });
      return null;
    }

    setState((prev) => ({ ...prev, isAnalyzing: true }));

    try {
      // Direct OpenAI API call
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an AI legal assistant that analyzes Terms of Service and EULAs. 
            Analyze the document and extract: 
            1. A summary (100-150 words)
            2. Red flags (concerns that users should be aware of)
            3. Privacy alerts (data collection/sharing practices)
            4. Auto-renewal terms if present
            5. Key points users should know
            6. A risk score from 0-100
            
            Format your response as a JSON object with the following structure:
            {
              "summary": "brief overview",
              "risk_score": 65,
              "red_flags": [
                {
                  "title": "Mandatory Arbitration",
                  "description": "You waive right to sue in court",
                  "severity": "high",
                  "clause": "exact text from document",
                  "simplifiedExplanation": "simple explanation"
                }
              ],
              "privacy_alerts": [
                {
                  "title": "Data Sharing",
                  "description": "Your data is shared with third parties",
                  "dataCollected": ["email", "browsing history"],
                  "dataPurpose": "marketing",
                  "dataSharing": "third-party advertisers",
                  "clause": "exact text from document"
                }
              ],
              "auto_renewals": [
                {
                  "description": "Automatic subscription renewal",
                  "period": "monthly",
                  "cancellationTerms": "cancel 7 days before billing date",
                  "clause": "exact text from document"
                }
              ],
              "key_points": [
                {
                  "title": "Refund Policy",
                  "description": "No refunds after 30 days",
                  "category": "payment"
                }
              ]
            }`,
          },
          {
            role: "user",
            content: document,
          },
        ],
        temperature: 0.3,
        max_tokens: 2048,
      });

      console.log("OpenAI Response:", response);

      // Parse the response
      const content = response.choices[0].message.content;
      if (!content) throw new Error("Empty response from OpenAI");

      // Clean the content to extract the JSON
      const jsonString = content.replace(/```json\n|\n```/g, "").trim();

      // Parse the JSON response
      let jsonResponse;
      try {
        jsonResponse = JSON.parse(jsonString);
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
        throw new Error("Invalid JSON response from OpenAI");
      }

      if (
        !jsonResponse ||
        typeof jsonResponse !== "object" ||
        !jsonResponse.summary
      ) {
        throw new Error("Invalid response structure from OpenAI");
      }

      // Store the analysis result in Supabase
      const { data: savedData, error } = await supabase
        .from("analyses")
        .insert({
          user_id: user.id,
          title: title || "Untitled Document",
          document: document, // Add the document content
          summary: jsonResponse.summary,
          risk_score: jsonResponse.risk_score,
          red_flags: jsonResponse.red_flags,
          privacy_alerts: jsonResponse.privacy_alerts,
          auto_renewals: jsonResponse.auto_renewals,
          key_points: jsonResponse.key_points,
        })
        .select()
        .single();

      console.log("Supabase Insert Result:", savedData, "Error:", error);

      if (error) throw error;

      // Process the saved data into our strongly-typed format
      const processedData = convertFromDatabase(savedData);

      setState((prev) => ({
        ...prev,
        isAnalyzing: false,
        result: processedData,
        history: [processedData, ...prev.history],
      }));

      toast({
        title: "Analysis Complete",
        description: "Your document has been analyzed successfully",
      });

      return processedData;
    } catch (error) {
      console.error("Analysis error:", error);

      setState((prev) => ({ ...prev, isAnalyzing: false }));

      toast({
        title: "Analysis Failed",
        description:
          "There was an error analyzing your document. Please try again.",
        variant: "destructive",
      });

      return null;
    }
  };

  const clearResult = () => {
    setState((prev) => ({ ...prev, result: null }));
  };

  const getHistoryItem = (id: string) => {
    return state.history.find((item) => item.id === id) || null;
  };

  return {
    isAnalyzing: state.isAnalyzing,
    result: state.result,
    history: state.history,
    isLoadingHistory: state.isLoadingHistory,
    analyzeDocument,
    clearResult,
    getHistoryItem,
    fetchHistory,
  };
};
