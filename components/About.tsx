import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';

export const About: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Image/Graphic Side */}
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <SparklesIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Any HumanizeAI</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                    "We believe that content should feel human, no matter how it was created. Our mission is to bridge the gap between artificial intelligence and authentic human expression."
                </p>
                <div className="flex items-center gap-4 mt-6">
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800"></div>
                        <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-slate-800"></div>
                        <div className="w-8 h-8 rounded-full bg-slate-400 dark:bg-slate-500 border-2 border-white dark:border-slate-800"></div>
                    </div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Trusted by creators worldwide</span>
                </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              Empowering Creators with <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Authentic Content</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Any HumanizeAI isn't just another tool; it's your creative partner. In an age where AI content is everywhere, standing out requires a personal touch. 
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Whether you're a student aiming for academic integrity, a marketer seeking engagement, or a creator building a community, we provide the polish your words need to resonate.
            </p>
            <div className="pt-4">
                <button className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300 flex items-center gap-2 group">
                    Start Creating Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};