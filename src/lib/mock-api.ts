import { SummaryResponse } from '@/types';

// Mock API response type
interface MockApiResponse {
  id: string;
  summary: string;
  duration: number;
  timestamp: string;
}

// Simulated API call with typed response
export const mockFetchSummary = async (input: string, locale: string = 'en'): Promise<SummaryResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock response data
  const mockData: MockApiResponse = {
    id: `summary_${Date.now()}`,
    summary: `This is a concise summary of the video content in ${locale}. It highlights the main points, key takeaways, and important details discussed in the video. The summary is generated using advanced AI techniques to ensure accuracy and relevance.`,
    duration: 120,
    timestamp: new Date().toISOString(),
  };

  return {
    id: mockData.id,
    summary: mockData.summary,
    duration: mockData.duration,
    timestamp: mockData.timestamp,
  };
};