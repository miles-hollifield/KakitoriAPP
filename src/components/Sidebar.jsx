import { List, ListItem, ListItemIcon, ListItemText, Box, Typography, Avatar, Divider, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TranslateIcon from '@mui/icons-material/Translate';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import RefreshIcon from '@mui/icons-material/Refresh';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import GridViewIcon from '@mui/icons-material/GridView';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/useAuth';

const navItems = [
  { text: 'Overview', path: '/', icon: <GridViewIcon fontSize="small" /> },
  { text: 'Kanji', path: '/kanji', icon: <TextFieldsIcon fontSize="small" /> },
  { text: 'Vocabulary', path: '/vocab', icon: <MenuBookIcon fontSize="small" /> },
  { text: 'Kana Practice', path: '/kana', icon: <TranslateIcon fontSize="small" /> },
  { text: 'AI Tutor', path: '/ai-tutor', icon: <SmartToyIcon fontSize="small" /> },
  // { text: 'Lessons', path: '/lessons', icon: <SchoolIcon fontSize="small" /> },
  // { text: 'JLPT Practice', path: '/jlpt-practice', icon: <QuizIcon fontSize="small" /> },
  // { text: 'Review', path: '/review', icon: <RefreshIcon fontSize="small" /> },
  // { text: 'Conversation', path: '/dialog', icon: <ChatIcon fontSize="small" /> },
  // { text: 'Community', path: '/community', icon: <PeopleIcon fontSize="small" /> },
  // { text: 'Analytics', path: '/analytics', icon: <AnalyticsIcon fontSize="small" /> },
];

const studyStats = [
  { label: 'Kanji Learned', value: '342', color: '#b8862b' },
  { label: 'Vocabulary', value: '1,247', color: '#4caf50' },
  { label: 'Study Streak', value: '25 days', color: '#ff9800' },
  { label: 'JLPT Level', value: 'N4', color: '#2196f3' },
];

// Modern Light Sidebar component for Kakitori
export default function Sidebar({ onNavigate }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Navigation to login will be handled by the ProtectedRoute component
  };

  return (
    <Box
      component="nav"
      sx={{
        width: 280,
        bgcolor: '#ffffff', // Light background
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #e0e0e0',
        boxShadow: '2px 0 8px rgba(0,0,0,0.04)', // Subtle shadow
        overflow: 'hidden', // Prevent main container from scrolling
      }}
    >
      {/* Logo Section */}
      <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0' }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontFamily: 'serif', 
            color: '#b8862b', 
            fontWeight: 700, 
            letterSpacing: 2,
            textAlign: 'center'
          }}
        >
          Kakitori
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#666',
            textAlign: 'center',
            display: 'block',
            mt: 0.5
          }}
        >
          Japanese Learning Platform
        </Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ 
        flex: 1, 
        py: 2, 
        overflow: 'auto',
        minHeight: 0, // Important for flex child to allow shrinking
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
          background: '#b8862b',
        },
      }}>
        <List sx={{ px: 2 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem 
                key={item.text}
                component={Link} 
                to={item.path}
                onClick={onNavigate}
                sx={{ 
                  py: 1.5,
                  px: 2,
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: isActive ? 'rgba(184, 134, 43, 0.1)' : 'transparent',
                  color: isActive ? '#b8862b' : '#666',
                  borderLeft: isActive ? '3px solid #b8862b' : '3px solid transparent',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    bgcolor: isActive ? 'rgba(184, 134, 43, 0.15)' : 'rgba(0, 0, 0, 0.04)',
                    color: isActive ? '#b8862b' : '#333'
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 40, 
                    color: 'inherit'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ 
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* User Profile Section */}
      <Box sx={{ 
        p: 3, 
        borderTop: '1px solid #f0f0f0',
        flexShrink: 0 // Prevent this section from shrinking
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar 
            src={user?.profile_picture}
            sx={{ 
              bgcolor: '#b8862b', 
              width: 40, 
              height: 40,
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#333',
                fontWeight: 600
              }}
            >
              {user?.username || 'User'}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#666'
              }}
            >
              Level: {user?.profile?.level || 'Beginner'}
            </Typography>
          </Box>
          <IconButton
            onClick={handleLogout}
            size="small"
            sx={{ 
              color: '#666',
              '&:hover': { 
                color: '#333',
                bgcolor: '#f5f5f5' 
              }
            }}
            title="Logout"
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}