import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function ProductDetail({ product }) {
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate("/")
  }

  // Since we are using reviews only in one component it didn't make sense to implement state management, but that would be definitely the correct
  // scalable approach in case we'd want to display ratings on Product Cards for example 
  useEffect(() => {
    fetch(`http://localhost:5000/api/reviews/${product.id}`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error('Error fetching reviews:', error))
  }, [product.id]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return 0
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    return totalRating / reviews.length
  };

  const averageRating = calculateAverageRating()

  // Put together 3 types of stars for a total of 5 stars based on ratings 
  function ratingStars(rating, starSize = "text-lg") {
    const stars = []
    let fullStars = Math.floor(rating)
    let halfStar = false

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <i
            key={i}
            className={`fa fa-star text-yellow-500 ${starSize}`}
          />
        );
      } else if (!halfStar && rating % 1 !== 0) {
        stars.push(
          <i
            key={i}
            className={`fa fa-star-half-o text-yellow-500 ${starSize}`}
          />
        );
        halfStar = true;
      } else {
        stars.push(
          <i
            key={i}
            className={`fa fa-star-o text-gray-500 ${starSize}`}
          />
        );
      }
    }

    return stars
  }

  return (
    <div className="bg-white p-4 w-full lg:flex lg:space-x-8 xl:space-x-16 min-h-screen">
      {/* Product name and image */}
      <div>
        <div className='flex justify-end lg:hidden mb-2 xs:mb-0'>
          <Button
            className="bg-slate-700 text-white font-semibold"
            text="Go Back"
            onClick={handleButtonClick}
          />
        </div>
        <h1 className="text-2xl font-bold">{product.productName}</h1>
        <div className="mt-4 flex justify-center md:justify-start overflow-hidden">
          <img src={product.image} alt={product.productName} className="h-full max-w-sm" />
        </div>
      </div>
      {/* Product description, price and reviews */}
      <div className='lg:mt-8'>
        <p className="mt-4 md:text-xl">{product.description}</p>
        <p className="mt-2 text-red-600 text-xl md:text-3xl font-semibold">${product.price.toFixed(2)}</p>
        <div className='mt-2 lg:mt-8 lg:pr-4 lg:space-y-5'>
          <div className='flex justify-between items-end'>
            <p className='font-semibold mb-1 md:text-2xl'>Reviews</p>
            <div className='flex items-center'>
              <p className="mt-2 text-yellow-400 space-x-0.5">
                {ratingStars(averageRating, "text-2xl md:text-3xl")}
              </p>
              <p className='mt-2 ml-2 font-semibold md:text-xl'>{reviews.length} total</p>
            </div>
          </div>
          <div className='flex flex-col mt-1'>
            {reviews.map((review) => (
              <div key={review.reviewId} className='flex flex-row space-x-3 mb-1'>
                <div className='flex-shrink-0 space-x-0.5'>
                  {ratingStars(review.rating)}
                </div>
                <div className='md:text-xl'>
                  {review.comment}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;
