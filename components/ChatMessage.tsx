import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ProfessorAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mr-3">
    FD
  </div>
);

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex my-4 animate-fade-in ${isModel ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex items-start max-w-xl ${isModel ? '' : 'flex-row-reverse'}`}>
        {isModel && <ProfessorAvatar />}
        <div
          className={`p-3 rounded-lg shadow-sm prose prose-sm dark:prose-invert break-words ${
            isModel
              ? 'bg-lime-200 dark:bg-lime-800 text-gray-800 dark:text-gray-100 rounded-tl-none'
              : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tr-none'
          }`}
        >
          <ReactMarkdown
            className="whitespace-pre-wrap m-0"
            components={{
              p: ({node, ...props}) => <p className="m-0" {...props} />,
              ul: ({node, ...props}) => <ul className="my-2" {...props} />,
              ol: ({node, ...props}) => <ol className="my-2" {...props} />,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
