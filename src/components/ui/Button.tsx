import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  let baseClasses = 'px-6 py-3 rounded-full font-semibold transition-all shadow-lg';
  
  if (variant === 'primary') {
    baseClasses += ' bg-gradient-to-r from-dygsom-blue to-cyan-500 text-white hover:from-dygsom-blue/90 hover:to-cyan-400 hover:shadow-cyan-500/30';
  } else if (variant === 'secondary') {
    baseClasses += ' bg-slate-700 text-dygsom-light-text hover:bg-slate-600 hover:shadow-slate-500/20';
  } else if (variant === 'outline') {
    baseClasses += ' border-2 border-dygsom-blue text-dygsom-blue hover:bg-dygsom-blue hover:text-white hover:shadow-dygsom-blue/30';
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
