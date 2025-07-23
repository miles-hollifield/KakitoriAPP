import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Alert, 
  Button, 
  Chip,
  Fade
} from '@mui/material';
import { Refresh, SmartToy } from '@mui/icons-material';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import AITutorService from '../services/apiService';

/**
 * Main AI Tutor chat interface component
 */
export default function AITutorChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isServiceAvailable, setIsServiceAvailable] = useState(true);
  const chatEndRef = useRef(null);

  // Suggested starter questions
  const starterQuestions = [
    "How do I say 'hello' in Japanese?",
    "What's the difference between hiragana and katakana?",
    "How do I form past tense verbs?",
    "Can you explain Japanese particles?",
    "What are some basic Japanese greetings?"
  ];

  // Scroll to bottom when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Check service health on component mount
  useEffect(() => {
    checkServiceHealth();
  }, []);

  const checkServiceHealth = async () => {
    try {
      const health = await AITutorService.checkHealth();
      setIsServiceAvailable(health.available);
      if (!health.available) {
        setError('AI Tutor service is currently unavailable. Please try again later.');
      }
    } catch (err) {
      setIsServiceAvailable(false);
      setError('Unable to connect to the AI Tutor service.');
      console.error('Service health check failed:', err);
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Clear any previous errors
    setError(null);

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await AITutorService.sendMessage(messageText);
      
      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        text: response.response,
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setError(error.message);
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarterQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleRetry = () => {
    setError(null);
    checkServiceHealth();
  };

  if (!isServiceAvailable) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Alert 
          severity="warning" 
          sx={{ mb: 2 }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={handleRetry}
              startIcon={<Refresh />}
            >
              Retry
            </Button>
          }
        >
          AI Tutor service is currently unavailable. Please check that the backend service is running.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Welcome Message */}
      {messages.length === 0 && (
        <Fade in timeout={800}>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <SmartToy sx={{ fontSize: 48, color: '#4caf50', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Welcome to your AI Japanese Tutor!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              I'm here to help you learn Japanese. Ask me questions about grammar, vocabulary, pronunciation, or culture!
            </Typography>
            
            {/* Starter Questions */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
              {starterQuestions.map((question, index) => (
                <Chip
                  key={index}
                  label={question}
                  onClick={() => handleStarterQuestion(question)}
                  variant="outlined"
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: '#f3f4f6'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Fade>
      )}

      {/* Chat Messages */}
      <Box 
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          py: 2,
          minHeight: 0 // Important for flex scrolling
        }}
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        
        {/* Typing Indicator */}
        {isLoading && <TypingIndicator />}
        
        {/* Error Message */}
        {error && (
          <Box sx={{ px: 1, mb: 2 }}>
            <Alert 
              severity="error" 
              onClose={() => setError(null)}
              sx={{ borderRadius: 2 }}
            >
              {error}
            </Alert>
          </Box>
        )}
        
        <div ref={chatEndRef} />
      </Box>

      {/* Chat Input */}
      <Box sx={{ p: 2, pt: 1 }}>
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={!isServiceAvailable}
          placeholder="Ask me anything about Japanese..."
        />
      </Box>
    </Box>
  );
}
