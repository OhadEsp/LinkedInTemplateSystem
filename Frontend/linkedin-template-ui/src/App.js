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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'white' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #e5e7eb', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600' }}>
            S
          </div>
          <div>
            <h3 style={{ fontWeight: '600', color: '#111827', margin: 0 }}>Sarah Johnson</h3>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Marketing Director at InnovateTech Solutions</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{ maxWidth: '320px', padding: '16px', borderRadius: '8px', backgroundColor: '#f3f4f6', color: '#111827' }}>
            <p style={{ fontSize: '14px', margin: 0 }}>Hi! Thanks for connecting with me.</p>
            <p style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>12:30 PM</p>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
          <div style={{ flex: 1 }}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #d1d5db', 
                borderRadius: '8px', 
                resize: 'none',
                minHeight: '44px',
                maxHeight: '120px',
                outline: 'none'
              }}
              rows={1}
            />
          </div>

          <button
            onClick={() => setShowTemplates(!showTemplates)}
            style={{ 
              padding: '8px', 
              borderRadius: '50%', 
              border: 'none',
              backgroundColor: showTemplates ? '#dbeafe' : 'transparent',
              cursor: 'pointer'
            }}
            title="Use Template"
          >
            ✨
          </button>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            style={{ 
              padding: '8px', 
              backgroundColor: message.trim() ? '#2563eb' : '#9ca3af', 
              color: 'white', 
              borderRadius: '50%', 
              border: 'none',
              cursor: message.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            ➤
          </button>
        </div>

        {/* Template Panel */}
        {showTemplates && (
          <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <h4 style={{ fontWeight: '500', color: '#111827', marginBottom: '12px', margin: 0 }}>Message Templates</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => {
                  setMessage("Hi [Name],\n\nI hope this message finds you well. I came across your profile and was impressed by your experience in [Industry/Field]. I'd love to connect and learn more about your journey.\n\nBest regards,\n[Your Name]");
                  setShowTemplates(false);
                }}
                style={{ 
                  width: '100%', 
                  textAlign: 'left', 
                  padding: '12px', 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: '500', fontSize: '14px' }}>Professional Introduction</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>A professional way to introduce yourself</div>
              </button>
              
              <button
                onClick={() => {
                  setMessage("Hi [Name],\n\nI noticed you're working at [Company] in [Role]. I believe our [Product/Service] could help you [Specific Benefit]. Would you be interested in a brief 15-minute demo?\n\nBest,\n[Your Name]");
                  setShowTemplates(false);
                }}
                style={{ 
                  width: '100%', 
                  textAlign: 'left', 
                  padding: '12px', 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: '500', fontSize: '14px' }}>Sales Outreach</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>Template for reaching out to potential customers</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;