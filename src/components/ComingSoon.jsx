import { Box, Typography, Paper } from '@mui/material';
import { Construction } from '@mui/icons-material';

// ComingSoon reusable component
export default function ComingSoon({ title, description }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '60vh',
      width: '100%'
    }}>
      <Paper sx={{ 
        p: 6, 
        textAlign: 'center', 
        borderRadius: 3, 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        maxWidth: 500,
        width: '100%'
      }}>
        <Construction sx={{ 
          fontSize: 80, 
          color: '#b8862b', 
          mb: 3 
        }} />
        
        <Typography variant="h3" sx={{ 
          fontWeight: 700, 
          mb: 2, 
          color: '#333',
          fontSize: { xs: '2rem', md: '3rem' }
        }}>
          Coming Soon
        </Typography>
        
        <Typography variant="h5" sx={{ 
          fontWeight: 600, 
          mb: 2, 
          color: '#b8862b' 
        }}>
          {title}
        </Typography>
        
        <Typography variant="body1" sx={{ 
          color: '#666', 
          mb: 3,
          lineHeight: 1.6
        }}>
          {description || 'We\'re working hard to bring you this feature. Stay tuned for updates!'}
        </Typography>
        
        <Typography variant="body2" sx={{ 
          color: '#999',
          fontStyle: 'italic'
        }}>
          Expected release: Q2 2025
        </Typography>
      </Paper>
    </Box>
  );
}