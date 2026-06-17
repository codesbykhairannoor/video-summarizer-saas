export interface SummaryResponse {
  success: boolean;
  data?: {
    summary: string;
    keyPoints: string[];
    duration: string;
    timestamp: string;
  };
  error?: string;
}

export interface VideoSummary {
  id: string;
  fileName: string;
  summary: string;
  keyPoints: string[];
  duration: string;
  createdAt: string;
}