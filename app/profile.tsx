import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
	const menuItems = [
		{ icon: 'person', label: 'Edit Profile', route: '#' },
		{ icon: 'ticket', label: 'My Bookings', route: '#' },
		{ icon: 'heart', label: 'Saved Places', route: '#' },
		{ icon: 'settings', label: 'Settings', route: '#' },
		{ icon: 'help-circle', label: 'Help & Support', route: '#' },
	];

	return (
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.avatar}>
					<Text style={styles.avatarText}>👤</Text>
				</View>
				<Text style={styles.name}>Travel Enthusiast</Text>
				<Text style={styles.email}>traveler@example.com</Text>
			</View>

			<View style={styles.stats}>
				<View style={styles.stat}>
					<Text style={styles.statNumber}>12</Text>
					<Text style={styles.statLabel}>Trips</Text>
				</View>
				<View style={styles.stat}>
					<Text style={styles.statNumber}>28</Text>
					<Text style={styles.statLabel}>Countries</Text>
				</View>
				<View style={styles.stat}>
					<Text style={styles.statNumber}>156</Text>
					<Text style={styles.statLabel}>Photos</Text>
				</View>
			</View>

			<View style={styles.section}>
				{menuItems.map((item, index) => (
					<TouchableOpacity key={index} style={styles.menuItem}>
						<Ionicons name={item.icon as any} size={24} color="#4F46E5" />
						<Text style={styles.menuLabel}>{item.label}</Text>
						<Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
					</TouchableOpacity>
				))}
			</View>

			<TouchableOpacity style={styles.logoutBtn}>
				<Ionicons name="log-out" size={24} color="#EF4444" />        <Text style={styles.logoutText}>Logout</Text>
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
		padding: 40,
		alignItems: 'center',
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 16,
	},
	avatarText: {
		fontSize: 48,
	},
	name: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
	},
	email: {
		fontSize: 14,
		color: '#C7D2FE',
		marginTop: 4,
	},
	stats: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		margin: 20,
		padding: 20,
		borderRadius: 16,
		justifyContent: 'space-around',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,  },
	stat: {
		alignItems: 'center',
	},
	statNumber: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#4F46E5',
	},
	statLabel: {
		fontSize: 14,
		color: '#6B7280',
		marginTop: 4,
	},
	section: {
		backgroundColor: '#fff',
		marginHorizontal: 20,
		borderRadius: 16,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#F3F4F6',
		gap: 16,
	},
	menuLabel: {
		flex: 1,
		fontSize: 16,
		color: '#111827',
	},
	logoutBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		margin: 20,
		padding: 16,
		borderRadius: 16,
		gap: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,    shadowRadius: 8,
		elevation: 2,
	},
	logoutText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#EF4444',
	},
});
