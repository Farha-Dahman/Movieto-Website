import React from 'react'
import Movies from '../Movies'
import { Helmet } from 'react-helmet'
export default function PopularMovies() {
  return (
    <>
      <Movies
        api='https://api.themoviedb.org/3/movie/popular?api_key=30ac20d93ca9a886b21f81428e9c6de3'
        title='Popular Movies'
      />
    </>

  )
}
