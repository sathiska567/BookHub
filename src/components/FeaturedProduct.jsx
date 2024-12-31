import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, Heart, Share2 } from 'lucide-react'; // Add Download icon
import img1 from '../assets/book.webp';
import './component.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip } from 'antd';

const FeaturedProduct = ({ bookItem = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState('next');
  const token = localStorage.getItem("token");

  // Limit to first three items
  const limitedBooks = bookItem.slice(0, 3);
  console.log(limitedBooks);


  const handleSlide = (direction) => {
    setIsSliding(true);
    setSlideDirection(direction);
    setCurrentIndex((prevIndex) =>
      direction === 'next'
        ? (prevIndex + 1) % limitedBooks.length
        : (prevIndex - 1 + limitedBooks.length) % limitedBooks.length
    );

    setTimeout(() => setIsSliding(false), 500);
  };

  useEffect(() => {
    const timer = setInterval(() => handleSlide('next'), 5000);
    return () => clearInterval(timer);
  }, [limitedBooks]);

  if (limitedBooks.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-3 display-6">Featured Product</h2>
        <p className="text-muted">No products available at the moment.</p>
      </div>
    );
  }

  const currentBook = limitedBooks[currentIndex]?.volumeInfo;

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-3 display-6"
          style={{
            background: 'linear-gradient(45deg, #2193b0, #6dd5ed)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>
          Featured Product
        </h2>
        <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
          Browse our curated selection of bestsellers and customer favorites.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10 position-relative">
          <div className="row align-items-center shadow-lg p-4 rounded bg-white"
            style={{
              transition: 'all 0.5s ease-in-out',
              transform: isSliding
                ? `scale(0.98) translateX(${slideDirection === 'next' ? '-20px' : '20px'})`
                : 'scale(1) translateX(0)',
              opacity: isSliding ? 0.8 : 1
            }}>
            <div className="col-md-5 position-relative">
              <div className="position-absolute top-0 end-0 m-3 z-1">
                <button
                  className={`btn btn-light rounded-circle p-2 me-2 ${isLiked ? 'text-danger' : ''}`}
                  onClick={() => setIsLiked(!isLiked)}
                  style={{
                    transition: 'all 0.3s ease',
                    transform: isLiked ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
                <button
                  className="btn btn-light rounded-circle p-2"
                  style={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <Share2 size={20} />
                </button>
              </div>
              <div className="book-image-container"
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}>
                <img
                  src={currentBook.imageLinks?.thumbnail || img1}
                  className="img-fluid rounded shadow-sm book-image-container-image"
                  alt={currentBook.title || 'Book Cover'}
                  style={{
                    transition: 'all 0.5s ease',
                    transform: isSliding ? 'rotateY(10deg)' : 'rotateY(0)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                  }}
                />
                <div className="position-absolute bottom-0 start-0 m-3">
                  <span className="badge bg-danger px-3 py-2"
                    style={{
                      animation: 'pulse 2s infinite'
                    }}>
                    25% OFF
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-7 ps-lg-5">
              <h1 className="display-5 fw-bold mb-3"
                style={{
                  transition: 'all 0.5s ease',
                  transform: isSliding ? 'translateY(-10px)' : 'translateY(0)'
                }}>
                {currentBook.title}
              </h1>
              <p className="text-muted mb-3">
                <strong>{currentBook.authors?.join(', ')}</strong>
              </p>
              <p className="description">
                {currentBook.description ? (
                  <>
                    {currentBook.description.substring(0, 300)}...
                    <a
                      href={currentBook.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary ms-2"
                      style={{
                        transition: 'all 0.3s ease',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      See more
                    </a>
                  </>
                ) : (
                  'No description available.'
                )}
              </p>

              <div className="d-flex gap-3">
                <Tooltip
                  title="Please log in to Download details"
                  visible={!token} // Show tooltip only if token is absent
                >
                  <button
                    className="btn btn-primary btn-lg px-4 d-flex align-items-center gap-2"
                    style={{
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(45deg, #2193b0, #6dd5ed)',
                      border: 'none',
                      transform: 'translateY(0)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    }}
                    onClick={() => window.open(currentBook.previewLink, '_blank')}
                    disabled={!token}
                  >
                    <Download size={20} /> 
                    Download
                  </button>
                  </Tooltip>

                  <Tooltip
                  title="Please log in to view details"
                  visible={!token} // Show tooltip only if token is absent
                >
                  <button
                    className="btn btn-outline-secondary btn-lg px-4"
                    style={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                      },
                    }}
                    onClick={() => window.open(currentBook.previewLink, '_blank')}
                    disabled={!token}
                  >
                    See Details
                  </button>
                  </Tooltip>
              </div>
            </div>
          </div>

          <button
            className="btn btn-light rounded-circle shadow p-3 position-absolute top-50 start-0 translate-middle-y"
            onClick={() => handleSlide('prev')}
            style={{
              transition: 'all 0.3s ease',
              opacity: 0.9,
              backdropFilter: 'blur(4px)',
              '&:hover': {
                opacity: 1,
                transform: 'translateX(-3px)'
              }
            }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="btn btn-light rounded-circle shadow p-3 position-absolute top-50 end-0 translate-middle-y"
            onClick={() => handleSlide('next')}
            style={{
              transition: 'all 0.3s ease',
              opacity: 0.9,
              backdropFilter: 'blur(4px)',
              '&:hover': {
                opacity: 1,
                transform: 'translateX(3px)'
              }
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4 gap-2">
        {limitedBooks.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="btn p-0"
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: index === currentIndex ? '#2193b0' : '#dee2e6',
              transition: 'all 0.3s ease',
              transform: index === currentIndex ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default FeaturedProduct;