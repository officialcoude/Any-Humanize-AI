import React, { useRef } from 'react';
import { PhotoIcon, XMarkIcon, PaintBrushIcon } from '@heroicons/react/24/outline';

interface ThumbnailOptionsProps {
  aspectRatio: string;
  setAspectRatio: (ratio: string) => void;
  style: string;
  setStyle: (style: string) => void;
  image: string | null;
  setImage: (image: string | null) => void;
  disabled: boolean;
}

const THUMBNAIL_STYLES = [
  'High Contrast & Bold',
  'Neon & Futuristic',
  'Minimalist & Clean',
  'Dark & Cinematic',
  'Tech & Modern',
  'Vibrant & Colorful',
  'Gaming & Aggressive'
];

export const ThumbnailOptions: React.FC<ThumbnailOptionsProps> = ({
  aspectRatio,
  setAspectRatio,
  style,
  setStyle,
  image,
  setImage,
  disabled
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const ratios = ['16:9', '9:16', '1:1', '3:4'];

  return (
    <div className="space-y-6 animate-fade-in mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Aspect Ratio */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
            Aspect Ratio
          </label>
          <div className="flex flex-wrap gap-2">
            {ratios.map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                disabled={disabled}
                className={`
                  px-3 py-2 rounded-xl text-sm font-medium transition-all
                  ${aspectRatio === ratio
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }
                  ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* Style Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-2">
            <PaintBrushIcon className="h-3 w-3" /> Visual Style
          </label>
          <div className="relative">
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              disabled={disabled}
              className="w-full p-2.5 rounded-xl glass-input appearance-none text-slate-800 dark:text-slate-200 outline-none focus:border-green-500 dark:focus:border-green-500 cursor-pointer font-medium"
            >
              {THUMBNAIL_STYLES.map((s) => (
                <option key={s} value={s} className="bg-white dark:bg-slate-800">
                  {s}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2 md:col-span-2 lg:col-span-1">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">
            Reference Image (Optional)
          </label>
          
          {!image ? (
            <div 
              onClick={() => !disabled && fileInputRef.current?.click()}
              className={`
                border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-3
                flex flex-col items-center justify-center text-center cursor-pointer
                hover:border-green-500 dark:hover:border-green-500 transition-colors
                bg-white/50 dark:bg-slate-800/50 h-[88px]
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <PhotoIcon className="h-5 w-5 text-slate-400 mb-1" />
              <span className="text-xs text-slate-500">Upload Base Image</span>
            </div>
          ) : (
            <div className="relative h-[88px] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group">
              <img src={image} alt="Uploaded" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <button
                onClick={() => {
                  setImage(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      </div>
    </div>
  );
};