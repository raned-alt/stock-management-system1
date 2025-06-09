import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m your Stock Management Assistant. I can help you with inventory questions, sales data, product information, and more. How can I assist you today?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

export function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('stock') || input.includes('inventory')) {
      return 'I can help you check stock levels! Currently, we have 1,234 products in inventory. Would you like me to show you products with low stock levels or search for a specific product?';
    }
    
    if (input.includes('sales') || input.includes('revenue')) {
      return 'Our sales performance is looking great! This month we\'ve had $45,678 in revenue from 856 sales. The top-selling product is the Wireless Mouse with 245 units sold. Would you like more detailed sales analytics?';
    }
    
    if (input.includes('low stock') || input.includes('alert')) {
      return 'We currently have 23 products with low stock levels. The most critical ones are:\n• Wireless Mouse (5 remaining, min: 10)\n• USB Cable (3 remaining, min: 15)\n• Phone Case (2 remaining, min: 8)\n\nWould you like me to help you create purchase orders for these items?';
    }
    
    if (input.includes('product') || input.includes('item')) {
      return 'I can help you find product information! We have products across categories like Electronics, Clothing, Books, and Home & Garden. What specific product are you looking for?';
    }
    
    if (input.includes('user') || input.includes('staff')) {
      return 'We currently have several active users in the system:\n• 1 Admin\n• 2 Assistants\n• 3 Cashiers\n\nWould you like me to show you user activity or help with user management?';
    }
    
    if (input.includes('help') || input.includes('what can you do')) {
      return 'I can assist you with:\n• Checking inventory and stock levels\n• Sales analytics and reports\n• Product information and search\n• Low stock alerts\n• User management queries\n• General system navigation\n\nJust ask me anything about your stock management needs!';
    }
    
    // Default responses
    const responses = [
      'That\'s an interesting question! Let me help you with that. Could you provide more specific details about what you\'re looking for?',
      'I understand you\'re asking about our stock management system. What specific information would be most helpful for you?',
      'Great question! I\'m here to help with all your inventory and sales needs. What would you like to know more about?',
      'I\'d be happy to assist you with that! Could you tell me more about what you\'re trying to accomplish?',
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Chat Assistant
        </h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Online</span>
        </div>
      </div>

      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Stock Management Assistant
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-powered inventory helper
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-primary-600' 
                        : 'bg-gray-600 dark:bg-gray-700'
                    }`}>
                      {message.sender === 'user' ? (
                        <span className="text-xs font-medium text-white">
                          {user?.name.charAt(0).toUpperCase()}
                        </span>
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user'
                          ? 'text-primary-100'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-600 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Loader className="h-4 w-4 animate-spin text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Typing...
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}