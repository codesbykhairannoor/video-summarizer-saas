import { VideoInputCard } from '@/components/VideoInputCard';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Video Summarizer
          </h1>
          <p className="mt-3 text-xl text-gray-600 max-w-2xl mx-auto">
            Transform long videos into concise, actionable summaries — in seconds.
          </p>
        </header>

        <main>
          <ErrorBoundary>
            <VideoInputCard onFileSelect={() => {}} />
          </ErrorBoundary>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="text-blue-600 font-bold text-lg mb-2">1</div>
                <h3 className="font-semibold text-gray-900">Upload</h3>
                <p className="mt-1 text-gray-600 text-sm">Drag & drop or select any MP4, MOV, or AVI file up to 500MB.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="text-blue-600 font-bold text-lg mb-2">2</div>
                <h3 className="font-semibold text-gray-900">Process</h3>
                <p className="mt-1 text-gray-600 text-sm">Our AI analyzes speech, visuals, and context in real time.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="text-blue-600 font-bold text-lg mb-2">3</div>
                <h3 className="font-semibold text-gray-900">Summarize</h3>
                <p className="mt-1 text-gray-600 text-sm">Get key points, timestamps, and shareable transcripts instantly.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}