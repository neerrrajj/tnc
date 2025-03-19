export interface AnalysisResult {
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

export interface RedFlag {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  clause: string;
  simplifiedExplanation: string;
}

export interface PrivacyAlert {
  id: string;
  title: string;
  description: string;
  dataCollected: string[];
  dataPurpose: string;
  dataSharing: string;
  clause: string;
}

export interface AutoRenewal {
  id: string;
  description: string;
  period: string;
  cancellationTerms: string;
  clause: string;
}

export interface KeyPoint {
  id: string;
  title: string;
  description: string;
  category: "general" | "liability" | "rights" | "termination" | "other";
}

export const mockAnalysisResults: AnalysisResult[] = [
  {
    id: "1",
    title: "Social Media App Terms of Service",
    date: "2023-11-15T14:30:00Z",
    summary:
      "This agreement grants the company extensive rights to user content and data while limiting user rights to dispute resolution. There are several concerning clauses related to privacy and automatic subscription renewal.",
    riskScore: 75,
    redFlags: [
      {
        id: "rf1",
        title: "Mandatory Arbitration",
        description:
          "You waive your right to sue in court and must use binding arbitration instead.",
        severity: "high",
        clause:
          "Section 15.2: Any dispute arising out of this agreement must be settled through binding arbitration, not in court.",
        simplifiedExplanation:
          "You cannot take the company to court if there is a dispute. Instead, you must use a private arbitration process that often favors companies.",
      },
      {
        id: "rf2",
        title: "Class Action Waiver",
        description:
          "You cannot participate in class action lawsuits against the company.",
        severity: "high",
        clause:
          "Section 15.3: Users waive any right to participate in class action lawsuits against the company.",
        simplifiedExplanation:
          "You cannot join other users in a group lawsuit against the company, even if many people experienced the same issue.",
      },
      {
        id: "rf3",
        title: "Unilateral Terms Changes",
        description:
          "The company can change terms at any time without direct notification.",
        severity: "medium",
        clause:
          "Section 3.1: We reserve the right to modify these terms at any time. Changes will be effective upon posting to the website.",
        simplifiedExplanation:
          "The company can change the rules whenever they want without telling you directly. You have to check their website regularly to see if anything has changed.",
      },
    ],
    privacyAlerts: [
      {
        id: "pa1",
        title: "Extensive Data Collection",
        description:
          "The app collects a wide range of personal and behavioral data beyond what is necessary for core functionality.",
        dataCollected: [
          "Location",
          "Contacts",
          "Photos",
          "Browsing history",
          "Device information",
        ],
        dataPurpose:
          "For service improvement, personalization, and third-party advertising",
        dataSharing:
          "Data may be shared with partners, advertisers, and affiliated companies",
        clause:
          "Section 8.2: We collect user data including but not limited to location, contacts, media, browsing history, and device information.",
      },
      {
        id: "pa2",
        title: "Facial Recognition Technology",
        description:
          "The app uses facial recognition technology on uploaded photos for various purposes.",
        dataCollected: ["Facial geometry", "Photo metadata"],
        dataPurpose:
          "For photo tagging features, personalization, and security measures",
        dataSharing:
          "Facial data may be shared with affiliated companies and security partners",
        clause:
          "Section 8.5: We employ facial recognition technology on user-uploaded images to enable photo tagging and enhance security.",
      },
    ],
    autoRenewals: [
      {
        id: "ar1",
        description:
          "Premium subscription automatically renews unless canceled 48 hours before renewal date",
        period: "Monthly",
        cancellationTerms:
          "Must be canceled at least 48 hours before billing date through account settings",
        clause:
          "Section 10.3: Premium subscriptions automatically renew on a monthly basis unless canceled by the user at least 48 hours prior to the renewal date.",
      },
    ],
    keyPoints: [
      {
        id: "kp1",
        title: "Content License",
        description:
          "You grant the company a worldwide, non-exclusive, royalty-free license to use any content you post.",
        category: "rights",
      },
      {
        id: "kp2",
        title: "Termination Policy",
        description:
          "The company can terminate your account for any reason with minimal notice.",
        category: "termination",
      },
      {
        id: "kp3",
        title: "Liability Limitation",
        description:
          "The company limits its liability to $100 or the amount you paid in the last 12 months.",
        category: "liability",
      },
    ],
  },
  {
    id: "2",
    title: "Streaming Service EULA",
    date: "2023-10-22T09:15:00Z",
    summary:
      "This agreement has moderate risk factors primarily related to subscription terms and content restrictions. The agreement contains standard clauses for digital streaming services with some notable restrictions on content sharing.",
    riskScore: 60,
    redFlags: [
      {
        id: "rf1",
        title: "Difficult Cancellation",
        description:
          "Cancellation process requires multiple steps and 30 days notice.",
        severity: "medium",
        clause:
          "Section 7.3: Cancellation requires written notice 30 days in advance, submitted through the cancellation form available in account settings.",
        simplifiedExplanation:
          "To cancel your subscription, you must give 30 days notice and follow a specific process that includes filling out a form in your account settings.",
      },
    ],
    privacyAlerts: [
      {
        id: "pa1",
        title: "Viewing Habits Tracking",
        description:
          "The service tracks detailed viewing habits and preferences.",
        dataCollected: [
          "Viewing history",
          "Time spent watching",
          "Device used",
          "Location during viewing",
        ],
        dataPurpose:
          "For content recommendations, personalization, and advertising",
        dataSharing: "Data may be shared with content partners and advertisers",
        clause:
          "Section 12.1: We collect and analyze viewing habits including content selection, viewing duration, and frequency.",
      },
    ],
    autoRenewals: [
      {
        id: "ar1",
        description:
          "All subscription plans automatically renew until canceled",
        period: "Monthly or Annual (depending on selected plan)",
        cancellationTerms: "Requires 30 days notice through account settings",
        clause:
          "Section 7.1: All subscription plans automatically renew at the end of each billing cycle until canceled by the user.",
      },
    ],
    keyPoints: [
      {
        id: "kp1",
        title: "Content Restrictions",
        description:
          "Account sharing limited to household members only. Violation may result in account termination.",
        category: "general",
      },
      {
        id: "kp2",
        title: "Service Changes",
        description:
          "Content library subject to change without notice. No guarantee of specific content availability.",
        category: "other",
      },
    ],
  },
];

export const mockHistory = mockAnalysisResults;
