import { VideoSummary } from '@/types';

export const generateMockSummary = (file: File): VideoSummary => {
  return {
    id: `summary_${Date.now()}`,
    summary: `This is a simulated summary of the video "${file.name}". The AI detected key topics including machine learning, deployment patterns, and performance optimization. Key timestamps: 0:45 - Introduction, 2:30 - Core architecture, 5:12 - Best practices.`,
    duration: '6:42',
    thumbnailUrl: '/placeholder-thumbnail.jpg'
  };
};