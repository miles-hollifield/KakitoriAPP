import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Avatar,
  Alert,
  Chip,
  CircularProgress,
  Button
} from '@mui/material';
import {
  Mic,
  MicOff,
  VolumeUp,
  VolumeOff,
  Stop,
  Settings,
  SmartToy,
  Person
} from '@mui/icons-material';
import { chatAPI } from '../features/ai-tutor/services/chatApiService';
import { useVoiceChat } from '../hooks/useVoiceChat';
import VoiceSettingsDialog from '../components/VoiceSettingsDialog';

// Voice Conversation Dialog page
export default function Dialog() {
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    speechEnabled: true,
    autoListen: false,
    speechRate: 0.8,
    speechPitch: 1.0,
    selectedVoice: null
  });
  
  const chatEndRef = useRef(null);
  
  // Handle voice input callback
  const handleVoiceInput = async ({ transcript }) => {
    if (!transcript.trim()) return;
    
    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      text: transcript,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
      isVoice: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      // Send to AI tutor
      const response = await chatAPI.sendMessage(transcript);
      
      const aiMessage = {
        id: `ai-${Date.now()}`,
        text: response.response,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        isVoice: true
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Speak the AI response if speech is enabled
      if (voiceSettings.speechEnabled) {
        // Small delay to ensure response is processed
        setTimeout(() => {
          speak(response.response);
        }, 300);
      }
      
      // Auto-listen for next input if enabled
      if (voiceSettings.autoListen && !isListening) {
        setTimeout(() => startListening(), 2000);
      }
      
    } catch (error) {
      setError(error.message || 'Failed to get AI response');
      setMessages(prev => prev.slice(0, -1)); // Remove user message on error
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Voice chat hook
  const {
    isListening,
    isSpeaking,
    isSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    getVoices,
    testLanguageSupport
  } = useVoiceChat({
    language: 'ja-JP',
    speechRate: voiceSettings.speechRate,
    speechPitch: voiceSettings.speechPitch,
    onVoiceInput: handleVoiceInput,
    onError: (errorMessage) => {
      // Handle language not supported with a more user-friendly message
      if (errorMessage.includes('language-not-supported')) {
        setError('Japanese speech recognition is not available on this device. You can still speak Japanese - the system will try to understand using English recognition.');
      } else {
        setError(errorMessage);
      }
    }
  });

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const startConversation = () => {
    setConversationStarted(true);
    setMessages([{
      id: 'welcome',
      text: 'こんにちは！日本語で話しましょう。何について話したいですか？',
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
      isVoice: true
    }]);
    
    // Only speak after user gesture (button click) to avoid browser restrictions
    if (voiceSettings.speechEnabled) {
      // Small delay to ensure the component is ready
      setTimeout(() => {
        speak('こんにちは！日本語で話しましょう。何について話したいですか？');
      }, 500);
    }
  };
  
  const resetConversation = () => {
    setMessages([]);
    setConversationStarted(false);
    stopListening();
    stopSpeaking();
    setError(null);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8f9fa' }}>
      {/* Header */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2, 
          borderRadius: 0,
          bgcolor: '#ffffff',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#b8862b', width: 40, height: 40 }}>
              <SmartToy />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Voice Conversation Practice
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Practice Japanese conversation with AI voice chat
              </Typography>
              {isSupported && (
                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                  <Chip 
                    size="small" 
                    label="Voice Input" 
                    color={isSupported.recognition ? "success" : "error"}
                    variant="outlined"
                  />
                  <Chip 
                    size="small" 
                    label="Voice Output" 
                    color={isSupported.synthesis ? "success" : "error"}
                    variant="outlined"
                  />
                </Box>
              )}
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              onClick={() => setShowSettings(true)}
              sx={{ color: '#6b7280' }}
            >
              <Settings />
            </IconButton>
          </Box>
        </Box>
      </Paper>
      
      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2, gap: 2 }}>
        {/* Error Alert */}
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        {/* Welcome Screen */}
        {!conversationStarted ? (
          <Box 
            sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              textAlign: 'center',
              gap: 3
            }}
          >
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#b8862b', mb: 2 }}>
              <SmartToy sx={{ fontSize: 40 }} />
            </Avatar>
            
            <Typography variant="h4" fontWeight={600} gutterBottom>
              Start Voice Conversation
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500 }}>
              Practice speaking Japanese with our AI tutor. Use your voice to ask questions, 
              practice pronunciation, and have natural conversations in Japanese.
            </Typography>
            
            {!isSupported.recognition && (
              <Alert severity="warning" sx={{ mt: 2, maxWidth: 500 }}>
                Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari for the best experience.
              </Alert>
            )}
            
            {!isSupported.synthesis && (
              <Alert severity="warning" sx={{ mt: 2, maxWidth: 500 }}>
                Text-to-speech is not supported in this browser. You can still type your conversations.
              </Alert>
            )}
            
            {isSupported.recognition && (
              <Alert severity="info" sx={{ mt: 2, maxWidth: 500 }}>
                <strong>Language Note:</strong> If Japanese speech recognition isn't available on your device, 
                the system will use English recognition but can still understand Japanese speech. 
                The AI will respond appropriately in Japanese.
              </Alert>
            )}
            
            <Button
              variant="contained"
              size="large"
              onClick={startConversation}
              sx={{
                bgcolor: '#b8862b',
                '&:hover': { bgcolor: '#a67825' },
                borderRadius: 3,
                px: 4,
                py: 1.5
              }}
            >
              Start Conversation
            </Button>
            
            {isSupported.synthesis && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => speak('テスト')}
                sx={{ borderRadius: 2 }}
              >
                Test Voice
              </Button>
            )}
          </Box>
        ) : (
          <>
            {/* Messages */}
            <Paper 
              sx={{ 
                flex: 1, 
                p: 2, 
                overflow: 'auto',
                bgcolor: '#ffffff',
                borderRadius: 2,
                border: '1px solid #e5e7eb'
              }}
            >
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                    mb: 2
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1,
                      maxWidth: '70%',
                      flexDirection: message.isUser ? 'row-reverse' : 'row'
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: message.isUser ? '#3b82f6' : '#4caf50',
                        width: 32,
                        height: 32
                      }}
                    >
                      {message.isUser ? <Person /> : <SmartToy />}
                    </Avatar>
                    
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        bgcolor: message.isUser ? '#e3f2fd' : '#ffffff',
                        borderRadius: message.isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      <Typography variant="body1">{message.text}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {message.timestamp}
                        </Typography>
                        {message.isVoice && (
                          <Chip 
                            label="Voice" 
                            size="small" 
                            sx={{ fontSize: '0.7rem', height: 20 }}
                          />
                        )}
                        {!message.isUser && (
                          <IconButton
                            size="small"
                            onClick={() => speak(message.text)}
                            disabled={isSpeaking}
                          >
                            <VolumeUp sx={{ fontSize: 16 }} />
                          </IconButton>
                        )}
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              ))}
              
              {isProcessing && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ bgcolor: '#4caf50', width: 32, height: 32 }}>
                      <SmartToy />
                    </Avatar>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        bgcolor: '#ffffff',
                        borderRadius: '16px 16px 16px 4px',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={16} />
                        <Typography variant="body2">Thinking...</Typography>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              )}
              
              <div ref={chatEndRef} />
            </Paper>
            
            {/* Voice Controls */}
            <Paper 
              sx={{ 
                p: 2, 
                bgcolor: '#ffffff',
                borderRadius: 2,
                border: '1px solid #e5e7eb'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                {/* Microphone Button */}
                <IconButton
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing || isSpeaking}
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: isListening ? '#ef4444' : '#b8862b',
                    color: '#ffffff',
                    '&:hover': {
                      bgcolor: isListening ? '#dc2626' : '#a67825'
                    },
                    '&:disabled': {
                      bgcolor: '#e5e7eb',
                      color: '#9ca3af'
                    }
                  }}
                >
                  {isListening ? <MicOff /> : <Mic />}
                </IconButton>
                
                {/* Status */}
                <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                  {isListening && (
                    <Typography variant="body2" color="error">
                      Listening...
                    </Typography>
                  )}
                  {isProcessing && (
                    <Typography variant="body2" color="primary">
                      Processing...
                    </Typography>
                  )}
                  {isSpeaking && (
                    <Typography variant="body2" color="success.main">
                      Speaking...
                    </Typography>
                  )}
                  {!isListening && !isProcessing && !isSpeaking && (
                    <Typography variant="body2" color="text.secondary">
                      Tap to speak
                    </Typography>
                  )}
                </Box>
                
                {/* Stop Speaking Button */}
                {isSpeaking && (
                  <IconButton
                    onClick={stopSpeaking}
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: '#ef4444',
                      color: '#ffffff',
                      '&:hover': { bgcolor: '#dc2626' }
                    }}
                  >
                    <Stop />
                  </IconButton>
                )}
              </Box>
              
              {/* Quick Actions */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={resetConversation}
                  sx={{ borderRadius: 2 }}
                >
                  Reset
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setVoiceSettings(prev => ({ ...prev, speechEnabled: !prev.speechEnabled }))}
                  startIcon={voiceSettings.speechEnabled ? <VolumeUp /> : <VolumeOff />}
                  sx={{ borderRadius: 2 }}
                >
                  {voiceSettings.speechEnabled ? 'Mute' : 'Unmute'}
                </Button>
              </Box>
            </Paper>
          </>
        )}
      </Box>
      
      {/* Settings Dialog */}
      <VoiceSettingsDialog
        open={showSettings}
        onClose={() => setShowSettings(false)}
        settings={voiceSettings}
        onSettingsChange={setVoiceSettings}
        isSupported={isSupported}
        availableVoices={getVoices()}
      />
    </Box>
  );
}