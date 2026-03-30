import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const quickActions = [
    { icon: 'airplane', label: 'Flights', color: '#3B82F6' },
    { icon: 'hotel', label: 'Hotels', color: '#10B981' },
    { icon: 'car', label: 'Car Rental', color: '#F59E0B' },
    { icon: 'train', label: 'Trains', color: '#8B5CF6' },
  ];

  const destinations = [
    { name: 'Paris, France', emoji: '🗼', price: '$599', rating: '4.8' },
    { name: 'New York, USA', emoji: '🗽', price: '$399', rating: '4.7' },
    { name: 'Tokyo, Japan', emoji: '🏯', price: '$799', rating: '4.9' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Traveler! 👋</Text>
          <Text style={styles.subtitle}>Where to next?</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <Text style={styles.searchText}>Search destinations, hotels, flights...</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Book</Text>
        <View style={styles.grid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.card, { backgroundColor: action.color + '15' }]}> 
              <View style={[styles.iconContainer, { backgroundColor: action.color }]}> 
                <Ionicons name={action.icon} size={24} color="#fff" /> 
              </View> 
              <Text style={styles.cardLabel}>{action.label}</Text>            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Popular Destinations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Destinations</Text>
        {destinations.map((dest, index) => (
          <View key={index} style={styles.destinationCard}>
            <View style={styles.destinationInfo}>
              <Text style={styles.destinationName}>{dest.emoji} {dest.name}</Text>
              <Text style={styles.destinationDesc}>From {dest.price} • {dest.rating} ★</Text>
            </View>
            <Ionicons name="heart-outline" size={24} color="#EF4444" />
          </View>
        ))}
      </View>

      {/* AI Assistant CTA */}
      <TouchableOpacity 
        style={styles.aiCard}
        onPress={() => router.push('/chat/assistant' as any)}
      >
        <Ionicons name="chatbubbles" size={32} color="#4F46E5" />
        <View style={styles.aiText}>
          <Text style={styles.aiTitle}>Ask Wanderly AI</Text>
          <Text style={styles.aiSubtitle}>Plan your trip with voice or text</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#4F46E5" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#4F46E5',
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#C7D2FE',
    marginTop: 4,
  },
  notificationBtn: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchText: {
    color: '#9CA3AF',
    fontSize: 16,
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  destinationCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  destinationDesc: {
    fontSize: 14,
    color: '#6B7280',
  },
  aiCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  aiText: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  aiSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});
