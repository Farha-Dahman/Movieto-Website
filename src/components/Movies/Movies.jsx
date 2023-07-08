import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import { Link } from 'react-router-dom';
import style from './Movies.module.css'
import { Helmet } from 'react-helmet'
import Loading from '../Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { FavoriteContext } from '../Contexts/FavoriteContext';
import { toast } from 'react-toastify';

export default function Movies({ api, title }) {

  const { addToFavoriteList, FavoriteList, removeFromFavoriteList } = useContext(FavoriteContext);

  // async function handleAddedToFavorite(movieId,type){
  //   const res =  await addToFavoriteList(movieId,type);
  //   console.log(res);
  // }
  const isFavorite = (movieId) => {
    return FavoriteList.some((movie) => movie.id === movieId);
  };


  const handleAddedToFavorite = async (movieId, type) => {
    if (isFavorite(movieId) === true) {
      removeFromFavoriteList(movieId, type);

    } else {
      const response = await addToFavoriteList(movieId, type);
      console.log(response.success);
      if (response.success == true) {
        toast("added successfully");
      } 
    }
  };

  let [Movies, setMovies] = useState([]);

  async function getMovies() {
    let { data } = await axios.get(api);
    setMovies(data.results);
  }
  useEffect(() => {
    getMovies();
  }, [])

  const [trendingPeriod, setTrendingPeriod] = useState('day');
  const handleTrendingPeriodChange = (period) => {
    setTrendingPeriod(period);
  };

  async function fetchTrending() {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/${trendingPeriod}?api_key=30ac20d93ca9a886b21f81428e9c6de3`);
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching Trending Movies:', error);
    }
  }
  useEffect(() => {
    fetchTrending();
  }, [trendingPeriod])


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movieto | {title}</title>
        <meta name="description" content={`${title} page`} />
      </Helmet>
      <Header
        title={title}
        desc="Millions of movies. Check it now!"
        height="50"
        button=""
      />

      <div className="container mt-5">
        <h3 className='mb-3'>{title}</h3>
        {
          title !== 'Trending Movies' ? <></> : <>
            <button className='bg-secondary-color mb-3'
              onClick={() => handleTrendingPeriodChange('day')}>Trending Today</button>
            <button className='bg-secondary-color mb-3'
              onClick={() => handleTrendingPeriodChange('week')}>Trending This Week</button></>
        }
        <div className="row d-flex">
          {
            Movies.length > 0 ? Movies.map((movie) => {
              return <div className='col-md-3 mb-5' key={movie.id}>
                <div className={`${style.movie} card m-2 border border-dark-subtle shadow`}>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className='rounded-top' alt={movie.name} />
                  <Link className={`${style.link}`} to={`/movies/${movie.id}`}>
                    <div className='p-2'>
                      <h4 className='title'>{movie.title.split(" ").slice(0,4).join(" ")}</h4>
                      <p className='m-0'>{movie.release_date}</p>
                      <p className='m-0'>Vote's number: {movie.vote_count}</p>
                    </div>
                  </Link>
                  <div className='d-flex justify-content-end'>
                    <button className='me-3 d-flex justify-content-center faIcon' onClick={() => handleAddedToFavorite(movie.id, 'movie')}>
                      <FontAwesomeIcon
                        icon={
                          isFavorite(movie.id) === true ? faHeartSolid : faHeartRegular
                        }
                        size="lg"
                        className="heartIcon"
                      // onClick={()=>handleClick(movie.id,'movie')}
                      />
                    </button>
                  </div>
                </div>
              </div>
            }) : <Loading />
          }
        </div>
      </div>
    </>
  )
}
