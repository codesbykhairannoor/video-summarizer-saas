import { v4 as uuidv4 } from 'uuid';

export async function generateMockSummary(
  input: string,
  type: 'url' | 'file',
  locale: string,
): Promise<any> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 1200));

  const baseSummary = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    locale,
    language: locale === 'es' ? 'es' : locale === 'ja' ? 'ja' : 'en',
    videoTitle: type === 'url'
      ? 'How AI is Transforming Video Production — 2024 Deep Dive'
      : 'product_demo_final.mp4',
    duration: '12m 47s',
    fullSummary:
      'This comprehensive video explores how generative AI is revolutionizing video production workflows across editing, rendering, captioning, and localization. Key innovations include real-time AI-powered color grading, neural upscaling for legacy footage, zero-shot voice cloning for dubbing, and automated semantic chapter detection. The presenter emphasizes ethical guardrails, human-in-the-loop validation, and compliance-first architecture for enterprise adoption.',
    confidenceScore: 0.97,
  };

  // Generate synthetic chapters
  const chapters = [
    {
      id: uuidv4(),
      title: 'Introduction & Agenda',
      timestamp: '00:00',
      summary:
        'Overview of AI’s growing role in video creation, with emphasis on productivity gains and creative augmentation.',
    },
    {
      id: uuidv4(),
      title: 'AI-Powered Editing Suite',
      timestamp: '02:14',
      summary:
        'Demonstration of timeline-aware AI that auto-suggests cuts, transitions, and B-roll based on script context and emotional tone.',
    },
    {
      id: uuidv4(),
      title: 'Neural Rendering & Upscaling',
      timestamp: '05:32',
      summary:
        'Breakthrough in real-time 4K upscaling using diffusion models trained on archival film grain patterns.',
    },
    {
      id: uuidv4(),
      title: 'Ethical Guardrails & Human Oversight',
      timestamp: '09:18',
      summary:
        'Discussion on watermarking AI-generated assets, provenance tracking, and mandatory human review for sensitive content.',
    },
  ];

  // Generate synthetic speakers
  const speakers = [
    {
      id: 'Speaker A',
      utterances: [
        'Welcome everyone — today we’re unveiling our next-generation AI video intelligence platform.',
        'All models are trained exclusively on licensed, consented datasets with strict PIPL/GDPR alignment.',
      ],
    },
    {
      id: 'Speaker B',
      utterances: [
        'The semantic chaptering engine achieves 94% precision by fusing audio embeddings, visual scene changes, and transcript coherence.',
        'Each summary includes timestamped citations so you can verify claims against source footage.',
      ],
    },
  ];

  return {
    ...baseSummary,
    chapters,
    speakers,
  };
}