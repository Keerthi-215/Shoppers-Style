import React, { useState } from "react";
import { useReviews } from "../components/ReviewContext";

const AddReviewForm = ({ productId }) => {
  const { addReview } = useReviews();
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(1); // Default rating is 1
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !comment) {
      alert("Please fill in all fields.");
      return;
    }

    const newReview = {
      productId,
      userName,
      rating,
      comment,
    };
    addReview(newReview);

    // Reset form after submission
    setUserName("");
    setRating(1); // Reset rating to 1 after submission
    setComment("");
  };

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer ${
            i <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 border">
      <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
      <div className="mb-4">
        <label htmlFor="userName" className="block text-gray-700">
          Your Name:
        </label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 border"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700">
          Rating:
        </label>
        <div className="flex mb-4">
          {/* Render stars for rating */}
          {renderStars()}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-700">
          Your Review:
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full p-2 border"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Submit Review
      </button>
    </form>
  );
};

export default AddReviewForm;
