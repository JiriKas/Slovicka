import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-2xl font-bold transition-all transform active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-yellow-400 text-yellow-900 hover:bg-yellow-300 border-b-4 border-yellow-600 active:border-b-0 active:mt-1",
    secondary: "bg-sky-400 text-white hover:bg-sky-300 border-b-4 border-sky-600 active:border-b-0 active:mt-1",
    outline: "bg-white text-slate-600 border-2 border-slate-200 hover:bg-slate-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
