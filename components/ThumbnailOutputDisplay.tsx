import React from 'react';
import { ArrowDownTrayIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface ThumbnailOutputDisplayProps {
  content: string; // This will now be a base64 image string
  isLoading: boolean;
}

export const ThumbnailOutputDisplay: React.FC<ThumbnailOutputDisplayProps> = ({ content, isLoading }) => {
  
  const handleDownload = () => {
    if (!content) return;
    const link = document.createElement('a');
    link.href = content;
    link.download = `thumbnail-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
        <div className="w-full h-full p-6 rounded-2xl glass-input flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Generating your thumbnail...</p>
            </div>
        </div>
    );
  }

  if (!content) {
      return (
        <div className="w-full h-full p-6 rounded-2xl glass-input flex flex-col items-center justify-center text-slate-400/70 dark:text-slate-500">
            <PhotoIcon className="h-16 w-16 mb-4 opacity-50" />
            <p className="italic">Your generated thumbnail will appear here.</p>
        </div>
      );
  }

  // Check if content is actually an image data URL
  const isImage = content.startsWith('data:image');

  if (!isImage) {
     return (
        <div className="w-full h-full p-6 rounded-2xl glass-input overflow-y-auto text-red-500">
           Error: Invalid image data received.
        </div>
     );
  }

  return (
    <div className="w-full h-full p-4 rounded-2xl glass-input flex flex-col">
      <div className="flex-grow flex items-center justify-center bg-slate-100 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-4 shadow-inner relative group">
         <img 
           src={content} 
           alt="Generated Thumbnail" 
           className="max-w-full max-h-full object-contain shadow-lg"
         />
         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
      </div>

      <button
        onClick={handleDownload}
        className="w-full py-3 bg-green-500 text-white rounded-xl font-bold shadow-lg shadow-green-500/30 hover:bg-green-600 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <ArrowDownTrayIcon className="h-5 w-5" />
        Download Thumbnail
      </button>
    </div>
  );
};