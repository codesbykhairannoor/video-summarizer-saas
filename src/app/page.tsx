import { VideoInputCard } from '@/components/VideoInputCard';
import { SummaryResult } from '@/components/SummaryResult';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function HomePage() {
  const handleFileSelect = (file: File | null) => {
    // Intentionally empty — delegated to VideoInputCard's internal logic or child handlers
    // If needed later, can be expanded for analytics, validation, etc.
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            AI Video Summarizer
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Upload any video and get a concise, accurate summary in seconds — powered by state-of-the-art LLMs.
          </p>
        </header>

        <main className="space-y-12">
          <ErrorBoundary>
            <VideoInputCard onFileSelect={handleFileSelect} />
            <SummaryResult />
          </ErrorBoundary>
        </main>

        <footer className="mt-24 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} VideoSummarizer SaaS. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}