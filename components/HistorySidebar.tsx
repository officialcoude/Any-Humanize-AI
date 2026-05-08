import React from 'react';
import { XMarkIcon, TrashIcon, ArrowUturnLeftIcon, DocumentDuplicateIcon, ClockIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { HistoryItem, User } from '../types';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onRestore: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  user: User | null;
  onLoginClick: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  isOpen,
  onClose,
  history,
  onRestore,
  onDelete,
  onClearAll,
  user,
  onLoginClick
}) => {
  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(timestamp));
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div 
        className={`
          fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-slate-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col border-l border-slate-200 dark:border-slate-800
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-bold text-lg">
            <ClockIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h2>History</h2>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">
              {history.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* User Context Banner */}
        {!user && (
          <div className="bg-green-50 dark:bg-green-900/20 px-6 py-3 border-b border-green-100 dark:border-green-900/30 flex items-center gap-3">
            <LockClosedIcon className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
            <div className="flex-grow">
              <p className="text-xs text-green-800 dark:text-green-200 font-medium leading-tight">
                Viewing Guest History.
                <button onClick={onLoginClick} className="underline ml-1 font-bold hover:text-green-900 dark:hover:text-green-100">Sign In</button> to save permanently.
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 dark:text-slate-500">
              <ClockIcon className="h-12 w-12 mb-4 opacity-20" />
              <p className="font-medium text-slate-600 dark:text-slate-400 mb-1">No history yet</p>
              <p className="text-sm">
                {user ? `Hi ${user.name}, your` : 'Your'} text transformations will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group hover:border-green-100 dark:hover:border-green-900">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded border border-green-100 dark:border-green-900/50">
                      {item.tone}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {formatDate(item.timestamp)}
                    </span>
                  </div>
                  
                  <div className="mb-3 space-y-2">
                    <div>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Original</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 font-medium">
                        {item.original}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Humanized</p>
                      <p className="text-sm text-slate-800 dark:text-slate-100 line-clamp-2">
                        {item.humanized}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.humanized);
                      }}
                      className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                      title="Copy Humanized Text"
                    >
                      <DocumentDuplicateIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onRestore(item)}
                      className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <ArrowUturnLeftIcon className="h-3 w-3" />
                      Restore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <button
              onClick={onClearAll}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
            >
              <TrashIcon className="h-4 w-4" />
              Clear All History
            </button>
          </div>
        )}
      </div>
    </>
  );
};