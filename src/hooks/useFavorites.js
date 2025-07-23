import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/userService.js';
import { useAuth } from '../contexts/useAuth.js';

export const useFavorites = () => {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load favorites when component mounts or user logs in
  const loadFavorites = useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    setError(null);
    
    try {
      const userFavorites = await userService.getFavorites();
      setFavorites(userFavorites);
    } catch (err) {
      setError(err.message);
      console.error('Error loading favorites:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated, loadFavorites]);

  const toggleKanjiFavorite = useCallback(async (kanjiId) => {
    if (!isAuthenticated) {
      throw new Error('Must be logged in to save favorites');
    }

    try {
      const result = await userService.toggleKanjiFavorite(kanjiId);
      
      // Update local state
      if (result.is_favorite) {
        // Add to favorites
        const newFavorite = {
          id: Date.now(), // temporary ID
          item_type: 'kanji',
          item_id: kanjiId,
          user_id: null // will be filled by backend
        };
        setFavorites(prev => [...prev, newFavorite]);
      } else {
        // Remove from favorites
        setFavorites(prev => prev.filter(fav => 
          !(fav.item_type === 'kanji' && fav.item_id === kanjiId)
        ));
      }
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [isAuthenticated]);

  const isKanjiFavorited = useCallback((kanjiId) => {
    return favorites.some(fav => 
      fav.item_type === 'kanji' && fav.item_id === kanjiId
    );
  }, [favorites]);

  const getKanjiFavorites = useCallback(() => {
    return favorites.filter(fav => fav.item_type === 'kanji');
  }, [favorites]);

  return {
    favorites,
    loading,
    error,
    loadFavorites,
    toggleKanjiFavorite,
    isKanjiFavorited,
    getKanjiFavorites
  };
};

export default useFavorites;
