import React from 'react';
import { AppMode } from '../types';
import { 
  SparklesIcon, 
  VideoCameraIcon, 
  TagIcon, 
  DevicePhoneMobileIcon, 
  PaintBrushIcon 
} from '@heroicons/react/24/outline';

interface ModeSelectorProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  disabled: boolean;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange, disabled }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full max-w-4xl mx-auto mb-8 border border-slate-200 dark:border-slate-700">
      {/* 1. Script Writer */}
      <button
        onClick={() => onModeChange(AppMode.SCRIPT)}
        disabled={disabled}
        className={`
          flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300
          ${currentMode === AppMode.SCRIPT
            ? 'bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 shadow-md ring-1 ring-black/5 dark:ring-white/10'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }
        `}
      >
        <VideoCameraIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">Script Writer</span>
        <span className="sm:hidden">Script</span>
      </button>

      {/* 2. Humanize Text */}
      <button
        onClick={() => onModeChange(AppMode.HUMANIZE)}
        disabled={disabled}
        className={`
          flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300
          ${currentMode === AppMode.HUMANIZE
            ? 'bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 shadow-md ring-1 ring-black/5 dark:ring-white/10'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }
        `}
      >
        <SparklesIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">Humanize</span>
        <span className="sm:hidden">Humanize</span>
      </button>

      {/* 3. YouTube SEO */}
      <button
        onClick={() => onModeChange(AppMode.SEO_YT)}
        disabled={disabled}
        className={`
          flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300
          ${currentMode === AppMode.SEO_YT
            ? 'bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 shadow-md ring-1 ring-black/5 dark:ring-white/10'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }
        `}
      >
        <TagIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">YouTube SEO</span>
        <span className="sm:hidden">SEO</span>
      </button>

      {/* 4. Viral Captions */}
      <button
        onClick={() => onModeChange(AppMode.CAPTION)}
        disabled={disabled}
        className={`
          flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300
          ${currentMode === AppMode.CAPTION
            ? 'bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 shadow-md ring-1 ring-black/5 dark:ring-white/10'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }
        `}
      >
        <DevicePhoneMobileIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">Viral Captions</span>
        <span className="sm:hidden">Captions</span>
      </button>

      {/* 5. Thumbnail Ideas */}
      <button
        onClick={() => onModeChange(AppMode.THUMBNAIL)}
        disabled={disabled}
        className={`
          flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300
          ${currentMode === AppMode.THUMBNAIL
            ? 'bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 shadow-md ring-1 ring-black/5 dark:ring-white/10'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }
        `}
      >
        <PaintBrushIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">Thumbnails</span>
        <span className="sm:hidden">Thumbs</span>
      </button>
    </div>
  );
};
