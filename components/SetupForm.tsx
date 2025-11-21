import React, { useState } from 'react';
import { ProficiencyLevel, PredefinedTopic } from '../types';
import { PREDEFINED_TOPICS } from '../data/predefinedTopics';
import { Button } from './Button';

interface SetupFormProps {
  onSubmit: (level: string, topic: string, isPredefined: boolean) => void;
  isLoading: boolean;
}

export const SetupForm: React.FC<SetupFormProps> = ({ onSubmit, isLoading }) => {
  const [level, setLevel] = useState<ProficiencyLevel>(ProficiencyLevel.CHILD);
  const [customTopic, setCustomTopic] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTopic.trim()) {
      onSubmit(level, customTopic, false);
    }
  };

  const handlePredefinedClick = (topic: PredefinedTopic) => {
    // For predefined, we pass the ID or Label. 
    // In App.tsx we will look it up, or we can pass the ID as the topic.
    onSubmit(level, topic.id, true);
  };

  return (
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden border-b-8 border-sky-200 flex flex-col md:flex-row">
      
      {/* Left Column: Level Selection */}
      <div className="md:w-1/3 bg-slate-50 p-6 md:p-8 border-r border-slate-100 flex flex-col justify-center">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-black text-sky-500 tracking-wide mb-2">🇬🇧 English</h1>
          <p className="text-slate-500 font-medium">Nastavení výuky</p>
        </div>

        <div className="space-y-4">
          <label className="block text-slate-700 font-bold text-lg ml-1">Úroveň angličtiny</label>
          <div className="space-y-3">
            {Object.values(ProficiencyLevel).map((lvl) => (
              <label 
                key={lvl} 
                className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  level === lvl 
                    ? 'border-sky-400 bg-sky-50 ring-2 ring-sky-200 ring-offset-1' 
                    : 'border-slate-200 hover:border-sky-200 hover:bg-white'
                }`}
              >
                <input 
                  type="radio" 
                  name="level" 
                  value={lvl} 
                  checked={level === lvl}
                  onChange={(e) => setLevel(e.target.value as ProficiencyLevel)}
                  className="hidden"
                />
                <span className="font-medium text-slate-700">{lvl}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Topic Selection */}
      <div className="md:w-2/3 p-6 md:p-8 bg-white">
        <h2 className="text-2xl font-bold text-slate-700 mb-6">Vyber si téma</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {PREDEFINED_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handlePredefinedClick(topic)}
              disabled={isLoading}
              className={`group relative overflow-hidden p-6 rounded-2xl border-b-4 transition-all transform active:scale-95 text-left h-32 flex flex-col justify-between ${topic.color} hover:brightness-95`}
            >
              <span className="text-4xl absolute top-4 right-4 opacity-40 group-hover:scale-125 transition-transform duration-300">{topic.icon}</span>
              <span className="font-black text-xl relative z-10">{topic.label}</span>
              <span className="text-xs font-bold uppercase tracking-wider opacity-70">Rychlá hra ⚡</span>
            </button>
          ))}
        </div>

        <div className="relative border-t-2 border-slate-100 pt-6 mt-6">
           <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-slate-400 text-sm font-bold">NEBO</span>
           
           <form onSubmit={handleCustomSubmit} className="space-y-4">
             <label className="block text-slate-700 font-bold ml-1">Vlastní téma (Generováno AI ✨)</label>
             <div className="flex gap-2 flex-col sm:flex-row">
               <input
                 type="text"
                 value={customTopic}
                 onChange={(e) => setCustomTopic(e.target.value)}
                 placeholder="např. Vesmír, Dinosauři, Princezny..."
                 className="flex-1 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-sky-400 font-medium text-slate-700 placeholder:text-slate-300"
                 disabled={isLoading}
               />
               <Button 
                 type="submit" 
                 disabled={isLoading || !customTopic.trim()}
                 variant="primary"
                 className="min-w-[140px]"
               >
                 {isLoading ? 'Načítám...' : 'Start!'}
               </Button>
             </div>
           </form>
        </div>
      </div>
    </div>
  );
};