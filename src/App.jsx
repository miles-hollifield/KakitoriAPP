import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, useMediaQuery, Drawer, IconButton, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Kanji from './pages/Kanji';
import KanjiDetail from './pages/KanjiDetail';
import Vocab from './pages/Vocab';
import Kana from './pages/Kana';
import Lessons from './pages/Lessons';
import JLPTPractice from './pages/JLPTPractice';
import Review from './pages/Review';
import AITutor from './pages/AITutor';
import Dialog from './pages/Dialog';
import Community from './pages/Community';
import Profile from './pages/Profile';
import './App.css';

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#b8862b',
    },
    secondary: {
      main: '#4caf50',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
});

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
          <Header>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setDrawerOpen(true)}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Header>
          {isMobile ? (
            <Drawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              variant="temporary"
              ModalProps={{ keepMounted: true }}
              sx={{
                '& .MuiDrawer-paper': { width: 200, boxSizing: 'border-box' },
              }}
            >
              <Sidebar onNavigate={() => setDrawerOpen(false)} />
            </Drawer>
          ) : (
            <Sidebar />
          )}
          <Box
            component="main"
            sx={{
              ml: isMobile ? 0 : '200px',
              mt: '40px',
              p: { xs: 1, sm: 2, md: 3 },
              bgcolor: '#fafafa',
              minHeight: 'calc(100vh - 40px)',
              transition: 'margin 0.3s',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ width: '100%', maxWidth: '1400px', mx: 'auto' }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/kanji" element={<Kanji />} />
                <Route path="/kanji/:kanjiId" element={<KanjiDetail />} />
                <Route path="/vocab" element={<Vocab />} />
                <Route path="/kana" element={<Kana />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/jlpt-practice" element={<JLPTPractice />} />
                <Route path="/review" element={<Review />} />
                <Route path="/ai-tutor" element={<AITutor />} />
                <Route path="/dialog" element={<Dialog />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;