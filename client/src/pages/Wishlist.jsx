import { useState, useEffect } from "react";

function Wishlist({ api }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    api
      .get("/wishlist")
      .then((res) => setWishlist(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div key={item._id} className="border p-4 rounded-lg shadow">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="mt-2 font-semibold">{item.name}</h2>
            <p className="text-gray-600">${item.price}</p>
            <button
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => console.log("Remove from wishlist")}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
