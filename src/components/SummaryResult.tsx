import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { CopyIcon } from '@/components/icons/CopyIcon';
import { DownloadIcon } from '@/components/icons/DownloadIcon';

interface SummaryResultProps {
  summary: any;
  locale: string;
}

export function SummaryResult({ summary, locale }: SummaryResultProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary.fullSummary);
    setCopied(true);
  };

  const downloadSummary = () => {
    const blob = new Blob([JSON.stringify(summary, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `videosummary-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 md:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
            AI Summary Complete
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {summary.videoTitle || 'Video Analysis'} • {summary.duration} •{' '}
            <Badge variant="success" className="ml-1">
              {summary.language.toUpperCase()}
            </Badge>
          </p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center space-x-2 px-4 py-2"
          >
            <CopyIcon className="w-4 h-4" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadSummary}
            className="flex items-center space-x-2 px-4 py-2"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Download</span>
          </Button>
        </div>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-100/50 dark:border-indigo-800/30">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 flex items-center">
            <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
            Concise Summary
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {summary.fullSummary}
          </p>
        </div>
      </motion.div>

      {/* Chapters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Semantic Chapters
          </h3>
          <Badge variant="secondary" className="text-xs">
            {summary.chapters.length} chapters
          </Badge>
        </div>
        <div className="space-y-4">
          {summary.chapters.slice(0, expanded ? undefined : 3).map((chapter: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-slate-200/30 dark:border-slate-700/30"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm mr-3 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                    {chapter.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {chapter.timestamp} • {chapter.summary}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {summary.chapters.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-4 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show Less' : `Show All ${summary.chapters.length} Chapters`}
          </Button>
        )}
      </motion.div>

      {/* Speaker Diarization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Speaker Diarization
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summary.speakers.map((speaker: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800/50 dark:to-slate-700/50 rounded-lg p-4 border border-slate-200/30 dark:border-slate-700/30"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm mr-2">
                  {speaker.id.charAt(0)}
                </div>
                <h4 className="font-medium text-slate-800 dark:text-slate-100">
                  {speaker.id}
                </h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {speaker.utterances.join(' ')}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}