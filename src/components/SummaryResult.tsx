import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import CopyIcon from '@/components/icons/CopyIcon';
import DownloadIcon from '@/components/icons/DownloadIcon';
import Skeleton from '@/components/Skeleton';

interface SummaryResultProps {
  summary?: string;
  isLoading?: boolean;
  locale?: string;
}

const SummaryResult = ({ summary, isLoading, locale = 'en' }: SummaryResultProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!summary) return;
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            disabled={!summary || isLoading}
            className={cn(
              'p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors',
              (!summary || isLoading) && 'opacity-50 cursor-not-allowed'
            )}
            aria-label="Copy summary"
          >
            <CopyIcon />
          </button>
          <button
            onClick={handleDownload}
            disabled={!summary || isLoading}
            className={cn(
              'p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors',
              (!summary || isLoading) && 'opacity-50 cursor-not-allowed'
            )}
            aria-label="Download summary"
          >
            <DownloadIcon />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Skeleton className="h-48 w-full rounded-lg" />
          </motion.div>
        ) : summary ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{summary}</p>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-center py-12 text-gray-500"
          >
            <p>Your summary will appear here after processing.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 text-sm text-green-600 flex items-center justify-center"
          >
            <span>Copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SummaryResult;