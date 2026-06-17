'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import VideoInputCard from '@/components/VideoInputCard';
import SummaryResult from '@/components/SummaryResult';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            AI-Powered Video Summarizer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload any video — get concise, accurate summaries in seconds. No sign-up required.
          </p>
        </header>

        <ErrorBoundary>
          <VideoInputCard />
          <SummaryResult />
        </ErrorBoundary>
      </div>
    </main>
  );
}