import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { amadeusService } from '@/services/api/amadeus';

export default function FlightsScreen() {
	const router = useRouter();
	const [origin, setOrigin] = useState('New York (NYC)');
	const [destination, setDestination] = useState('Paris (PAR)');
	const [departureDate, setDepartureDate] = useState('2026-04-15');
	const [adults, setAdults] = useState(1);
	const [flights, setFlights] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);

	const searchFlights = async () => {
		setLoading(true);
		const results = await amadeusService.searchFlights({
			origin: 'NYC',
			destination: 'PAR',
			departureDate,
			adults
		});
		setFlights(results);
		setLoading(false);
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>✈️ Search Flights</Text>
			</View>

			<View style={styles.searchForm}>
				<View style={styles.inputGroup}>
					<Text style={styles.label}>From</Text>
					<View style={styles.input}>
						<Ionicons name="location" size={20} color="#4F46E5" />
						<TextInput
							style={styles.inputText}
							value={origin}
							onChangeText={setOrigin}
							placeholder="Origin city"
						/>
					</View>
				</View>
				<View style={styles.inputGroup}>
					<Text style={styles.label}>To</Text>
					<View style={styles.input}>
						<Ionicons name="location" size={20} color="#4F46E5" />
						<TextInput
							style={styles.inputText}
							value={destination}
							onChangeText={setDestination}
							placeholder="Destination city"
						/>
					</View>
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Departure Date</Text>
					<View style={styles.input}>
						<Ionicons name="calendar" size={20} color="#4F46E5" />
						<TextInput
							style={styles.inputText}
							value={departureDate}
							onChangeText={setDepartureDate}
							placeholder="YYYY-MM-DD"
						/>
					</View>
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Passengers</Text>
					<View style={styles.input}>
						<Ionicons name="people" size={20} color="#4F46E5" />
						<TextInput
							style={styles.inputText}
							value={adults.toString()}
							onChangeText={(text) => setAdults(parseInt(text) || 1)}
							keyboardType="numeric"
						/>
					</View>
				</View>

				<TouchableOpacity style={styles.searchButton} onPress={searchFlights}>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<>
							<Ionicons name="search" size={20} color="#fff" />
							<Text style={styles.searchButtonText}>Search Flights</Text>
						</>
					)}
				</TouchableOpacity>
			</View>
			{flights.length > 0 && (
				<View style={styles.results}>
					<Text style={styles.resultsTitle}>Found {flights.length} flights</Text>
					{flights.map((flight, index) => (
						<View key={index} style={styles.flightCard}>
							<View style={styles.flightHeader}>
								<Text style={styles.airline}>{flight.airline}</Text>
								<Text style={styles.price}>${flight.price.total}</Text>
							</View>
							<View style={styles.flightRoute}>
								<Text style={styles.routeText}>
									{new Date(flight.departure).toLocaleTimeString()} → {new Date(flight.arrival).toLocaleTimeString()}
								</Text>
							</View>
							<TouchableOpacity style={styles.bookButton}>
								<Text style={styles.bookButtonText}>Book Now</Text>
							</TouchableOpacity>
						</View>
					))}
				</View>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#F9FAFB' },
	header: { backgroundColor: '#4F46E5', padding: 20, paddingTop: 60 },
	title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
	searchForm: { padding: 20 },
	inputGroup: { marginBottom: 16 },
	label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
	input: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 16,
		borderRadius: 12,
		gap: 12,
		borderWidth: 1,
		borderColor: '#E5E7EB',
	},
	inputText: { flex: 1, fontSize: 16, color: '#111827' },
	searchButton: {
		backgroundColor: '#4F46E5',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,    borderRadius: 12,
		gap: 8,
		marginTop: 8,
	},
	searchButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
	results: { padding: 20 },
	resultsTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
	flightCard: {
		backgroundColor: '#fff',
		padding: 16,
		borderRadius: 12,
		marginBottom: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
	},
	flightHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
	airline: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
	price: { fontSize: 20, fontWeight: 'bold', color: '#10B981' },
	flightRoute: { marginBottom: 12 },
	routeText: { fontSize: 14, color: '#6B7280' },
	bookButton: {
		backgroundColor: '#4F46E5',
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
	},
	bookButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
