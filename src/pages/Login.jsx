import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Box, Container, Paper, Typography, Alert } from '@mui/material';
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setError('');
      const result = await login(credentialResponse);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
        <Paper elevation={3} sx={{ width: '100%', p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Welcome to Kakitori
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
            Your Japanese Language Learning Companion
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Sign in with Google to start your Japanese learning journey
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              disabled={isLoading}
              theme="outline"
              size="large"
              text="signin_with"
            />
          </Box>

          {isLoading && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Signing you in...
            </Typography>
          )}
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
}
