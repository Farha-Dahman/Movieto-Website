import React from 'react'
import Movies from '../Movies'

export default function TopRatedMovies() {
  return (
    <Movies
     api = 'https://api.themoviedb.org/3/movie/top_rated?api_key=30ac20d93ca9a886b21f81428e9c6de3'
     title = 'Top Rated Movies'
    />
  )
}
