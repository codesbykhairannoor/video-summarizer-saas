import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';

interface VideoInputCardProps {
  onUpload: (file: File) => void;
  onUrlSubmit: (url: string) => void;
}

const VideoInputCard = ({ onUpload, onUrlSubmit }: VideoInputCardProps) => {
  const [url, setUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onUpload(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onUpload(files[0]);
    }
  };

  const handleSubmitUrl = (e: FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onUrlSubmit(url.trim());
      setUrl('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Upload or paste video</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload video file
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <p className="text-gray-600 mb-2">Drag & drop your video here</p>
          <p className="text-sm text-gray-500 mb-3">or click to browse</p>
          <Button variant="outline" size="sm">
            Select file
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or paste video URL
        </label>
        <form onSubmit={handleSubmitUrl} className="flex gap-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/video.mp4"
            className="flex-1"
            aria-label="Video URL input"
          />
          <Button type="submit" disabled={!url.trim()}>
            Process
          </Button>
        </form>
      </div>

      <div className="text-xs text-gray-500">
        <p>Supported formats: MP4, MOV, AVI, WebM (max 500MB)</p>
      </div>
    </div>
  );
};

export default VideoInputCard;