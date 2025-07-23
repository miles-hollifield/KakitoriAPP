import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  Add as AddIcon,
  Chat as ChatIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { chatAPI } from '../features/ai-tutor/services/chatApiService';

export default function ChatSidebar({ activeSessionId, onSessionSelect, refreshTrigger }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  // Load chat sessions on component mount and when refreshTrigger changes
  useEffect(() => {
    loadChatSessions();
  }, [refreshTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadChatSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const sessions = await chatAPI.getChatSessions();
      
      // Transform API response to match our component structure
      const transformedSessions = sessions.map(session => ({
        id: session.id,
        title: session.title.length > 20 ? session.title.substring(0, 20) + '...' : session.title,
        timestamp: formatTimestamp(session.updated_at),
        isActive: session.id === activeSessionId,
        messageCount: session.message_count,
        lastMessagePreview: session.last_message_preview
      }));
      
      setChatHistory(transformedSessions);
    } catch (err) {
      console.error('Failed to load chat sessions:', err);
      setError('Failed to load chat history');
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  };

  const handleMenuOpen = (event, chatId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedChatId(chatId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedChatId(null);
  };

  const handleNewChat = async () => {
    try {
      const newSession = await chatAPI.createChatSession();
      
      // Add new session to the list and make it active
      const newChatItem = {
        id: newSession.id,
        title: newSession.title,
        timestamp: 'Just now',
        isActive: true,
        messageCount: 0,
        lastMessagePreview: null
      };

      setChatHistory(prev => [
        newChatItem,
        ...prev.map(chat => ({ ...chat, isActive: false }))
      ]);
      
      // Notify parent component of session selection
      if (onSessionSelect) {
        onSessionSelect(newSession.id);
      }
    } catch (err) {
      console.error('Failed to create new chat:', err);
      setError('Failed to create new chat');
    }
  };

  const handleChatSelect = (chatId) => {
    setChatHistory(prev => 
      prev.map(chat => ({ 
        ...chat, 
        isActive: chat.id === chatId 
      }))
    );
    
    if (onSessionSelect) {
      onSessionSelect(chatId);
    }
  };

  const handleDeleteChat = async () => {
    try {
      await chatAPI.deleteChatSession(selectedChatId);
      setChatHistory(prev => prev.filter(chat => chat.id !== selectedChatId));
      
      // If we deleted the active session, select the first remaining session
      const remainingSessions = chatHistory.filter(chat => chat.id !== selectedChatId);
      if (remainingSessions.length > 0 && chatHistory.find(chat => chat.id === selectedChatId)?.isActive) {
        handleChatSelect(remainingSessions[0].id);
      }
    } catch (err) {
      console.error('Failed to delete chat:', err);
      setError('Failed to delete chat');
    }
    handleMenuClose();
  };

  const handleRenameChat = () => {
    const selectedChat = chatHistory.find(chat => chat.id === selectedChatId);
    setNewTitle(selectedChat?.title || '');
    setRenameDialogOpen(true);
    handleMenuClose();
  };

  const handleRenameConfirm = async () => {
    try {
      await chatAPI.updateChatSession(selectedChatId, newTitle);
      setChatHistory(prev => 
        prev.map(chat => 
          chat.id === selectedChatId 
            ? { ...chat, title: newTitle }
            : chat
        )
      );
      setRenameDialogOpen(false);
      setNewTitle('');
    } catch (err) {
      console.error('Failed to rename chat:', err);
      setError('Failed to rename chat');
    }
  };

  const handleRenameCancel = () => {
    setRenameDialogOpen(false);
    setNewTitle('');
  };

  return (
    <Box
      sx={{
        width: 280,
        bgcolor: '#ffffff',
        height: '100vh',
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid #e0e0e0',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.04)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#333', 
            fontWeight: 600, 
            mb: 1
          }}
        >
          Chat History
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewChat}
          fullWidth
          sx={{
            bgcolor: '#4caf50',
            color: 'white',
            textTransform: 'none',
            borderRadius: 2,
            py: 1,
            '&:hover': {
              bgcolor: '#45a049'
            }
          }}
        >
          New Chat
        </Button>
      </Box>

      {/* Chat History List */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#e0e0e0',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#4caf50',
        },
      }}>
        {error && (
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
          </Alert>
        )}
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <List sx={{ p: 2 }}>
            {chatHistory.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4, color: '#666' }}>
                <Typography variant="body2">
                  No chat history yet. Start a new conversation!
                </Typography>
              </Box>
            ) : (
              chatHistory.map((chat) => (
                <ListItem 
                  key={chat.id}
                  onClick={() => handleChatSelect(chat.id)}
                  sx={{ 
                    py: 1.5,
                    px: 2,
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: chat.isActive ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                    borderLeft: chat.isActive ? '3px solid #4caf50' : '3px solid transparent',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: chat.isActive ? 'rgba(76, 175, 80, 0.15)' : 'rgba(0, 0, 0, 0.04)',
                    },
                    transition: 'all 0.2s ease-in-out',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flex: 1 }}>
                    <ChatIcon 
                      sx={{ 
                        color: chat.isActive ? '#4caf50' : '#666',
                        fontSize: 20,
                        mt: 0.25
                      }} 
                    />
                    <ListItemText
                      primary={chat.title}
                      secondary={
                        <>
                          <Typography variant="caption" color="text.secondary" component="span">
                            {chat.timestamp}
                          </Typography>
                          {chat.messageCount > 0 && (
                            <Typography variant="caption" sx={{ ml: 1, color: '#666' }} component="span">
                              • {chat.messageCount} message{chat.messageCount !== 1 ? 's' : ''}
                            </Typography>
                          )}
                        </>
                      }
                      primaryTypographyProps={{ 
                        fontSize: 14,
                        fontWeight: chat.isActive ? 600 : 400,
                        color: chat.isActive ? '#4caf50' : '#333',
                        noWrap: true
                      }}
                    />
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, chat.id)}
                    sx={{ 
                      opacity: 0.7,
                      '&:hover': { opacity: 1 }
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              ))
            )}
          </List>
        )}
      </Box>

      {/* Menu for chat actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            borderRadius: 2
          }
        }}
      >
        <MenuItem onClick={handleRenameChat}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Rename
        </MenuItem>
        <MenuItem onClick={handleDeleteChat} sx={{ color: '#f44336' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onClose={handleRenameCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Rename Chat</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Chat Title"
            fullWidth
            variant="outlined"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRenameCancel}>Cancel</Button>
          <Button onClick={handleRenameConfirm} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
