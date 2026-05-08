import React from 'react';
import { LanguageIcon } from '@heroicons/react/24/outline';

interface SeoOptionsProps {
  language: string;
  setLanguage: (lang: string) => void;
  disabled: boolean;
}

const LANGUAGES = [
  { 
    group: "Popular Indian Languages", 
    options: [
      "Hindi",
      "Bengali",
      "Tamil",
      "Telugu",
      "Marathi",
      "Gujarati",
      "Kannada",
      "Malayalam",
      "Punjabi",
      "Urdu",
      "Odia",
      "Assamese",
      "Bhojpuri",
      "Konkani",
      "Manipuri",
      "Sanskrit"
    ]
  },
  { 
    group: "Global Languages", 
    options: [
      "English",
      "Spanish",
      "French",
      "German",
      "Portuguese",
      "Italian",
      "Arabic",
      "Chinese",
      "Japanese",
      "Korean",
      "Russian"
    ]
  }
];

export const SeoOptions: React.FC<SeoOptionsProps> = ({ 
  language, 
  setLanguage, 
  disabled 
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 mb-6 animate-fade-in">
      {/* Language Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-2">
          <LanguageIcon className="h-3 w-3" /> Metadata Language
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
                 {group.options.map((lang) => (
                   <option key={lang} value={lang} className="font-normal">
                     {lang}
                   </option>
                 ))}
               </optgroup>
             ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};