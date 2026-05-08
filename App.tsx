import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ToneSelector } from './components/ToneSelector';
import { OutputDisplay } from './components/OutputDisplay';
import { SeoOutputDisplay } from './components/SeoOutputDisplay';
import { CaptionOutputDisplay } from './components/CaptionOutputDisplay';
import { ThumbnailOutputDisplay } from './components/ThumbnailOutputDisplay';
import { ModeSelector } from './components/ModeSelector';
import { ScriptOptions } from './components/ScriptOptions';
import { SeoOptions } from './components/SeoOptions';
import { CaptionOptions } from './components/CaptionOptions';
import { ThumbnailOptions } from './components/ThumbnailOptions';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { About } from './components/About';
import { HistorySidebar } from './components/HistorySidebar';
import { AuthModal } from './components/AuthModal';
import { humanizeContent, generateScript, generateSeoMetadata, generateSocialCaptions, generateThumbnailConcepts } from './services/geminiService';
import { authService } from './services/authService';
import { ToneType, HistoryItem, User, AppMode, ScriptFormat, ScriptStyle, CaptionTone, Platform } from './types';
import { 
  ArrowRightIcon, 
  TrashIcon, 
  ArrowUturnLeftIcon, 
  ArrowUturnRightIcon,
  VideoCameraIcon,
  TagIcon,
  DevicePhoneMobileIcon,
  PaintBrushIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Icons
import { SparklesIcon } from '@heroicons/react/24/solid';

function App() {
  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    if (localStorage.getItem('theme') === 'dark') return true;
    if (localStorage.getItem('theme') === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // App State: Defaulting to Script Writer (Priority #1)
  const [mode, setMode] = useState<AppMode>(AppMode.SCRIPT);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Humanize Options
  const [selectedTone, setSelectedTone] = useState<ToneType>(ToneType.STANDARD);

  // Script Options
  const [scriptFormat, setScriptFormat] = useState<ScriptFormat>(ScriptFormat.YOUTUBE_VIDEO);
  const [scriptLanguage, setScriptLanguage] = useState('English');
  const [scriptStyle, setScriptStyle] = useState<ScriptStyle>(ScriptStyle.VLOG);

  // SEO Options
  const [seoLanguage, setSeoLanguage] = useState('English');

  // Caption Options
  const [captionTone, setCaptionTone] = useState<CaptionTone>(CaptionTone.WITTY);
  const [targetAudience, setTargetAudience] = useState('General Audience');
  const [platform, setPlatform] = useState<Platform>(Platform.INSTAGRAM);
  const [addEmojis, setAddEmojis] = useState(true);

  // Thumbnail Options
  const [thumbnailAspectRatio, setThumbnailAspectRatio] = useState('16:9');
  const [thumbnailStyle, setThumbnailStyle] = useState('High Contrast & Bold');
  const [thumbnailImage, setThumbnailImage] = useState<string | null>(null);

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Session Timer for Auto-Login Popup
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setIsAuthModalOpen(true);
      }, 300000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Undo/Redo State (Only for Humanize Mode input)
  const [undoStack, setUndoStack] = useState<string[]>(['']);
  const [undoIndex, setUndoIndex] = useState(0);
  const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load User Session on Mount & Subscribe to Changes
  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // --- HISTORY PERSISTENCE LOGIC ---
  const historyKey = `humanize_history_${user ? user.id : 'guest'}`;
  const prevKeyRef = useRef(historyKey);

  useEffect(() => {
    const savedHistory = localStorage.getItem(historyKey);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
        setHistory([]);
      }
    } else {
      setHistory([]);
    }
  }, [historyKey]);

  useEffect(() => {
    if (prevKeyRef.current !== historyKey) {
      prevKeyRef.current = historyKey;
      return;
    }
    localStorage.setItem(historyKey, JSON.stringify(history));
  }, [history, historyKey]);

  // --- UNDO/REDO LOGIC (Humanize Mode Only) ---
  const pushToUndoStack = (text: string) => {
    setUndoStack(prev => {
      const newStack = prev.slice(0, undoIndex + 1);
      if (newStack[newStack.length - 1] !== text) {
        const updatedStack = [...newStack, text];
        setUndoIndex(updatedStack.length - 1);
        return updatedStack;
      }
      return prev;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newText = e.target.value;
    setInputText(newText);

    if (mode === AppMode.HUMANIZE) {
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current);
      }
      undoTimeoutRef.current = setTimeout(() => {
        setUndoStack(prev => {
          const sliced = prev.slice(0, undoIndex + 1);
          if (sliced[sliced.length - 1] !== newText) {
            const updatedStack = [...sliced, newText];
            setUndoIndex(updatedStack.length - 1);
            return updatedStack;
          }
          return prev;
        });
      }, 700);
    }
  };

  const handleUndo = () => {
    if (undoIndex > 0) {
      const newIndex = undoIndex - 1;
      setUndoIndex(newIndex);
      setInputText(undoStack[newIndex]);
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    }
  };

  const handleRedo = () => {
    if (undoIndex < undoStack.length - 1) {
      const newIndex = undoIndex + 1;
      setUndoIndex(newIndex);
      setInputText(undoStack[newIndex]);
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    }
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = async () => {
    if (history.length >= 0) {
      localStorage.setItem(historyKey, JSON.stringify(history));
    }
    await authService.logout();
    // setUser(null) will be handled by subscribeToAuthChanges
  };

  const addToHistory = (original: string, humanized: string, typeLabel: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      original,
      humanized,
      tone: typeLabel,
      mode: mode,
      timestamp: Date.now(),
    };
    setHistory(prev => [newItem, ...prev].slice(0, 50));
  };

  const handleRestoreHistory = (item: HistoryItem) => {
    if (item.mode) setMode(item.mode);
    else setMode(AppMode.HUMANIZE);
    
    setInputText(item.original);
    // For thumbnail mode, outputText is an image URL, which might not be valid after session restart if it was a blob,
    // but here it's base64 so it should be fine.
    setOutputText(item.humanized);
    
    if (Object.values(ToneType).includes(item.tone as ToneType)) setSelectedTone(item.tone as ToneType);
    else if (Object.values(ScriptFormat).includes(item.tone as ScriptFormat)) setScriptFormat(item.tone as ScriptFormat);
    else if (Object.values(ScriptStyle).includes(item.tone as ScriptStyle)) setScriptStyle(item.tone as ScriptStyle);
    else if (Object.values(CaptionTone).includes(item.tone as CaptionTone)) setCaptionTone(item.tone as CaptionTone);

    if (item.mode === AppMode.HUMANIZE) pushToUndoStack(item.original);

    setIsHistoryOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleClearHistory = () => {
    if (history.length === 0) return;
    if (window.confirm('Are you sure you want to clear your entire history? This action cannot be undone.')) {
      setHistory([]);
      localStorage.setItem(historyKey, JSON.stringify([]));
    }
  };

  const handleProcess = useCallback(async () => {
    if (!inputText.trim()) {
      setError(mode === AppMode.HUMANIZE ? "Please enter some text." : "Please enter a topic.");
      return;
    }

    setLoading(true);
    setError(null);
    setOutputText('');

    try {
      let result = '';
      let label = '';

      if (mode === AppMode.SCRIPT) {
        result = await generateScript(
          inputText, 
          scriptFormat, 
          scriptLanguage, 
          scriptStyle,
          platform,
          captionTone,
          targetAudience,
          addEmojis
        );
        label = scriptFormat;
      } else if (mode === AppMode.HUMANIZE) {
        result = await humanizeContent(inputText, selectedTone);
        label = selectedTone;
      } else if (mode === AppMode.SEO_YT) {
        result = await generateSeoMetadata(inputText, seoLanguage);
        label = "SEO Metadata";
      } else if (mode === AppMode.CAPTION) {
        result = await generateSocialCaptions(inputText, captionTone, targetAudience, addEmojis, platform);
        label = captionTone;
      } else if (mode === AppMode.THUMBNAIL) {
        result = await generateThumbnailConcepts(inputText, thumbnailAspectRatio, thumbnailStyle, thumbnailImage);
        label = "Thumbnail Image";
      }
      
      setOutputText(result);
      // Only add to history if it's text. Images in history might be too heavy for localStorage.
      if (mode !== AppMode.THUMBNAIL) {
          addToHistory(inputText, result, label);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [inputText, mode, selectedTone, scriptFormat, scriptLanguage, scriptStyle, seoLanguage, captionTone, targetAudience, addEmojis, platform, thumbnailAspectRatio, thumbnailStyle, thumbnailImage]);

  const handleClear = () => {
    setInputText('');
    setError(null);
    if (mode === AppMode.HUMANIZE) pushToUndoStack('');
    if (mode === AppMode.CAPTION || mode === AppMode.SCRIPT) {
      setCaptionTone(CaptionTone.WITTY);
      setTargetAudience('General Audience');
      setPlatform(Platform.INSTAGRAM);
      setAddEmojis(true);
    }
    if (mode === AppMode.THUMBNAIL) {
      setThumbnailImage(null);
      setThumbnailAspectRatio('16:9');
    }
  };

  const handleModeChange = (newMode: AppMode) => {
    setMode(newMode);
    setError(null);
    setInputText('');
    setOutputText('');
    setUndoStack(['']);
    setUndoIndex(0);
    // Reset specific mode states if needed
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;

  return (
    <div className="min-h-screen relative flex flex-col font-sans text-slate-800 dark:text-slate-200 overflow-x-hidden bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300">
      
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="bg-blob bg-green-300 dark:bg-green-800/40 w-96 h-96 rounded-full top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-normal blur-3xl animate-blob"></div>
        <div className="bg-blob bg-slate-300 dark:bg-slate-700/40 w-96 h-96 rounded-full top-0 right-0 translate-x-1/3 -translate-y-1/3 opacity-40 dark:opacity-20 mix-blend-multiply dark:mix-blend-normal blur-3xl animate-blob animation-delay-2000"></div>
        <div className="bg-blob bg-emerald-200 dark:bg-emerald-800/40 w-80 h-80 rounded-full bottom-0 left-20 translate-y-1/3 opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-normal blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <Header 
        onHistoryClick={() => setIsHistoryOpen(true)} 
        onClearHistoryClick={history.length > 0 ? handleClearHistory : undefined}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogoutClick={handleLogout}
        onModeChange={handleModeChange}
        user={user}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
      
      <HistorySidebar 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onRestore={handleRestoreHistory}
        onDelete={handleDeleteHistoryItem}
        onClearAll={handleClearHistory}
        user={user}
        onLoginClick={() => {
          setIsHistoryOpen(false);
          setIsAuthModalOpen(true);
        }}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* HERO SECTION */}
      <div className="relative z-10 pb-12 md:pb-20 pt-8 md:pt-12">
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8 md:mb-10 animate-fade-in-up">
             <ModeSelector 
                currentMode={mode} 
                onModeChange={handleModeChange} 
                disabled={loading} 
             />

            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
              {mode === AppMode.HUMANIZE && (
                <>
                  Transform Robot Text to <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500">
                    Human Speech
                  </span>
                </>
              )}
              {mode === AppMode.SCRIPT && (
                <>
                  Generate Viral <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500">
                    Video Scripts
                  </span>
                </>
              )}
              {mode === AppMode.SEO_YT && (
                <>
                  Boost Video Ranking with <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500">
                    AI SEO Titles & Tags
                  </span>
                </>
              )}
              {mode === AppMode.CAPTION && (
                <>
                  Viral Captions for <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500">
                    Reels & TikTok
                  </span>
                </>
              )}
              {mode === AppMode.THUMBNAIL && (
                <>
                  AI Thumbnail Editor & <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500">
                    Image Generator
                  </span>
                </>
              )}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {mode === AppMode.HUMANIZE 
                ? "Paste your AI-generated content (English, Bengali, etc.) and we'll refine it to sound natural, engaging, and authentic."
                : mode === AppMode.SCRIPT 
                  ? "Create professional scripts for YouTube, TikTok, and more in any language. Just enter your topic!"
                  : mode === AppMode.SEO_YT 
                    ? "Get engaging titles, descriptions, hashtags, and tags for your YouTube videos instantly."
                    : mode === AppMode.CAPTION 
                      ? "Generate catchy, engaging captions with trending hashtags for your short-form video content."
                      : "Create high-CTR YouTube thumbnails instantly. Upload a reference image or generate one from scratch with your text!"}
            </p>
          </div>

          {/* GLASS CARD */}
          <div className="glass-panel rounded-3xl p-6 md:p-10 animate-fade-in-up border-green-100/50 dark:border-white/5" style={{animationDelay: '0.1s'}}>
              
              {/* Mode Specific Controls */}
              {mode === AppMode.HUMANIZE ? (
                <div className="mb-8">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider ml-1">
                    Choose a Tone
                  </label>
                  <ToneSelector 
                    selectedTone={selectedTone} 
                    onSelect={setSelectedTone} 
                    disabled={loading}
                  />
                </div>
              ) : mode === AppMode.SCRIPT ? (
                <ScriptOptions 
                  format={scriptFormat} 
                  setFormat={setScriptFormat} 
                  language={scriptLanguage}
                  setLanguage={setScriptLanguage}
                  style={scriptStyle}
                  setStyle={setScriptStyle}
                  platform={platform}
                  setPlatform={setPlatform}
                  captionTone={captionTone}
                  setCaptionTone={setCaptionTone}
                  audience={targetAudience}
                  setAudience={setTargetAudience}
                  addEmojis={addEmojis}
                  setAddEmojis={setAddEmojis}
                  disabled={loading} 
                />
              ) : mode === AppMode.SEO_YT ? (
                <SeoOptions 
                  language={seoLanguage}
                  setLanguage={setSeoLanguage}
                  disabled={loading}
                />
              ) : mode === AppMode.CAPTION ? (
                <CaptionOptions 
                  tone={captionTone}
                  setTone={setCaptionTone}
                  audience={targetAudience}
                  setAudience={setTargetAudience}
                  platform={platform}
                  setPlatform={setPlatform}
                  addEmojis={addEmojis}
                  setAddEmojis={setAddEmojis}
                  disabled={loading}
                />
              ) : mode === AppMode.THUMBNAIL ? (
                <ThumbnailOptions
                  aspectRatio={thumbnailAspectRatio}
                  setAspectRatio={setThumbnailAspectRatio}
                  style={thumbnailStyle}
                  setStyle={setThumbnailStyle}
                  image={thumbnailImage}
                  setImage={setThumbnailImage}
                  disabled={loading}
                />
              ) : null}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
                
                {/* INPUT SECTION */}
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                      {mode === AppMode.HUMANIZE ? "Input Text" : mode === AppMode.THUMBNAIL ? "Thumbnail Title / Topic" : "Enter Topic"}
                    </label>
                    
                    {/* Undo/Redo & Controls (Humanize Only) */}
                    <div className="flex items-center gap-3">
                      {mode === AppMode.HUMANIZE && (
                        <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-800/50 rounded-lg p-1 border border-slate-200/50 dark:border-slate-700/50">
                          <button
                            onClick={handleUndo}
                            disabled={undoIndex <= 0 || loading}
                            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Undo"
                          >
                            <ArrowUturnLeftIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleRedo}
                            disabled={undoIndex >= undoStack.length - 1 || loading}
                            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Redo"
                          >
                            <ArrowUturnRightIcon className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      {mode === AppMode.HUMANIZE && (
                        <span className="px-2 py-0.5 bg-white/50 dark:bg-slate-800/50 rounded text-xs text-slate-500 dark:text-slate-400 font-medium border border-white/50 dark:border-slate-700/50">
                          {wordCount} words • {charCount} chars
                        </span>
                      )}
                      
                      {inputText && (
                        <button 
                          onClick={handleClear}
                          className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50/50 dark:hover:bg-red-900/20 px-2 py-0.5 rounded transition-colors flex items-center gap-1"
                          disabled={loading}
                        >
                          <TrashIcon className="h-3 w-3" /> Clear
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative flex-grow group">
                    {mode === AppMode.HUMANIZE ? (
                      <textarea
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder='Paste your AI-generated content here (e.g. "The quick brown fox jumps over the lazy dog")...'
                        disabled={loading}
                        className="w-full h-80 md:h-96 p-6 rounded-2xl glass-input resize-none outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400/70 dark:placeholder:text-slate-500 leading-relaxed text-lg focus:border-green-400 focus:ring-green-200 dark:focus:border-green-500 dark:focus:ring-green-900"
                      />
                    ) : (
                       <textarea
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder={mode === AppMode.SCRIPT 
                          ? 'Enter a topic for your script (e.g., "Top 10 places to visit in Japan" or "How to bake a cake")...'
                          : mode === AppMode.SEO_YT 
                            ? 'Enter video topic (e.g., "iPhone 15 Review", "Street Food in Mumbai")...'
                            : mode === AppMode.THUMBNAIL 
                              ? 'Enter main text for the thumbnail (e.g., "EPIC FAIL 2024", "MINECRAFT SURVIVAL")...'
                              : 'Enter caption topic (e.g., "POV: Working from home", "Gym motivation", "Summer sale")...'
                        }
                        disabled={loading}
                        className="w-full h-40 md:h-96 p-6 rounded-2xl glass-input resize-none outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400/70 dark:placeholder:text-slate-500 leading-relaxed text-lg focus:border-green-400 focus:ring-green-200 dark:focus:border-green-500 dark:focus:ring-green-900"
                      />
                    )}
                  </div>
                </div>

                {/* ACTION & OUTPUT SECTION */}
                <div className="flex flex-col h-full relative">
                  
                  {/* Mobile Action Button */}
                  <div className="lg:hidden my-6 flex flex-col gap-3 justify-center">
                     <button
                      onClick={handleProcess}
                      disabled={loading || !inputText.trim()}
                      className="w-full py-4 bg-green-500 text-white rounded-xl font-bold shadow-lg shadow-green-500/30 hover:bg-green-600 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 text-lg"
                    >
                      {loading ? 'Processing...' : (mode === AppMode.HUMANIZE ? 'Humanize Text' : mode === AppMode.SCRIPT ? 'Generate Script' : mode === AppMode.SEO_YT ? 'Generate Metadata' : mode === AppMode.CAPTION ? 'Generate Captions' : 'Generate Thumbnail')} <ArrowRightIcon className="h-5 w-5" />
                    </button>
                    
                    {(mode === AppMode.CAPTION || mode === AppMode.SCRIPT || mode === AppMode.THUMBNAIL) && (
                      <button
                        onClick={handleClear}
                        disabled={loading}
                        className="w-full py-3 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <XMarkIcon className="h-5 w-5" /> Clear All
                      </button>
                    )}
                  </div>

                  {/* Desktop Center Action (Absolute) */}
                  <div className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20">
                     <button
                      onClick={handleProcess}
                      disabled={loading || !inputText.trim()}
                      className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white rounded-full shadow-xl shadow-green-500/40 hover:scale-110 hover:shadow-2xl transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center border-4 border-white/80 dark:border-slate-800/80"
                      title={mode === AppMode.HUMANIZE ? "Humanize Text" : mode === AppMode.SCRIPT ? "Generate Script" : mode === AppMode.SEO_YT ? "Generate Metadata" : mode === AppMode.CAPTION ? "Generate Captions" : "Generate Thumbnail"}
                    >
                       {loading ? (
                         <SparklesIcon className="h-8 w-8 animate-pulse" />
                       ) : (
                         mode === AppMode.HUMANIZE ? <ArrowRightIcon className="h-8 w-8" /> : mode === AppMode.SCRIPT ? <VideoCameraIcon className="h-8 w-8" /> : mode === AppMode.SEO_YT ? <TagIcon className="h-8 w-8" /> : mode === AppMode.CAPTION ? <DevicePhoneMobileIcon className="h-8 w-8" /> : <PaintBrushIcon className="h-8 w-8" />
                       )}
                    </button>
                  </div>

                  {/* Conditional Output Display */}
                  {mode === AppMode.SEO_YT ? (
                    <SeoOutputDisplay content={outputText} isLoading={loading} />
                  ) : mode === AppMode.CAPTION ? (
                    <CaptionOutputDisplay content={outputText} isLoading={loading} />
                  ) : mode === AppMode.THUMBNAIL ? (
                    <ThumbnailOutputDisplay content={outputText} isLoading={loading} />
                  ) : (
                    <OutputDisplay 
                      content={outputText} 
                      isLoading={loading}
                      onClear={() => setOutputText('')}
                      label={mode === AppMode.SCRIPT ? "Generated Script" : "Humanized Output"}
                      placeholder={mode === AppMode.HUMANIZE 
                        ? "The humanized version will appear here..." 
                        : "Output will appear here..."
                      }
                    />
                  )}
                </div>
              </div>

              {/* Bottom Action Bar (Desktop) */}
              <div className="mt-10 flex justify-end lg:justify-center gap-4">
                 {(mode === AppMode.CAPTION || mode === AppMode.SCRIPT || mode === AppMode.THUMBNAIL) && (
                    <button
                      onClick={handleClear}
                      disabled={loading}
                      className="hidden lg:flex py-4 px-6 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-red-500 dark:hover:text-red-400 transition-all items-center gap-2"
                    >
                      <TrashIcon className="h-5 w-5" />
                      Clear All
                    </button>
                 )}
                 
                 <button
                    onClick={handleProcess}
                    disabled={loading || !inputText.trim()}
                    className="hidden lg:flex py-4 px-12 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed items-center gap-2"
                  >
                    {mode === AppMode.HUMANIZE ? <SparklesIcon className="h-5 w-5" /> : mode === AppMode.SCRIPT ? <VideoCameraIcon className="h-5 w-5" /> : mode === AppMode.SEO_YT ? <TagIcon className="h-5 w-5" /> : mode === AppMode.CAPTION ? <DevicePhoneMobileIcon className="h-5 w-5" /> : <PaintBrushIcon className="h-5 w-5" />}
                    {loading ? 'Processing...' : (mode === AppMode.HUMANIZE ? 'Humanize Text' : mode === AppMode.SCRIPT ? 'Generate Script' : mode === AppMode.SEO_YT ? 'Generate Metadata' : mode === AppMode.CAPTION ? 'Generate Captions' : 'Generate Thumbnail')}
                  </button>
              </div>

              {error && (
                <div className="mt-6 p-4 bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm border border-red-100 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-sm text-center animate-fade-in flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {error}
                </div>
              )}
          </div>
        </main>
      </div>

      {/* NEW FEATURES SECTION */}
      <div className="relative z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg border-t border-white/50 dark:border-white/5">
        <Features />
      </div>

      {/* PRICING SECTION */}
      <Pricing />

      {/* HOW IT WORKS SECTION */}
      <HowItWorks />

      {/* FAQ SECTION */}
      <div className="bg-green-50/50 dark:bg-slate-900">
        <FAQ />
      </div>

      {/* ABOUT SECTION */}
      <About />

      {/* FOOTER */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="bg-green-500 p-1.5 rounded-lg">
               <SparklesIcon className="h-4 w-4 text-white" />
             </div>
             <span className="text-lg font-bold text-slate-900 dark:text-white">Any HumanizeAI</span>
          </div>
          
          <p className="text-slate-500 dark:text-slate-400 text-sm">© {new Date().getFullYear()} Any HumanizeAI. All rights reserved.</p>
          
          <div className="flex items-center justify-center gap-8">
            <a 
              href="https://www.facebook.com/SoumenGraphicDesign" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors group"
            >
               <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                 </svg>
               </div>
               <span className="font-medium">Facebook</span>
            </a>
            <a 
              href="https://www.instagram.com/soumengraphicdesign/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors group"
            >
               <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.153 1.772c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 3.2c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                 </svg>
               </div>
               <span className="font-medium">Instagram</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;