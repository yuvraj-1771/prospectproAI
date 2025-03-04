import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

interface StructuredData {
  summary: string;
  key_insights: string[];
  data: Record<string, any>;
}

interface Message {
  id: string;
  content: string;
  sender: 'ai' | 'user';
  structuredData?: StructuredData;
  onFilterApply?: (query: string) => Promise<void>;
}

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-white">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <div className="max-w-md">
            <h3 className="text-xl font-semibold mb-2">Welcome to ProspectPro AI</h3>
            <p className="text-gray-600 mb-4">
              Ask me about prospects, investors, or companies. I can help you research and generate leads.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                "Find tech startups in Boston"
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                "List VCs investing in AI companies"
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                "Research potential clients in healthcare"
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                "Generate leads for SaaS products"
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              onFilterApply={message.onFilterApply || (async () => {})} 
            />
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 p-4">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default ChatContainer;