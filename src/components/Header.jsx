import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import { Box, Typography } from '@mui/material';

// Header component for Kakitori
export default function Header() {
  return (
    <Box component="header" sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 40,
      px: 2,
      bgcolor: '#fff',
      borderBottom: '1px solid #eee',
      boxShadow: '0 1px 4px #0001',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 200,
      color: '#000'
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography variant="h5" sx={{ 
          fontFamily: 'serif', 
          color: '#b8862b', 
          fontWeight: 700, 
          letterSpacing: 2,
          '&:hover': { color: '#a0752a' }
        }}>
          Kakitori
        </Typography>
      </Link>
      <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          '&:hover': { opacity: 0.8 }
        }}>
          <UserAvatar />
          <Typography variant="body2">John Doe</Typography>
        </Box>
      </Link>
    </Box>
  );
}