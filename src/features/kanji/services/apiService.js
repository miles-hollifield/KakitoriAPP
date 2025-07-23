import api from '../../../utils/api.js';

export async function fetchKanji({ search = '', jlpt = '', page = 1, limit = 20, filters = {} }) {
  const params = {
    search,
    page,
    limit,
    ...filters,
  };
  if (jlpt) {
    params.jlpt_level = jlpt;
  }
  const response = await api.get('/kanji', { params });
  return response.data;
}

export async function fetchKanjiById(id) {
  const response = await api.get(`/kanji/${id}`);
  return response.data;
}

// User favorites API
export async function toggleKanjiFavorite(kanjiId) {
  try {
    const response = await api.post(`/users/favorites/kanji/${kanjiId}/toggle`);
    return response.data;
  } catch (error) {
    console.error('Error toggling kanji favorite:', error);
    throw error;
  }
}

export async function getUserFavorites(itemType = 'kanji') {
  try {
    const response = await api.get(`/users/favorites?item_type=${itemType}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    throw error;
  }
}

export async function checkKanjiFavorite(kanjiId) {
  try {
    const response = await api.get(`/users/favorites/kanji/${kanjiId}/check`);
    return response.data;
  } catch (error) {
    console.error('Error checking kanji favorite:', error);
    throw error;
  }
}
