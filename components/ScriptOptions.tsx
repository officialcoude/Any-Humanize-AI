import React from 'react';
import { ScriptFormat, ScriptStyle, CaptionTone, Platform } from '../types';
import { LanguageIcon, FilmIcon, AdjustmentsHorizontalIcon, DevicePhoneMobileIcon, UserGroupIcon, SparklesIcon, FaceSmileIcon } from '@heroicons/react/24/outline';

interface ScriptOptionsProps {
  format: ScriptFormat;
  setFormat: (format: ScriptFormat) => void;
  language: string;
  setLanguage: (lang: string) => void;
  style: ScriptStyle;
  setStyle: (style: ScriptStyle) => void;
  platform: Platform;
  setPlatform: (platform: Platform) => void;
  captionTone: CaptionTone;
  setCaptionTone: (tone: CaptionTone) => void;
  audience: string;
  setAudience: (audience: string) => void;
  addEmojis: boolean;
  setAddEmojis: (add: boolean) => void;
  disabled: boolean;
}

const LANGUAGES = [
  { 
    group: "Popular Indian Languages", 
    options: ["Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Urdu", "Odia", "Assamese", "Bhojpuri", "Konkani", "Manipuri", "Sanskrit"]
  },
  { 
    group: "Global Languages", 
    options: ["English", "Spanish", "French", "German", "Portuguese", "Italian", "Arabic", "Chinese", "Japanese", "Korean", "Russian"]
  }
];

const POPULAR_AUDIENCES = [
  'General Audience', 'Gamers', 'Fitness Enthusiasts', 'Parents', 'Travelers', 'Small Business Owners', 'Art Lovers', 'YouTubers/Creators', 'Students', 'Tech Geeks', 'Foodies', 'Fashionistas', 'Pet Owners', 'Music Lovers', 'Entrepreneurs', 'Devotional Audience', 'Astrology Seekers', 'Couples'
];

export const ScriptOptions: React.FC<ScriptOptionsProps> = ({ 
  format, setFormat, language, setLanguage, style, setStyle,
  platform, setPlatform, captionTone, setCaptionTone, audience, setAudience, addEmojis, setAddEmojis, disabled 
}) => {
  
  const handleAudienceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'Custom...') {
      setAudience(''); 
    } else {
      setAudience(value);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Content Type */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-2">
            <FilmIcon className="h-3 w-3" /> Content Type
          </label>
          <div className="relative">
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as ScriptFormat)}
              disabled={disabled}
              className="w-full p-3 rounded-xl glass-input appearance-none text-slate-800 dark:text-slate-200 outline-none focus:border-green-500 dark:focus:border-green-500 cursor-pointer font-medium"
            >
              {Object.values(ScriptFormat).map((f) => (
                <option key={f} value={f} className="bg-white dark:bg-slate-800">{f}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. Target Language */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-2">
            <LanguageIcon className="h-3 w-3" /> Target Language
          </label>
          <div className="relative">
            <select
               value={language}
               onChange={(e) => setLanguage(e.target.value)}
               disabled={disabled}
               className="w-full p-3 rounded-xl glass-input appearance-none text-slate-800 dark:text-slate-200 outline-none focus:border-green-500 dark:focus:border-green-500 font-medium cursor-pointer"
            >
               {LANGUAGES.map((group) => (
                 <optgroup key={group.group} label={group.group} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold">
                   {group.options.map((lang) => <option key={lang} value={lang} className="font-normal">{lang}</option>)}
                 </optgroup>
               ))}
            </select>
          </div>
        </div>

        {/* 3. Script Style */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-2">
            <AdjustmentsHorizontalIcon className="h-3 w-3" /> Script Style
          </label>
          <div className="relative">
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as ScriptStyle)}
              disabled={disabled}
              className="w-full p-3 rounded-xl glass-input appearance-none text-slate-800 dark:text-slate-200 outline-none focus:border-green-500 dark:focus:border-green-500 cursor-pointer font-medium"
            >
              {Object.values(ScriptStyle).map((s) => (
                <option key={s} value={s} className="bg-white dark:bg-slate-800">{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. Platform Type */}
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
                <option key={p} value={p} className="bg-white dark:bg-slate-800">{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 5. Caption Style */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-2">
            <SparklesIcon className="h-3 w-3" /> Caption Style
          </label>
          <div className="relative">
            <select
              value={captionTone}
              onChange={(e) => setCaptionTone(e.target.value as CaptionTone)}
              disabled={disabled}
              className="w-full p-3 rounded-xl glass-input appearance-none text-slate-800 dark:text-slate-200 outline-none focus:border-green-500 dark:focus:border-green-500 cursor-pointer font-medium"
            >
              {Object.values(CaptionTone).map((t) => (
                <option key={t} value={t} className="bg-white dark:bg-slate-800">{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 6. Target Audience */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-2">
            <UserGroupIcon className="h-3 w-3" /> Target Audience
          </label>
          <div className="relative">
            <select
              value={POPULAR_AUDIENCES.includes(audience) ? audience : 'Custom...'}
              onChange={handleAudienceSelect}
              disabled={disabled}
              className="w-full p-3 rounded-xl glass-input appearance-none text-slate-800 dark:text-slate-200 outline-none focus:border-green-500 dark:focus:border-green-500 cursor-pointer font-medium"
            >
              <option value="Custom...">Custom / Other</option>
              {POPULAR_AUDIENCES.map((aud) => (
                <option key={aud} value={aud} className="bg-white dark:bg-slate-800">{aud}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Custom Audience Input (Conditional) */}
      {(!POPULAR_AUDIENCES.includes(audience) && audience !== '') || audience === 'Custom...' ? (
        <div className="relative animate-fade-in-up">
          <input
            type="text"
            value={audience === 'Custom...' ? '' : audience}
            onChange={(e) => setAudience(e.target.value)}
            disabled={disabled}
            placeholder="Type your specific target audience..."
            className="w-full p-3 rounded-xl glass-input text-slate-800 dark:text-slate-200 outline-none focus:border-green-500 dark:focus:border-green-500 font-medium border-2 border-green-100 dark:border-green-900/30"
            autoFocus
          />
        </div>
      ) : null}

      {/* 7. Auto-Add Emojis */}
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