import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className, ...props }) => {
  let baseClasses = 'rounded-full font-semibold transition-all shadow-lg';

  // Size classes
  if (size === 'sm') {
    baseClasses += ' px-4 py-2 text-sm';
  } else if (size === 'lg') {
    baseClasses += ' px-8 py-4 text-lg';
  } else {
    baseClasses += ' px-6 py-3';
  }

  // Variant classes - updated to use green for primary (per redesign instructions)
  if (variant === 'primary') {
    baseClasses += ' bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:shadow-green-500/30';
  } else if (variant === 'secondary') {
    baseClasses += ' bg-slate-700 text-slate-200 hover:bg-slate-600 hover:shadow-slate-500/20';
  } else if (variant === 'outline') {
    baseClasses += ' border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white hover:shadow-green-500/30';
  }

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
