import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { VideoInputCard } from '@/components/VideoInputCard';
import { SummaryResult } from '@/components/SummaryResult';
import { Skeleton } from '@/components/Skeleton';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { validateYouTubeUrl, validateTikTokUrl } from '@/lib/validators';
import { generateMockSummary } from '@/lib/mock-api';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const [inputType, setInputType] = useState<'url' | 'file'>('url');
  const [inputValue, setInputValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<any | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state on input change
  useEffect(() => {
    setSummary(null);
    setError(null);
  }, [inputValue, inputType]);

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = [
      'video/mp4',
      'video/mov',
      'video/mkv',
      'video/webm',
      'video/avi',
      'video/mxf',
    ];
    if (!validTypes.includes(file.type)) {
      setError(t('errors.invalidFileType', { type: file.type }));
      return;
    }

    if (file.size > 2 * 1024 * 1024 * 1024) {
      // 2GB limit
      setError(t('errors.fileTooLarge'));
      return;
    }

    setInputValue(file.name);
    setInputType('file');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!inputValue.trim()) {
      setError(t('errors.emptyInput'));
      return;
    }

    if (inputType === 'url') {
      const isYouTube = validateYouTubeUrl(inputValue);
      const isTikTok = validateTikTokUrl(inputValue);
      if (!isYouTube && !isTikTok) {
        setError(t('errors.invalidUrl'));
        return;
      }
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate progressive processing
      const intervals = [20, 40, 60, 80];
      intervals.forEach((p, i) => {
        setTimeout(() => setProgress(p), i * 800);
      });

      // Mock API call
      const result = await generateMockSummary(inputValue, inputType, locale);
      setSummary(result);
      setProgress(100);
    } catch (err) {
      setError(t('errors.processingFailed'));
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12 md:py-20"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p
          className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="inline-flex rounded-xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl"
        >
          <button
            type="button"
            onClick={() => setInputType('url')}
            className={cn(
              'px-6 py-3 font-medium transition-all duration-200',
              inputType === 'url'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400',
            )}
          >
            {t('input.url')}
          </button>
          <button
            type="button"
            onClick={() => setInputType('file')}
            className={cn(
              'px-6 py-3 font-medium transition-all duration-200',
              inputType === 'file'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400',
            )}
          >
            {t('input.file')}
          </button>
        </motion.div>
      </motion.section>

      {/* Input Card */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-20"
      >
        <ErrorBoundary fallback={<div className="text-red-500 p-4 rounded-lg bg-red-50 dark:bg-red-900/20">{t('errors.unexpected')}</div>}>
          <VideoInputCard
            inputType={inputType}
            inputValue={inputValue}
            setInputValue={setInputValue}
            isDragging={isDragging}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onFileSelect={() => fileInputRef.current?.click()}
            onSubmit={handleSubmit}
            fileInputRef={fileInputRef}
            error={error}
          />
        </ErrorBoundary>
      </motion.section>

      {/* Processing State / Result */}
      <AnimatePresence mode="wait">
        {isProcessing && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 md:p-8 shadow-xl">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center">
                <span className="animate-pulse w-3 h-3 rounded-full bg-indigo-500 mr-3"></span>
                {t('processing.title')}
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>{t('processing.analyzing')}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {[
                    { label: t('processing.transcribing'), icon: '📝' },
                    { label: t('processing.diarizing'), icon: '👥' },
                    { label: t('processing.summarizing'), icon: '🧠' },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex items-center p-3 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg border border-slate-200/30 dark:border-slate-700/30"
                    >
                      <span className="text-lg mr-2">{step.icon}</span>
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {step.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {summary && !isProcessing && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <SummaryResult summary={summary} locale={locale} />
          </motion.div>
        )}

        {!summary && !isProcessing && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 md:p-8 shadow-xl">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
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
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                  {t('placeholder.title')}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-md">
                  {t('placeholder.description')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <section id="features" className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: t('features.semanticChapters.title'),
              desc: t('features.semanticChapters.desc'),
              icon: '🔖',
            },
            {
              title: t('features.speakerDiarization.title'),
              desc: t('features.speakerDiarization.desc'),
              icon: '🎙️',
            },
            {
              title: t('features.citationAware.title'),
              desc: t('features.citationAware.desc'),
              icon: '🔍',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-2xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Schema.org structured data for AI crawlers */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
      >
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `https://app.videosummarizer.ai/${locale}/`,
          url: `https://app.videosummarizer.ai/${locale}/`,
          name: t('seo.title'),
          description: t('seo.description'),
          inLanguage: locale,
          isPartOf: {
            '@id': 'https://app.videosummarizer.ai/',
          },
          primaryImageOfPage: {
            '@id': `https://app.videosummarizer.ai/og-image-${locale}.png`,
          },
        })}
      </script>
    </div>
  );
}