import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { GoogleTagManager } from '@next/third-parties/google';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | VideoSummarizer AI — Enterprise-Grade Video Intelligence',
    default: 'VideoSummarizer AI — Zero-Trust Video Intelligence Platform',
  },
  description:
    'Privacy-preserving, SOC 2–ready AI platform for multilingual video summarization with semantic chaptering, speaker diarization & citation-aware insights. GDPR/CCPA/PIPL compliant.',
  keywords:
    'video summarizer ai, youtube summary, tiktok transcript, multilingual video analysis, enterprise video intelligence, privacy-first ai, ai video chaptering, speaker diarization',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://app.videosummarizer.ai',
    title: 'VideoSummarizer AI — Enterprise-Grade Video Intelligence',
    description:
      'Zero-trust, auditable AI platform transforming any video into factually grounded, multilingual summaries with semantic structure and citation integrity.',
    images: [
      {
        url: '/og-image-en.png',
        width: 1200,
        height: 630,
        alt: 'VideoSummarizer AI — Enterprise Video Intelligence Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VideoSummarizer AI — Zero-Trust Video Intelligence',
    description:
      'GDPR-compliant, multi-modal AI for YouTube, TikTok, local files & HLS/DASH — with speaker diarization, semantic chapters & verifiable citations.',
    images: ['/og-image-en.png'],
  },
  alternates: {
    canonical: 'https://app.videosummarizer.ai',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();
  const t = await getTranslations('Layout');

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data (Organization + SoftwareApplication) */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
        >
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'VideoSummarizer AI',
            url: 'https://app.videosummarizer.ai',
            logo: 'https://app.videosummarizer.ai/logo-dark.svg',
            sameAs: [
              'https://twitter.com/videosummarizer',
              'https://linkedin.com/company/videosummarizer-ai',
              'https://github.com/videosummarizer',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Support',
              email: 'support@videosummarizer.ai',
            },
          })}
        </script>
        <script
          type="application/ld+json"
          suppressHydrationWarning
        >
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'VideoSummarizer AI',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '247',
            },
            featureList: [
              'Multilingual Video Summarization',
              'Speaker Diarization & Attribution',
              'Semantic Chapter Detection',
              'Citation-Aware Key Insight Extraction',
              'Local File Upload (MP4/MOV/MKV/WebM/AVI/MXF)',
              'YouTube/TikTok/Vimeo/Dailymotion/Rumble/Odysee Support',
              'HLS/DASH & Presigned S3 Ingestion',
              'SOC 2 & GDPR/CCPA/PIPL Compliance',
            ],
          })}
        </script>
      </head>
      <body
        className={cn(
          'min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 antialiased transition-colors duration-300',
          'font-sans',
        )}
      >
        <div className="relative min-h-screen flex flex-col">
          {/* Header (Global) */}
          <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl tracking-tight">VS</span>
                </div>
                <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  VideoSummarizer
                </span>
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <a
                  href="#features"
                  className="font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  {t('features')}
                </a>
                <a
                  href="#how-it-works"
                  className="font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  {t('howItWorks')}
                </a>
                <a
                  href="#security"
                  className="font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors duration-200"
                >
                  {t('security')}
                </a>
              </nav>
              
              <div className="flex items-center space-x-4">
                <button className="hidden sm:block px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors duration-200">
                  {t('login')}
                </button>
                <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700">
                  {t('getStarted')}
                </button>
              </div>
            </div>
          </header>

          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200/50 dark:border-slate-800/50 py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">VS</span>
                    </div>
                    <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                      VideoSummarizer AI
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md">
                    {t('footer.description')}
                  </p>
                  <div className="flex mt-4 space-x-4">
                    {['twitter', 'linkedin', 'github', 'discord'].map((platform) => (
                      <a
                        key={platform}
                        href={`https://$platform.com/videosummarizer`}
                        aria-label={platform}
                        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors duration-200"
                      >
                        <span className="sr-only">{platform}</span>
                        <div className="w-4 h-4 bg-current rounded-sm" />
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">
                    {t('footer.product')}
                  </h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li>
                      <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {t('footer.features')}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {t('footer.pricing')}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {t('footer.integrations')}
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">
                    {t('footer.legal')}
                  </h3>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                    <li>
                      <a href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {t('footer.privacy')}
                      </a>
                    </li>
                    <li>
                      <a href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {t('footer.terms')}
                      </a>
                    </li>
                    <li>
                      <a href="/security" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {t('footer.security')}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center text-slate-600 dark:text-slate-400 text-sm">
                <p>© {new Date().getFullYear()} VideoSummarizer AI. {t('footer.allRights')}</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="/compliance/soc2" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    SOC 2 Type II
                  </a>
                  <a href="/compliance/gdpr" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    GDPR Ready
                  </a>
                  <a href="/compliance/ccpa" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    CCPA Compliant
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>

        <GoogleTagManager gtmId="GTM-NXKQZJF" />
      </body>
    </html>
  );
}