import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import style from '../People/People.css'
import { Helmet } from 'react-helmet'
import Loading from '../Loading/Loading'

export default function People({ api, title }) {

    let [Peoples, setPeoples] = useState([]);

    async function getPeople() {
        try {
            const { data } = await axios.get(api);
            setPeoples(data.results);
        } catch (error) {
            console.error('Error fetching popular people:', error);
        }
    }
    useEffect(() => {
        getPeople();
    }, [])

    const [trendingPeriod, setTrendingPeriod] = useState('day');
    const handleTrendingPeriodChange = (period) => {
        setTrendingPeriod(period);
    };

    async function fetchTrending() {
        try {
            const { data } = await axios.get(`https://api.themoviedb.org/3/trending/person/${trendingPeriod}?api_key=30ac20d93ca9a886b21f81428e9c6de3`);
            setPeoples(data.results);
        } catch (error) {
            console.error('Error fetching popular people:', error);
        }
    }
    useEffect(() => {
        fetchTrending();
    }, [trendingPeriod])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Movieto | {title}</title>
                <meta name="description" content={`${title} page`} />
            </Helmet>
            <Header
                title={title}
                desc="The most famous actors, get to know them now!"
                height="50"
                button=""
            />

            <div className="container mt-5">
                <h3 className='mb-3'>{title}</h3>
                {
                    title !== 'Trending People' ? <></> : <>
                        <button className='bg-secondary-color mb-3'
                            onClick={() => handleTrendingPeriodChange('day')}>Trending Today</button>
                        <button className='bg-secondary-color mb-3'
                            onClick={() => handleTrendingPeriodChange('week')}>Trending This Week</button></>
                }
                <div className="row d-flex ">
                    {
                        Peoples.length>0? Peoples.map((person) => {
                            return <div className='col-md-3 mb-5' key={person.id}>
                                <div className="card m-2 border border-dark-subtle h-100 shadow">
                                    {
                                        person.profile_path !== null ?
                                            <img src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} className='rounded-top' alt={person.name} /> :
                                            <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg" className='image_holder rounded-top' alt={person.name} />
                                    }

                                    <div className='p-2'>
                                        <h4>{person.name}</h4>
                                        <p className='m-0'>{person.release_date}</p>
                                        <p className={`${style.popularity_style} m-0`}>popularity: {person.popularity}</p>
                                    </div>
                                </div>
                            </div>
                        }):<Loading/>
                    }
                </div>
            </div>
        </>
    )
}
