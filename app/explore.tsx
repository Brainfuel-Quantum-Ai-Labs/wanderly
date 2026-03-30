import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ExploreScreen() {
  const categories = [
    { icon: 'beach', label: 'Beaches', count: '234 places' },
    { icon: 'mountain', label: 'Mountains', count: '189 places' },
    { icon: 'restaurant', label: 'Food & Dining', count: '567 places' },
    { icon: 'musical-notes', label: 'Events', count: '123 events' },
    { icon: 'camera', label: 'Photography', count: '345 spots' },
    { icon: 'wine', label: 'Wine Tours', count: '78 tours' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore the World 🌍</Text>
        <Text style={styles.subtitle}>Discover amazing places</Text>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <Text style={styles.searchText}>Search destinations...</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.grid}>
          {categories.map((cat, index) => (
            <View key={index} style={styles.categoryCard}>
              <Ionicons name={cat.icon as any} size={32} color="#4F46E5" />
              <Text style={styles.categoryLabel}>{cat.label}</Text>
              <Text style={styles.categoryCount}>{cat.count}</Text>
            </View>
          ))}
        </View>
      </View>
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
    padding: 20,    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#C7D2FE',
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    gap: 12,
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
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,    shadowRadius: 8,
    elevation: 2,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
  },
  categoryCount: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});
