'use client';

import { useState } from 'react';
import VideoInputCard from '@/components/VideoInputCard';
import SummaryResult from '@/components/SummaryResult';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function HomePage() {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            AI Video Summarizer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Paste a YouTube or Vimeo URL — get a concise, actionable summary in seconds.
          </p>
        </header>

        <ErrorBoundary>
          <VideoInputCard
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
            onSummarize={() => {
              setIsProcessing(true);
              setError(null);
              // Simulate API call
              setTimeout(() => {
                setSummary(
                  `This video covers key concepts in machine learning, including supervised vs unsupervised learning, model evaluation metrics (accuracy, precision, recall), and real-world deployment challenges. It emphasizes data quality, bias mitigation, and iterative experimentation.`
                );
                setIsProcessing(false);
              }, 1500);
            }}
            isProcessing={isProcessing}
            error={error}
          />
        </ErrorBoundary>

        {summary && (
          <ErrorBoundary>
            <SummaryResult summary={summary} />
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}