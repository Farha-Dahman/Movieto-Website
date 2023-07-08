import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movieto | Not Found</title>
        <meta name="description" content="Not Found page" />
      </Helmet>
      <div className='background-content m-5 pb-5'>
        <h1>Oops! We can't find the page you're looking for</h1>
        <p>You tried to request a page that doesn't exist. If you believe this to be in error, let us know <Link>Contact Us.</Link></p>
      </div>

    </>

  )
}
