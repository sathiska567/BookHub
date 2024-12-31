import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Share2 } from 'lucide-react';
import img1 from '../assets/book.webp';
import './component.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const FeaturedProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const products = [
    {
      title: 'A Heavy Lift',
      author: 'Napoleon Hill',
      category: 'Business & Strategy',
      price: 9.5,
      originalPrice: 12.99,
      image: img1,
      description: 'Discover the secrets to mastering success and achieving your goals.',
      rating: 4.8,
      reviews: 128
    },
    {
      title: 'Pushing Clouds',
      author: 'Sarah Smith',
      category: 'Self Development',
      price: 8.5,
      originalPrice: 11.99,
      image: img1,
      description: 'Unlock the potential within you and rise above challenges.',
      rating: 4.6,
      reviews: 96
    }
  ];

  const handleSlide = (direction) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => 
        direction === 'next' 
          ? (prev + 1) % products.length 
          : (prev - 1 + products.length) % products.length
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => handleSlide('next'), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-3 display-6">Featured Product</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
          Browse our curated selection of bestsellers and customer favorites.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10 position-relative">
          <div 
            className="row align-items-center shadow-lg p-4 rounded bg-white"
            style={{
              transition: 'all 0.5s ease-in-out',
              opacity: isTransitioning ? 0.5 : 1,
              transform: isTransitioning ? 'scale(0.98)' : 'scale(1)'
            }}
          >
            <div className="col-md-5 position-relative">
              <div className="position-absolute top-0 end-0 m-3 z-1">
                <button 
                  className={`btn btn-light rounded-circle p-2 me-2 ${isLiked ? 'text-danger' : ''}`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
                <button className="btn btn-light rounded-circle p-2">
                  <Share2 size={20} />
                </button>
              </div>
              <div className="book-image-container">
                <img
                  src={products[currentIndex].image}
                  className="img-fluid rounded shadow-sm book-image-container-image"
                  alt={products[currentIndex].title}
                  style={{ 
                    transition: 'all 0.3s ease',
                    transform: isTransitioning ? 'translateX(10px)' : 'translateX(0)'
                  }}
                />
                <div className="position-absolute bottom-0 start-0 m-3">
                  <span className="badge bg-danger px-3 py-2">25% OFF</span>
                </div>
              </div>
            </div>

            <div className="col-md-7 ps-lg-5">
              <div className="d-flex align-items-center mb-3">
                <div className="badge bg-primary text-white py-2 px-3">
                  BEST SELLER
                </div>
                <div className="ms-3">
                  <span className="text-warning">{'★'.repeat(Math.floor(products[currentIndex].rating))}</span>
                  <span className="text-muted">{'★'.repeat(5 - Math.floor(products[currentIndex].rating))}</span>
                  <span className="ms-2 text-muted">({products[currentIndex].reviews} reviews)</span>
                </div>
              </div>

              <h1 className="display-5 fw-bold mb-3">{products[currentIndex].title}</h1>
              <p className="text-muted mb-3">
                <span className="fw-semibold">{products[currentIndex].author}</span> • {products[currentIndex].category}
              </p>
              <p className="lead mb-4">{products[currentIndex].description}</p>

              <div className="d-flex align-items-center mb-4">
                <h3 className="fw-bold mb-0">${products[currentIndex].price}</h3>
                <span className="text-muted ms-2 text-decoration-line-through">
                  ${products[currentIndex].originalPrice}
                </span>
              </div>

              <div className="d-flex gap-3">
                <button 
                  className="btn btn-primary btn-lg px-4 d-flex align-items-center gap-2 shadow-sm"
                  style={{ transition: 'all 0.2s ease' }}
                  onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={e => e.target.style.transform = 'translateY(0)'}
                >
                  <ShoppingCart size={20} />
                  Buy Now
                </button>
                <button 
                  className="btn btn-outline-secondary btn-lg px-4 shadow-sm"
                  style={{ transition: 'all 0.2s ease' }}
                  onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={e => e.target.style.transform = 'translateY(0)'}
                >
                  See Details
                </button>
              </div>
            </div>
          </div>

          <button 
            className="btn btn-light rounded-circle shadow p-3 position-absolute top-50 start-0 translate-middle-y"
            onClick={() => handleSlide('prev')}
            style={{ 
              transition: 'all 0.2s ease',
              transform: `translateX(${isTransitioning ? '-5px' : '0'})`,
              opacity: 0.9,
              backdropFilter: 'blur(4px)'
            }}
            onMouseOver={e => e.target.style.opacity = '1'}
            onMouseOut={e => e.target.style.opacity = '0.9'}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="btn btn-light rounded-circle shadow p-3 position-absolute top-50 end-0 translate-middle-y"
            onClick={() => handleSlide('next')}
            style={{ 
              transition: 'all 0.2s ease',
              transform: `translateX(${isTransitioning ? '5px' : '0'})`,
              opacity: 0.9,
              backdropFilter: 'blur(4px)'
            }}
            onMouseOver={e => e.target.style.opacity = '1'}
            onMouseOut={e => e.target.style.opacity = '0.9'}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4 gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="btn p-0"
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: index === currentIndex ? '#0d6efd' : '#dee2e6',
              transition: 'all 0.3s ease',
              transform: index === currentIndex ? 'scale(1.5)' : 'scale(1)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;