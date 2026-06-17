import VideoInputCard from '@/components/VideoInputCard';
import SummaryResult from '@/components/SummaryResult';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Video Summarizer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Paste a YouTube URL or upload a video file — get concise, actionable summaries in seconds.
          </p>
        </header>

        <main>
          <ErrorBoundary>
            <VideoInputCard />
          </ErrorBoundary>

          <div className="mt-12">
            <ErrorBoundary>
              <SummaryResult />
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
}