import React, { useState, useEffect } from 'react';
import { VocabularyItem } from '../types';
import { generateIllustration } from '../services/geminiService';
import { playAudio } from '../services/audioService';
import { Button } from './Button';
import { Loader } from './Loader';

interface FlashCardProps {
  item: VocabularyItem;
  onNext: () => void;
  onPrevious: () => void;
  isLast: boolean;
  isFirst: boolean;
  isInstantMode: boolean; // If true, use native TTS and Local Assets (Emojis)
}

export const FlashCard: React.FC<FlashCardProps> = ({ item, onNext, onPrevious, isLast, isFirst, isInstantMode }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchImage = async () => {
      // OFFLINE / INSTANT MODE
      // We strictly use the emoji as the "image" from the file system
      if (isInstantMode && item.emoji) {
        setImageLoading(false);
        return;
      }

      // AI MODE
      setImageLoading(true);
      setImageUrl(null);
      
      const url = await generateIllustration(item.english, item.visualDescription);
      
      if (mounted) {
        setImageUrl(url);
        setImageLoading(false);
      }
    };

    fetchImage();

    return () => {
      mounted = false;
    };
  }, [item, isInstantMode]);

  const handlePlayAudio = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    try {
      // Use native browser speech for instant mode (works offline), Gemini for custom mode
      await playAudio(item.english, isInstantMode);
    } catch (error) {
      console.error("Audio playback failed", error);
    } finally {
      setIsPlaying(false);
    }
  };

  // Auto-play audio when the card is mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      handlePlayAudio();
    }, 600); 
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border-b-8 border-yellow-200 transform transition-all">
      <div className="relative h-64 md:h-80 bg-slate-100 flex items-center justify-center overflow-hidden group cursor-pointer" onClick={() => handlePlayAudio()}>
        {isInstantMode && item.emoji ? (
             // Local Asset Rendering (Emoji as Image)
             <div className="text-[150px] md:text-[180px] drop-shadow-xl select-none transform group-hover:scale-110 transition-transform duration-300">
               {item.emoji}
             </div>
        ) : imageLoading ? (
          <Loader text="Kreslím obrázek..." />
        ) : imageUrl ? (
          <img 
            src={imageUrl} 
            alt={item.english} 
            className="w-full h-full object-cover animate-[fadeIn_0.5s_ease-in]"
          />
        ) : (
          <div className="text-slate-400 text-center p-4">
            <span className="text-4xl mb-2 block">🖼️</span>
            Obrázek se nepovedlo načíst
          </div>
        )}
        
        {/* Overlay play icon */}
        <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
             <svg className="w-8 h-8 text-sky-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" fillRule="evenodd"></path></svg>
        </div>
      </div>

      <div className="p-6 md:p-8 text-center space-y-6">
        <div className="space-y-1">
            <h2 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight">{item.english}</h2>
            <p className="text-2xl md:text-3xl text-slate-500 font-bold">{item.czech}</p>
        </div>

        <div className="flex justify-center">
            <button 
            onClick={(e) => { e.stopPropagation(); handlePlayAudio(); }}
            disabled={isPlaying}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-sky-100 text-sky-700 font-bold hover:bg-sky-200 transition-colors disabled:opacity-50 active:scale-95"
            title={isInstantMode ? "Přehrát (Offline hlas)" : "Přehrát (AI hlas)"}
            >
            {isPlaying ? (
                <>
                <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <span>Hraje...</span>
                </>
            ) : (
                <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Přehrát</span>
                </>
            )}
            </button>
        </div>

        <div className="pt-6 border-t border-slate-100 w-full flex gap-4">
           <Button 
             onClick={onPrevious} 
             variant="outline" 
             disabled={isFirst}
             className="flex-1"
           >
             ⬅ Zpět
           </Button>
           <Button 
             onClick={onNext} 
             variant="secondary" 
             className="flex-[2] text-lg"
           >
             {isLast ? 'Dokončit 🎉' : 'Další ➔'}
           </Button>
        </div>
      </div>
    </div>
  );
};