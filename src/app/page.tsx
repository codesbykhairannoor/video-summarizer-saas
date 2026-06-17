'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import VideoInputCard from '@/components/VideoInputCard';
import SummaryResult from '@/components/SummaryResult';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </header>

        <ErrorBoundary>
          <VideoInputCard />
        </ErrorBoundary>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            {t('recentSummaries')}
          </h2>
          <SummaryResult />
        </div>
      </div>
    </div>
  );
}