
import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  isBlocked: boolean;
  isAwaitingGrade: boolean;
}

const SendIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, isBlocked, isAwaitingGrade }) => {
  const [message, setMessage] = useState('');
  const isDisabled = isLoading || isBlocked || isAwaitingGrade;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isDisabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const placeholderText = isBlocked
    ? 'Escribe una disculpa para continuar...'
    : isAwaitingGrade
    ? 'Selecciona tu curso arriba...'
    : 'Escribe tu pregunta aquí...';

  return (
    <div className="bg-gray-100 dark:bg-slate-800 p-4 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto max-w-3xl">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholderText}
            disabled={isDisabled}
            className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isDisabled || !message.trim()}
            className="p-2.5 bg-teal-500 text-white rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-300 disabled:cursor-not-allowed transition-colors duration-200"
            aria-label="Enviar mensaje"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
