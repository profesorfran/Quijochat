
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import LoadingSpinner from './components/LoadingSpinner';
import SuggestionChips from './components/SuggestionChips';
import GradeSelector from './components/GradeSelector';
import type { ChatMessage as ChatMessageType } from './types';
import { getAIResponse } from './services/geminiService';
import ApiKeyGate from './components/ApiKeyGate';
import { getApiKey } from './services/apiKey';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [grade, setGrade] = useState<'3' | '4' | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(!!getApiKey());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('chatMessages');
      const savedUserName = localStorage.getItem('chatUserName');
      const savedGrade = localStorage.getItem('chatGrade') as '3' | '4' | null;

      if (savedMessages && savedUserName && savedGrade) {
        setMessages(JSON.parse(savedMessages));
        setUserName(savedUserName);
        setGrade(savedGrade);
      } else {
        setMessages([
          {
            role: 'model',
            content: '¡Hola! Soy tu profe, Francisco. Antes de empezar, ¿cómo te llamas, campeón/a?'
          }
        ]);
      }
    } catch (error) {
        console.error("Failed to parse localStorage data:", error);
        setMessages([
          {
            role: 'model',
            content: '¡Hola! Soy tu profe, Francisco. Antes de empezar, ¿cómo te llamas, campeón/a?'
          }
        ]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1 && userName && grade) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
      localStorage.setItem('chatUserName', userName);
      localStorage.setItem('chatGrade', grade);
    }
  }, [messages, userName, grade]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleGradeSelect = (selectedGrade: '3' | '4') => {
    const gradeUserMessage: ChatMessageType = {
        role: 'user',
        content: `Estoy en ${selectedGrade}º de la ESO.`
    };
    
    setGrade(selectedGrade);

    const welcomeMessages = {
        '3': `¡Perfecto! Este año nos centraremos en los Géneros Literarios. ¡Prepárate para ser un experto! ¿Por dónde empezamos?`,
        '4': `¡Entendido! Este año viajaremos por el Neoclasicismo y el Romanticismo. ¡Va a ser épico! ¿Tienes ya alguna pregunta?`
    };

    const finalWelcomeMessage: ChatMessageType = {
        role: 'model',
        content: welcomeMessages[selectedGrade]
    };
    
    setMessages(prev => [...prev, gradeUserMessage, finalWelcomeMessage]);
  };


  const handleSendMessage = async (userInput: string) => {
    setError(null);
    const newUserMessage: ChatMessageType = { role: 'user', content: userInput };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    
    if (!userName) {
        const nameRegex = /(?:soy|llamo|nombre es)\s*(\w+)/i;
        const match = userInput.match(nameRegex);
        let extractedName = "Estudiante";

        if (match && match[1]) {
            extractedName = match[1];
        } else {
            const words = userInput.trim().split(' ');
            extractedName = words[words.length - 1];
        }

        extractedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1).toLowerCase();

        setUserName(extractedName);
        const nameMessage: ChatMessageType = {
            role: 'model',
            content: `¡Genial, ${extractedName}! Un placer tenerte en clase, máquina.`
        };
        const gradeQuestionMessage: ChatMessageType = {
            role: 'model',
            content: `Para poder ayudarte mejor, dime, ¿estás en 3º o en 4º de la ESO?`
        };
        setMessages(prev => [...prev, nameMessage, gradeQuestionMessage]);
        return;
    }

    if (userName && grade) {
      setIsLoading(true);

      try {
        const aiResponseObject = await getAIResponse(userInput, userName, grade);
        const newAiMessage: ChatMessageType = { role: 'model', content: aiResponseObject.response };
        
        if (aiResponseObject.intent === 'insult') {
          setIsBlocked(true);
        } else if (aiResponseObject.intent === 'apology') {
          setIsBlocked(false);
        }

        setMessages(prevMessages => [...prevMessages, newAiMessage]);
      } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
          setError('Lo siento, hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
          const errorAiMessage: ChatMessageType = { role: 'model', content: 'Lo siento, hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.' };
          setMessages(prevMessages => [...prevMessages, errorAiMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const showGradeSelector = userName && !grade && !isLoading;
  const showSuggestions = userName && grade && messages.length === 6 && !isLoading;

  return (
    <div className="flex flex-col h-screen font-sans text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-slate-900">
      <Header />
      {!hasApiKey && (
        <ApiKeyGate onReady={() => setHasApiKey(true)} />
      )}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-3xl">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {isLoading && (
             <div className="flex justify-start my-2">
               <div className="flex items-start max-w-xl">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mr-3">FD</div>
                <div className="bg-lime-200 dark:bg-lime-800 p-3 rounded-lg shadow-sm rounded-tl-none">
                  <LoadingSpinner />
                </div>
               </div>
            </div>
          )}
          {showGradeSelector && <GradeSelector onSelectGrade={handleGradeSelect} />}
          {showSuggestions && <SuggestionChips onSuggestionClick={handleSendMessage} grade={grade} />}
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} isBlocked={isBlocked || !hasApiKey} isAwaitingGrade={!!userName && !grade} />
    </div>
  );
};

export default App;
