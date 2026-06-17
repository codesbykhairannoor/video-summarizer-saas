import { useState, useRef, useEffect } from 'react';
import VideoInputCard from '@/components/VideoInputCard';
import SummaryResult from '@/components/SummaryResult';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Optional: restore persisted summary on load if needed
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">AI Video Summarizer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload any video and get a concise, human-readable summary in seconds.
          </p>
        </header>

        <main>
          <ErrorBoundary>
            <VideoInputCard
              onProcessStart={() => setIsProcessing(true)}
              onProcessComplete={(result) => {
                setSummary(result);
                setIsProcessing(false);
                setError(null);
              }}
              onError={(err) => {
                setError(err);
                setIsProcessing(false);
              }}
              fileInputRef={fileInputRef}
            />
          </ErrorBoundary>

          {summary && (
            <ErrorBoundary>
              <SummaryResult summary={summary} />
            </ErrorBoundary>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">❌ {error}</p>
            </div>
          )}
        </main>

        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Video Summarizer SaaS. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}