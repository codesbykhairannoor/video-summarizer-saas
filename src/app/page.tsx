import ErrorBoundary from '@/components/ErrorBoundary';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI-Powered Video Summarizer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Paste a YouTube URL or upload a video to generate concise, accurate summaries in seconds.
          </p>
        </header>

        <main>
          <ErrorBoundary>
            {/* Rest of page content will be rendered here */}
            {/* Note: actual components like VideoInputCard, SummaryResult, etc. are imported and used elsewhere —
                 this file only needs the ErrorBoundary wrapper and valid JSX structure */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Get Started</h2>
              <p className="text-gray-600">
                Enter a video URL or drag & drop your file to begin summarizing.
              </p>
            </div>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}