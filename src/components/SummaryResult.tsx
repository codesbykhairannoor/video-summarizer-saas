'use client';

import { useState, useEffect, useRef } from 'react';

export default function SummaryResult() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const generateSummary = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setError(null);
    setSummary(null);
    
    abortControllerRef.current = new AbortController();
    
    try {
      // Simulate API call with mock delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSummary = `• Key topic: Climate policy implementation across EU member states.
• Main findings: 72% of countries met 2023 emissions targets; top performers used AI-driven grid optimization.
• Action items: Scale pilot programs in Eastern Europe; align subsidy frameworks by Q3.`;
      
      setSummary(mockSummary);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        setError('Failed to generate summary. Please try again.');
      }
    } finally {
      setIsProcessing(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary Output</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={generateSummary}
          disabled={isProcessing}
          className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isProcessing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
          }`}
        >
          {isProcessing ? 'Generating...' : 'Generate Summary'}
        </button>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      {summary ? (
        <div className="prose prose-blue max-w-none">
          <h3 className="text-lg font-medium text-gray-800 mb-2">AI Summary</h3>
          <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-md overflow-x-auto">
            {summary}
          </pre>
        </div>
      ) : (
        <div className="text-gray-500 text-sm italic py-6 text-center">
          {isProcessing ? 'Analyzing video content...' : 'Your summary will appear here after generation.'}
        </div>
      )}
    </div>
  );
}