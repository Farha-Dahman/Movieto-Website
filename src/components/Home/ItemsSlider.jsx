import React from 'react'
import style from './Home.module.css'
import Slider from 'react-slick'
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { FavoriteContext } from '../Contexts/FavoriteContext';
import { toast } from 'react-toastify';

export default function ItemsSlider({ Items }) {

    var settings = {
        dots: true,
        infinite: true,
        speed: 100,
        autoplay: true,
        slidesToShow: 6,
        slidesToScroll: 2
    };
    const { addToFavoriteList, FavoriteList, removeFromFavoriteList } = useContext(FavoriteContext);

    const isFavorite = (movieId) => {
        return FavoriteList.some((movie) => movie.id === movieId);
      };
        
      const handleAddedToFavorite = async (movieId, type) => {
        if (isFavorite(movieId) === true) {
          removeFromFavoriteList(movieId, type);
    
        } else {
          const response = await addToFavoriteList(movieId, type);
          console.log(response.success);
          if (response.success == true) {
            toast("added successfully");
          } 
        }
      };


    return (
        <Slider {...settings} className='mb-5'>
            {
                Items.length > 0 ? Items.map((item) => {
                    return <div className={`${style.height_trending} col-md-3 mb-5`} key={item.id}>
                        <div className="card m-2 border border-dark-subtle h-100 shadow">
                            {
                                item.profile_path !== null ?
                                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className='rounded-top' alt={item.name} /> :
                                    <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg" className={`${style.image_holder} rounded-top`} alt={item.name} />
                            }
                            <Link className={`${style.link}`} to={`/tv/${item.id}`}>
                                <div className='p-2'>
                                    {
                                        item.title !== null && item.title !== undefined ? (
                                            <h4 className={`${style.title}`}>{item.title.split(" ").slice(0, 3).join(" ")}</h4>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    {
                                        item.name !== null && item.name !== undefined ? (
                                            <h4 className={`${style.title}`}>{item.name.split(" ").slice(0, 3).join(" ")}</h4>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    {
                                        item.release_date !== null ? <p className='m-0'>{item.release_date}</p> : <></>
                                    }
                                    {
                                        item.first_air_date !== null ? <p className='m-0'>{item.first_air_date}</p> : <></>
                                    }
                                    {
                                        item.media_type !== undefined ? <p className='m-0'>Media Type: {item.media_type}</p> : <></>
                                    }
                                    <p className={`${style.popularity_style} m-0`}>popularity: {item.popularity}</p>
                                </div>
                            </Link>
                            <div className='d-flex justify-content-end'>
                            <button className='me-3 d-flex justify-content-center faIcon' onClick={() => {
                                item.media_type === 'tv'? handleAddedToFavorite(item.id, 'tv'):  handleAddedToFavorite(item.id, 'movie')}}>
                                <FontAwesomeIcon 
                                icon={
                                    isFavorite(item.id) === true ? faHeartSolid : faHeartRegular
                                  }
                                size="lg" className='heartIcon' />
                            </button>
                            </div>
                        </div>
                    </div>
                }) : <Loading />}
        </Slider>
    )
}
