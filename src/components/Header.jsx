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
    }}>
      <Typography variant="h5" sx={{ fontFamily: 'serif', color: '#b8862b', fontWeight: 700, letterSpacing: 2 }}>
        Kakitori
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <UserAvatar />
        <Typography variant="body2">John Doe</Typography>
      </Box>
    </Box>
  );
}
