import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Book, FileText } from 'lucide-react';

const BookCarousel = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [books, setBookItem] = useState([]);
  const [isSliding, setIsSliding] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    setBookItem(props.bookItem);
  }, [props.bookItem]);

  const booksPerPage = 4;
  const totalPages = Math.ceil(books.length / booksPerPage);
  const start = currentPage * booksPerPage;
  const visibleBooks = books.slice(start, start + booksPerPage);

  const handlePageChange = (direction) => {
    setIsSliding(true);
    if (direction === 'next') {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    } else {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    }
    setTimeout(() => setIsSliding(false), 500);
  };

  const handleOnClick = async(book) => {
    try {
      navigate('/book', {state:{book:book}});
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 
          className="fw-bold"
          style={{
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontSize: '2.5rem'
          }}
        >
          Books on Sale
        </h2>
        <div className="dots d-flex align-items-center gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className="btn p-0"
              onClick={() => setCurrentPage(i)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: i === currentPage ? '#4ECDC4' : '#e9ecef',
                transition: 'all 0.3s ease',
                transform: i === currentPage ? 'scale(1.3)' : 'scale(1)',
                border: 'none'
              }}
            />
          ))}
        </div>
      </div>

      <div className="position-relative">
        <button
          className="btn btn-light rounded-circle shadow-sm position-absolute top-50 start-0 translate-middle-y z-1 p-3"
          onClick={() => handlePageChange('prev')}
          style={{
            transform: `translateX(-50%) ${isSliding ? 'scale(0.95)' : 'scale(1)'}`,
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <div 
          className="row g-4"
          style={{
            transition: 'all 0.5s ease',
            transform: isSliding ? 'scale(0.98)' : 'scale(1)',
            opacity: isSliding ? 0.8 : 1
          }}
        >
          {visibleBooks.map((book, index) => (
            <div key={book.id} className="col-md-3">
              <div 
                className="card border-0 h-100 shadow-sm"
                style={{
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === index ? 'translateY(-10px)' : 'translateY(0)',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleOnClick(book)}
              >
                <div className="position-relative">
                  <img
                    src={book.volumeInfo?.imageLinks?.thumbnail}
                    className="card-img-top rounded-top"
                    alt={book.title}
                    style={{ 
                      height: '300px',
                      objectFit: 'cover',
                      transition: 'all 0.3s ease',
                      filter: hoveredCard === index ? 'brightness(1.1)' : 'brightness(1)'
                    }}
                  />
                  <div 
                    className="position-absolute top-0 start-0 m-2 px-2 py-1 rounded"
                    style={{
                      background: 'linear-gradient(45deg, #FF6B6B, #FFE66D)',
                      animation: 'pulse 2s infinite'
                    }}
                  >
                    <span className="text-white fw-bold">{book.discount}</span>
                  </div>
                  <div 
                    className={`position-absolute bottom-0 start-0 m-2 px-2 py-1 rounded d-flex align-items-center gap-1 ${
                      book.accessInfo.pdf.isAvailable ? 'bg-success' : 'bg-danger'
                    }`}
                  >
                    <FileText size={16} className="text-white" />
                    <span className="text-white" style={{ fontSize: '12px' }}>
                      {book.accessInfo.pdf.isAvailable ? 'PDF Available' : 'No PDF'}
                    </span>
                  </div>
                </div>

                <div className="card-body">
                  <h5 className="card-title fw-bold mb-3" style={{ fontSize: '1.1rem' }}>
                    {book.volumeInfo.title}
                  </h5>
                  
                  <div className="d-flex align-items-center mb-2 text-muted">
                    <Book size={16} className="me-2" />
                    <span>{book.volumeInfo.pageCount} pages</span>
                  </div>

                  <div className="mb-2">
                    <span className={`badge ${
                      book.saleInfo.saleability !== "NOT_FOR_SALE" 
                        ? 'bg-success' 
                        : 'bg-secondary'
                    }`}>
                      {book.saleInfo.saleability === "NOT_FOR_SALE" ? "Not For Sale" : 'Available'}
                    </span>
                  </div>

                  <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                    {book.volumeInfo.description?.substring(0, 100)}...
                  </p>
                </div>

                <div className="card-footer bg-transparent border-0 pb-3">
                  <button 
                    className="btn btn-primary w-100"
                    style={{
                      background: 'linear-gradient(45deg, #4ECDC4, #556270)',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      transform: hoveredCard === index ? 'translateY(0)' : 'translateY(0)',
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn btn-light rounded-circle shadow-sm position-absolute top-50 end-0 translate-middle-y z-1 p-3"
          onClick={() => handlePageChange('next')}
          style={{
            transform: `translateX(50%) ${isSliding ? 'scale(0.95)' : 'scale(1)'}`,
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <ChevronRight size={24} />
        </button>
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

export default BookCarousel;