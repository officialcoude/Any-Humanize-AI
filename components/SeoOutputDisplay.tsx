import React, { useState, useEffect } from 'react';
import { 
  DocumentDuplicateIcon, 
  CheckIcon, 
  TagIcon, 
  HashtagIcon, 
  DocumentTextIcon, 
  VideoCameraIcon 
} from '@heroicons/react/24/outline';

interface SeoData {
  titles: string[];
  description: string;
  hashtags: string[];
  tags: string[];
}

interface SeoOutputDisplayProps {
  content: string;
  isLoading: boolean;
}

export const SeoOutputDisplay: React.FC<SeoOutputDisplayProps> = ({ content, isLoading }) => {
  const [data, setData] = useState<SeoData | null>(null);
  const [parseError, setParseError] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  useEffect(() => {
    if (content && !isLoading) {
      try {
        let cleanContent = content.trim();
        // Remove markdown code blocks if present
        cleanContent = cleanContent.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
        
        const parsedData = JSON.parse(cleanContent);
        
        // Validate minimal structure
        if (parsedData && (parsedData.titles || parsedData.description)) {
            setData(parsedData);
            setParseError(false);
        } else {
            throw new Error("Invalid structure");
        }
      } catch (e) {
        console.error("Failed to parse SEO JSON", e);
        setParseError(true);
      }
    } else {
        setData(null);
    }
  }, [content, isLoading]);

  const handleCopy = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (isLoading) {
    return (
        <div className="w-full h-full p-6 rounded-2xl glass-input overflow-y-auto">
            <div className="space-y-8 animate-pulse">
              {/* Titles Skeleton */}
              <div className="space-y-3">
                 <div className="h-6 w-32 bg-slate-200/50 dark:bg-slate-700/50 rounded-lg shimmer"></div>
                 <div className="h-40 bg-slate-200/50 dark:bg-slate-700/50 rounded-xl w-full shimmer"></div>
              </div>
              {/* Description Skeleton */}
              <div className="space-y-3">
                 <div className="h-6 w-40 bg-slate-200/50 dark:bg-slate-700/50 rounded-lg shimmer"></div>
                 <div className="h-56 bg-slate-200/50 dark:bg-slate-700/50 rounded-xl w-full shimmer"></div>
              </div>
            </div>
        </div>
    );
  }

  if (!content) {
      return (
        <div className="w-full h-full p-6 rounded-2xl glass-input flex flex-col items-center justify-center text-slate-400/70 dark:text-slate-500 italic space-y-4">
            <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-full">
                <TagIcon className="h-10 w-10 text-slate-300 dark:text-slate-600" />
            </div>
            <p>Generated SEO metadata will appear here organized by section.</p>
        </div>
      );
  }

  if (parseError || !data) {
    return (
        <div className="w-full h-full p-6 rounded-2xl glass-input overflow-y-auto">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-xl mb-4 text-yellow-800 dark:text-yellow-200 text-sm">
                Note: The response format was not standard JSON. Displaying raw text.
            </div>
            <div className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-mono text-sm">
                {content}
            </div>
        </div>
      );
  }

  return (
    <div className="w-full h-full p-5 md:p-6 rounded-2xl glass-input overflow-y-auto space-y-8 scroll-smooth">
      
      {/* 1. TITLES */}
      <section className="space-y-3">
        <div className="flex justify-between items-center sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2 -mx-2 rounded-lg z-10">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <VideoCameraIcon className="h-5 w-5 text-green-500" /> 
                Optimized Titles
                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] px-2 py-0.5 rounded-full">{data.titles.length}</span>
            </h3>
            <button
                onClick={() => handleCopy(data.titles.join('\n'), 'titles')}
                className="text-xs font-semibold text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 border border-transparent hover:border-green-100 dark:hover:border-green-900"
            >
                {copiedSection === 'titles' ? <CheckIcon className="h-3.5 w-3.5" /> : <DocumentDuplicateIcon className="h-3.5 w-3.5" />}
                {copiedSection === 'titles' ? 'Copied' : 'Copy All'}
            </button>
        </div>
        <div className="grid gap-2">
            {data.titles.map((title, index) => (
                <div 
                    key={index} 
                    onClick={() => handleCopy(title, `title-${index}`)}
                    className="group relative p-3 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/50 hover:border-green-400 dark:hover:border-green-500/50 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 pr-8">{title}</p>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {copiedSection === `title-${index}` ? <CheckIcon className="h-4 w-4 text-green-500" /> : <DocumentDuplicateIcon className="h-4 w-4" />}
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* 2. DESCRIPTION */}
      <section className="space-y-3">
        <div className="flex justify-between items-center sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2 -mx-2 rounded-lg z-10">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-blue-500" /> 
                Video Description
            </h3>
            <button
                onClick={() => handleCopy(data.description, 'desc')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 border border-transparent hover:border-blue-100 dark:hover:border-blue-900"
            >
                {copiedSection === 'desc' ? <CheckIcon className="h-3.5 w-3.5" /> : <DocumentDuplicateIcon className="h-3.5 w-3.5" />}
                {copiedSection === 'desc' ? 'Copied' : 'Copy Description'}
            </button>
        </div>
        <div className="relative group">
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap bg-white/50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                {data.description}
            </div>
        </div>
      </section>

      {/* 3. HASHTAGS & TAGS (Grid Layout) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* HASHTAGS */}
          <section className="space-y-3">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <HashtagIcon className="h-5 w-5 text-pink-500" /> 
                    Hashtags
                </h3>
                <button
                    onClick={() => handleCopy(data.hashtags.join(' '), 'hashtags')}
                    className="text-xs font-semibold text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                >
                    {copiedSection === 'hashtags' ? <CheckIcon className="h-3.5 w-3.5" /> : <DocumentDuplicateIcon className="h-3.5 w-3.5" />}
                    Copy
                </button>
            </div>
            <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-wrap gap-2">
                {data.hashtags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 px-2 py-1 rounded-md border border-pink-100 dark:border-pink-900/30">
                        {tag}
                    </span>
                ))}
            </div>
          </section>

          {/* TAGS */}
          <section className="space-y-3">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <TagIcon className="h-5 w-5 text-orange-500" /> 
                    Meta Tags
                </h3>
                <button
                    onClick={() => handleCopy(data.tags.join(','), 'tags')}
                    className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                >
                    {copiedSection === 'tags' ? <CheckIcon className="h-3.5 w-3.5" /> : <DocumentDuplicateIcon className="h-3.5 w-3.5" />}
                    Copy CSV
                </button>
            </div>
            <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <p className="text-xs text-slate-600 dark:text-slate-400 font-mono leading-relaxed break-words">
                    {data.tags.join(', ')}
                </p>
            </div>
          </section>
      </div>

    </div>
  );
};