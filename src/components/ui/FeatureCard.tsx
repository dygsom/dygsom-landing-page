import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 flex flex-col items-center text-center animate-fade-in">
      <div className="text-dygsom-blue mb-4 text-5xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-dygsom-light-text mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
};
