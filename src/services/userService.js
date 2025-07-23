import api from '../utils/api.js';

// User profile and data services
export const userService = {
  // Get user profile
  async getProfile() {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await api.put('/users/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Get user statistics
  async getStats() {
    try {
      const response = await api.get('/users/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw error;
    }
  },

  // Favorites operations
  async getFavorites(itemType = null) {
    try {
      const params = itemType ? { item_type: itemType } : {};
      const response = await api.get('/users/favorites', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  },

  async toggleKanjiFavorite(kanjiId) {
    try {
      const response = await api.post(`/users/favorites/kanji/${kanjiId}/toggle`);
      return response.data;
    } catch (error) {
      console.error('Error toggling kanji favorite:', error);
      throw error;
    }
  },

  async checkKanjiFavorite(kanjiId) {
    try {
      const response = await api.get(`/users/favorites/kanji/${kanjiId}/check`);
      return response.data;
    } catch (error) {
      console.error('Error checking kanji favorite:', error);
      throw error;
    }
  }
};

export default userService;
