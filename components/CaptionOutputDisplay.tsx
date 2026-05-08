import React, { useState, useEffect } from 'react';
import { DocumentDuplicateIcon, CheckIcon, HashtagIcon } from '@heroicons/react/24/outline';

interface CaptionOption {
  type: string;
  content: string;
  hashtags: string[];
}

interface CaptionData {
  options: CaptionOption[];
}

interface CaptionOutputDisplayProps {
  content: string;
  isLoading: boolean;
}

export const CaptionOutputDisplay: React.FC<CaptionOutputDisplayProps> = ({ content, isLoading }) => {
  const [data, setData] = useState<CaptionData | null>(null);
  const [parseError, setParseError] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (content && !isLoading) {
      try {
        let jsonString = content;
        if (content.startsWith('```json')) {
          jsonString = content.replace(/^```json\n/, '').replace(/\n```$/, '');
        } else if (content.startsWith('```')) {
           jsonString = content.replace(/^```\n/, '').replace(/\n```$/, '');
        }

        const parsedData = JSON.parse(jsonString);
        setData(parsedData);
        setParseError(false);
      } catch (e) {
        console.error("Failed to parse Caption JSON", e);
        setParseError(true);
      }
    } else {
        setData(null);
    }
  }, [content, isLoading]);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (isLoading) {
    return (
        <div className="w-full h-full p-6 rounded-2xl glass-input overflow-y-auto">
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-40 bg-slate-200/50 dark:bg-slate-700/50 rounded-xl w-full shimmer"></div>
              ))}
            </div>
        </div>
    );
  }

  if (!content) {
      return (
        <div className="w-full h-full p-6 rounded-2xl glass-input flex items-center justify-center text-slate-400/70 dark:text-slate-500 italic">
            Generated captions will appear here...
        </div>
      );
  }

  if (parseError || !data || !data.options) {
    return (
        <div className="w-full h-full p-6 rounded-2xl glass-input overflow-y-auto text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
            {content}
        </div>
    );
  }

  return (
    <div className="w-full h-full p-4 rounded-2xl glass-input overflow-y-auto space-y-4">
      {data.options.map((option, index) => (
        <div key={index} className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              {option.type}
            </span>
            <button
              onClick={() => handleCopy(`${option.content}\n\n${option.hashtags.join(' ')}`, index)}
              className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 flex items-center gap-1 transition-colors bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700"
            >
              {copiedIndex === index ? <CheckIcon className="h-4 w-4" /> : <DocumentDuplicateIcon className="h-4 w-4" />}
              {copiedIndex === index ? 'Copied' : 'Copy'}
            </button>
          </div>
          
          <div className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-medium mb-3">
            {option.content}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-700/50">
            {option.hashtags.map((tag, tagIdx) => (
              <span key={tagIdx} className="text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};