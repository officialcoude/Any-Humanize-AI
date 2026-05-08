import React from 'react';
import { 
  VideoCameraIcon, 
  FaceSmileIcon, 
  TagIcon, 
  DevicePhoneMobileIcon,
  GlobeAltIcon, 
  LockClosedIcon 
} from '@heroicons/react/24/outline';

export const Features: React.FC = () => {
  const features = [
    {
      name: 'Script Writer',
      description: 'Generate engaging scripts for YouTube, TikTok, and Reels. From educational content to viral skits.',
      icon: VideoCameraIcon,
      // Image: Typewriter/Script concept
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80', 
    },
    {
      name: 'Humanize Text',
      description: 'Transform robotic AI text into natural, human-like writing that bypasses detection.',
      icon: FaceSmileIcon,
      // Image: Artificial Intelligence / Human connection
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'YouTube SEO',
      description: 'Boost your views with optimized titles, descriptions, tags, and hashtags ranking.',
      icon: TagIcon,
      // Image: Analytics/Growth
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Viral Captions',
      description: 'Create catchy captions for Instagram and TikTok with trending hashtags and emojis.',
      icon: DevicePhoneMobileIcon,
      // Image: Social Media/Mobile
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Multi-Language',
      description: 'All tools support English, Bengali, Hindi, Spanish, and more.',
      icon: GlobeAltIcon,
      // Image: Global connectivity
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: '100% Private',
      description: 'Your content is secure. We process data in real-time without storing it.',
      icon: LockClosedIcon,
      // Image: Security/Lock
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Choose Any HumanizeAI?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            The smartest way to transform robotic AI text into engaging human content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="relative overflow-hidden p-8 bg-white/40 dark:bg-slate-800/40 rounded-2xl border border-white/50 dark:border-slate-700/50 hover:border-green-500/30 dark:hover:border-green-500/30 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col backdrop-blur-md">
              
              {/* Background Image Layer with Glass Effect */}
              <div className="absolute inset-0 z-0">
                {/* Image itself */}
                <img 
                  src={feature.image} 
                  alt={feature.name} 
                  className="w-full h-full object-cover opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 grayscale-[30%] group-hover:grayscale-0"
                />
                {/* Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/90 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-slate-900/90"></div>
              </div>

              {/* Content Layer */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl shadow-sm flex items-center justify-center mb-6 border border-white/50 dark:border-slate-600 group-hover:border-green-500/30 dark:group-hover:border-green-500/30 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-7 w-7 text-green-600 dark:text-green-400 group-hover:text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors drop-shadow-sm">{feature.name}</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed flex-grow font-medium text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};