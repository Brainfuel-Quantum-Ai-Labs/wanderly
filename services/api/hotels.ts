import axios from 'axios';

export interface HotelSearchParams {
	cityCode: string;
	checkIn: string;
	checkOut: string;
	adults: number;
}

export interface Hotel {
	hotelId: string;
	name: string;
	city: string;
	rating: number;
	price: {
		total: string;
		currency: string;
		perNight: string;
	};
	amenities: string[];
}

export class HotelService {
	async searchHotels(params: HotelSearchParams): Promise<Hotel[]> {
		// Using Amadeus Hotel Search API
		try {
			const token = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `grant_type=client_credentials&client_id=${process.env.AMADEUS_CLIENT_ID}&client_secret=${process.env.AMADEUS_CLIENT_SECRET}`
			}).then(res => res.json()).then(data => data.access_token);

			const response = await axios.get(
				'https://test.api.amadeus.com/v2/shopping/hotel-offers',
				{
					params: {
						cityCode: params.cityCode,
						checkInDate: params.checkIn,
						checkOutDate: params.checkOut,
						roomQuantity: 1,
						adultQuantity: params.adults,
						max: 10
					},
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}      );

			return response.data.data.map((hotel: any) => ({
				hotelId: hotel.hotel.hotelId,
				name: hotel.hotel.name,
				city: hotel.hotel.city.name,
				rating: hotel.hotel.rating || 0,
				price: {
					total: hotel.offers[0].price.total,
					currency: hotel.offers[0].price.currency,
					perNight: hotel.offers[0].price.total
				},
				amenities: hotel.hotel.amenities?.map((a: any) => a.description) || []
			}));
		} catch (error) {
			console.error('Hotel Search Error:', error);
			// Return mock data for demo
			return this.getMockHotels(params.cityCode);
		}
	}

	private getMockHotels(cityCode: string): Hotel[] {
		const mockHotels: Hotel[] = [
			{
				hotelId: '1',
				name: 'Grand Plaza Hotel',
				city: cityCode,
				rating: 4.5,
				price: { total: '450', currency: 'USD', perNight: '150' },
				amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant']
			},
			{
				hotelId: '2',
				name: 'City Center Inn',
				city: cityCode,
				rating: 4.0,
				price: { total: '300', currency: 'USD', perNight: '100' },
				amenities: ['WiFi', 'Breakfast', 'Gym']
			},
			{
				hotelId: '3',
				name: 'Luxury Suites',
				city: cityCode,
				rating: 5.0,
				price: { total: '900', currency: 'USD', perNight: '300' },
				amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Concierge']
			}
		];
		return mockHotels;
	}}

export const hotelService = new HotelService();
