import React from 'react'
import { Link } from 'react-router-dom'
import style from './Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram ,faTwitter ,faPinterest} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <>
      <footer className={`${style.margin} footer bg-dark text-white text-center align-items-center mt-5`}>
      <div className="container d-flex justify-content-center">
          <div className="row container flex-row py-5 align-items-center d-flex justify-content-center">
            <div className='col-lg-3 col-md-6 col-sm-12'>
              <div className='d-flex flex-column align-items-center'>
                <img className={`${style.logo} mb-0`} src='./assets/images/logoMovieto.png' alt='Movieto Logo' />
                <Link className='btn btn-light my-3' to="">Join With Us</Link>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-12 my-3'>     
              <ul>
                <li><h4>THE BASICS</h4></li>
                <li><Link to="about" className={`${style.link}`}>About Movieto</Link></li>
                <li><Link to="contactUs" className={`${style.link}`}>Contact Us</Link></li>
              </ul>
            </div>
            <div className='col-lg-3 col-md-6 col-sm-12 my-3'>
              <ul>
                <li><h4>CONTACT INFO</h4></li>
                <li>movietoteam@gmail.com</li>
                <li>+999 999 999</li>
              </ul>
            </div>
            <div className={`${style.icons} col-lg-3 col-md-6 col-sm-12 d-flex flex-column`}>
              <h4 className='d-flex justify-content-center ms-4'>Follow US</h4>
              <ul className='flex-row d-flex justify-content-center'>
                <li className='m-2'><Link to="#"><FontAwesomeIcon icon={faFacebook} size="lg" className={`${style.icon1}`}/></Link></li>
                <li className='m-2'><Link to="#"><FontAwesomeIcon icon={faInstagram} size="lg" className={`${style.icon2}`}/></Link></li>
                <li className='m-2'><Link to="#"><FontAwesomeIcon icon={faTwitter} size="lg"  className={`${style.icon3}`}/></Link></li>
                <li className='m-2'><Link to="#"><FontAwesomeIcon icon={faPinterest} size="lg"  className={`${style.icon4}`}/></Link></li>
              </ul>
            </div>
          </div>
          </div>
          <div className="container">
            <span>&copy; 2023 Movieto Website</span>
          </div>
      </footer>
    </>
  )
}
