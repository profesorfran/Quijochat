
import React from 'react';

interface GradeSelectorProps {
  onSelectGrade: (grade: '3' | '4') => void;
}

const GradeSelector: React.FC<GradeSelectorProps> = ({ onSelectGrade }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center my-4 animate-fade-in">
      <button
        onClick={() => onSelectGrade('3')}
        className="px-4 py-2 bg-teal-50 dark:bg-teal-900 border border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-200 rounded-full text-sm hover:bg-teal-100 dark:hover:bg-teal-800 transition-colors duration-200"
      >
        3º de la ESO
      </button>
      <button
        onClick={() => onSelectGrade('4')}
        className="px-4 py-2 bg-teal-50 dark:bg-teal-900 border border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-200 rounded-full text-sm hover:bg-teal-100 dark:hover:bg-teal-800 transition-colors duration-200"
      >
        4º de la ESO
      </button>
    </div>
  );
};

export default GradeSelector;
