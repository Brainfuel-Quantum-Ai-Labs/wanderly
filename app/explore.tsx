import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const trending = [
  {
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    desc: 'Famous for its whitewashed houses and blue domes.',
  },
  {
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
    desc: 'Historic temples, cherry blossoms, and tranquil gardens.',
  },
  {
    name: 'Banff, Canada',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
    desc: 'Stunning lakes and mountain scenery in the Rockies.',
  },
];

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trending Destinations</Text>
      {trending.map((place, idx) => (
        <View key={idx} style={styles.card}>
          <Image source={{ uri: place.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.placeName}>{place.name}</Text>
            <Text style={styles.placeDesc}>{place.desc}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#4F46E5" />
        </View>
      ))}
      <Text style={styles.subtitle}>Discover more with Wanderly AI!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: 4,
  },
  placeDesc: {
    fontSize: 13,
    color: '#6B7280',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 30,
  },
});
