import React, { createContext } from 'react';
import { useFavorites } from '../hooks/useFavorites';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const favorites = useFavorites();

  return (
    <FavoritesContext.Provider value={favorites}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Export the context for use in other components
export { FavoritesContext };

export default FavoritesProvider;
