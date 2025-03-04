import React from 'react';
import { Download, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatHeaderProps {
  title: string;
  onClearChat: () => void;
  onExportChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, onClearChat, onExportChat }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center">
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onExportChat}
          className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100"
          title="Export conversation"
        >
          <Download size={20} />
        </button>
        <button
          onClick={onClearChat}
          className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
          title="Clear conversation"
        >
          <Trash2 size={20} />
        </button>
        <Link
          to="/"
          className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 md:hidden"
          title="Close"
        >
          <X size={20} />
        </Link>
      </div>
    </div>
  );
};

export default ChatHeader;