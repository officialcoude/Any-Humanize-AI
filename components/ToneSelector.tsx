import React from 'react';
import { ToneType } from '../types';

interface ToneSelectorProps {
  selectedTone: ToneType;
  onSelect: (tone: ToneType) => void;
  disabled: boolean;
}

export const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onSelect, disabled }) => {
  return (
    <div className="flex flex-wrap gap-2.5">
      {Object.values(ToneType).map((tone) => (
        <button
          key={tone}
          onClick={() => onSelect(tone)}
          disabled={disabled}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ease-out border
            ${selectedTone === tone
              ? 'bg-green-500 border-green-600 text-white shadow-lg shadow-green-500/40 ring-2 ring-green-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 scale-105 font-semibold'
              : 'bg-white/50 dark:bg-slate-800/50 border-white/60 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:border-green-300 dark:hover:border-green-700 hover:text-green-600 dark:hover:text-green-400 hover:shadow-md hover:-translate-y-0.5 backdrop-blur-sm'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed transform-none' : 'cursor-pointer active:scale-95'}
          `}
        >
          {tone}
        </button>
      ))}
    </div>
  );
};
