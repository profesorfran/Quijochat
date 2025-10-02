export type MessageRole = 'user' | 'model';

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

export type AIResponse = {
  intent: 'question' | 'insult' | 'apology' | 'greeting' | 'other';
  response: string;
};