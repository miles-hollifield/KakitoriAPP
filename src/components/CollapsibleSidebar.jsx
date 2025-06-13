import { List, ListItem, ListItemIcon, ListItemText, Box, Drawer, useMediaQuery, useTheme, IconButton, Divider } from '@mui/material';
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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

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

const DRAWER_WIDTH = 240;

export default function CollapsibleSidebar({ open, onClose, onToggle }) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleItemClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  const drawerContent = (
    <Box sx={{ width: DRAWER_WIDTH, height: '100%', bgcolor: '#fff' }}>
      {/* Close button for desktop */}
      {!isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={onToggle} size="small">
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      )}
      
      <Divider />
      
      <List sx={{ pt: 2 }}>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            onClick={handleItemClick}
            sx={{ 
              py: 1.5,
              mx: 1,
              mb: 0.5,
              borderRadius: 2,
              bgcolor: location.pathname === item.path ? 'rgba(184, 134, 43, 0.1)' : 'transparent',
              borderLeft: location.pathname === item.path ? '4px solid #b8862b' : '4px solid transparent',
              '&:hover': {
                bgcolor: 'rgba(184, 134, 43, 0.05)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: 40, 
              color: location.pathname === item.path ? '#b8862b' : '#666',
              transition: 'color 0.2s ease-in-out'
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ 
                fontSize: 14,
                fontWeight: location.pathname === item.path ? 600 : 400,
                color: location.pathname === item.path ? '#b8862b' : '#333',
                transition: 'all 0.2s ease-in-out'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (isMobile) {
    // Mobile: Use temporary drawer
    return (
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            top: { xs: '48px', sm: '56px' }, // Below header
            height: { xs: 'calc(100% - 48px)', sm: 'calc(100% - 56px)' },
            borderTop: '1px solid #e0e0e0',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  // Desktop: Use persistent drawer
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          top: '56px', // Below header
          height: 'calc(100% - 56px)',
          borderRight: '1px solid #e0e0e0',
          borderTop: '1px solid #e0e0e0',
          boxShadow: open ? '2px 0 8px rgba(0,0,0,0.1)' : 'none',
          transition: theme.transitions.create(['box-shadow'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        '& .MuiDrawer-paperAnchorLeft': {
          borderRight: '1px solid #e0e0e0',
        }
      }}
    >
      {drawerContent}
    </Drawer>
  );
}