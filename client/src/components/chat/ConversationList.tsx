import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  date: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversation,
  onSelectConversation,
  onNewConversation
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-gray-50 border-r">
      <div className="p-4">
        <button
          onClick={onNewConversation}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus size={18} />
          <span>New Conversation</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <h2 className="px-4 py-2 text-sm font-medium text-gray-500">Conversations</h2>
        <ul className="space-y-1 px-2">
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <button
                onClick={() => onSelectConversation(conversation.id)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                  activeConversation === conversation.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MessageSquare size={18} className="mr-2 flex-shrink-0" />
                <div className="flex-1 truncate text-left">{conversation.title}</div>
              </button>
            </li>
          ))}
          {conversations.length === 0 && (
            <li className="px-4 py-3 text-sm text-gray-500">No conversations yet</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ConversationList;