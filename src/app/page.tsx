import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import VideoInputCard from '@/components/VideoInputCard';
import SummaryResult from '@/components/SummaryResult';

export default function HomePage() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Optional: add minimal useEffect usage if needed (e.g., analytics or scroll tracking)
  useEffect(() => {
    // Example placeholder — remove or replace with real logic if needed
    if (ref.current) {
      // e.g., ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AI Video Summarizer</h1>
        <p className="text-lg text-muted-foreground">
          Paste a video URL and get a concise, actionable summary in seconds.
        </p>
      </header>

      <main>
        <VideoInputCard 
          onSummarize={(url) => {
            setIsProcessing(true);
            setError(null);
            // Simulate API call
            setTimeout(() => {
              setSummary(`This is a sample summary for ${url}. It highlights key topics, speaker insights, and action items.`);
              setIsProcessing(false);
            }, 1500);
          }}
          onError={setError}
        />

        <AnimatePresence mode="wait">
          {summary && (
            <SummaryResult 
              summary={summary} 
              onReset={() => setSummary(null)} 
              isLoading={isProcessing} 
            />
          )}
        </AnimatePresence>

        {error && (
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive">
            <p>{error}</p>
          </div>
        )}
      </main>
    </div>
  );
}