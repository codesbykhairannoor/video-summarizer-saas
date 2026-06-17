import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Button from '@/components/Button';
import CopyIcon from '@/components/icons/CopyIcon';
import DownloadIcon from '@/components/icons/DownloadIcon';

interface SummaryResultProps {
  summary: string;
  onReset: () => void;
  isLoading: boolean;
}

export default function SummaryResult({ summary, onReset, isLoading }: SummaryResultProps) {
  const locale = useLocale();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `video-summary-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Use useEffect minimally (e.g., for analytics or side effects)
  useEffect(() => {
    // Optional: track summary view
  }, []);

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Summary</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={isLoading}>
              <CopyIcon className="h-4 w-4 mr-2" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} disabled={isLoading}>
              <DownloadIcon className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
        <div className="prose prose-sm max-w-none">
          <p>{summary}</p>
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onReset} disabled={isLoading}>
            Summarize Another Video
          </Button>
        </div>
      </div>
    </div>
  );
}