import { SummaryResponse } from '@/types';

// Mock API responses for development
export const mockSummaryResponse: SummaryResponse = {
  id: 'mock-123',
  videoId: 'vid-456',
  summary: 'This video explains how to build scalable Next.js applications using App Router, server components, and streaming. Key topics include data fetching patterns, caching strategies, and optimizing bundle size.',
  keyPoints: [
    'Use server components for data fetching when possible',
    'Leverage ISR and revalidation for dynamic content',
    'Optimize images and fonts with built-in Next.js optimizations',
    'Implement proper error boundaries and loading states'
  ],
  duration: '2m 45s',
  timestamp: new Date().toISOString(),
};

// Mock upload handler — simplified for dev
export async function mockUploadVideo(file: File): Promise<{ id: string }> {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 800));
  return { id: `mock-${Date.now()}` };
}

// Mock fetch summary — simplified for dev
export async function mockFetchSummary(videoId: string): Promise<SummaryResponse> {
  await new Promise((r) => setTimeout(r, 1200));
  return { ...mockSummaryResponse, videoId };
}