import React from 'react';
import { Box, Avatar, Paper } from '@mui/material';
import { SmartToy } from '@mui/icons-material';

/**
 * Typing indicator component to show when AI tutor is thinking
 */
export default function TypingIndicator() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        mb: 2,
        px: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1
        }}
      >
        {/* Avatar */}
        <Avatar
          sx={{
            bgcolor: '#4caf50',
            width: 32,
            height: 32,
            mt: 0.5
          }}
        >
          <SmartToy />
        </Avatar>

        {/* Typing Animation */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            bgcolor: '#ffffff',
            borderRadius: '16px 16px 16px 4px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            minWidth: 60
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              height: 20
            }}
          >
            {[0, 1, 2].map((index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#9ca3af',
                  animation: 'typingBounce 1.4s infinite ease-in-out',
                  animationDelay: `${index * 0.16}s`,
                  '@keyframes typingBounce': {
                    '0%, 80%, 100%': {
                      transform: 'scale(0.8)',
                      opacity: 0.5
                    },
                    '40%': {
                      transform: 'scale(1)',
                      opacity: 1
                    }
                  }
                }}
              />
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
