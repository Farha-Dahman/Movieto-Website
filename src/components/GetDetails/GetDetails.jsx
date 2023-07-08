import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import style from '../Movies/Movies.module.css'
import Slider from 'react-slick'
import reStyle from './GetDetails.module.css'

export default function GetDetails({ type, id }) {

    var settings = {
        dots: false,
        infinite: false,
        speed: 100,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 2
    };
    let [ItemDetails, setItemDetails] = useState({});
    let [ItemType, setItemType] = useState([]);
    let [productionCompanies, setProductionCompanies] = useState([]);

    async function getItemDetails() {
        try {
            let { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=30ac20d93ca9a886b21f81428e9c6de3`);
            setItemDetails(data);
            setItemType(data.genres);
            setProductionCompanies(data.production_companies);
        } catch (error) {
            console.error('Error fetching Trending Movies:', error);
        }
    }
    useEffect(() => {
        getItemDetails();
    }, [])
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Movieto | Product Details Page</title>
                <meta name="description" content="Product Details Page" />
            </Helmet>

            <div className="container mt-5">
                <div className={`${reStyle.containerItem} container background-content p-4 row shadow`}>
                    <div className={`${reStyle.ItemContent} d-flex align-items-start mb-4 col-lg-12 col-md-6 col-sm-12`}>
                        <div className='me-3'>
                            {
                                ItemDetails.poster_path !== null ?
                                    <img src={`https://image.tmdb.org/t/p/w500/${ItemDetails.poster_path}`} className={`${style.movieImage} ${reStyle.ItemImage} col-sm-12 col-md-3 rounded col-sm-12`} alt={ItemDetails.title} /> :
                                    <img src="https://th.bing.com/th/id/OIP.VN7ei5Uj7CeDzIkEtTVXcAAAAA?pid=ImgDet&rs=1" className={`${style.movieImage} ${reStyle.ItemImage} col-sm-12 col-md-3 rounded col-sm-12`} alt={ItemDetails.title} />  
                            }
                        </div>
                        <div className='p-2'>
                            {
                                ItemDetails.title !== undefined ? <h2 className='mb-3'>{ItemDetails.title}</h2> : <h2 className='mb-3'>{ItemDetails.original_name}</h2>
                            }
                            {
                                ItemDetails.release_date !== undefined ? <p className='m-1'><span className='fw-bold'>Release Date: </span>{ItemDetails.release_date}</p> :
                                    <p className='m-1'><span className='fw-bold'>Release Date: </span>{ItemDetails.first_air_date}</p>
                            }

                            <p className='m-1'><span className='fw-bold'>Status: </span>{ItemDetails.status}</p>
                            <p className='m-1 d-flex'><span className='fw-bold me-2'>Movie's Type: </span>
                                {
                                    ItemType.map((type, index) => {
                                        const isLastItem = index === ItemType.length - 1;
                                        const separator = isLastItem ? '.' : ',';

                                        return (
                                            <p className='mb-0 me-2'>
                                                {type.name}
                                                <span>{separator}</span>
                                            </p>
                                        );
                                    })
                                }
                            </p>
                            {
                                ItemDetails.tagline !== undefined && ItemDetails.tagline !== "" ? <p className='m-1'><span className='fw-bold'>Tagline: </span>{ItemDetails.tagline}</p> : <></>
                            }

                            <p className='m-1'><span className='fw-bold'>Overview: </span>{ItemDetails.overview}</p>
                            <p className='m-1'><span className='fw-bold'>Vote's number: </span> {ItemDetails.vote_count}</p>
                            <p className='m-1'><span className='fw-bold'>Average: </span> {ItemDetails.vote_average}</p>
                            <p className='m-1'><span className='fw-bold'>Language: </span> {ItemDetails.original_language}</p>
                        </div>
                    </div>
                    {
                        productionCompanies.length !== 0 ?
                            <div className='mt-5'>
                                <h4 className='mb-4'>Production Companies</h4>
                                <Slider className='mb-5' {...settings} >
                                    {
                                        productionCompanies.map((company) => {
                                            return <div className='mb-2' key={company.id}>
                                                <div className={`${style.SliderContainer}  card m-2 border border-dark-subtle shadow`}>
                                                    {
                                                        company.logo_path !== null ?
                                                            <img src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`} className={`${style.companyImage} rounded-top`} alt={company.name} /> :
                                                            <img src="https://th.bing.com/th/id/OIP.puwwjD9mocvnhV328UCDxQHaFG?pid=ImgDet&rs=1" className={`${style.image_holder} rounded-top`} alt={company.name} />
                                                    }
                                                    <div className='p-2'>
                                                        <h4>{company.name}</h4>
                                                        {
                                                            company.origin_country !== "" ? <p className={`${style.popularity_style} m-0`}>Origin Country: {company.origin_country}</p> : <></>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                        })
                                    }
                                </Slider>
                            </div> : <></>
                    }

                </div>
            </div>

        </>
    )
}
