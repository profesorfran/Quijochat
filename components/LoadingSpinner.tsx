
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
      <span className="text-sm text-gray-500 dark:text-gray-400">El profe está pensando...</span>
    </div>
  );
};

export default LoadingSpinner;
