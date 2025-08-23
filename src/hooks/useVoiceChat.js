import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook for voice chat functionality
 * Provides speech recognition and synthesis capabilities
 */
export const useVoiceChat = (options = {}) => {
  const {
    language = 'ja-JP',
    speechRate = 0.8,
    speechPitch = 1.0,
    onVoiceInput,
    onError
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState({
    recognition: false,
    synthesis: false
  });

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const onVoiceInputRef = useRef(onVoiceInput);
  const onErrorRef = useRef(onError);

  // Update refs when callbacks change
  useEffect(() => {
    onVoiceInputRef.current = onVoiceInput;
    onErrorRef.current = onError;
  }, [onVoiceInput, onError]);

  // Initialize speech services
  useEffect(() => {
    let recognition = null;
    let synthesis = null;

    // Check for speech recognition support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      
      // Start with the requested language (ja-JP), will fallback on error
      recognition.lang = language;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        
        if (onVoiceInputRef.current) {
          onVoiceInputRef.current({ transcript, confidence });
        }
      };
      
      recognition.onerror = (event) => {
        setIsListening(false);
        
        // Handle language not supported error by switching to English
        if (event.error === 'language-not-supported') {
          try {
            // Update the recognition language to English as fallback
            recognition.lang = 'en-US';
            if (onErrorRef.current) {
              onErrorRef.current(`Japanese speech recognition not available. Switched to English recognition. You can still speak Japanese - just speak clearly and the AI will understand.`);
            }
          } catch (err) {
            console.warn('Failed to switch to English recognition:', err);
            if (onErrorRef.current) {
              onErrorRef.current(`Speech recognition language not supported: ${event.error}`);
            }
          }
        } else if (event.error === 'no-speech') {
          if (onErrorRef.current) {
            onErrorRef.current('No speech detected. Please try speaking again.');
          }
        } else if (event.error === 'network') {
          if (onErrorRef.current) {
            onErrorRef.current('Network error. Please check your internet connection.');
          }
        } else {
          if (onErrorRef.current) {
            onErrorRef.current(`Speech recognition error: ${event.error}`);
          }
        }
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      setIsSupported(prev => ({ ...prev, recognition: true }));
    }

    // Check for speech synthesis support
    if ('speechSynthesis' in window) {
      synthesis = window.speechSynthesis;
      synthRef.current = synthesis;
      setIsSupported(prev => ({ ...prev, synthesis: true }));
      
      // Load voices if not already loaded
      if (synthesis.getVoices().length === 0) {
        synthesis.addEventListener('voiceschanged', () => {
          // Voices are now loaded
        });
      }
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
      if (synthesis) {
        synthesis.cancel();
      }
    };
  }, [language]); // Remove onVoiceInput and onError from dependencies

  // Start listening for voice input
  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return false;
    
    try {
      recognitionRef.current.start();
      return true;
    } catch (err) {
      if (onErrorRef.current) {
        onErrorRef.current(`Failed to start speech recognition: ${err.message}`);
      }
      return false;
    }
  }, [isListening]);

  // Test language support
  const testLanguageSupport = useCallback(() => {
    if (!recognitionRef.current) return false;
    
    try {
      // Test with a quick recognition attempt
      const testRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      testRecognition.lang = language;
      testRecognition.continuous = false;
      testRecognition.interimResults = false;
      
      testRecognition.onerror = (event) => {
        if (event.error === 'language-not-supported') {
          if (onErrorRef.current) {
            onErrorRef.current(`${language} is not supported on this device. Speech recognition will use English, but you can still speak Japanese.`);
          }
        }
      };
      
      return true;
    } catch (err) {
      console.warn('Language support test failed:', err);
      return false;
    }
  }, [language]);

  // Stop listening for voice input
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  // Speak text using text-to-speech
  const speak = useCallback((text) => {
    if (!synthRef.current || !text) return false;
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    // Check if voices are loaded (important for some browsers)
    const voices = synthRef.current.getVoices();
    if (voices.length === 0) {
      // Voices not loaded yet, try again after a short delay
      setTimeout(() => speak(text), 100);
      return false;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;
    
    // Find a suitable voice for the language
    const suitableVoice = voices.find(voice => 
      voice.lang.startsWith(language.split('-')[0])
    );
    if (suitableVoice) {
      utterance.voice = suitableVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      setIsSpeaking(false);
      if (onErrorRef.current) {
        onErrorRef.current(`Speech synthesis error: ${event.error}`);
      }
    };
    
    try {
      setIsSpeaking(true);
      synthRef.current.speak(utterance);
      return true;
    } catch (error) {
      setIsSpeaking(false);
      if (onErrorRef.current) {
        onErrorRef.current(`Failed to start speech synthesis: ${error.message}`);
      }
      return false;
    }
  }, [language, speechRate, speechPitch]);

  // Stop current speech
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Toggle listening state
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Get available voices for the current language
  const getVoices = useCallback(() => {
    if (!synthRef.current) return [];
    
    const voices = synthRef.current.getVoices();
    return voices.filter(voice => voice.lang.startsWith(language.split('-')[0]));
  }, [language]);

  return {
    // State
    isListening,
    isSpeaking,
    isSupported,
    
    // Actions
    startListening,
    stopListening,
    toggleListening,
    speak,
    stopSpeaking,
    getVoices,
    testLanguageSupport,
    
    // Refs (for advanced usage)
    recognitionRef: recognitionRef.current,
    synthRef: synthRef.current
  };
};

export default useVoiceChat;
