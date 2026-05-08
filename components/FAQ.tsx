import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Is this tool free to use?",
      answer: "Yes! Any HumanizeAI is a free open-source tool designed to help you improve your content quality without any cost."
    },
    {
      question: "Which languages are supported?",
      answer: "We support all major languages including English, Bengali (Bangla), Spanish, Hindi, French, and German. The AI automatically detects the input language."
    },
    {
      question: "Does it work for academic writing?",
      answer: "Absolutely. Select the 'Academic' tone to ensure your text sounds scholarly yet natural, perfect for essays and reports."
    },
    {
      question: "Is my text saved on your servers?",
      answer: "No. We prioritize your privacy. Your text is processed in real-time by the API and is not stored on our servers."
    }
  ];

  return (
    <section className="py-20 bg-green-50/30 dark:bg-slate-950/50 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">Common questions about our humanizer tool.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-green-100 dark:border-slate-700 hover:shadow-md hover:border-green-200 dark:hover:border-green-900/50 transition-all">
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <QuestionMarkCircleIcon className="h-6 w-6 text-green-500 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};