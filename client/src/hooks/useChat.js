import { useState, useEffect, useCallback } from 'react';
import { sendChatMessage } from '../services/aiEngine';

const INITIAL_MESSAGES = [
  {
    id: 'welcome-1',
    sender: 'assistant',
    text: "Hello! I am AJAY, your 3D cybernetic AI Assistant. I can listen, think, code, speak, and manage your day-to-day productivity. Say **'Hey Ajay'** or type a command to begin!",
    emotion: 'happy',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

export function useChat(onAiReply) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('ajay_chat_history');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentMode, setCurrentMode] = useState('general'); // general, coding, pdf, planner

  useEffect(() => {
    localStorage.setItem('ajay_chat_history', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim() || isProcessing) return;

    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      const response = await sendChatMessage(userText, messages, currentMode);

      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'assistant',
        text: response.reply,
        emotion: response.emotion || 'happy',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (onAiReply) {
        onAiReply(response.reply, response.emotion || 'happy');
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [messages, isProcessing, currentMode, onAiReply]);

  const clearHistory = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem('ajay_chat_history');
  }, []);

  return {
    messages,
    sendMessage,
    isProcessing,
    currentMode,
    setCurrentMode,
    clearHistory
  };
}
