import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../schemas/login';
import{ Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import style from './Login.module.css';
import { UserContext } from '../Contexts/UserContext';
import { useContext } from 'react';

export default function Login() {

    const {getUser} = useContext(UserContext);

    let [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    };
    
    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        }, validationSchema: loginSchema,
        onSubmit: sendData,
    })
    async function sendData(values) {
        let { data } = await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin', values);
        if (data.message === 'success') {
            localStorage.setItem("userToken", data.token);
            getUser();
            navigate('/')
        } else {
            setErrors(data.err[0]);
        }
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Movieto | Login Page</title>
                <meta name="description" content="Login Page" />
            </Helmet>
            <div className="container p-5 border border-dark-subtle  w-50 mt-5 background-content">
                <form className='w-100 m-auto' onSubmit={formik.handleSubmit}>
                    <h2 className='mb-5'>Enter to your account</h2>
                    {
                        errors.map((error) => {
                            return <div className='alert alert-danger'>{error.message}</div>
                        })
                    }
                    <div className='mb-3'>
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" id="exampleInputEmail1" aria-describedby="emailHelp" 
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='email'
                            className={`form-control border border-dark-subtle ${formik.errors.email && formik.touched.email ? "is-invalid" : ""}`}
                        />
                        {formik.errors.email && formik.touched.email ? <p className='text-danger mb-4 mt-0'>{formik.errors.email}</p> : <></>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" id="exampleInputPassword1"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='password'
                            className={`form-control border border-dark-subtle ${formik.errors.password && formik.touched.password ? "is-invalid" : ""}`}
                        />
                        <div><Link className={`${style.forgetPss}`} to='SendCode'>Forget Password?</Link></div>
                        {formik.errors.password && formik.touched.password ? <p className='text-danger mb-4 mt-0'>{formik.errors.password}</p> : <></>}
                    </div>
                    <div className="mt-4">
                        <button type="submit" className="btn bg-secondary-color">Login</button>
                        <button type="cancel" className="btn text-secondary-color" onClick={handleNavigate}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}
