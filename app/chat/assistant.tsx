// app/chat/assistant.tsx
// Assistant chat component for Wanderly

import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

export default function AssistantScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm Wanderly AI, your personal travel assistant. How can I help you plan your next adventure?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        'Book a flight to Paris',
        'Find hotels in Tokyo',
        'Plan a 7-day Italy trip',
        'Best beaches in Bali',
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response (replace with real API later)
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): { text: string; suggestions: string[] } => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('flight') || lowerInput.includes('fly') || lowerInput.includes('airplane')) {
      return {
        text: "✈️ I'd love to help you book a flight! Where would you like to go, and when are you planning to travel? I can search across 500+ airlines for the best deals.",
        suggestions: ['Search flights now', 'Set price alert', 'Flexible dates', 'View deals'],
      };
    } else if (lowerInput.includes('hotel') || lowerInput.includes('stay') || lowerInput.includes('accommodation')) {
      return {
        text: "🏨 Great! I can find you the perfect place to stay. What's your destination, check-in/check-out dates, and preferred budget range?",
        suggestions: ['Search hotels', 'View recommendations', 'Filter by price', 'Show map view'],
      };
    } else if (lowerInput.includes('paris')) {
      return {
        text: "🗼 Paris is amazing! The best time to visit is April-June or September-November. I can help you with:\n\n• Flights from $450\n• Hotels from $89/night\n• Eiffel Tower tours\n• Seine river cruises\n\nWhat would you like to book first?",
        suggestions: ['Search flights to Paris', 'Find hotels', 'Book tours', 'View itinerary'],
      };
    } else if (lowerInput.includes('tokyo')) {
      return {
        text: "🗾 Tokyo is incredible! Here's what I found:\n\n• Flights from $650\n• Hotels from $75/night\n• Best areas: Shibuya, Shinjuku, Ginza\n• Must-visit: Senso-ji Temple, teamLab Borderless\n\nShall I start planning your trip?",
        suggestions: ['Book Tokyo trip', 'View hotels', 'Flight deals', 'Travel guide'],
      };    } else if (lowerInput.includes('bali')) {
      return {
        text: "🏝️ Bali is paradise! Perfect for beaches, temples, and relaxation.\n\n• Flights from $550\n• Villas from $50/night\n• Best areas: Ubud, Seminyak, Canggu\n• Activities: Surfing, temple tours, rice terraces\n\nReady to plan your escape?",
        suggestions: ['Plan Bali trip', 'Find villas', 'Flight search', 'Activity booking'],
      };
    } else if (lowerInput.includes('budget') || lowerInput.includes('cheap')) {
      return {
        text: "💰 I'll help you find budget-friendly options! Here are some great value destinations:\n\n• Vietnam - from $800\n• Thailand - from $750\n• Portugal - from $600\n• Mexico - from $400\n\nWhich interests you?",
        suggestions: ['View budget destinations', 'Set budget alert', 'Travel tips', 'Compare prices'],
      };
    } else if (lowerInput.includes('italy')) {
      return {
        text: "🇮🇹 Italy is perfect for culture, food, and history! Recommended itinerary:\n\n• Rome (3 days) - Colosseum, Vatican\n• Florence (2 days) - Uffizi, Duomo\n• Venice (2 days) - Canals, St. Mark's\n• Amalfi Coast (3 days) - Beaches\n\nTotal estimated: $2,500-3,500 per person",
        suggestions: ['Book Italy trip', 'View flights', 'Hotel packages', 'Tour options'],
      };
    } else {
      return {
        text: "I understand! I can help you with:\n\n✈️ Flight bookings\n🏨 Hotel reservations\n🚗 Car rentals\n🎫 Activities & tours\n🗺️ Complete trip planning\n\nWhat would you like to explore?",
        suggestions: ['Search flights', 'Find hotels', 'Plan complete trip', 'Browse destinations'],
      };
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Wanderly AI</Text>
          <Text style={styles.headerSubtitle}>Always here to help</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View key={message.id}>
            <View
              style={[
                styles.messageBubble,
                message.sender === 'user' ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.sender === 'user' ? styles.userText : styles.aiText,
                ]}
              >
                {message.text}
              </Text>
              <Text style={styles.timestamp}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>

            {/* Suggestions */}
            {message.suggestions && message.sender === 'ai' && (
              <View style={styles.suggestionsContainer}>
                {message.suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionChip}
                    onPress={() => handleSuggestionPress(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}

        {isLoading && (
          <View style={[styles.messageBubble, styles.aiBubble]}>
            <ActivityIndicator size="small" color="#4F46E5" />            <Text style={styles.aiText}> Wanderly is thinking...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={[styles.micButton, isListening && styles.micButtonActive]}
          onPress={() => setIsListening(!isListening)}
        >
          <Ionicons
            name={isListening ? 'stop' : 'mic'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Type or speak your message..."
            placeholderTextColor="#9CA3AF"
            value={inputText}
            onChangeText={setInputText}
            multiline
            onSubmitEditing={() => handleSendMessage(inputText)}
          />
          <TouchableOpacity
            onPress={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            style={styles.sendButton}
          >
            <Ionicons
              name="send"
              size={20}
              color={inputText.trim() ? '#fff' : '#9CA3AF'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },  header: {
    backgroundColor: '#4F46E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'ios' ? 60 : 12,
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#C7D2FE',
    fontSize: 12,
  },
  settingsButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4F46E5',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    borderBottomLeftRadius: 4,  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userText: {
    color: '#fff',
  },
  aiText: {
    color: '#111827',
  },
  timestamp: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 6,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  suggestionText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
  },
  micButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',    alignItems: 'center',
    marginRight: 12,
  },
  micButtonActive: {
    backgroundColor: '#EF4444',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
  },
});
