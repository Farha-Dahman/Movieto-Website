import React, { useState } from 'react'
import { Link , useLocation} from 'react-router-dom'
import { UserContext } from '../Contexts/UserContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import style from './Navbar.module.css'
import { SearchContext } from '../Contexts/SearchContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

  const {user,setUser} = useContext(UserContext);

  // let [user,setUser] = useState('');

  // function getUserFunc(){
  //   let userInfo = getUser();
  //   setUser(userInfo);
  // }
  // useEffect( ()=>{
  //   getUserFunc();
  // },[])
  let navigate = useNavigate();
  
  function logout(){
    localStorage.removeItem('userToken');
    setUser(null);
    navigate('/login');
  }

  const { searchQuery, setSearch } = useContext(SearchContext);
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === `/search/${searchQuery}`){
      console.log(`Performing search for: ${searchQuery}`);
    } else{
      setSearch('');
    }
  }, [location]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top">
      <div className="container">
        <a className='navbar-brand text-light fw-bold' href="/">
          <img src="./assets/images/logoMovieto.png" alt="Movieto Logo" className={`${style.logo} align-text-bottom`} />
          ovieto
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-light" aria-current="page" to="">Home</Link>
            </li>
            {
              user !== null ? <>
                <li className="nav-item dropdown">
                  <Link className="nav-link text-light" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="movies">Movies</Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="popularMovies">Popular</Link></li>
                    <li><Link className="dropdown-item" to="trendingMovies">Trending</Link></li>
                    <li><Link className="dropdown-item" to="topRatedMovies">Top Rated</Link></li>
                    <li><Link className="dropdown-item" to="upcomingMovies">Upcoming</Link></li>
                  </ul>
                </li></> : <></>
            }
            <li className="nav-item">
              <Link className="nav-link text-light" to="TVshows">TV Shows</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle text-light" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                More
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="PopularPeople">Popular People</Link></li>
                <li><Link className="dropdown-item" to="TrendingPeople">Trending People</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="about">About us</Link></li>
                <li>
                  {user !== null ? <>
                    <li>
                      <span className="dropdown-item" style={{ cursor: 'pointer' }}
                        onClick={() => logout()}>Logout</span>
                    </li>
                  </> : <></>
                  }
                </li>
              </ul>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user !== null ?
              <>
                <li>
                  <form className="d-flex mt-1 me-3" role="search">
                    <div className={`${style.search_container} bg-light d-flex`}>
                      <input className={`${style.search_button} form-control text-dark`} type="search" placeholder="Search a movies..." aria-label="Search" 
                      value={searchQuery} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown}/>
                      <button className={`${style.bg_button} btn`} type="submit">
                        <Link className={`${style.link} ${style.Search_btn}`} to={`/search/${searchQuery}`}>Search</Link></button>
                    </div>
                  </form>
                </li>
                <li>  
                  <div className='d-flex'>   
                  <Link className="nav-link text-light me-3 fw-bold" to="Profile">
                  <img src='./assets/images/favorite.png' alt='profile picture' className={`${style.profile_picture} me-2`}/>
                    My List</Link>
                  </div>
                </li>
              </> : <> <li className="nav-item">
                <Link className="nav-link text-light" to="login">Login</Link>
              </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="register">Sign up</Link>
                </li></>
            }
          </ul>

        </div>
      </div>
    </nav>

  )
}
