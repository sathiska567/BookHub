import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Star, ShoppingCart, TruckIcon, RefreshCcw, LockIcon, Download } from 'lucide-react';
import './page.css';
import Navbar from '../components/NavBar';
import { Tooltip } from 'antd';

const AdSinglePage = () => {
  const [quantity, setQuantity] = useState(1);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const books = location.state.book;
  const token = localStorage.getItem("token")

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fadeInAnimation = {
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.6s ease-out'
  };

  return (
    <>
      <Navbar />
      <div className="book-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="book-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '3rem',
          alignItems: 'start',
          ...fadeInAnimation
        }}>
          <div className="image-container" style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            transform: isImageHovered ? 'scale(1.02)' : 'scale(1)',
            boxShadow: isImageHovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 10px 20px rgba(0,0,0,0.05)'
          }}
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}>
            <img
              src={books.volumeInfo.imageLinks.smallThumbnail}
              alt={books.volumeInfo.title}
              style={{
                width: '100%',
                height: 'auto',
                transition: 'transform 0.5s ease',
                transform: isImageHovered ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <span style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: books.accessInfo.pdf.isAvailable ? '#4CAF50' : '#f44336',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: '500',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              animation: 'fadeIn 0.5s ease-out'
            }}>
              {books.accessInfo.pdf.isAvailable ? 'PDF Available' : 'PDF Not Available'}
            </span>
          </div>

          <div className="product-info" style={{ ...fadeInAnimation, transitionDelay: '0.2s' }}>
            <h1 style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: '#2c3e50',
              transition: 'all 0.3s ease',
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              opacity: isLoaded ? 1 : 0
            }}>
              {books.volumeInfo.title}
            </h1>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#f8f9fa',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                transition: 'all 0.3s ease'
              }}>
                <span>📗</span>
                <span>Version: {books.volumeInfo.contentVersion}</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                fontSize: '1.1rem',
                color: '#2c3e50',
                transition: 'all 0.3s ease'
              }}>
                Language: {books.volumeInfo.language === "en" ? "English" : "No mention"}
              </div>
              <div>Pages: {books.volumeInfo.pageCount}</div>
              <div>
                Authors:
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0.5rem 0'
                }}>
                  {books.volumeInfo.authors.map((author, index) => (
                    <li key={index} style={{
                      marginBottom: '0.5rem',
                      padding: '0.5rem 1rem',
                      background: '#f8f9fa',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginRight: '0.5rem',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                      onMouseOver={e => {
                        e.target.style.background = '#e9ecef';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseOut={e => {
                        e.target.style.background = '#f8f9fa';
                        e.target.style.transform = 'translateY(0)';
                      }}>
                      {author}
                    </li>
                  ))}
                </ul>
              </div>
              <div>Publisher: {books.volumeInfo.publisher}</div>
              <div>Published Date: {books.volumeInfo.publishedDate}</div>
            </div>

            <p style={{
              lineHeight: '1.6',
              color: '#495057',
              marginBottom: '2rem',
              transition: 'all 0.3s ease'
            }}>
              {books.volumeInfo.description
                ? (
                  <>
                    {books.volumeInfo.description.substring(0, 800)}...
                    <a
                      href={books.volumeInfo.previewLink}
                      target='_blank'
                      rel="noopener noreferrer"
                      style={{
                        color: '#007bff',
                        textDecoration: 'none',
                        marginLeft: '0.5rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={e => e.target.style.textDecoration = 'underline'}
                      onMouseOut={e => e.target.style.textDecoration = 'none'}
                    >
                      see more
                    </a>
                  </>
                )
                : 'No description available'}
            </p>

            <div style={{
              marginBottom: '2rem',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #dee2e6',
                  borderRadius: '25px',
                  overflow: 'hidden'
                }}>
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    style={{
                      padding: '0.5rem 1rem',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={e => e.target.style.background = '#f8f9fa'}
                    onMouseOut={e => e.target.style.background = 'transparent'}
                  >
                    -
                  </button>
                  <span style={{ padding: '0.5rem 1rem' }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={e => e.target.style.background = '#f8f9fa'}
                    onMouseOut={e => e.target.style.background = 'transparent'}
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <button style={{
                  padding: '1rem',
                  borderRadius: '25px',
                  border: 'none',
                  background: '#007bff',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <Tooltip
                  title="Please log in to Download details"
                  visible={!token} // Show tooltip only if token is absent
                >
                  <button
                    className="btn btn-primary btn-lg px-4 d-flex align-items-center gap-2"
                    style={{
                      padding: '1rem',
                      borderRadius: '25px',
                      border: 'none',
                      background: '#007bff',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: 'translateY(0)',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      fontSize:"15px"
                    }}
                    onClick={() => window.open(currentBook.previewLink, '_blank')}
                    disabled={!token}
                  >
                    <Download size={20} />
                    Download
                  </button>
                </Tooltip>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              padding: '1rem',
              background: '#f8f9fa',
              borderRadius: '12px',
              marginTop: '2rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}>
                <TruckIcon />
                <span>{books.saleInfo.saleability === "NOT_FOR_SALE" ? "Not for Sale" : "Free Delivery"}</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <RefreshCcw />
                <span>30-Day Returns</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <LockIcon />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default AdSinglePage;