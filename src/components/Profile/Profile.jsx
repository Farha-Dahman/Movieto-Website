import React, { useContext, useState } from 'react'
import style from './Profile.module.css'
import { useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FavoriteContext } from '../Contexts/FavoriteContext';
import Header from '../Header/Header';

export default function Profile() {

    const { getMovieFavoriteList, getTVFavoriteList, FavoriteList, FavoriteListNum, removeFromFavoriteList, isLoading } = useContext(FavoriteContext);

    const handleFavoriteMovieChange = () => {
        getMovieFavoriteList();
    };
    const handleFavoriteTVChange = () => {
        getTVFavoriteList();
    };
    useEffect(() => {
        handleFavoriteMovieChange();
    }, []);


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Movieto | Profile Page</title>
                <meta name="description" content="Profile page" />
            </Helmet>
            <Header
                title="My Favorite List"
                desc="Check your Favorite Movies and TV Shows!"
                height="50"
                button=""

            />
            {/* <div>{FavoriteListNum}</div> */}
            <div className='d-flex justify-content-center mt-0'>
                <div className={`${style.my_list} container-fluid pb-5 m-5 border border-dark-subtle`}>
                    <div className="container mt-4">
                        <button className='bg-secondary-color mb-3'
                            onClick={handleFavoriteMovieChange}>Favorite Movie</button>
                        <button className='bg-secondary-color mb-3'
                            onClick={handleFavoriteTVChange}>Favorite TV</button>
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <div className="row d-flex">
                                {
                                    FavoriteList.length > 0 ? FavoriteList.map((movie) => {
                                        return <div className='col-md-3 mb-5' key={movie.id}>
                                            <div className="card movie m-2 border border-dark-subtle h-100 shadow">
                                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className='rounded-top' alt={movie.title} />
                                                <Link className='link' to={`/movies/${movie.id}`}>
                                                    <div className='p-2'>
                                                        {
                                                            movie.title !== null && movie.title !== undefined ? (
                                                            <h4 className={`${style.TVtitle}`}>{movie.title.split(" ").slice(0, 3).join(" ")}</h4>
                                                            ) : (
                                                            <></>
                                                        )
                                                        }
                                                        {
                                                            movie.name !== null && movie.name !== undefined ? (
                                                                <h4 className={`${style.TVtitle}`}>{movie.name.split(" ").slice(0, 3).join(" ")}</h4>
                                                            ) : (
                                                                <></>
                                                            )
                                                        }
                                                        <p className='m-0'>{movie.release_date}</p>
                                                        <p className='m-0'>Vote's number: {movie.vote_count}</p>
                                                    </div>
                                                </Link>
                                                <div className='d-flex justify-content-end'>
                                                    <button
                                                        className='me-3 d-flex justify-content-center faIcon'
                                                        onClick={() => {
                                                            movie.name !== null ? removeFromFavoriteList(movie.id, 'tv') : <></>;
                                                            movie.title !== null ? removeFromFavoriteList(movie.id, 'movie') : <></>
                                                        }}>
                                                        <FontAwesomeIcon
                                                            icon={faHeartSolid}
                                                            size="lg"
                                                            className='heartIcon'
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    }) : (
                                        <p className={`${style.masg} fw-bold d-flex justify-content-center`}>Your favorite list is empty.</p>
                                    )}
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}
