import React from 'react'
import style from './About.module.css'
import { Helmet } from 'react-helmet'

export default function About() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movieto | About Us</title>
        <meta name="description" content="About Page" />
      </Helmet>
      <div className={`${style.img} background-content `}>
        <h1 className={`${style.title} mb-5 justify-content-center d-flex`}>Hi There,</h1>
        <h2 className={`${style.subTitle}`}>Welcome to the Movieto Website</h2>
      </div>
      <div className="container">
        <div className={`${style.box} container border border-dark border-5 m-3 mt-5 p-5`}>
          <div className={`${style.para} container text-light`}>
            <h1 className='mb-4'>Let's talk about Movieto</h1>
            <p className='mb-5'>The Movie Database (Movieto) is a community built movie and TV database. Every piece of data has been added by our amazing community dating back to 2023.
              Movieto's strong international focus and breadth of data is largely unmatched and something we're incredibly proud of. Put simply,
              we live and breathe community and that's precisely what makes us different.</p>
          </div>
          <div className={`${style.para} container text-light`}>
            <h1 className='mb-5'>The Movieto advantage</h1>
            <div>
              <ul>
                <li className="d-flex mb-4 text-start">
                  <div className={`${style.num} text-secondary-color`}>1</div>
                  <p>Every year since 2023, the number of contributions to our database has increased (check out our last years wrap!) With over 1,000,000 developers and companies using our platform, Movieto has become a premiere source for metadata.</p>
                </li>
                <li className="d-flex mb-4 text-start">
                  <div className={`${style.num} text-secondary-color`}>2</div>
                  <p>Along with extensive metadata for movies, TV shows and people, we also offer one of the best selections of high resolution posters and fanart. On average, over 1,000 images are added every single day.</p>
                </li>
                <li className="d-flex mb-4 text-start">
                  <div className={`${style.num} text-secondary-color`}>3</div>
                  <p>Our community is second to none. Between our staff and community moderators, we're always here to help. We're passionate about making sure your experience on Movieto is nothing short of amazing.</p>
                </li>
                <li className="d-flex mb-4 text-start">
                  <div className={`${style.num} text-secondary-color`}>4</div>
                  <p>We're international. While we officially support many languages we also have extensive regional data. Every single day Movieto is used in over many countries. We are very exited to you to try this opportunity.</p>
                </li>
                <li className="d-flex mb-4 text-start">
                  <div className={`${style.num} text-secondary-color`}>5</div>
                  <p>Trusted platform. Every single day our service is used by millions of people while we process over 3 billion requests. We've proven for years that this is a service that can be trusted and relied on.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
