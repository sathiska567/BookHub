import React, { useState, useEffect, useRef } from 'react';
import { Book, Star } from 'lucide-react';

const ImagePreviewSection = (props) => {
  const [books, setBookItem] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setBookItem(props.bookItem);
  }, [props.bookItem]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth - container.clientWidth;

    const animate = () => {
      if (!isPaused) {
        setScrollPosition(prev => {
          const newPosition = prev + 0.5;
          return newPosition > scrollWidth ? 0 : newPosition;
        });
      }
    };

    const interval = setInterval(animate, 30);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const duplicatedBooks = [...books, ...books];

  return (
    <div className="py-5" style={{ background: 'linear-gradient(to right, #f8f9fa, #e9ecef, #f8f9fa)' }}>
      <div className="container">

        <div 
          className="position-relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={scrollContainerRef}
            className="d-flex gap-4 py-4"
            style={{
              overflowX: 'hidden',
              scrollBehavior: 'smooth'
            }}
          >
            {duplicatedBooks.map((book, index) => (
              <div
                key={index}
                className="flex-shrink-0 position-relative"
                style={{
                  transition: 'all 0.3s ease',
                  transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="position-relative">
                  <img
                    src={book.volumeInfo.imageLinks?.smallThumbnail}
                    alt={book.volumeInfo.title}
                    style={{
                      height: '200px',
                      width: '150px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: hoveredIndex === index 
                        ? '0 10px 20px rgba(0,0,0,0.2)' 
                        : '0 5px 15px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  
                  {/* Hover Overlay */}
                  {hoveredIndex === index && (
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <h6 className="text-white mb-2" style={{ fontSize: '0.9rem' }}>
                        {book.volumeInfo.title}
                      </h6>
                      <div className="d-flex align-items-center gap-2">
                        <Book size={14} className="text-white" />
                        <span className="text-white" style={{ fontSize: '0.8rem' }}>
                          {book.volumeInfo.pageCount} pages
                        </span>
                      </div>
                      {book.volumeInfo.averageRating && (
                        <div className="d-flex align-items-center gap-1 mt-1">
                          <Star size={14} className="text-warning" fill="currentColor" />
                          <span className="text-white" style={{ fontSize: '0.8rem' }}>
                            {book.volumeInfo.averageRating}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Discount Badge */}
                  {book.saleInfo?.listPrice && (
                    <div
                      className="position-absolute top-0 start-0 m-2 px-2 py-1 rounded"
                      style={{
                        background: 'linear-gradient(45deg, #FF6B6B, #FFE66D)',
                        animation: hoveredIndex === index ? 'pulse 1s infinite' : 'none'
                      }}
                    >
                      <span className="text-white fw-bold" style={{ fontSize: '0.8rem' }}>
                        25% OFF
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div
            className="position-absolute top-0 start-0 h-100"
            style={{
              width: '100px',
              background: 'linear-gradient(to right, #f8f9fa, transparent)',
              pointerEvents: 'none'
            }}
          />
          <div
            className="position-absolute top-0 end-0 h-100"
            style={{
              width: '100px',
              background: 'linear-gradient(to left, #f8f9fa, transparent)',
              pointerEvents: 'none'
            }}
          />
        </div>
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

export default ImagePreviewSection;