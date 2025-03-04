import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleVoiceInput = () => {
    // Check if browser supports speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setIsListening(!isListening);
      
      // This is a mock implementation since actual speech recognition would require more setup
      if (!isListening) {
        // Simulate starting voice recognition
        setIsListening(true);
        
        // For demo purposes, we'll just show a timeout and then stop "listening"
        setTimeout(() => {
          setIsListening(false);
          setMessage(prev => prev + "I'm using voice input to find prospects. ");
        }, 2000);
      }
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center border-t p-4 bg-white">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about prospects, investors, or companies..."
        className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={isLoading}
      />
      <button
        type="button"
        onClick={handleVoiceInput}
        className={`px-4 py-2 bg-gray-100 text-gray-700 ${
          isListening ? 'bg-red-100 text-red-600 animate-pulse' : ''
        }`}
        disabled={isLoading}
        title="Voice input"
      >
        <Mic size={20} />
      </button>
      <button
        type="submit"
        className={`px-4 py-2 bg-indigo-600 text-white rounded-r-md ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
        }`}
        disabled={isLoading}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;