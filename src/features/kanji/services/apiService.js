import axios from 'axios';

const API_BASE_URL = '/api/v1'; // Adjust if needed

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
  const response = await axios.get(`${API_BASE_URL}/kanji`, { params });
  return response.data;
}

export async function fetchKanjiById(id) {
  const response = await axios.get(`${API_BASE_URL}/kanji/${id}`);
  return response.data;
}
