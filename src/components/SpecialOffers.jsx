import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../assets/book.webp'
import img1 from '../assets/book2.jpg'
import img2 from '../assets/book3.webp'
import { Tooltip } from 'antd';

const SpecialOffers = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const token = localStorage.getItem('token');

  const offers = [
    {
      id: 1,
      title: 'Walk Into The Shadow',
      subtitle: 'Part 1',
      image: img,
      price: 200,
      originalPrice: 250,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      badge: 'Bestseller'
    },
    {
      id: 2,
      title: 'Soul',
      subtitle: 'Dark Time',
      image: img1,
      price: 300,
      originalPrice: 350,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      badge: 'New Release'
    },
    {
      id: 3,
      title: 'Hide And Seek',
      subtitle: 'Magnetic Home',
      image: img2,
      price: 400,
      originalPrice: 450,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      badge: 'Limited Edition'
    }
  ];

  const calculateDiscount = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="bg-light py-5">
      <div className="container">
        {/* Header Section */}
        <div className="row mb-5">
          <div className="col-md-8">
            <h2 className="display-6 fw-bold mb-3">Special Offers</h2>
            <p className="text-muted lead">Discover our curated selection of must-read books at unbeatable prices</p>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-md-end">
            <button className="btn btn-outline-primary">View All Books</button>
          </div>
        </div>

        {/* Books Grid */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {offers.map((offer) => (
            <div key={offer.id} className="col">
              <div
                className={`card h-100 border-0 shadow-sm ${hoveredId === offer.id ? 'shadow-lg' : ''}`}
                onMouseEnter={() => setHoveredId(offer.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ transition: 'all 0.3s ease' }}
              >
                {/* Image Container */}
                <div className="position-relative">
                  <img
                    src={offer.image}
                    className="card-img-top"
                    alt={offer.title}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <span className="position-absolute top-0 start-0 m-3 badge bg-primary">
                    {offer.badge}
                  </span>
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-danger">
                      -{calculateDiscount(offer.originalPrice, offer.price)}%
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body">
                  <h5 className="card-title fw-bold mb-1">{offer.title}</h5>
                  <p className="text-muted small mb-2">{offer.subtitle}</p>
                  <p className="card-text text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                    {offer.description}
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="price-container">
                      <span className="fs-4 fw-bold text-primary me-2">
                        ${offer.price}
                      </span>
                      <span className="text-muted text-decoration-line-through">
                        ${offer.originalPrice}
                      </span>
                    </div>
                    <div className="d-flex gap-2">
                      <Tooltip
                        title="Please log in to the System"
                        visible={!token} // Show tooltip only if token is absent
                      >
                        <button
                          className="btn btn-primary"
                          disabled={!token}
                        >
                          Add to Cart
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                {hoveredId === offer.id && (
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-10"
                    style={{ transition: 'all 0.3s ease' }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="d-md-none text-center mt-4">
          <button className="btn btn-outline-primary">View All Books</button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;