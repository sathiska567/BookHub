import React, { useState, useEffect, useRef } from 'react';
import img from '../assets/book.webp'

const ImagePreviewSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const books = [
    { title: 'Take Out Tango', discount: '20%' },
    { title: 'All Good News', discount: '40%' },
    { title: 'Seconds (PART 1)', discount: '50%' },
    { title: 'The Misadventure of', discount: '50%' },
    { title: 'Terrible Madness', discount: '20%' },
    { title: 'Battle Drive', discount: '50%' },
    { title: 'Battle Drive', discount: '50%' },
    { title: 'Battle Drive', discount: '50%' },
    { title: 'Battle Drive', discount: '50%' },
    { title: 'Adventure Awaits', discount: '30%' },
    { title: 'The Journey Begins', discount: '25%' },
  ];

  const booksPerPage = 10;
  const totalPages = Math.ceil(books.length / booksPerPage);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    
    const animate = () => {
      setScrollPosition(prev => {
        const newPosition = prev + 1;
        return newPosition > scrollWidth ? 0 : newPosition;
      });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="container py-5">
      <div className="position-relative">
        <div 
          ref={scrollContainerRef}
          className="d-flex"
          style={{ 
            overflowX: 'hidden',
            scrollBehavior: 'smooth'
          }}
        >
          {[...books, ...books].map((book, index) => (
            <div 
              key={index} 
              className="me-3 flex-shrink-0"
            >
              <img
                src={img}
                alt={book.title}
                style={{
                  height: '200px',
                  width: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewSection;