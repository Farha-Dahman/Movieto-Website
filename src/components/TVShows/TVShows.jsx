import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import ItemsSlider from '../Home/ItemsSlider'
import { Helmet } from 'react-helmet'

export default function TVShows() {

  let [TVShows, setTVShows] = useState([]);
  let [TVtrending, setTVtrending] = useState([]);
  let [TVTopRate, setTVTopRate] = useState([]);
  let [TVOnAir, setTVOnAir] = useState([]);

  async function getPopularTVShows() {
    try {
      const { data } = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=30ac20d93ca9a886b21f81428e9c6de3');
      setTVShows(data.results);
    } catch (error) {
      console.error('Error fetching popular TVShows:', error);
    }
  }
  async function getTopRateTVShows() {
    try {
      const { data } = await axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=30ac20d93ca9a886b21f81428e9c6de3');
      setTVTopRate(data.results);
    } catch (error) {
      console.error('Error fetching Top Rated TVShows:', error);
    }
  }
  async function getOnAirTVShows() {
    try {
      const { data } = await axios.get('https://api.themoviedb.org/3/tv/airing_today?api_key=30ac20d93ca9a886b21f81428e9c6de3');
      setTVOnAir(data.results);
    } catch (error) {
      console.error('Error fetching On Air TVShows:', error);
    }
  }

  useEffect(() => {
    getPopularTVShows();
    getTopRateTVShows();
    getOnAirTVShows();
  }, [])

  const [trendingPeriod, setTrendingPeriod] = useState('day');
  const handleTrendingPeriodChange = (period) => {
    setTrendingPeriod(period);
  };

  async function fetchTrending() {
    try {
      const { data } = await axios.get(`https://api.themoviedb.org/3/trending/tv/${trendingPeriod}?api_key=30ac20d93ca9a886b21f81428e9c6de3`);
      setTVtrending(data.results);
    } catch (error) {
      console.error('Error fetching Trending TVShows:', error);
    }
  }
  useEffect(() => {
    fetchTrending();
  }, [trendingPeriod])


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movieto | TV Shows</title>
        <meta name="description" content="TV Shows page"/>
      </Helmet>
      <Header
        title='TV Shows'
        desc="The most famous TV Shows, get to know them now!"
        height="50"
        button=""
      />

      <div className="container mt-5">
        <h3 className='mb-3'>TV Shows Trending</h3>
        <button className='bg-secondary-color mb-3'
          onClick={() => handleTrendingPeriodChange('day')}>Trending Today</button>
        <button className='bg-secondary-color mb-3'
          onClick={() => handleTrendingPeriodChange('week')}>Trending This Week</button>

        <ItemsSlider
          Items={TVtrending}
        />
        <h3 className='mb-3'>TV Shows Popular</h3>
        <ItemsSlider
          Items={TVShows}
        />
        <h3 className='mb-3'>TV Shows Top Rated </h3>
        <ItemsSlider
          Items={TVTopRate} />
        <h3 className='mb-3'>TV Shows Airing Today</h3>
        <ItemsSlider
          Items={TVOnAir} />
      </div>
    </>
  )
}
