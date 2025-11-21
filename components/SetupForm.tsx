import React, { useState } from 'react';
import { PredefinedTopic } from '../types';
import { PREDEFINED_TOPICS } from '../data/predefinedTopics';
import { Button } from './Button';

interface SetupFormProps {
  onSubmit: (topic: string, isPredefined: boolean) => void;
  isLoading: boolean;
  hasApiKey: boolean;
}

export const SetupForm: React.FC<SetupFormProps> = ({ onSubmit, isLoading, hasApiKey }) => {
  const [customTopic, setCustomTopic] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTopic.trim() && hasApiKey) {
      onSubmit(customTopic, false);
    }
  };

  const handlePredefinedClick = (topic: PredefinedTopic) => {
    onSubmit(topic.id, true);
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border-b-8 border-sky-200 flex flex-col">
      
      {/* Header */}
      <div className="bg-sky-50 p-8 border-b border-sky-100 text-center">
        <h1 className="text-4xl font-black text-sky-500 tracking-wide mb-2 flex items-center justify-center gap-3">
          <span className="text-5xl">🇬🇧</span> 
          Slovíčka Hrou
        </h1>
        <p className="text-slate-500 font-medium text-lg">
          {hasApiKey ? "Vyber si téma a začni se učit!" : "Offline režim - vyber si kartičky"}
        </p>
      </div>

      {/* Content - Topic Selection */}
      <div className="p-6 md:p-10 bg-white">
        
        <h3 className="text-slate-400 font-bold uppercase text-sm tracking-wider mb-4">Přednastavená témata (Offline)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {PREDEFINED_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handlePredefinedClick(topic)}
              disabled={isLoading}
              className={`group relative overflow-hidden p-6 rounded-2xl border-b-4 transition-all transform active:scale-95 text-left h-40 flex flex-col justify-between ${topic.color} hover:brightness-95 shadow-sm hover:shadow-md`}
            >
              <span className="text-6xl absolute -bottom-2 -right-2 opacity-30 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 text-gray-900">{topic.icon}</span>
              <div>
                <span className="font-black text-2xl block mb-1 relative z-10">{topic.label}</span>
                <span className="text-xs font-bold uppercase tracking-wider opacity-70 bg-white/40 px-2 py-1 rounded-lg inline-block">
                  ⚡ Ihned
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="relative border-t-2 border-slate-100 pt-10">
           <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-slate-400 text-sm font-bold">
             AI GENERÁTOR
           </span>
           
           <div className={`transition-opacity duration-300 ${hasApiKey ? 'opacity-100' : 'opacity-50 grayscale select-none'}`}>
             <form onSubmit={handleCustomSubmit} className="max-w-2xl mx-auto space-y-4">
               <div className="flex justify-between items-center mb-2">
                  <label className="block text-slate-700 font-bold text-lg">
                    Vlastní téma
                    {hasApiKey && <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">Powered by Gemini</span>}
                  </label>
                  {!hasApiKey && (
                    <span className="text-xs font-bold text-red-400 border border-red-200 px-2 py-1 rounded bg-red-50">
                      🔒 Vyžaduje API Key
                    </span>
                  )}
               </div>
               
               <div className="flex gap-3 flex-col sm:flex-row relative">
                 <input
                   type="text"
                   value={customTopic}
                   onChange={(e) => setCustomTopic(e.target.value)}
                   placeholder={hasApiKey ? "např. Vesmír, Dinosauři..." : "AI funkce jsou vypnuté"}
                   className="flex-1 p-5 text-lg bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-sky-400 font-medium text-slate-700 placeholder:text-slate-300 transition-colors disabled:cursor-not-allowed"
                   disabled={isLoading || !hasApiKey}
                 />
                 <Button 
                   type="submit" 
                   disabled={isLoading || !customTopic.trim() || !hasApiKey}
                   variant="primary"
                   className="min-w-[140px] text-lg"
                 >
                   {isLoading ? 'Načítám...' : 'Start!'}
                 </Button>
                 
                 {!hasApiKey && (
                   <div className="absolute inset-0 bg-white/10 cursor-not-allowed z-10" title="Pro vlastní témata nastavte API Key"></div>
                 )}
               </div>
               {!hasApiKey && (
                  <p className="text-xs text-center text-slate-400 mt-2">
                    Pro generování vlastních témat je potřeba nastavit <code>API_KEY</code> v prostředí aplikace.
                  </p>
               )}
             </form>
           </div>
        </div>
      </div>
    </div>
  );
};