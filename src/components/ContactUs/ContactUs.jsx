import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function ContactUs() {
  const navigate = useNavigate();

  const handleNavigate = () => {
      navigate('/');
  };
  return (
    <div className="background-content container mt-5 col-lg-8 align-items-center border border-dark-subtle p-5">
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
        <input type="email" className="form-control border border-dark-subtle " id="exampleFormControlInput1" placeholder="name@example.com" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Your Massage</label>
        <textarea className="form-control border border-dark-subtle " id="exampleFormControlTextarea1" rows={3} placeholder="Enter your massages here..." defaultValue={""} />
      </div>
      <div className="mt-4">
        <button type="submit" className="btn bg-secondary-color">Send</button>
        <button type="cancel" className="btn text-secondary-color" onClick={handleNavigate}>Cancel</button>
      </div>
    </div>

  )
}
