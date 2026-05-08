import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: '01',
      title: 'Paste Your Text',
      description: 'Copy your AI-generated text from ChatGPT, Gemini, or Claude and paste it into the input box.',
    },
    {
      id: '02',
      title: 'Select Tone',
      description: 'Choose from various tones like Standard, Professional, or Storyteller to match your needs.',
    },
    {
      id: '03',
      title: 'Get Human Text',
      description: 'Click "Humanize Text" and instantly get a natural, polished version ready to use.',
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-slate-300">Three simple steps to perfect content.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="relative p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors group">
              <div className="absolute -top-6 left-8 text-6xl font-black text-slate-800/50 select-none font-serif group-hover:text-green-900/30 transition-colors">
                {step.id}
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-green-900/20 text-white">
                  {step.id}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-green-400 transition-colors">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};