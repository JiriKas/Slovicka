import React from 'react';

export const Loader: React.FC<{ text?: string }> = ({ text = "Načítám..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-sky-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-yellow-400 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <p className="text-slate-500 font-medium animate-pulse">{text}</p>
    </div>
  );
};
