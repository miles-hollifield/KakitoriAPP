import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel,
  Slider,
  Typography,
  Box,
  Divider,
  Alert,
  Chip
} from '@mui/material';
import { VolumeUp, Mic, Language } from '@mui/icons-material';

export default function VoiceSettingsDialog({ 
  open, 
  onClose, 
  settings, 
  onSettingsChange,
  isSupported,
  availableVoices = []
}) {
  const {
    speechEnabled = true,
    autoListen = false,
    speechRate = 0.8,
    speechPitch = 1.0,
    selectedVoice = null
  } = settings || {};

  const handleSettingChange = (key, value) => {
    if (onSettingsChange) {
      onSettingsChange({ ...settings, [key]: value });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        Voice Chat Settings
      </DialogTitle>
      
      <DialogContent>
        {/* Browser Support Status */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Browser Support
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              icon={<Mic />}
              label="Speech Recognition"
              color={isSupported?.recognition ? "success" : "error"}
              variant={isSupported?.recognition ? "filled" : "outlined"}
              size="small"
            />
            <Chip
              icon={<VolumeUp />}
              label="Text-to-Speech"
              color={isSupported?.synthesis ? "success" : "error"}
              variant={isSupported?.synthesis ? "filled" : "outlined"}
              size="small"
            />
          </Box>
          
          {(!isSupported?.recognition || !isSupported?.synthesis) && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Some voice features may not work properly in this browser. 
              For best experience, use Chrome, Edge, or Safari.
            </Alert>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Voice Settings */}
        <List disablePadding>
          {/* Speech Output Toggle */}
          <ListItem sx={{ px: 0 }}>
            <ListItemText
              primary="AI Voice Responses"
              secondary="Enable text-to-speech for AI responses"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={speechEnabled}
                  onChange={(e) => handleSettingChange('speechEnabled', e.target.checked)}
                  disabled={!isSupported?.synthesis}
                />
              }
              label=""
            />
          </ListItem>

          {/* Auto Listen Toggle */}
          <ListItem sx={{ px: 0 }}>
            <ListItemText
              primary="Auto-listen"
              secondary="Automatically start listening after AI response"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={autoListen}
                  onChange={(e) => handleSettingChange('autoListen', e.target.checked)}
                  disabled={!isSupported?.recognition}
                />
              }
              label=""
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Speech Rate */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Speech Rate
          </Typography>
          <Box sx={{ px: 2 }}>
            <Slider
              value={speechRate}
              onChange={(_, value) => handleSettingChange('speechRate', value)}
              min={0.5}
              max={2.0}
              step={0.1}
              marks={[
                { value: 0.5, label: 'Slow' },
                { value: 1.0, label: 'Normal' },
                { value: 2.0, label: 'Fast' }
              ]}
              valueLabelDisplay="auto"
              disabled={!isSupported?.synthesis}
            />
          </Box>
        </Box>

        {/* Speech Pitch */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Speech Pitch
          </Typography>
          <Box sx={{ px: 2 }}>
            <Slider
              value={speechPitch}
              onChange={(_, value) => handleSettingChange('speechPitch', value)}
              min={0.5}
              max={2.0}
              step={0.1}
              marks={[
                { value: 0.5, label: 'Low' },
                { value: 1.0, label: 'Normal' },
                { value: 2.0, label: 'High' }
              ]}
              valueLabelDisplay="auto"
              disabled={!isSupported?.synthesis}
            />
          </Box>
        </Box>

        {/* Voice Selection */}
        {availableVoices.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Voice Selection
            </Typography>
            <List dense>
              {availableVoices.slice(0, 5).map((voice, index) => (
                <ListItem
                  key={index}
                  button
                  selected={selectedVoice === voice.name}
                  onClick={() => handleSettingChange('selectedVoice', voice.name)}
                  sx={{ borderRadius: 1, mb: 0.5 }}
                >
                  <ListItemText
                    primary={voice.name}
                    secondary={`${voice.lang} - ${voice.localService ? 'Local' : 'Online'}`}
                  />
                  <Language fontSize="small" color="action" />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Tips */}
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Tips:</strong>
            <br />
            • Speak clearly and at a normal pace
            <br />
            • Ensure your microphone is working
            <br />
            • Allow browser access to your microphone
            <br />
            • Use headphones to prevent audio feedback
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
