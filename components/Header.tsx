import React, { useState, useEffect, useRef } from 'react';
import { SparklesIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { 
  ClockIcon, 
  UserCircleIcon, 
  ArrowRightOnRectangleIcon, 
  SunIcon, 
  MoonIcon, 
  TrashIcon, 
  WrenchScrewdriverIcon,
  VideoCameraIcon,
  TagIcon,
  DevicePhoneMobileIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';
import { User, AppMode } from '../types';

interface HeaderProps {
  onHistoryClick?: () => void;
  onClearHistoryClick?: () => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onModeChange: (mode: AppMode) => void;
  user: User | null;
  darkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onHistoryClick, 
  onClearHistoryClick,
  onLoginClick, 
  onLogoutClick, 
  onModeChange,
  user, 
  darkMode, 
  toggleTheme 
}) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ordered features
  const tools = [
    { name: 'Script Writer', icon: VideoCameraIcon, mode: AppMode.SCRIPT },
    { name: 'Humanize Text', icon: SparklesIcon, mode: AppMode.HUMANIZE },
    { name: 'YouTube SEO', icon: TagIcon, mode: AppMode.SEO_YT },
    { name: 'Viral Captions', icon: DevicePhoneMobileIcon, mode: AppMode.CAPTION },
    { name: 'Thumbnail Ideas', icon: PaintBrushIcon, mode: AppMode.THUMBNAIL },
  ];

  return (
    <header className="w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-white/50 dark:border-white/10 sticky top-0 z-50 transition-all duration-300 shadow-sm dark:shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onModeChange(AppMode.SCRIPT)}>
            <div className="bg-black dark:bg-slate-800 p-2 rounded-lg shadow-lg shadow-green-500/20 border border-green-500/30">
              <SparklesIcon className="h-5 w-5 text-green-500" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight hidden sm:block">
              Any Humanize<span className="text-green-500">AI</span>
            </h1>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <WrenchScrewdriverIcon className="h-4 w-4" />
              <span className="hidden md:inline">Free Tools</span>
              <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {isToolsOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-fade-in-up z-50">
                <div className="py-1">
                  {tools.map((tool) => (
                    <button
                      key={tool.name}
                      onClick={() => {
                        onModeChange(tool.mode);
                        setIsToolsOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-green-50 dark:hover:bg-slate-700/50 transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:bg-white dark:group-hover:bg-slate-600 text-slate-500 dark:text-slate-400 group-hover:text-green-500 transition-colors">
                        <tool.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-green-700 dark:group-hover:text-green-400">
                        {tool.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden lg:inline-flex text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/80 px-2 py-1 rounded-full border border-slate-200/60 dark:border-slate-700/60">
            Gemini 2.5 Flash
          </span>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          <div className="flex items-center gap-1">
            {onHistoryClick && (
              <button
                onClick={onHistoryClick}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/30 px-3 py-1.5 rounded-lg transition-all"
                title="View History"
              >
                <ClockIcon className="h-5 w-5" />
                <span className="hidden sm:inline">History</span>
              </button>
            )}

            {onClearHistoryClick && (
              <button
                type="button"
                onClick={onClearHistoryClick}
                className="p-1.5 text-slate-400 hover:text-red-600 dark:text-slate-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Clear All History"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="h-6 w-px bg-slate-300/50 dark:bg-slate-700/50 mx-1 hidden sm:block"></div>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 flex items-center justify-center text-green-700 dark:text-green-400 font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[100px]">{user.name}</span>
              </div>
              <button
                onClick={onLogoutClick}
                className="text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 p-1.5 hover:bg-red-50/50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Sign Out"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-1.5 text-sm font-semibold text-white bg-black dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg border border-slate-800 dark:border-slate-700 hover:border-green-500/50"
            >
              <UserCircleIcon className="h-5 w-5 text-green-400" />
              <span className="hidden xs:inline">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};