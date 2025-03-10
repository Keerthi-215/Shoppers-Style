import React from "react";
import { useReviews } from "../components/ReviewContext";
const ReviewList = ({ productId }) => {
  const { reviews, loading } = useReviews();
  // Filter reviews by productId (assuming each review has a productId)
  const productReviews = reviews.filter(
    (review) => review.productId === productId
  );
  if (loading) {
    return <p>Loading reviews...</p>;
  }
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      {productReviews.length === 0 ? (
        <p>No reviews yet for this product.</p>
      ) : (
        <ul>
          {productReviews.map((review, index) => (
            <li key={index} className="mb-4 border-b pb-4">
              <div className="font-bold">{review.userName}</div>
              <div className="text-gray-600">{review.comment}</div>
              <div className="text-yellow-500">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ReviewList;
