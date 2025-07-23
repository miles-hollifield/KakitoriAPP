import React, { useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
import { AITutorChat } from '../features/ai-tutor';
import ChatSidebar from '../components/ChatSidebar';

/**
 * AI Tutor page - Interactive chat with AI Japanese language tutor
 */
export default function AITutor() {
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Trigger sidebar refresh

  const handleSessionSelect = (sessionId) => {
    setActiveSessionId(sessionId);
  };

  const handleNewSessionCreated = (sessionId) => {
    setActiveSessionId(sessionId);
    // Always trigger sidebar refresh when a session is created or updated
    setRefreshTrigger(prev => prev + 1);
  };
  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: '#fafafa',
        display: 'flex'
      }}
    >
      {/* Main Chat Area */}
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          p: 2, 
          minHeight: 0,
          marginRight: '280px' // Account for right sidebar width
        }}
      >
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
            <AITutorChat 
              activeSessionId={activeSessionId} 
              onNewSessionCreated={handleNewSessionCreated}
            />
          </Paper>
        </Container>
      </Box>

      {/* Right Sidebar for Chat History */}
      <ChatSidebar 
        activeSessionId={activeSessionId}
        onSessionSelect={handleSessionSelect}
        refreshTrigger={refreshTrigger}
      />
    </Box>
  );
}