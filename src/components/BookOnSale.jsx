import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import img1 from '../assets/book.webp';

const BookCarousel = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const books = [
    {
      title: 'Take Out Tango',
      rating: 4.8,
      price: 58.4,
      originalPrice: 72.9,
      discount: '20%',
      id: 1,
    },
    {
      title: 'All Good News',
      rating: 4.7,
      price: 45.4,
      originalPrice: 75.6,
      discount: '40%',
      id: 2,
    },
    {
      title: 'Seconds (PART 1)',
      rating: 4.5,
      price: 45.4,
      originalPrice: 90.8,
      discount: '50%',
      id: 3,
    },
    {
      title: 'The Misadventure of',
      rating: 4.7,
      price: 45.4,
      originalPrice: 90.8,
      discount: '50%',
      id: 4,
    },
    {
      title: 'The Misadventure of',
      rating: 4.7,
      price: 45.4,
      originalPrice: 90.8,
      discount: '50%',
      id: 5,
    },
    {
      title: 'The Misadventure of',
      rating: 5.7,
      price: 55.5,
      originalPrice: 90.8,
      discount: '50%',
      id: 6
    },
    {
      title: 'The Misadventure of',
      rating: 5.7,
      price: 55.5,
      originalPrice: 90.8,
      discount: '50%',
      id: 7,
    },
  ];

  const booksPerPage = 4;
  const totalPages = Math.ceil(books.length / booksPerPage);
  const start = currentPage * booksPerPage;
  const visibleBooks = books.slice(start, start + booksPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Books on Sale</h2>
        <div className="dots">
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              className={`dot mx-1 ${i === currentPage ? 'text-warning' : 'text-muted'}`}
              style={{ cursor: 'pointer', fontSize: '24px' }}
              onClick={() => setCurrentPage(i)}
            >
              •
            </span>
          ))}
        </div>
      </div>

      <div className="position-relative">
        <button
          className="btn btn-light position-absolute top-50 start-0 translate-middle-y z-1"
          onClick={prevPage}
          style={{ transform: 'translateX(-50%)' }}
        >
          ❮
        </button>

        <div className="row">
          {visibleBooks.map((book) => (
            <div key={book.id} className="col-md-3">
              <div className="card border-0 h-100">
                <div className="position-relative">
                  <img
                    src={img1}
                    className="card-img-top rounded"
                    alt={book.title}
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <span className="position-absolute top-0 start-0 bg-warning text-dark px-2 m-2 rounded">
                    {book.discount}
                  </span>
                </div>
                <div className="card-body px-0">
                  <h6 className="card-title">{book.title}</h6>
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-warning me-1">⭐</span>
                    <span>{book.rating}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="text-primary fw-bold">${book.price}</span>
                    <span className="text-muted text-decoration-line-through ms-2">
                      ${book.originalPrice}
                    </span>
                  </div>
                </div>
                <Link to={`/book/${book.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn btn-light position-absolute top-50 end-0 translate-middle-y z-1"
          onClick={nextPage}
          style={{ transform: 'translateX(50%)' }}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default BookCarousel;
