import { playPronunciation as playGeminiTts } from './geminiService';

export const playAudio = async (text: string, useNative: boolean = false): Promise<void> => {
  if (useNative && 'speechSynthesis' in window) {
    return new Promise((resolve) => {
      // Cancel any current speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; // Slightly slower for kids
      utterance.pitch = 1.1; // Slightly higher pitch

      // Find a good English voice if available
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.includes('en-') && !v.localService); // Try to find a high quality online voice if possible, or just first en
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = (e) => {
        console.warn("Native speech error", e);
        resolve(); // Resolve anyway to unblock UI
      };

      window.speechSynthesis.speak(utterance);
    });
  } else {
    // Fallback to Gemini or if native not requested
    return playGeminiTts(text);
  }
};