import React, { useState } from 'react';
import { MessageSquare, Paperclip, Smile, Send, Sparkles } from 'lucide-react';
import TemplateModal from './TemplateModal';

interface DMChatProps {
  contactName?: string;
  contactTitle?: string;
  contactCompany?: string;
}

const DMChat: React.FC<DMChatProps> = ({ 
  contactName = "John Doe", 
  contactTitle = "Software Engineer",
  contactCompany = "Tech Corp"
}) => {
  const [message, setMessage] = useState('');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! Thanks for connecting with me.",
      isFromUser: false,
      timestamp: new Date(Date.now() - 3600000)
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        isFromUser: true,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleTemplateSelect = (template: any) => {
    // Replace placeholders with actual contact information
    let templateContent = template.content;
    templateContent = templateContent.replace(/\[Name\]/g, contactName);
    templateContent = templateContent.replace(/\[Company\]/g, contactCompany);
    templateContent = templateContent.replace(/\[Role\]/g, contactTitle);
    
    setMessage(templateContent);
    setIsTemplateModalOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linkedin-blue rounded-full flex items-center justify-center text-white font-semibold">
            {contactName.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{contactName}</h3>
            <p className="text-sm text-gray-500">{contactTitle} at {contactCompany}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MessageSquare className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isFromUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.isFromUser
                  ? 'bg-linkedin-blue text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.isFromUser ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Write a message..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>

          <button
            onClick={() => setIsTemplateModalOpen(true)}
            className="p-2 hover:bg-linkedin-blue-light rounded-full transition-colors group"
            title="Use Template"
          >
            <Sparkles className="w-5 h-5 text-linkedin-blue group-hover:text-linkedin-blue-dark" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Smile className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-linkedin-blue text-white rounded-full hover:bg-linkedin-blue-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Template Modal */}
      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={handleTemplateSelect}
        contactName={contactName}
        contactTitle={contactTitle}
        contactCompany={contactCompany}
      />
    </div>
  );
};

export default DMChat;
