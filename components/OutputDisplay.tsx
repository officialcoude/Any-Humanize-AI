import React, { useState } from 'react';
import { DocumentDuplicateIcon, CheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface OutputDisplayProps {
  content: string;
  isLoading: boolean;
  placeholder?: string;
  onClear?: () => void;
  label?: string;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ content, isLoading, placeholder, onClear, label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content || isLoading) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
           <SparklesIcon className="h-4 w-4 text-green-500" />
           {label || "Humanized Output"}
        </label>
        
        <div className="flex items-center gap-2">
          {onClear && content && !isLoading && (
            <button
              onClick={onClear}
              className="p-1.5 text-slate-400 hover:text-red-600 dark:text-slate-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Clear Output"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={handleCopy}
            disabled={!content || isLoading}
            className={`
              flex items-center gap-1.5 text-xs font-medium transition-colors px-3 py-1.5 rounded-full border backdrop-blur-sm
              ${!content || isLoading 
                ? 'text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50 cursor-not-allowed' 
                : 'text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 bg-green-50/80 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 border-green-100 dark:border-green-900/50 cursor-pointer'
              }
            `}
            title={content ? "Copy to clipboard" : "Generate text to copy"}
          >
            {copied ? (
              <>
                <CheckIcon className="h-3.5 w-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <DocumentDuplicateIcon className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="relative flex-grow group">
        <div 
          className={`
            w-full h-80 md:h-96 p-6 rounded-2xl 
            glass-input overflow-y-auto
            text-slate-800 dark:text-slate-200 leading-relaxed text-lg whitespace-pre-wrap
            ${isLoading ? 'cursor-wait' : ''}
            focus:border-green-400 focus:ring-green-200 dark:focus:border-green-500 dark:focus:ring-green-900
          `}
        >
          {isLoading ? (
            <div className="space-y-4 py-2 animate-pulse">
              <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded w-3/4 shimmer"></div>
              <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded w-full shimmer"></div>
              <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded w-5/6 shimmer"></div>
              <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded w-full shimmer"></div>
              <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded w-4/5 shimmer"></div>
              <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded w-2/3 shimmer mt-8"></div>
              <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded w-full shimmer"></div>
              <div className="h-4 bg-slate-200/50 dark:bg-slate-700/50 rounded w-3/4 shimmer"></div>
            </div>
          ) : content ? (
            <div className="animate-fade-in-up">
              {content}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400/70 dark:text-slate-500 italic">
               {placeholder || "The humanized version will appear here..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};