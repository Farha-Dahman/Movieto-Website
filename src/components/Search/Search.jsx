import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { SearchContext } from '../Contexts/SearchContext';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Search() {

    const { searchQuery } = useContext(SearchContext);
    let [MovieSearch, setMovieSearch] = useState([]);
    const { query } = useParams();

    async function getMoviesSearch() {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=30ac20d93ca9a886b21f81428e9c6de3`);
            setMovieSearch(data.results);
        } catch (error) {
            console.error('Error fetching Movies:', error);
        }
    }

    useEffect(() => {
        getMoviesSearch();
    }, [])

    useEffect(() => {
        getMoviesSearch();
    }, [searchQuery, query]);


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Movieto | {searchQuery}</title>
                <meta name="description" content={`${searchQuery} page`} />
            </Helmet>

            <div className="container mt-5">
                <div className="d-flex background-content container row">
                    {
                        MovieSearch.length>0? MovieSearch.map((movie) => {
                            return <div className='col-md-3 mb-5' key={movie.id}>
                                <div className="card movie m-2 border border-dark-subtle h-100 shadow">
                                    {
                                        movie.poster_path !== null ?
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className='rounded-top' alt={movie.name} /> :
                                            <img src="https://th.bing.com/th/id/OIP.VN7ei5Uj7CeDzIkEtTVXcAAAAA?pid=ImgDet&rs=1" className='cover image_holder rounded-top' alt={movie.name} />
                                    }
                                    <Link className='link' to={`/movies/${movie.id}`}>
                                    <div className='p-2'>
                                        <h4>{movie.title}</h4>
                                        <p className='m-0'>{movie.release_date}</p>
                                        <p className='m-0'>Vote's average: {movie.vote_average}</p>
                                    </div>
                                    </Link>
                                </div>
                            </div>
                        }): <Loading/>
                    }
                </div>
            </div>
        </>
    )
}
