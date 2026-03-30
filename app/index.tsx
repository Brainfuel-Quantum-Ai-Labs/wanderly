import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => router.push('/chat/assistant')}
      >
        <Text style={styles.chatButtonText}>Open AI Assistant Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  chatButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
