import React from 'react'
import Movies from '../Movies'

export default function UpcomingMovies() {
  return (
    <Movies
     api = 'https://api.themoviedb.org/3/movie/upcoming?api_key=30ac20d93ca9a886b21f81428e9c6de3'
     title = 'Upcoming Movies'
    />
  )
}
