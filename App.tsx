import React, { useState, useEffect } from 'react';
import { SetupForm } from './components/SetupForm';
import { FlashCard } from './components/FlashCard';
import { generateVocabularyList } from './services/geminiService';
import { PREDEFINED_TOPICS } from './data/predefinedTopics';
import { VocabularyItem } from './types';
import { Button } from './components/Button';
import { Loader } from './components/Loader';

enum AppState {
  SETUP,
  LOADING_LIST,
  LEARNING,
  FINISHED
}

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.SETUP);
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isInstantMode, setIsInstantMode] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    // Safely check for API key to prevent crash if 'process' is not defined in the browser
    let key = '';
    try {
      if (typeof process !== 'undefined' && process.env) {
        key = process.env.API_KEY || '';
      }
    } catch (e) {
      console.warn("Environment 'process' not accessible, defaulting to offline mode.");
    }
    setHasApiKey(!!key && key.length > 0);
  }, []);

  const handleStartSession = async (topic: string, isPredefined: boolean) => {
    setError(null);
    
    if (isPredefined) {
      // INSTANT START (Offline Mode)
      const predefinedTopic = PREDEFINED_TOPICS.find(t => t.id === topic);
      if (predefinedTopic) {
        setVocabulary(predefinedTopic.items);
        setCurrentIndex(0);
        setIsInstantMode(true);
        setAppState(AppState.LEARNING);
      } else {
        setError("Téma nebylo nalezeno.");
      }
      return;
    }

    // AI START (Requires API Key)
    if (!hasApiKey) {
      setError("Pro vlastní témata je potřeba nastavit API klíč.");
      return;
    }

    setIsInstantMode(false);
    setAppState(AppState.LOADING_LIST);
    try {
      // Hardcoded level for children
      const levelDescription = "Child / Toddler (Picture based learning, very simple words)";
      const items = await generateVocabularyList(levelDescription, topic);
      
      if (items.length === 0) {
        setError("Omlouvám se, nepodařilo se mi vymyslet slovíčka na toto téma. Zkus to prosím znovu.");
        setAppState(AppState.SETUP);
        return;
      }
      setVocabulary(items);
      setCurrentIndex(0);
      setAppState(AppState.LEARNING);
    } catch (err) {
      console.error(err);
      setError("Něco se pokazilo při komunikaci s mým mozkem. Zkontroluj připojení nebo API klíč.");
      setAppState(AppState.SETUP);
    }
  };

  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setAppState(AppState.FINISHED);
    }
  };

  const handleRestart = () => {
    setVocabulary([]);
    setCurrentIndex(0);
    setAppState(AppState.SETUP);
    setIsInstantMode(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      
      {appState === AppState.SETUP && (
        <div className="space-y-4 w-full flex flex-col items-center">
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-xl border border-red-200 max-w-md text-center animate-bounce">
              {error}
            </div>
          )}
          <SetupForm 
            onSubmit={handleStartSession} 
            isLoading={false} 
            hasApiKey={hasApiKey}
          />
        </div>
      )}

      {appState === AppState.LOADING_LIST && (
        <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-sm w-full">
           <Loader text="Vymýšlím ta nejlepší slovíčka..." />
        </div>
      )}

      {appState === AppState.LEARNING && vocabulary.length > 0 && (
        <div className="w-full flex flex-col items-center gap-6 animate-[slideUp_0.3s_ease-out]">
           <div className="w-full max-w-lg flex justify-between text-slate-500 font-bold px-4 md:text-lg">
             <span>Lekce</span>
             <span>{currentIndex + 1} / {vocabulary.length}</span>
           </div>
           
           <FlashCard 
             key={currentIndex}
             item={vocabulary[currentIndex]} 
             onNext={handleNext}
             isLast={currentIndex === vocabulary.length - 1}
             isInstantMode={isInstantMode}
           />
           
           {/* Optional Quit Button */}
           <button onClick={handleRestart} className="text-slate-400 hover:text-red-400 text-sm font-bold py-2">
             Ukončit lekci ✕
           </button>
        </div>
      )}

      {appState === AppState.FINISHED && (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border-b-8 border-green-200 p-8 text-center space-y-6 animate-[zoomIn_0.4s_ease-out]">
          <div className="text-8xl mb-4 animate-bounce">🏆</div>
          <h2 className="text-4xl font-black text-slate-800">Skvělá práce!</h2>
          <p className="text-slate-500 text-xl">Prošel jsi všechna slovíčka. Jsi šikula!</p>
          
          <div className="pt-4">
            <Button onClick={handleRestart} fullWidth variant="primary" className="text-lg py-4">
              Zkusit nové téma 🔄
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}