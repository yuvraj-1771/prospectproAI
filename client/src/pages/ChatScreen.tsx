import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ChatHeader from '../components/chat/ChatHeader';
import ChatContainer from '../components/chat/ChatContainer';
import ChatInput from '../components/chat/ChatInput';
import ConversationList from '../components/chat/ConversationList';
import { chatApi } from '../api/chatApi';
import { User } from 'lucide-react';

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
}

interface Conversation {
  id: string;
  title: string;
  date: string;
  messages: Message[];
}

const ChatScreen: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Initialize with a default conversation
  useEffect(() => {
    const newConversationId = uuidv4();
    const newConversation: Conversation = {
      id: newConversationId,
      title: 'New conversation',
      date: new Date().toISOString(),
      messages: []
    };
    
    setConversations([newConversation]);
    setActiveConversationId(newConversationId);
    
    // Try to load conversation history from API
    const loadConversationHistory = async () => {
      try {
        const history = await chatApi.getConversationHistory();
        if (history && history.length > 0) {
          // Process history if available
          console.log('Loaded conversation history:', history);
          // You could update the conversations state here with the history
        }
      } catch (error) {
        // Just log the error but don't let it affect the app's functionality
        console.error('Failed to load conversation history:', error);
        // Continue with the default empty conversation
      }
    };
    
    // Attempt to load history but don't block the app if it fails
    loadConversationHistory().catch(() => {
      // Silently fail and continue with the default conversation
    });
  }, []);

  const activeConversation = conversations.find(conv => conv.id === activeConversationId);
  
  const handleSendMessage = async (content: string) => {
    if (!activeConversationId || !content.trim()) return;
    
    // Create user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: 'user'
    };
    
    // Update conversation with user message
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === activeConversationId 
          ? { 
              ...conv, 
              messages: [...conv.messages, userMessage],
              // Update title if this is the first message
              title: conv.messages.length === 0 ? content.slice(0, 30) + (content.length > 30 ? '...' : '') : conv.title
            } 
          : conv
      )
    );
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Send message to API
      const response = await chatApi.sendMessage(content);
      
      // Create AI response message
      const aiMessage: Message = {
        id: uuidv4(),
        content: response.data.summary,
        sender: 'ai',
        structuredData: response.data
      };
      
      // Update conversation with AI response
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === activeConversationId 
            ? { ...conv, messages: [...conv.messages, aiMessage] } 
            : conv
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: "Sorry, I couldn't process your request. The API might be unavailable or there was a network issue.",
        sender: 'ai'
      };
      
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === activeConversationId 
            ? { ...conv, messages: [...conv.messages, errorMessage] } 
            : conv
        )
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNewConversation = () => {
    const newConversationId = uuidv4();
    const newConversation: Conversation = {
      id: newConversationId,
      title: 'New conversation',
      date: new Date().toISOString(),
      messages: []
    };
    
    setConversations([...conversations, newConversation]);
    setActiveConversationId(newConversationId);
    setIsMobileMenuOpen(false);
  };
  
  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setIsMobileMenuOpen(false);
  };
  
  const handleClearChat = () => {
    if (!activeConversationId) return;
    
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === activeConversationId 
          ? { ...conv, messages: [] } 
          : conv
      )
    );
  };
  
  const handleExportChat = () => {
    if (!activeConversation) return;
    
    const conversationData = JSON.stringify(activeConversation, null, 2);
    const blob = new Blob([conversationData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${activeConversation.id.slice(0, 8)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden pt-16">
        {/* Sidebar - Conversation List */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block md:w-80 lg:w-96 flex-shrink-0 h-full`}>
          <ConversationList
            conversations={conversations}
            activeConversation={activeConversationId}
            onSelectConversation={handleSelectConversation}
            onNewConversation={handleNewConversation}
          />
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full">
          {activeConversation && (
            <>
              <ChatHeader
                title={activeConversation.title}
                onClearChat={handleClearChat}
                onExportChat={handleExportChat}
              />
              <ChatContainer
                messages={activeConversation.messages}
                isLoading={isLoading}
              />
              <div className="relative">
                <ChatInput
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                />
                
                {/* User profile button in bottom left */}
                <div className="absolute left-4 bottom-20 z-10">
                  <button 
                    onClick={toggleUserMenu}
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                  >
                    <User size={20} />
                  </button>
                  
                  {/* User menu dropdown */}
                  {userMenuOpen && (
                    <div className="absolute bottom-12 left-0 bg-white rounded-lg shadow-lg py-2 w-48">
                      <div className="px-4 py-2 border-b">
                        <p className="font-medium">User Profile</p>
                        <p className="text-sm text-gray-500">user@example.com</p>
                      </div>
                      <ul>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Help & Support</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Sign Out</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;