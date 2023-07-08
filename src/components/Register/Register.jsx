import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react';
import { regSchema } from '../schemas/register.jsx'
import { useNavigate } from 'react-router-dom';
import{ Helmet } from 'react-helmet';

export default function Register() {

    let [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    };
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            cPassword: '',
        }, validationSchema: regSchema,
        onSubmit: sendData,
    })

    async function sendData(values) {
        let { data } = await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup', values);
        if (data.message === 'success') {
            setErrors([]);
            navigate('/Login');
        } else {
            setErrors(data.err[0]);
        }
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Movieto | Register Page</title>
                <meta name="description" content="Register Page" />
            </Helmet>
            <div className="container p-5 border border-dark-subtle w-50 mt-5 background-content">
                <form className='w-100 m-auto' onSubmit={formik.handleSubmit}>
                    <h2 className='mb-5'>Register Now!</h2>
                    {
                        errors.map((error) => {
                            return <div className='alert alert-danger'>{error.message}</div>
                        })
                    }
                    <div className='mb-3'>
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" id="exampleInputName"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='name'
                            className={`form-control border border-dark-subtle ${formik.errors.name && formik.touched.name ? "is-invalid" : ""}`}
                        />
                        {formik.errors.name && formik.touched.name ? <p className='text-danger mb-4 mt-0'>{formik.errors.name}</p> : <></>}
                    </div>

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
                        {formik.errors.password && formik.touched.password ? <p className='text-danger mb-4 mt-0'>{formik.errors.password}</p> : <></>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="exampleInputPassword2" className="form-label">Re-type your Password</label>
                        <input type="password" id="exampleInputPassword2"
                            value={formik.values.cPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='cPassword'
                            className={`form-control border border-dark-subtle ${formik.errors.cPassword && formik.touched.cPassword ? "is-invalid" : ""}`}
                        />
                        {formik.errors.cPassword && formik.touched.cPassword ? <p className='text-danger mb-4 mt-0'>{formik.errors.cPassword}</p> : <></>}
                    </div>
                    <div className="mt-4">
                        <button type="submit" className="btn bg-secondary-color">Sign up</button>
                        <button type="cancel" className="btn text-secondary-color" onClick={handleNavigate}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}
