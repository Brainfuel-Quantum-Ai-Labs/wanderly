import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

let Voice: any = null;
if (Platform.OS !== 'web') {
  try {
    Voice = require('@react-native-community/voice');
  } catch (e) {
    // Voice not available
    Voice = null;
  }
}

export function useVoice() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  // Web implementation
  const startWebListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        setTranscript(event.results[0][0].transcript);
      };
      recognitionRef.current = recognition;
      recognition.start();
    } else {
      alert('Voice recognition not supported in this browser');
    }
  };

  // React Native implementation
  const startNativeListening = () => {
    if (!Voice) {
      alert('Voice recognition not available on this platform.');
      return;
    }
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (event: any) => {
      if (event.value && event.value.length > 0) {
        setTranscript(event.value[0]);
      }
    };
    Voice.start('en-US');
  };

  const stopNativeListening = () => {
    if (Voice) {
      Voice.stop();
      setIsListening(false);
    }
  };

  const stopWebListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const startListening = () => {
    if (Platform.OS === 'web') {
      startWebListening();
    } else {
      startNativeListening();
    }
  };

  const stopListening = () => {
    if (Platform.OS === 'web') {
      stopWebListening();
    } else {
      stopNativeListening();
    }
  };

  useEffect(() => {
    return () => {
      if (Voice && Platform.OS !== 'web') {
        Voice.destroy().then(Voice.removeAllListeners);
      }
    };
  }, []);

  return { isListening, transcript, startListening, stopListening, setTranscript };
}
