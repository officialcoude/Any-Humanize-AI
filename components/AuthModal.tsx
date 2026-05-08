import React, { useState, useEffect } from 'react';
import { XMarkIcon, UserIcon, IdentificationIcon, ChatBubbleLeftEllipsisIcon, ArrowPathIcon, EnvelopeIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { authService } from '../services/authService';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form Data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setPassword('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let user;
      if (isLogin) {
        user = await authService.login(email, password);
      } else {
        if (!name) throw new Error("Please enter your name.");
        user = await authService.signup(name, email, password);
      }
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      console.error("Auth error:", err);
      let message = "Authentication failed.";
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = "Invalid email or password.";
      } else if (err.code === 'auth/email-already-in-use') {
        message = "Email already in use. Try logging in.";
      } else if (err.code === 'auth/weak-password') {
        message = "Password should be at least 6 characters.";
      } else {
        message = err.message || message;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const user = await authService.loginWithGoogle();
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      console.error("Google Auth error:", err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || "Google login failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in text-slate-900">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in relative border border-green-500/20 dark:border-green-500/30">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {isLogin 
                ? 'Sign in to access your history and settings' 
                : 'Join us to start personalizing your AI content'
              }
            </p>
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl mb-6">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${isLogin ? 'bg-white dark:bg-slate-800 shadow-sm text-green-600 dark:text-green-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Log In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${!isLogin ? 'bg-white dark:bg-slate-800 shadow-sm text-green-600 dark:text-green-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg text-center animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative group">
                <UserIcon className="h-5 w-5 text-slate-400 group-focus-within:text-green-500 absolute left-3 top-1/2 -translate-y-1/2 transition-colors" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-green-500 dark:focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900 outline-none transition-all"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="relative group">
              <EnvelopeIcon className="h-5 w-5 text-slate-400 group-focus-within:text-green-500 absolute left-3 top-1/2 -translate-y-1/2 transition-colors" />
              <input
                type="email" 
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-green-500 dark:focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900 outline-none transition-all"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative group">
              <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-slate-400 group-focus-within:text-green-500 absolute left-3 top-1/2 -translate-y-1/2 transition-colors" />
              <input
                type="password" 
                placeholder="Password (min. 6 chars)"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-green-500 dark:focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900 outline-none transition-all"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-green-500 text-white rounded-xl font-bold shadow-lg shadow-green-200 dark:shadow-green-900/40 hover:bg-green-600 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Log In' : 'Create Account')}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#ea4335" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"/>
              <path fill="white" d="M16.5 13.5h-4.5v-3h7.5c.3 0 .6.3.6.6v.3c0 2.4-1.8 4.2-4.2 4.2H12v2.1h4.5c.3 0 .6.3.6.6s-.3.6-.6.6h-5.4c-.3 0-.6-.3-.6-.6v-6c0-1.6 1.3-3 3-3h3.3c.3 0 .6.3.6.6s-.3.6-.6.6h-3.3c-1 0-1.8.8-1.8 1.8v.3h4.5c.3 0 .6.3.6.6s-.3.6-.6.6z"/>
              <path fill="#4285f4" d="M22.5 12c0-.7-.1-1.4-.2-2.1h-10.3v4h5.9c-.3 1.3-1 2.3-2 3l3.2 2.5c1.8-1.7 2.9-4.2 2.9-7.4z"/>
              <path fill="#34a853" d="M12 23c3 0 5.5-1 7.3-2.6l-3.2-2.5c-1 .7-2.3 1.1-4.1 1.1-2.9 0-5.3-2-6.1-4.7l-3.3 2.6C4.5 20.3 8 23 12 23z"/>
              <path fill="#fbbc05" d="M5.9 14.3c-.2-.6-.3-1.3-.3-2.1s.1-1.5.3-2.1L2.6 7.5C1.8 9 1.5 10.5 1.5 12c0 1.5.3 3 .8 4.3l3.6-2z"/>
              <path fill="#ea4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.6l3.2-3.1C17.5 2.1 15 1.1 12 1.1 8 1.1 4.5 3.8 2.6 7.5L5.9 10c.8-2.6 3.2-4.6 6.1-4.6z"/>
            </svg>
            Google Account
          </button>
        </div>
      </div>
    </div>
  );
};
