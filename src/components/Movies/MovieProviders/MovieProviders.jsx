import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Slider from 'react-slick';
import style from '../Movies.module.css';

export default function MovieProviders() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 100,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 5,
    };

    let [movieProviders, setMovieProviders] = useState([]);
    async function getMovieProviders() {
        try {
            const { data } = await axios.get('https://api.themoviedb.org/3/watch/providers/movie?api_key=30ac20d93ca9a886b21f81428e9c6de3');
            setMovieProviders(data.results);
        } catch (error) {
            console.error('Error fetching Trending Movies:', error);
        }
    }
    useEffect(() => {
        getMovieProviders();
    }, [])

    return (
        <div className="container mt-3">
            <h3 className={`${style.margin} mb-3`}>Movie Providers</h3>

            <div className="row d-flex">

                <Slider {...settings} className='mb-5 container'>
                    {
                        movieProviders.map((movie) => {
                            return <div className={`${style.height_MovieProviders} col-md-3 mb-5 `} key={movie.id}>
                                <div className="card m-2 border border-dark-subtle h-100 shadow">
                                    {
                                        movie.profile_path !== null ?
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie.logo_path}`} className='rounded-top' alt={movie.provider_name} /> :
                                            <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg" className='image_holder rounded-top' alt={movie.provider_name} />
                                    }

                                    <div className='p-2'>
                                        <h4>{movie.provider_name}</h4>
                                        <p className='popularity_style m-0'>Priority: {movie.display_priority}</p>
                                    </div>
                                </div>
                            </div>
                        })}
                </Slider>
            </div>
        </div>
    )
}
