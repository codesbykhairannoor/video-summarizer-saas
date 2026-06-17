import { VideoSummary } from '@/types';

// Mock API responses for development
export const mockSummarizeVideo = async (file: File): Promise<VideoSummary> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    id: `summary_${Date.now()}`,
    title: `${file.name} Summary`,
    summary: `This is a simulated summary of the video \"${file.name}\". The AI detected key topics including machine learning, deployment patterns, and performance optimization. Key timestamps: 0:45 - Introduction, 2:30 - Core architecture, 5:12 - Best practices.`,
    duration: '6:42',
    thumbnailUrl: '/placeholder-thumbnail.jpg',
    createdAt: new Date().toISOString(),
  };
};