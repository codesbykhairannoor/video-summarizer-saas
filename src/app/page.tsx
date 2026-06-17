import VideoInputCard from '@/components/VideoInputCard';
import SummaryResult from '@/components/SummaryResult';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home() {
  const [summary, setSummary] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setError(null);
    // In production, this would call the real API
    // For now, we'll simulate with mock data
    import('@/lib/mock-api').then(({ mockSummarizeVideo }) => {
      mockSummarizeVideo(file)
        .then(setSummary)
        .catch((err) => {
          console.error('Failed to summarize video:', err);
          setError('Failed to process video. Please try again.');
        });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Video Summarizer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform long videos into concise, actionable summaries in seconds. Perfect for meetings, lectures, and content analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Video</h2>
            <ErrorBoundary>
              <VideoInputCard onFileSelect={handleFileSelect} />
            </ErrorBoundary>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary Result</h2>
            <ErrorBoundary>
              {summary ? (
                <SummaryResult summary={summary} />
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your summary will appear here</h3>
                    <p className="text-gray-500 max-w-xs">
                      Upload a video to generate an AI-powered summary with key insights and timestamps.
                    </p>
                  </div>
                </div>
              )}
            </ErrorBoundary>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}