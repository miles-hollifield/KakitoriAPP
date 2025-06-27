import { Box, Typography, IconButton, Badge, Avatar, TextField, InputAdornment } from '@mui/material';
import { Search, Notifications, Settings } from '@mui/icons-material';

// Modern Header component for main content area
export default function ModernHeader({ title, subtitle, showSearch = false }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 4,
        pb: 2,
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      {/* Left side - Title and subtitle */}
      <Box>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            color: '#333',
            mb: 0.5
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#666'
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Right side - Search and actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {showSearch && (
          <TextField
            placeholder="Search..."
            size="small"
            sx={{
              width: 300,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: '#fff',
                '& fieldset': {
                  borderColor: '#d1d5db',
                },
                '&:hover fieldset': {
                  borderColor: '#b8862b',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#b8862b',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#666', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
        )}

        <IconButton
          sx={{
            bgcolor: '#fff',
            border: '1px solid #e5e7eb',
            '&:hover': {
              bgcolor: '#f9fafb',
            },
          }}
        >
          <Badge badgeContent={3} color="error">
            <Notifications sx={{ color: '#666', fontSize: 20 }} />
          </Badge>
        </IconButton>

        <IconButton
          sx={{
            bgcolor: '#fff',
            border: '1px solid #e5e7eb',
            '&:hover': {
              bgcolor: '#f9fafb',
            },
          }}
        >
          <Settings sx={{ color: '#666', fontSize: 20 }} />
        </IconButton>

        <Avatar 
          sx={{ 
            bgcolor: '#b8862b',
            width: 40,
            height: 40,
            cursor: 'pointer',
            border: '2px solid #fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          JD
        </Avatar>
      </Box>
    </Box>
  );
}