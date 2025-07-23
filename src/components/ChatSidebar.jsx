import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Divider,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Add as AddIcon,
  Chat as ChatIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';

const mockChatHistory = [
  { id: 1, title: 'Grammar Help - Te-form', timestamp: '2 hours ago', isActive: true },
  { id: 2, title: 'Kanji Practice Session', timestamp: 'Yesterday', isActive: false },
  { id: 3, title: 'Vocabulary Review', timestamp: '3 days ago', isActive: false },
  { id: 4, title: 'Sentence Structure Help', timestamp: '1 week ago', isActive: false },
  { id: 5, title: 'Hiragana Practice', timestamp: '1 week ago', isActive: false },
];

export default function ChatSidebar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chatHistory, setChatHistory] = useState(mockChatHistory);

  const handleMenuOpen = (event, chatId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedChatId(chatId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedChatId(null);
  };

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: 'New Chat',
      timestamp: 'Just now',
      isActive: false
    };
    
    // Deactivate all other chats and add new one
    setChatHistory(prev => [
      { ...newChat, isActive: true },
      ...prev.map(chat => ({ ...chat, isActive: false }))
    ]);
  };

  const handleChatSelect = (chatId) => {
    setChatHistory(prev => 
      prev.map(chat => ({ 
        ...chat, 
        isActive: chat.id === chatId 
      }))
    );
  };

  const handleDeleteChat = () => {
    setChatHistory(prev => prev.filter(chat => chat.id !== selectedChatId));
    handleMenuClose();
  };

  const handleRenameChat = () => {
    // This would open a rename dialog in a real implementation
    console.log('Rename chat:', selectedChatId);
    handleMenuClose();
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
        <List sx={{ p: 2 }}>
          {chatHistory.map((chat) => (
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
                  secondary={chat.timestamp}
                  primaryTypographyProps={{ 
                    fontSize: 14,
                    fontWeight: chat.isActive ? 600 : 400,
                    color: chat.isActive ? '#4caf50' : '#333',
                    noWrap: true
                  }}
                  secondaryTypographyProps={{
                    fontSize: 12,
                    color: '#666'
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
          ))}
        </List>
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
    </Box>
  );
}
