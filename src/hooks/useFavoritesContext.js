import { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};
