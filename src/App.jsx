import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Drawer, ThemeProvider, createTheme, CssBaseline, Typography } from '@mui/material';
import AuthProvider from './contexts/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
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
import Analytics from './pages/Analytics'; // Add this import
import './App.css';

// Create a modern theme with original colors
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#b8862b', // Original golden brown
    },
    secondary: {
      main: '#4caf50', // Original green
    },
    background: {
      default: '#fafafa', // Original light background
      paper: '#ffffff',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif', // Original font family
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          borderRadius: 16,
          border: '1px solid #e5e7eb',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 20px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          borderRadius: 16,
        },
      },
    },
  },
});

// Simple Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            Something went wrong. Please refresh the page.
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="/*" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Create theme first, then use it for breakpoint detection
  const [isMobile, setIsMobile] = useState(false);
  
  // Use effect to handle responsive breakpoint detection safely
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSidebarNavigate = () => {
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      bgcolor: '#fafafa', 
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box sx={{ 
          width: 280, 
          flexShrink: 0 // Prevent sidebar from shrinking
        }}>
          <Sidebar onNavigate={handleSidebarNavigate} />
        </Box>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          variant="temporary"
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { 
              width: 280, 
              boxSizing: 'border-box',
              bgcolor: '#ffffff'
            },
            zIndex: 1300
          }}
        >
          <Sidebar onNavigate={handleSidebarNavigate} />
        </Drawer>
      )}

      {/* Main Content Area - This should now stretch to full width */}
      <Box
        component="main"
        sx={{
          flexGrow: 1, // Take up remaining space
          bgcolor: '#fafafa',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'auto',
          // Remove all margins and padding
          m: 0,
          p: 0
        }}
      >
        {/* Top Header Bar for Mobile */}
        {isMobile && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              bgcolor: '#fff',
              borderBottom: '1px solid #e5e7eb',
              position: 'sticky',
              top: 0,
              zIndex: 100,
              width: '100%'
            }}
          >
            <Box 
              onClick={() => setDrawerOpen(true)}
              sx={{ 
                cursor: 'pointer',
                p: 1,
                borderRadius: 2,
                '&:hover': { bgcolor: '#f3f4f6' }
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Box sx={{ width: 20, height: 2, bgcolor: '#374151', borderRadius: 1 }} />
                <Box sx={{ width: 20, height: 2, bgcolor: '#374151', borderRadius: 1 }} />
                <Box sx={{ width: 20, height: 2, bgcolor: '#374151', borderRadius: 1 }} />
              </Box>
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: 'serif', 
                color: '#b8862b', 
                fontWeight: 700,
                letterSpacing: 2
              }}
            >
              Kakitori
            </Typography>
            <Box sx={{ width: 40 }} /> {/* Spacer for centering */}
          </Box>
        )}

        {/* Page Content - Remove all constraints */}
        <Box sx={{ 
          width: '100%', // Full width
          minHeight: '100%',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          '& > *': { // Target all children
            margin: 0,
            padding: 0,
            width: '100%'
          }
        }}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
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
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </ErrorBoundary>
        </Box>
      </Box>
    </Box>
  );
}

export default App;