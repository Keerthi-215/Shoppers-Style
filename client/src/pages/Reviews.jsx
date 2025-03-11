import React from "react";
import ReviewList from "../components/ReviewList";
import AddReviewForm from "../components/AddReviewForm";

const Reviews = ({ productId }) => {
  return (
    <div className="container mx-auto p-6">
      {/* Heading for the Review Form */}
      <h1 className="text-3xl font-bold mb-6">Ratings</h1>
      {/* Add Review Form */}
      <AddReviewForm productId={productId} />

      {/* Review List (Customer Reviews heading will be inside ReviewList.jsx) */}
      <ReviewList productId={productId} />
    </div>
  );
};

export default Reviews;
