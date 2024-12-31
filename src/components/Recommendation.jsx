import React from 'react'
import Navbar from './NavBar'
import './component.css'
import img from '../assets/book.webp'

export default function Recommendation({ bookItem = [] }) {

  console.log(bookItem[0]);
  

  return (
    <div className="bg-dark text-white main-section">
      <Navbar />
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <span className="text-uppercase">Editor's Pick</span>
            <h1 className="display-4 fw-bold mt-2">The Alchemist</h1>
            <p className="mb-4">Paulo Coelho | Adventure & Philosophy</p>
            <p>
              Embark on a transformative journey of self-discovery with Santiago, a young shepherd, as he pursues his personal legend and learns life's most profound truths.
            </p>


            <div className="d-flex align-items-center gap-3 mb-4">
              <h2 className="mb-0">$9.5</h2>
              <span className="text-decoration-line-through text-white">$12.0</span>
              <span className="badge bg-danger">20% OFF</span>
            </div>

            <div className="d-flex gap-3">
              <button className="btn btn-primary px-4">Preview Now</button>
              <button className="btn btn-outline-light px-4">See Details</button>
            </div>

            <div className="mt-5">
              <p className="text-muted mb-3">Our partner</p>
              <div className="d-flex gap-4 align-items-center">
                <span className="text-light">Highlow</span>
                <span className="text-light">Emajine</span>
                <span className="text-light">GlowUP</span>
              </div>
            </div>
          </div>

          <div className="col-lg-6 position-relative">
            <div
              className="position-absolute top-50 end-0 translate-middle-y shadow-lg rounded"
              style={{ width: '250px', backgroundColor: '#2c2c54', borderRadius: '12px' }}
            >
              <div className="card bg-dark text-white border-0">
                <div className="card-body p-3">
                  <div className="d-flex gap-3 align-items-start">
                    <img
                      src={img}
                      alt="Book cover"
                      className="rounded"
                      style={{ width: '60px', height: '90px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-1 fw-bold text-light">Think and Grow Rich</h6>
                      <small className="text-muted">by Napoleon Hill</small>
                      <div className="text-warning mt-2" style={{ fontSize: '0.9rem' }}>
                        ⭐⭐⭐⭐⭐
                      </div>
                      <span className="text-primary fw-bold mt-2 d-block" style={{ fontSize: '1rem' }}>
                        $9.5
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
