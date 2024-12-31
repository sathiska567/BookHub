import React from 'react';
import img from '../assets/book.webp'

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: 'SECONDS',
      subtitle: 'Part 1',
      image: img,
      price: 18.78,
      originalPrice: 25,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 2,
      title: 'TERRIBLE MADNESS',
      subtitle: 'Dark Time',
      image: img,
      price: 18.78,
      originalPrice: 25,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 3,
      title: 'REWORK',
      subtitle: 'Magnetic Home',
      image: img,
      price: 18.78,
      originalPrice: 25,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    }
  ];

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-2xl font-bold">Special Offers</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {offers.map((offer) => (
          <div key={offer.id} className="col">
            <div className="card h-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img
                src={offer.image}
                className="card-img-top"
                alt={offer.title}
              />
              <div className="card-body">
                <h5 className="card-title font-bold text-xl">{offer.title}</h5>
                <p className="text-gray-600 mb-2">{offer.subtitle}</p>
                <p className="card-text mb-3">{offer.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="price-container">
                    <span className="text-xl font-bold">${offer.price}</span>
                    <span className="text-gray-500 text-sm line-through ml-2">
                      ${offer.originalPrice}
                    </span>
                  </div>
                  <button className="btn btn-warning px-4">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;