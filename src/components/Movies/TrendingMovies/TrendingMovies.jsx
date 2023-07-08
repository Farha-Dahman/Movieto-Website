import React from 'react'
import Movies from '../Movies'

export default function TrendingMovies() {
  return (
    <Movies
     api = 'https://api.themoviedb.org/3/trending/movie/day?api_key=30ac20d93ca9a886b21f81428e9c6de3'
     title = 'Trending Movies'
    />
  )
}
