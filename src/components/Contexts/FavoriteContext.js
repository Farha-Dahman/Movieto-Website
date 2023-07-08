import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const FavoriteContext = createContext();

export function GetFavoriteMovieFunc({ children }) {

    const [FavoriteList, setFavoriteList] = useState([]);
    const [FavoriteListNum, setFavoriteListNum] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function addToFavoriteList(movie_id,type) {
        try {
            const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGFjMjBkOTNjYTlhODg2YjIxZjgxNDI4ZTljNmRlMyIsInN1YiI6IjY0OTliZGQ4YjM0NDA5MDExYzdjYWIxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GJ3KNZmk-EKIB73mq3I22_fL2LuKGQg3OTfF-wCj06U';
            const apiKey = '30ac20d93ca9a886b21f81428e9c6de3';
            const account_id = '20066204';

            const { data } = await axios.post(
                `https://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${apiKey}`,
                {
                    media_type: type,
                    media_id: movie_id,
                    favorite: true
                },
                {
                    headers: { Authorization: token }
                }
            );
            setFavoriteList((prevList) => [...prevList, data]);
            localStorage.setItem('favoriteList', JSON.stringify([...FavoriteList, data]));
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function getMovieFavoriteList() {
        try {
            const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGFjMjBkOTNjYTlhODg2YjIxZjgxNDI4ZTljNmRlMyIsInN1YiI6IjY0OTliZGQ4YjM0NDA5MDExYzdjYWIxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GJ3KNZmk-EKIB73mq3I22_fL2LuKGQg3OTfF-wCj06U';
            const apiKey = '30ac20d93ca9a886b21f81428e9c6de3';
            const account_id = '20066204';

            const { data } = await axios.get(`https://api.themoviedb.org/3/account/${account_id}/favorite/movies?api_key=${apiKey}`,
                {
                    headers: { Authorization: token }
                });
                
            setFavoriteList(data.results);
            setFavoriteListNum(data.total_results);
            setIsLoading(false); 
        } catch (error) {
            console.log(error);
        }
    }
    async function getTVFavoriteList() {
        try {
            const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGFjMjBkOTNjYTlhODg2YjIxZjgxNDI4ZTljNmRlMyIsInN1YiI6IjY0OTliZGQ4YjM0NDA5MDExYzdjYWIxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GJ3KNZmk-EKIB73mq3I22_fL2LuKGQg3OTfF-wCj06U';
            const apiKey = '30ac20d93ca9a886b21f81428e9c6de3';
            const account_id = '20066204';

            const { data } = await axios.get(`https://api.themoviedb.org/3/account/${account_id}/favorite/tv?api_key=${apiKey}`,
                {
                    headers: { Authorization: token }
                });
                
            setFavoriteList(data.results);
            setFavoriteListNum(data.total_results);
            setIsLoading(false); 
        } catch (error) {
            console.log(error);
        }
    }

    async function removeFromFavoriteList(movieId,type) {
        try {
            const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGFjMjBkOTNjYTlhODg2YjIxZjgxNDI4ZTljNmRlMyIsInN1YiI6IjY0OTliZGQ4YjM0NDA5MDExYzdjYWIxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GJ3KNZmk-EKIB73mq3I22_fL2LuKGQg3OTfF-wCj06U';
            const apiKey = '30ac20d93ca9a886b21f81428e9c6de3';
            const account_id = '20066204';
      
            await axios.post(
              `https://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${apiKey}`,
              {
                media_type: type,
                media_id: movieId,
                favorite: false
              },
              {
                headers: { Authorization: token }
              }
            );
      
            const updatedList = FavoriteList.filter((movie) => movie.id !== movieId);
            setFavoriteList(updatedList);
          } catch (error) {
            console.log(error);
          }
        };

    return <FavoriteContext.Provider value={{ addToFavoriteList, getMovieFavoriteList, getTVFavoriteList, setFavoriteList, FavoriteList, FavoriteListNum, removeFromFavoriteList, isLoading }}>
        {children}
    </FavoriteContext.Provider>


}

