import { SummaryResponse } from '../types';

// Mock API response type
interface MockApiResponse {
  summary: string;
  keyPoints: string[];
  duration: string;
  timestamp: string;
}

// Simulate API call with realistic delay and structure
export async function mockSummarizeVideo(file: File): Promise<SummaryResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Mock response — matches SummaryResponse shape
  const mockData: MockApiResponse = {
    summary: `This video discusses the evolution of AI-powered video summarization techniques over the past five years. It highlights three major breakthroughs: contextual frame sampling, transformer-based temporal modeling, and real-time multi-modal alignment. The presenter emphasizes trade-offs between accuracy and latency, especially for SaaS deployments handling concurrent users.`,
    keyPoints: [
      'Contextual frame sampling improves relevance by 37% vs uniform sampling',
      'Transformer-based temporal modeling enables cross-shot coherence',
      'Real-time multi-modal alignment supports voice + visual cue fusion'
    ],
    duration: '4m 22s',
    timestamp: new Date().toISOString(),
  };

  return {
    success: true,
    data: {
      summary: mockData.summary,
      keyPoints: mockData.keyPoints,
      duration: mockData.duration,
      timestamp: mockData.timestamp,
    },
  };
}

export async function mockGetStatus(id: string): Promise<{ status: 'processing' | 'completed' | 'failed'; progress?: number }> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { status: 'completed' };
}