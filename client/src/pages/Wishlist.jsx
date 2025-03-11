import { useWishlist } from "../components/WishlistContext"; // Correct path
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty. Add some items!</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id} // Use _id for the key to ensure uniqueness
              className="border p-4 rounded-md shadow-md"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-112 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
              <div className="mt-4 flex justify-between">
                <Link
                  to={`/product/${product._id}`} // Corrected to use _id
                  className="bg-blue-500 text-white py-1 px-2 rounded-md text-sm"
                >
                  View
                </Link>
                <button
                  onClick={() => removeFromWishlist(product._id)} // Corrected to use _id
                  className="bg-red-500 text-white py-1 px-2 rounded-md text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
