import ErrorBoundary from '@/components/ErrorBoundary';

// This is a Server Component by default, so wrap ErrorBoundary in a Client Component boundary
// Since ErrorBoundary is a Client Component, it must be used inside a Client Component context.
// We'll mark this page as a Client Component to satisfy the requirement.
'use client';

import { useState } from 'react';
import VideoInputCard from '@/components/VideoInputCard';
import SummaryResult from '@/components/SummaryResult';

export default function HomePage() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            AI Video Summarizer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Paste a YouTube URL or upload a video file. Our AI will generate a concise, actionable summary in seconds.
          </p>
        </header>

        <main>
          <ErrorBoundary>
            <VideoInputCard onSummarize={(result) => {
              setSummary(result);
              setIsProcessing(false);
            }} setIsProcessing={setIsProcessing} />
          </ErrorBoundary>

          {summary && (
            <ErrorBoundary>
              <SummaryResult summary={summary} />
            </ErrorBoundary>
          )}
        </main>
      </div>
    </div>
  );
}