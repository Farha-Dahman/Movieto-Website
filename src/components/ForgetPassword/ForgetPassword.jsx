import React, { useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { forgetPasswordSchema } from '../schemas/forgetPassword';
import { Helmet } from 'react-helmet';

export default function SendCode() {

    let [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/');
    };

    let formik = useFormik({
        initialValues: {
            email: '',
            code: '',
            newPassword: '',
        }, validationSchema: forgetPasswordSchema,
        onSubmit: sendData,
    })
    async function sendData(values) {
        console.log(values);
        let { data } = await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/forgetPassword', values);
        console.log(data.message);

        if (data.message === 'success') {
            console.log("updated");
            navigate('/Login')
        } else {
            setErrors(data.err[0]);
        }
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Movieto | change Password</title>
                <meta name="description" content="change Password Page" />
            </Helmet>
            <div className="container p-5 border border-dark-subtle  w-50 mt-5 background-content">
                <form className='w-100 m-auto' onSubmit={formik.handleSubmit}>
                    <h2 className='mb-5'>Change your password now!</h2>
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
                        <label htmlFor="exampleInputName" className="form-label">Code</label>
                        <input type="text" id="exampleInputName"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='code'
                            className={`form-control border border-dark-subtle ${formik.errors.code && formik.touched.code ? "is-invalid" : ""}`}
                        />
                        {formik.errors.code && formik.touched.code ? <p className='text-danger mb-4 mt-0'>{formik.errors.code}</p> : <></>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                        <input type="password" id="exampleInputPassword1"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='newPassword'
                            className={`form-control border border-dark-subtle ${formik.errors.newPassword && formik.touched.newPassword ? "is-invalid" : ""}`}
                        />
                        {formik.errors.newPassword && formik.touched.newPassword ? <p className='text-danger mb-4 mt-0'>{formik.errors.newPassword}</p> : <></>}
                    </div>

                    <div className="mt-4">
                        <button type="submit" className="btn bg-secondary-color">Change</button>
                        <button type="cancel" className="btn text-secondary-color" onClick={handleNavigate}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}
