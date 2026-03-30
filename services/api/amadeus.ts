import axios from 'axios';

const AMADEUS_CLIENT_ID = process.env.AMADEUS_CLIENT_ID;
const AMADEUS_CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET;

export interface FlightSearchParams {
	origin: string;
	destination: string;
	departureDate: string;
	adults: number;
	currencyCode?: string;
}

export interface FlightOffer {
	id: string;
	price: {
		total: string;
		currency: string;
	};
	itineraries: any[];
	airline: string;
	departure: string;
	arrival: string;
}

export class AmadeusService {
	private accessToken: string | null = null;

	async getAccessToken(): Promise<string> {
		if (this.accessToken) return this.accessToken;

		try {
			const response = await axios.post(
				'https://test.api.amadeus.com/v1/security/oauth2/token',
				`grant_type=client_credentials&client_id=${AMADEUS_CLIENT_ID}&client_secret=${AMADEUS_CLIENT_SECRET}`,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
			);

			this.accessToken = response.data.access_token;
			return this.accessToken;
		} catch (error) {
			console.error('Amadeus Auth Error:', error);
			throw error;
		}
	}
	async searchFlights(params: FlightSearchParams): Promise<FlightOffer[]> {
		try {
			const token = await this.getAccessToken();
      
			const response = await axios.get(
				'https://test.api.amadeus.com/v2/shopping/flight-offers',
				{
					params: {
						originLocationCode: params.origin,
						destinationLocationCode: params.destination,
						departureDate: params.departureDate,
						adults: params.adults,
						currencyCode: params.currencyCode || 'USD',
						max: 10
					},
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);

			return response.data.data.map((offer: any) => ({
				id: offer.id,
				price: {
					total: offer.price.total,
					currency: offer.price.currency
				},
				itineraries: offer.itineraries,
				airline: offer.validatingAirlineCodes[0],
				departure: offer.itineraries[0].segments[0].departure.at,
				arrival: offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1].arrival.at
			}));
		} catch (error) {
			console.error('Flight Search Error:', error);
			return [];
		}
	}

	async getAirportSuggestions(search: string) {
		try {
			const token = await this.getAccessToken();
      
			const response = await axios.get(
				'https://test.api.amadeus.com/v1/reference-data/locations',
				{
					params: {
						keyword: search,
						subType: 'AIRPORT,CITY',
						max: 5          },
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);

			return response.data.data;
		} catch (error) {
			console.error('Airport Search Error:', error);
			return [];
		}
	}
}

export const amadeusService = new AmadeusService();
