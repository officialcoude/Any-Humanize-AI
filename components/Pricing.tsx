import React from 'react';
import { CheckIcon, SparklesIcon } from '@heroicons/react/24/solid';

export const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950/50 relative overflow-hidden transition-colors">
      <div className="absolute inset-0 bg-grid-slate-200/20 dark:bg-grid-slate-800/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-1.5 rounded-full text-green-700 dark:text-green-400 font-bold text-sm mb-6 animate-fade-in-up">
            <SparklesIcon className="h-4 w-4" />
            <span>100% Free Forever</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
            Powerful AI Tools.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Zero Cost.</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We believe in democratizing creativity. Access all our premium features—Script Writing, SEO Tools, Viral Captions, and Humanizer—completely free of charge.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-green-500/10 relative overflow-hidden group">
          {/* Decorative Blob */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors duration-500"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left relative z-10">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Everything Included:</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Unlimited Text Humanization</span>
                </li>
                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Viral Script Generator (All Modes)</span>
                </li>
                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Advanced SEO Tools (YT & Insta)</span>
                </li>
                <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="p-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">No Credit Card Required</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-center items-center md:items-start border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-8 md:pt-0 md:pl-8">
               <div className="text-center md:text-left mb-6">
                 <span className="text-5xl font-extrabold text-slate-900 dark:text-white">₹0</span>
                 <span className="text-lg text-slate-500 dark:text-slate-400 font-medium block mt-1">/ lifetime</span>
               </div>
               <button 
                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                 className="w-full py-4 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:-translate-y-1 transition-all"
               >
                 Start Creating Now
               </button>
               <p className="text-xs text-slate-400 mt-4 text-center md:text-left">
                 Open Source & Community Supported
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};