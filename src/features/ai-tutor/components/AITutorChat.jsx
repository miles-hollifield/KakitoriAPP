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
import { chatAPI } from '../services/chatApiService';

/**
 * Main AI Tutor chat interface component
 */
export default function AITutorChat({ activeSessionId, onNewSessionCreated }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingSession, setLoadingSession] = useState(false);
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

  // Load session messages when activeSessionId changes
  useEffect(() => {
    if (activeSessionId) {
      loadSessionMessages(activeSessionId);
    } else {
      setMessages([]);
    }
  }, [activeSessionId]);

  const loadSessionMessages = async (sessionId) => {
    if (!sessionId) return;
    
    try {
      setLoadingSession(true);
      setError(null);
      const session = await chatAPI.getChatSession(sessionId);
      
      // Transform API messages to component format
      const transformedMessages = session.messages.map(msg => ({
        id: msg.id,
        text: msg.content,
        isUser: msg.role === 'user',
        timestamp: new Date(msg.created_at).toLocaleTimeString()
      }));
      
      setMessages(transformedMessages);
    } catch (err) {
      console.error('Failed to load session messages:', err);
      setError('Failed to load chat history');
    } finally {
      setLoadingSession(false);
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Clear any previous errors
    setError(null);

    // Add user message optimistically
    const userMessage = {
      id: `temp-${Date.now()}`,
      text: messageText,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatAPI.sendMessage(messageText, activeSessionId);
      
      // Replace the optimistic user message and add AI response
      const actualUserMessage = {
        id: `user-${Date.now()}`,
        text: messageText,
        isUser: true,
        timestamp: new Date().toLocaleTimeString()
      };
      
      const aiMessage = {
        id: `ai-${Date.now()}`,
        text: response.response,
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      
      // If this was a new session (no activeSessionId), we'll get one back
      // Or if session title was updated, notify parent to refresh sidebar
      if ((!activeSessionId || response.session_title) && onNewSessionCreated) {
        onNewSessionCreated(response.session_id);
      }
      
      setMessages(prev => [
        ...prev.slice(0, -1), // Remove optimistic message
        actualUserMessage,
        aiMessage
      ]);
    } catch (error) {
      // Remove the optimistic message on error
      setMessages(prev => prev.slice(0, -1));
      setError(error.message || 'Failed to send message');
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
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Welcome Message */}
      {messages.length === 0 && !loadingSession && (
        <Fade in timeout={800}>
          <Box 
            sx={{ 
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 3,
              pt: 32 // Add bottom padding to push content up slightly from true center
            }}
          >
            <Box sx={{ textAlign: 'center', maxWidth: '768px', width: '100%' }}>
              <SmartToy sx={{ fontSize: 48, color: '#4caf50', mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Welcome to your AI Japanese Tutor!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                I'm here to help you learn Japanese. Ask me questions about grammar, vocabulary, pronunciation, or culture!
              </Typography>
              
              {/* Starter Questions */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 4 }}>
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
              
              {/* Chat Input */}
              <ChatInput
                onSendMessage={handleSendMessage}
                disabled={isLoading}
                placeholder={activeSessionId ? "Continue the conversation..." : "Start a new conversation..."}
              />
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
          minHeight: 0, // Important for flex scrolling
          display: 'flex',
          justifyContent: 'center',
          // Custom scrollbar styling
          '&::-webkit-scrollbar': {
            width: '6px', // Made slightly thinner
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
            margin: '8px 0', // Add margin to make track shorter
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '3px',
            margin: '8px 0', // Add margin to make thumb shorter
            '&:hover': {
              background: '#a8a8a8',
            },
          },
          '&::-webkit-scrollbar-thumb:active': {
            background: '#8e8e8e',
          },
          // Add some right padding to move scrollbar slightly left
          paddingRight: '4px',
          // Firefox scrollbar styling
          scrollbarWidth: 'thin',
          scrollbarColor: '#c1c1c1 transparent',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1000px', px: 2 }}>
          {loadingSession ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Loading chat history...
              </Typography>
            </Box>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))
          )}
          
          {/* Typing Indicator */}
          {isLoading && <TypingIndicator />}
          
          {/* Error Message */}
          {error && (
            <Box sx={{ px: 1, mb: 2 }}>
              <Alert 
                severity="error" 
                onClose={() => setError(null)}
                sx={{ borderRadius: 2 }}
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
                {error}
              </Alert>
            </Box>
          )}
          
          <div ref={chatEndRef} />
        </Box>
      </Box>      {/* Chat Input - Only show when there are messages */}
      {messages.length > 0 && (
        <Box 
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            p: 2, 
            pt: 1 
          }}
        >
          <Box sx={{ maxWidth: '1000px', width: '100%', mt: 2}}>
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isLoading}
              placeholder={activeSessionId ? "Continue the conversation..." : "Start a new conversation..."}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
