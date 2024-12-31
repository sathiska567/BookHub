import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import './page.css';
import Navbar from '../components/NavBar';
import img from '../assets/book.webp'

const AdSinglePage = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [quantity, setQuantity] = useState(1); // Added quantity state

  const books = [
    {
      title: 'Take Out Tango',
      rating: 4.8,
      price: 58.4,
      originalPrice: 72.9,
      discount: '20%',
      description: 'A thrilling dance-off between two rivals...',
      id: 1,
    },
    {
      title: 'Take Out Tango',
      rating: 4.8,
      price: 58.4,
      originalPrice: 72.9,
      discount: '20%',
      description: 'A thrilling dance-off between two rivals...',
      id: 2,
    },
  ];

  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return <div className="not-found">Book not found</div>;
  }

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log({ rating, comment });
  };

  return (
    <>
      <Navbar />
      <div className="book-container">
        <div className="book-grid">
          <div className="image-container">
            <img src={img} alt={book.title} className="book-image" />
            <span className="discount-badge">{book.discount}</span>
          </div>

          <div className="product-info">
            <h1 className="book-title">{book.title}</h1>

            <div className="rating-reviews">
              <div className="rating">
                <span className="star">⭐</span>
                <span>{book.rating}</span>
              </div>
              <span className="review-count">(150 Reviews)</span>
            </div>

            <div className="price-section">
              <div className="price">
                <span className="current-price">${book.price}</span>
                <span className="original-price">${book.originalPrice}</span>
              </div>
              <span className="savings">You save: ${(book.originalPrice - book.price).toFixed(2)}</span>
            </div>

            <p className="description">{book.description}</p>

            <div className="purchase-options">
              <div className="quantity-selector">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <div className='row'>
                <div className="col-6">
                     <button className="add-to-cart">
                        <span className="cart-icon">🛒</span>
                           Add to Cart - ${(book.price * quantity).toFixed(2)}
                     </button>
                </div>
                <div className="col-6">
                  <button className="buy-now">Buy Now</button>
                </div>

              </div>
            </div>

            <div className="additional-info">
              <div className="info-item">
                <span className="info-icon">🚚</span>
                <span>Free Delivery</span>
              </div>
              <div className="info-item">
                <span className="info-icon">↩️</span>
                <span>30-Day Returns</span>
              </div>
              <div className="info-item">
                <span className="info-icon">🔒</span>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>

        <div className="review-section">
        <h5 className="review-title">Customer Feedback</h5>

          <form onSubmit={handleSubmitReview} className="review-form">
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(0)}
                  className="star-button"
                >
                  <Star
                    size={20}
                    className={`star-icon ${
                      index <= (hover || rating) ? 'active' : ''
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this book..."
              className="comment-box"
            />

            <button type="submit" className="submit-button">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdSinglePage;
