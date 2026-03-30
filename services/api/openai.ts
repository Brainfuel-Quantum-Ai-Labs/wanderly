import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export interface ChatMessage {
	role: 'user' | 'assistant' | 'system';
	content: string;
}

export class OpenAIService {
	async chat(messages: ChatMessage[]): Promise<string> {
		try {
			const response = await axios.post(
				'https://api.openai.com/v1/chat/completions',
				{
					model: 'gpt-4',
					messages: [
						{
							role: 'system',
							content: `You are Wanderly AI, an expert travel assistant. 
							Help users plan trips, book flights, hotels, and activities.
							Be friendly, concise, and provide specific recommendations with prices when possible.
							Always ask for missing details needed for booking (dates, budget, preferences).`
						},
						...messages
					],
					temperature: 0.7,
					max_tokens: 500
				},
				{
					headers: {
						'Authorization': `Bearer ${OPENAI_API_KEY}`,
						'Content-Type': 'application/json'
					}
				}
			);

			return response.data.choices[0].message.content;
		} catch (error) {
			console.error('OpenAI Error:', error);
			return "I'm having trouble connecting right now. Please try again!";
		}
	}

	async generateSuggestions(userInput: string): Promise<string[]> {
		const suggestions = await this.chat([
			{ role: 'user', content: `Based on this travel query: "${userInput}", suggest 4 specific follow-up actions as short phrases. Return only the suggestions separated by commas.` }
		]);
    
		return suggestions.split(',').map(s => s.trim()).slice(0, 4);
	}
}

export const openaiService = new OpenAIService();
