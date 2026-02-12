
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { getSweetRecommendation } from '../../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SweetAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m your Sweet Assistant. Tell me what you\'re looking for - maybe a gift for a friend or something sugar-free?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const recommendation = await getSweetRecommendation(userMsg);
    
    setMessages(prev => [...prev, { role: 'assistant', content: recommendation }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-[400px] h-[70vh] sm:h-[500px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#E91E63]/10 animate-slide-up">
          {/* Header */}
          <div className="p-3 sm:p-4 bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles size={16} className="text-white sm:w-[20px] sm:h-[20px]" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm">Sweet Assistant</h3>
                <p className="text-[8px] sm:text-[10px] text-white/80 uppercase tracking-widest leading-none">Powered by Gemini</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-[13px] sm:text-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#E91E63] text-white rounded-tr-none shadow-sm' 
                    : 'bg-white shadow-sm border border-gray-100 text-gray-700 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white shadow-sm border border-gray-100 p-2 sm:p-3 rounded-xl sm:rounded-2xl rounded-tl-none flex items-center space-x-2">
                  <Loader2 size={14} className="animate-spin text-[#E91E63]" />
                  <span className="text-[11px] sm:text-xs text-gray-500">Assistant is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="How can I help you?"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 sm:p-2.5 bg-[#E91E63] text-white rounded-lg sm:rounded-xl hover:bg-[#C2185B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bubble Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 active:scale-90 ${
          isOpen ? 'bg-gray-800 rotate-90' : 'bg-[#E91E63] hover:bg-[#C2185B] scale-100'
        }`}
        aria-label="Toggle assistant"
      >
        {isOpen ? <X className="text-white" /> : <MessageSquare className="text-white" />}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce shadow-sm">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-800 rounded-full"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default SweetAssistant;
