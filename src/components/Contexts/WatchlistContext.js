import axios from 'axios';
import { createContext } from 'react';

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {

  async function AddMovieToWatchlist(account_id, movie_id) {
    try {
      const token = localStorage.getItem('userToken');

      const {data} = await axios.post(
        `https://api.themoviedb.org/3/account/${account_id}/watchlist`,
        { 
        media_type: 'movie', 
        media_id: movie_id, 
        watchlist: true },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log('Movie added to watchlist:'+ data);
      return data;

    } catch (error) {
      console.error('Error adding movie to watchlist:', error);
    }
  }

  return (
    <WatchListContext.Provider value={AddMovieToWatchlist}>
      {children}
    </WatchListContext.Provider>
  );
};

