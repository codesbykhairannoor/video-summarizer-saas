import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

interface VideoInputCardProps {
  inputType: 'url' | 'file';
  inputValue: string;
  setInputValue: (value: string) => void;
  isDragging: boolean;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onFileSelect: () => void;
  onSubmit: (e: FormEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  error: string | null;
}

export function VideoInputCard({
  inputType,
  inputValue,
  setInputValue,
  isDragging,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileSelect,
  onSubmit,
  fileInputRef,
  error,
}: VideoInputCardProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setInputValue(e.target.files[0].name);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 md:p-8 shadow-xl">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">
          {inputType === 'url' ? 'Paste Video URL' : 'Upload Local Video'}
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {inputType === 'url' ? (
              <motion.div
                key="url-input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  type="url"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or https://tiktok.com/@user/video/..."
                  className="w-full text-lg py-4 px-5 rounded-xl border-2 border-slate-200/50 dark:border-slate-800/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200/50 dark:focus:ring-indigo-900/30"
                  aria-label="Video URL input"
                />
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                  Supported: YouTube, TikTok, Vimeo, Dailymotion, Rumble, Odysee
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="file-input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={cn(
                    'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors duration-200',
                    isDragging
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20'
                      : 'border-slate-300/50 dark:border-slate-700/50 hover:border-indigo-400',
                  )}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onClick={onFileSelect}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="video/*"
                    className="hidden"
                    aria-label="Local video file upload"
                  />
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-indigo-600 dark:text-indigo-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-slate-800 dark:text-slate-100">
                        {fileName ? fileName : 'Drag & drop your video file'}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">
                        or click to browse
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                      MP4, MOV, MKV, WebM, AVI, MXF • Max 2GB
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-lg text-red-700 dark:text-red-300 text-sm flex items-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            type="submit"
            size="lg"
            className="w-full py-4 px-6 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700"
            disabled={!inputValue.trim()}
          >
            Generate AI Summary
          </Button>
        </form>
      </div>
    </div>
  );
}