'use client';

import { useState, useRef, ChangeEvent } from 'react';

interface VideoInputCardProps {
  onFileSelect?: (file: File | null) => void;
}

export default function VideoInputCard({ onFileSelect }: VideoInputCardProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect?.(file);
    } else {
      setFileName(null);
      onFileSelect?.(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />
      <p className="text-gray-500 mb-2">Drag & drop a video file or</p>
      <button
        type="button"
        onClick={triggerFileInput}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Browse Files
      </button>
      {fileName && (
        <p className="mt-3 text-sm text-gray-600 truncate max-w-xs mx-auto">
          Selected: {fileName}
        </p>
      )}
    </div>
  );
}