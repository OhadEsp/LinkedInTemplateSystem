import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            S
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
            <p className="text-sm text-gray-500">Marketing Director at InnovateTech Solutions</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-start">
          <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100 text-gray-900">
            <p className="text-sm">Hi! Thanks for connecting with me.</p>
            <p className="text-xs mt-1 text-gray-500">12:30 PM</p>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>

          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="p-2 hover:bg-blue-50 rounded-full transition-colors"
            title="Use Template"
          >
            ✨
          </button>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ➤
          </button>
        </div>

        {/* Template Panel */}
        {showTemplates && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Message Templates</h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setMessage("Hi [Name],\n\nI hope this message finds you well. I came across your profile and was impressed by your experience in [Industry/Field]. I'd love to connect and learn more about your journey.\n\nBest regards,\n[Your Name]");
                  setShowTemplates(false);
                }}
                className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-sm">Professional Introduction</div>
                <div className="text-xs text-gray-500">A professional way to introduce yourself</div>
              </button>
              
              <button
                onClick={() => {
                  setMessage("Hi [Name],\n\nI noticed you're working at [Company] in [Role]. I believe our [Product/Service] could help you [Specific Benefit]. Would you be interested in a brief 15-minute demo?\n\nBest,\n[Your Name]");
                  setShowTemplates(false);
                }}
                className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-sm">Sales Outreach</div>
                <div className="text-xs text-gray-500">Template for reaching out to potential customers</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
