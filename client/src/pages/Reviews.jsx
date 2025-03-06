import { useState, useEffect } from "react";

function Reviews({ api }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api
      .get("/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Reviews</h1>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="border p-4 rounded-lg shadow">
            <h2 className="font-semibold">{review.user}</h2>
            <p className="text-gray-600">{review.comment}</p>
            <p className="text-yellow-500">Rating: {review.rating}/5</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
