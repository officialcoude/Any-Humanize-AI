import React from 'react';
import { CaptionTone, Platform } from '../types';
import { UserGroupIcon, SparklesIcon, DevicePhoneMobileIcon, FaceSmileIcon } from '@heroicons/react/24/outline';

interface CaptionOptionsProps {
  tone: CaptionTone;
  setTone: (tone: CaptionTone) => void;
  audience: string;
  setAudience: (audience: string) => void;
  platform: Platform;
  setPlatform: (platform: Platform) => void;
  addEmojis: boolean;
  setAddEmojis: (add: boolean) => void;
  disabled: boolean;
}

const POPULAR_AUDIENCES = [
  'General Audience',
  'Gamers',
  'Fitness Enthusiasts',
  'Parents',
  'Travelers',
  'Small Business Owners',
  'Art Lovers',
  'YouTubers/Creators',
  'Students',
  'Tech Geeks',
  'Foodies',
  'Fashionistas',
  'Pet Owners',
  'Music Lovers',
  'Entrepreneurs',
  'Custom...' 
];

export const CaptionOptions: React.FC<CaptionOptionsProps> = ({ 
  tone, 
  setTone, 
  audience, 
  setAudience,
  platform,
  setPlatform,
  addEmojis,
  setAddEmojis,
  disabled 
}) => {
  const handleAudienceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'Custom...') {
      setAudience(''); // Clear to let user type
    } else {
      setAudience(value);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-fade-in">
      {/* Platform Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-2">
          <DevicePhoneMobileIcon className="h-3 w-3" /> Platform
        </label>
        <div className="relative">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            disabled={disabled}
            className="w-full p-3 rounded-xl glass-input appearance-none text-slate-800 dark:text-slate-200 outline-none focus:border-green-500 dark:focus:border-green-500 cursor-pointer font-medium"
          >
            {Object.values(Platform).map((p) => (
              <option key={p} value={p} className="bg-white dark:bg-slate-800">
                {p}
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

      {/* Tone Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-2">
          <SparklesIcon className="h-3 w-3" /> Caption Style
        </label>
        <div className="relative">
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as CaptionTone)}
            disabled={disabled}
            className="w-full p-3 rounded-xl glass-input appearance-none text-slate-800 dark:text-slate-200 outline-none focus:border-green-500 dark:focus:border-green-500 cursor-pointer font-medium"
          >
            {Object.values(CaptionTone).map((t) => (
              <option key={t} value={t} className="bg-white dark:bg-slate-800">
                {t}
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

      {/* Audience Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-2">
          <UserGroupIcon className="h-3 w-3" /> Target Audience
        </label>
        
        <div className="space-y-2">
          <div className="relative">
            <select
              value={POPULAR_AUDIENCES.includes(audience) ? audience : 'Custom...'}
              onChange={handleAudienceSelect}
              disabled={disabled}
              className="w-full p-3 rounded-xl glass-input appearance-none text-slate-800 dark:text-slate-200 outline-none focus:border-green-500 dark:focus:border-green-500 cursor-pointer font-medium"
            >
              {POPULAR_AUDIENCES.map((aud) => (
                <option key={aud} value={aud} className="bg-white dark:bg-slate-800">
                  {aud}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
              </svg>
            </div>
          </div>

          {/* Custom Input */}
          {(!POPULAR_AUDIENCES.includes(audience) || audience === 'Custom...') && (
            <div className="relative animate-fade-in-up">
              <input
                type="text"
                value={audience === 'Custom...' ? '' : audience}
                onChange={(e) => setAudience(e.target.value)}
                disabled={disabled}
                placeholder="Type specific audience (e.g. 90s Kids)..."
                className="w-full p-3 rounded-xl glass-input text-slate-800 dark:text-slate-200 outline-none focus:border-green-500 dark:focus:border-green-500 font-medium border-2 border-green-100 dark:border-green-900/30"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>

      {/* Emojis Toggle */}
      <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
        <div className="flex items-center gap-2">
          <FaceSmileIcon className="h-5 w-5 text-green-500" />
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Auto-Add Emojis</span>
        </div>
        <button
          onClick={() => !disabled && setAddEmojis(!addEmojis)}
          className={`
            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
            ${addEmojis ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <span
            aria-hidden="true"
            className={`
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
              ${addEmojis ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
      </div>
    </div>
  );
};