import React from 'react'
import Header from '../Header/Header'
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../Contexts/UserContext';
import axios from 'axios';
import ItemsSlider from './ItemsSlider';
import style from './Home.module.css';
import MovieProviders from '../Movies/MovieProviders/MovieProviders';
import { Helmet } from 'react-helmet'

export default function Home() {

  let [trending, setTrending] = useState([]);

  const [trendingPeriod, setTrendingPeriod] = useState('day');
  const handleTrendingPeriodChange = (period) => {
    setTrendingPeriod(period);
  };

  async function fetchTrending() {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/${trendingPeriod}?api_key=30ac20d93ca9a886b21f81428e9c6de3`);
      setTrending(data.results);
    } catch (error) {
      console.error('Error fetching Trending Movies, TVShows:', error);
    }
  }
  useEffect(() => {
    fetchTrending();
  }, [trendingPeriod])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movieto | Home Page</title>
        <meta name="description" content="Home Page" />
      </Helmet>
      <Header
        title="Unlimited movies, TV shows, people to discover and more."
        desc="Find the latest and greatest movies TV shows all available on Movieto. Register now!"
        height="100"
        button="Get Started"
      />
      <div className="container mt-5">
        <h3 className='mb-3 d-flex'>Trending</h3>
        <button className='bg-secondary-color mb-3'
          onClick={() => handleTrendingPeriodChange('day')}>Trending Today</button>
        <button className='bg-secondary-color mb-3'
          onClick={() => handleTrendingPeriodChange('week')}>Trending This Week</button>

        <ItemsSlider
          Items={trending}
        />
      </div>

      <div className={`${style.image_background} pt-5 d-flex`}>
        <div className='container m-auto justify-content-center'>
          <h1 className='text-light'>Why you should use Movieto</h1>
          <ul className={`${style.menu} ${style.point} text-light`}>
            <li>Enjoy Movieto ad free</li>
            <li>Maintain a personal watchlist</li>
            <li>Filter by your subscribed streaming services and find something to watch</li>
            <li>Log the movies and TV shows you've seen</li>
            <li>Build custom lists</li>
            <li>Contribute to and improve our database</li>
          </ul>
        </div>
      </div>

      <MovieProviders />
    </>
  )
}
