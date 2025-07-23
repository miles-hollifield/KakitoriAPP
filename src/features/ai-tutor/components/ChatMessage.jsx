import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import { Person, SmartToy } from '@mui/icons-material';

/**
 * Individual chat message component
 * @param {Object} props
 * @param {string} props.message - The message text
 * @param {boolean} props.isUser - Whether this is a user message or AI response
 * @param {string} props.timestamp - Message timestamp
 */
export default function ChatMessage({ message, isUser, timestamp }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
        px: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          maxWidth: '70%',
          flexDirection: isUser ? 'row-reverse' : 'row',
          gap: 1
        }}
      >
        {/* Avatar */}
        <Avatar
          sx={{
            bgcolor: isUser ? '#b8862b' : '#4caf50',
            width: 32,
            height: 32,
            mt: 0.5
          }}
        >
          {isUser ? <Person /> : <SmartToy />}
        </Avatar>

        {/* Message Content */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            bgcolor: isUser ? '#b8862b' : '#ffffff',
            color: isUser ? '#ffffff' : '#333',
            borderRadius: isUser 
              ? '16px 16px 4px 16px' 
              : '16px 16px 16px 4px',
            border: isUser ? 'none' : '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.6,
              fontSize: '0.95rem'
            }}
          >
            {message}
          </Typography>
          
          {timestamp && (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 1,
                opacity: 0.7,
                fontSize: '0.75rem'
              }}
            >
              {timestamp}
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
