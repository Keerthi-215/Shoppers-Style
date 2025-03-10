import React from "react";
import ReviewList from "../components/ReviewList";
import AddReviewForm from "../components/AddReviewForm";
const Reviews = ({ productId }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Product Reviews</h1>
      {/* Add Review Form */}
      <AddReviewForm productId={productId} />
      {/* Review List */}
      <ReviewList productId={productId} />
    </div>
  );
};
export default Reviews;
