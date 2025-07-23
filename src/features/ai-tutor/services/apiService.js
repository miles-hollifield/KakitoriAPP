import axios from 'axios';

const API_BASE_URL = '/api/v1'; // Uses Vite proxy to backend

/**
 * AI Tutor API service
 */
export class AITutorService {
  /**
   * Check if the AI tutor service is available
   * @returns {Promise<{status: string, service: string, available: boolean}>}
   */
  static async checkHealth() {
    try {
      const response = await axios.get(`${API_BASE_URL}/ai-tutor/health`);
      return response.data;
    } catch (error) {
      console.error('AI Tutor health check failed:', error);
      throw new Error('Failed to check AI tutor service health');
    }
  }

  /**
   * Send a message to the AI tutor
   * @param {string} message - The user's message
   * @returns {Promise<{response: string}>}
   */
  static async sendMessage(message) {
    try {
      if (!message || message.trim().length === 0) {
        throw new Error('Message cannot be empty');
      }

      const response = await axios.post(`${API_BASE_URL}/ai-tutor/chat`, {
        message: message.trim()
      });
      
      return response.data;
    } catch (error) {
      console.error('AI Tutor chat error:', error);
      
      if (error.response?.status === 422) {
        throw new Error('Please enter a valid message');
      } else if (error.response?.status === 500) {
        throw new Error('AI tutor service is currently unavailable. Please try again later.');
      } else if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      } else {
        throw new Error('Failed to get response from AI tutor. Please try again.');
      }
    }
  }
}

export default AITutorService;
