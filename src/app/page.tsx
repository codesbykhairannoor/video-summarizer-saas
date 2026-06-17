import VideoInputCard from '@/components/VideoInputCard';
import SummaryResult from '@/components/SummaryResult';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Video Summarizer
        </h1>
        <p className="mt-2 text-gray-600">
          Paste a video URL and get a concise, AI-powered summary in seconds.
        </p>
      </header>

      <div className="space-y-8">
        <ErrorBoundary>
          <VideoInputCard />
        </ErrorBoundary>

        <ErrorBoundary>
          <SummaryResult />
        </ErrorBoundary>
      </div>
    </main>
  );
}