# Voice Conversation Feature

## Overview
The Voice Conversation feature allows users to practice Japanese through natural voice interactions with an AI tutor. Users can speak in Japanese and receive both text and voice responses from the AI.

## Features

### 🎤 Speech Recognition
- Real-time speech-to-text conversion
- Japanese language support (ja-JP)
- Visual feedback while listening
- Error handling for unsupported browsers

### 🔊 Text-to-Speech
- AI responses are spoken aloud in Japanese
- Adjustable speech rate and pitch
- Multiple voice options (when available)
- Click-to-replay for any message

### ⚙️ Voice Settings
- **Speech Output**: Toggle AI voice responses on/off
- **Auto-listen**: Automatically start listening after AI response
- **Speech Rate**: Adjust speaking speed (0.5x to 2.0x)
- **Speech Pitch**: Adjust voice pitch (0.5x to 2.0x)
- **Voice Selection**: Choose from available Japanese voices

### 🎯 Smart Features
- **Conversation Flow**: Natural back-and-forth conversation
- **Voice Indicators**: Visual tags showing voice messages
- **Status Display**: Real-time status (Listening, Processing, Speaking)
- **Error Handling**: Graceful fallbacks for unsupported features

## Browser Compatibility

### Fully Supported
- **Chrome/Chromium** (Recommended)
- **Microsoft Edge**
- **Safari** (macOS/iOS)

### Partially Supported
- **Firefox** (Speech synthesis only, no recognition)

### Not Supported
- **Internet Explorer**
- **Older browser versions**

## Usage Instructions

### Getting Started
1. Navigate to the "Conversation" page
2. Check browser compatibility indicators
3. Click "Start Conversation" to begin
4. Use "Test Voice" to verify audio output

### Voice Interaction
1. **Listening**: Click the microphone button to start listening
2. **Speaking**: Speak clearly in Japanese when the status shows "Listening..."
3. **Processing**: Wait for AI to process your input
4. **Response**: AI will respond with text and voice (if enabled)

### Settings Configuration
1. Click the settings gear icon in the header
2. Adjust voice settings according to your preferences
3. Test different voices and speech rates
4. Enable auto-listen for hands-free conversation

## Technical Details

### Architecture
- **Custom Hook**: `useVoiceChat` - Encapsulates all voice functionality
- **Settings Component**: `VoiceSettingsDialog` - Manages user preferences
- **Main Component**: `Dialog` page - Orchestrates the conversation flow

### Browser APIs Used
- **Web Speech API**: Speech recognition and synthesis
- **SpeechRecognition**: For voice input
- **SpeechSynthesis**: For voice output

### Error Handling
- Browser compatibility checks
- Graceful degradation for unsupported features
- User-friendly error messages
- Automatic retry mechanisms

## Tips for Best Experience

### Audio Setup
- Use headphones to prevent audio feedback
- Ensure microphone permissions are granted
- Test audio levels before starting

### Speaking Tips
- Speak clearly and at normal pace
- Pause between sentences
- Ensure quiet environment
- Allow processing time between exchanges

### Troubleshooting
- Refresh page if voice features stop working
- Check browser permissions for microphone access
- Try different voices if speech is unclear
- Disable auto-listen if experiencing issues

## Future Enhancements

### Planned Features
- Voice activity detection
- Pronunciation feedback
- Conversation topics/scenarios
- Progress tracking
- Offline voice support

### Potential Improvements
- Better voice quality
- Faster response times
- More language options
- Advanced speech recognition
- Custom voice training

## Development Notes

### File Structure
```
src/
├── pages/Dialog.jsx              # Main conversation page
├── hooks/useVoiceChat.js         # Voice functionality hook
├── components/VoiceSettingsDialog.jsx  # Settings modal
└── features/ai-tutor/services/  # AI integration
```

### Key Dependencies
- React (useState, useEffect, useRef, useCallback)
- Material-UI (UI components)
- Web Speech API (Browser native)

### Configuration
- Default language: Japanese (ja-JP)
- Default speech rate: 0.8x
- Default pitch: 1.0x
- Timeout settings: Configurable delays
