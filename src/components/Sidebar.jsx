import { List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
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

const navItems = [
  { text: 'Dashboard', path: '/', icon: <HomeIcon fontSize="small" /> },
  { text: 'Kanji', path: '/kanji', icon: <TextFieldsIcon fontSize="small" /> },
  { text: 'Vocab', path: '/vocab', icon: <MenuBookIcon fontSize="small" /> },
  { text: 'Kana', path: '/kana', icon: <TranslateIcon fontSize="small" /> },
  { text: 'Lessons', path: '/lessons', icon: <SchoolIcon fontSize="small" /> },
  { text: 'JLPT Practice', path: '/jlpt-practice', icon: <QuizIcon fontSize="small" /> },
  { text: 'Review', path: '/review', icon: <RefreshIcon fontSize="small" /> },
  { text: 'AI Tutor', path: '/ai-tutor', icon: <SmartToyIcon fontSize="small" /> },
  { text: 'Dialog', path: '/dialog', icon: <ChatIcon fontSize="small" /> },
  { text: 'Community', path: '/community', icon: <PeopleIcon fontSize="small" /> },
];

// Sidebar component for Kakitori
export default function Sidebar() {
  const location = useLocation();

  return (
    <Box
      component="nav"
      sx={{
        width: 200,
        bgcolor: '#fff',
        height: '100vh',
        borderRight: '1px solid #eee',
        pt: 2,
        boxShadow: '1px 0 4px #0001',
        position: 'fixed',
        top: 40,
        left: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            sx={{ 
              py: 0.5,
              bgcolor: location.pathname === item.path ? '#f5f5f5' : 'transparent',
              borderRight: location.pathname === item.path ? '3px solid #b8862b' : 'none',
              '&:hover': {
                bgcolor: '#f5f5f5'
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 32, color: location.pathname === item.path ? '#b8862b' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ 
                fontSize: 13,
                color: location.pathname === item.path ? '#b8862b' : 'inherit',
                fontWeight: location.pathname === item.path ? 600 : 400
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}