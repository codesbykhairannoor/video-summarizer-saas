'use client';

import { useState, useRef, ChangeEvent } from 'react';

interface VideoInputCardProps {
  onFileSelect: (file: File) => void;
}

export default function VideoInputCard({ onFileSelect }: VideoInputCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setFileName(file.name);
        onFileSelect(file);
      }
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('video/')) {
        setFileName(file.name);
        onFileSelect(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="video/*"
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v.01M12 13v.01M12 16v.01M12 21h.01M12 12h.01M12 15h.01M12 18h.01M12 4h.01M12 7h.01" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Upload Video</h3>
          <p className="text-sm text-gray-500 mt-1">
            Drag & drop your video file here, or click to browse
          </p>
          {fileName && (
            <p className="text-sm text-green-600 mt-2 truncate max-w-xs">✓ {fileName}</p>
          )}
        </div>
        <p className="text-xs text-gray-400">MP4, MOV, AVI (max 500MB)</p>
      </div>
    </div>
  );
}