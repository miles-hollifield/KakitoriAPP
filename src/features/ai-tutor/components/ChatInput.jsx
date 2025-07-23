import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, CircularProgress } from '@mui/material';
import { Send } from '@mui/icons-material';

/**
 * Chat input component for sending messages to the AI tutor
 * @param {Object} props
 * @param {Function} props.onSendMessage - Callback when message is sent
 * @param {boolean} props.disabled - Whether input is disabled (e.g., when loading)
 * @param {string} props.placeholder - Input placeholder text
 */
export default function ChatInput({ onSendMessage, disabled = false, placeholder = "Ask me anything about Japanese..." }) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || disabled || isLoading) return;

    const messageToSend = message.trim();
    setMessage('');
    setIsLoading(true);

    try {
      await onSendMessage(messageToSend);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={2}
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'flex-end',
        gap: 1,
        bgcolor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 2
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: '0.95rem',
            '& .MuiInputBase-input': {
              py: 1,
              px: 0.5
            }
          }
        }}
        sx={{
          '& .MuiInputBase-root': {
            bgcolor: 'transparent'
          }
        }}
      />
      
      <IconButton
        type="submit"
        disabled={!message.trim() || disabled || isLoading}
        sx={{
          bgcolor: '#b8862b',
          color: '#ffffff',
          width: 40,
          height: 40,
          '&:hover': {
            bgcolor: '#a67825'
          },
          '&:disabled': {
            bgcolor: '#e5e7eb',
            color: '#9ca3af'
          }
        }}
      >
        {isLoading ? (
          <CircularProgress size={20} sx={{ color: '#ffffff' }} />
        ) : (
          <Send sx={{ fontSize: 18 }} />
        )}
      </IconButton>
    </Paper>
  );
}
