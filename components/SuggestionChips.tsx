
import React from 'react';

interface SuggestionChipsProps {
  onSuggestionClick: (suggestion: string) => void;
  grade: '3' | '4' | null;
}

const suggestions3 = [
  "¿Qué es el género lírico?",
  "Diferencias entre novela y cuento",
  "Dame un ejemplo de tragedia"
];

const suggestions4 = [
  "¿Qué es el Neoclasicismo?",
  "Características del Romanticismo",
  "Háblame de 'El sí de las niñas'"
];

const SuggestionChips: React.FC<SuggestionChipsProps> = ({ onSuggestionClick, grade }) => {
  if (!grade) {
    return null;
  }
  
  const suggestions = grade === '3' ? suggestions3 : suggestions4;

  return (
    <div className="flex flex-wrap gap-2 justify-center my-4 animate-fade-in">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion)}
          className="px-4 py-2 bg-teal-50 dark:bg-teal-900 border border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-200 rounded-full text-sm hover:bg-teal-100 dark:hover:bg-teal-800 transition-colors duration-200"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;
