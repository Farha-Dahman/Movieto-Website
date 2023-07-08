import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { sendCodeSchema } from '../schemas/sendCode';
import{ Helmet } from 'react-helmet';

export default function SendCode() {

    let [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/');
    };
    
    let formik = useFormik({
        initialValues: {
            email: '',
        }, validationSchema: sendCodeSchema,
        onSubmit: sendData,
    })
    async function sendData(values) {
        console.log(values);
        let { data } = await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/sendCode', values);
        console.log(data.message);

        if (data.message === 'success') {
            navigate('/ForgetPassword')
        } else {
            setErrors(data.err[0]);
        }
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Movieto | Send Code Page</title>
                <meta name="description" content="Login Page" />
            </Helmet>
            <div className="container p-5 border border-dark-subtle  w-50 mt-5 background-content">
                <form className='w-100 m-auto' onSubmit={formik.handleSubmit}>
                    <h2 className='mb-5'>Enter your Email to receive code</h2>
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

                    <div className="mt-4">
                        <button type="submit" className="btn bg-secondary-color">Send Code</button>
                        <button type="cancel" className="btn text-secondary-color" onClick={handleNavigate}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}
