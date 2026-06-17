import { VideoInputCard } from '@/components/VideoInputCard';
import { SummaryResult } from '@/components/SummaryResult';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900">Video Summarizer</h1>
        <p className="mt-2 text-lg text-gray-600">
          Upload a video and get AI-powered summaries in seconds
        </p>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <VideoInputCard onFileSelect={() => {}} />
        <SummaryResult />
      </main>
    </div>
  );
}