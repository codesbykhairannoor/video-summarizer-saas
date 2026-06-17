'use client';

import { useState, useRef, useEffect } from 'react';
import VideoInputCard from '@/components/VideoInputCard';
import SummaryResult from '@/components/SummaryResult';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              AI Video Summarizer
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Upload any video and get a concise, actionable summary in seconds — powered by LLMs.
            </p>
          </header>
          <main>
            <VideoInputCard />
            <SummaryResult />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}