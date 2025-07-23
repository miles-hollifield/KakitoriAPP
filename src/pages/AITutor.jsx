import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { SmartToy } from '@mui/icons-material';
import { AITutorChat } from '../features/ai-tutor';

/**
 * AI Tutor page - Interactive chat with AI Japanese language tutor
 */
export default function AITutor() {
  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: '#fafafa',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          py: 2,
          px: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SmartToy sx={{ fontSize: 32, color: '#4caf50' }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#333' }}>
              AI Japanese Tutor
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get personalized help with Japanese language learning
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Chat Container */}
      <Box sx={{ flex: 1, display: 'flex', p: 2, minHeight: 0 }}>
        <Container maxWidth="md" sx={{ display: 'flex', p: 0 }}>
          <Paper
            elevation={1}
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: '#ffffff',
              borderRadius: 3,
              overflow: 'hidden'
            }}
          >
            <AITutorChat />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}