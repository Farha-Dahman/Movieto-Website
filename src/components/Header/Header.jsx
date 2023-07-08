import React from 'react'
import style from '../Home/Home.module.css'
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import { useContext } from 'react';

export default function Header({title,desc,height,button}) {
    const {user} = useContext(UserContext);

    const navigate = useNavigate();
    
    const handleNavigate = () => {
        navigate('/login');
    };
    const handleUserNavigate = () => {
        navigate('/ContactUs');
    };
    return (
        <>
            <div className="header d-flex background-content" style={{height: height+"vh"}}>
                <div className='container d-flex mt-5' >
                    <div className="container text-white">
                        <h1 className='header-content mt-5 w-75'>{title}</h1>
                        { desc !== "" ?<h4 className='mt-4 w-75'>{desc}</h4>:<></> }
                        {
                            user !== null? button !== ""?<button className='btn btn-light my-5 btn-lg rounded bg-secondary-color' onClick={handleUserNavigate}>Contact Us</button>:<></>
                            :<button className='btn btn-light my-5 btn-lg rounded bg-secondary-color' onClick={handleNavigate}>Get Started</button>
                        }
                        {/* { button !== ""?<button className='btn btn-light my-5 btn-lg rounded bg-secondary-color' onClick={handleNavigate}>Get Started</button>:<></>} */}
                    </div>
                </div>
            </div>
        </>
    )
}
