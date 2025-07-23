import api from '../../../utils/api.js';

/**
 * Chat API service for managing AI tutor conversations
 */
export const chatAPI = {
  /**
   * Send a message to the AI tutor
   * @param {string} message - The user's message
   * @param {string|null} sessionId - Optional session ID for continuing conversation
   * @returns {Promise<{response: string, session_id: string}>}
   */
  async sendMessage(message, sessionId = null) {
    if (!message || message.trim().length === 0) {
      throw new Error('Message cannot be empty');
    }

    try {
      const response = await api.post('/ai-tutor/chat', {
        message: message.trim(),
        session_id: sessionId
      });
      
      return response.data;
    } catch (error) {
      console.error('AI Tutor chat error:', error);
      
      if (error.response?.status === 422) {
        throw new Error('Please enter a valid message');
      } else if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment before trying again.');
      } else if (error.response?.status === 503) {
        throw new Error('The AI tutor is temporarily overloaded. Please try again in a few moments.');
      } else if (error.response?.status === 500) {
        throw new Error('AI tutor service is currently unavailable. Please try again later.');
      } else if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      } else {
        throw new Error('Failed to get response from AI tutor. Please try again.');
      }
    }
  },

  /**
   * Get user's chat sessions
   * @returns {Promise<Array<{id: string, title: string, created_at: string, updated_at: string}>>}
   */
  async getChatSessions() {
    try {
      const response = await api.get('/ai-tutor/sessions');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch chat sessions:', error);
      throw new Error('Failed to load chat sessions');
    }
  },

  /**
   * Get a specific chat session with messages
   * @param {string} sessionId - The session ID
   * @returns {Promise<{id: string, title: string, messages: Array}>}
   */
  async getChatSession(sessionId) {
    try {
      const response = await api.get(`/ai-tutor/sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch chat session:', error);
      throw new Error('Failed to load chat session');
    }
  },

  /**
   * Delete a chat session
   * @param {string} sessionId - The session ID to delete
   * @returns {Promise<void>}
   */
  async deleteSession(sessionId) {
    try {
      await api.delete(`/ai-tutor/sessions/${sessionId}`);
    } catch (error) {
      console.error('Failed to delete chat session:', error);
      throw new Error('Failed to delete chat session');
    }
  },

  /**
   * Check if the AI tutor service is available
   * @returns {Promise<{status: string, service: string, available: boolean}>}
   */
  async checkHealth() {
    try {
      const response = await api.get('/ai-tutor/health');
      return response.data;
    } catch (error) {
      console.error('AI Tutor health check failed:', error);
      throw new Error('Failed to check AI tutor service health');
    }
  }
};

export default chatAPI;
