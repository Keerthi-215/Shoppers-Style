import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Import banner images
import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.jpg";
import banner4 from "../assets/images/banner4.jpg";
//import banner5 from "../assets/images/banner5.jpg";
import banner6 from "../assets/images/banner6.jpg";
//import banner7 from "../assets/images/banner7.png";
import banner8 from "../assets/images/banner8.png";
//import banner9 from "../assets/images/banner9.png";
import banner10 from "../assets/images/banner10.png";

const banners = [
  banner4,
  banner1,
  banner3,
  banner10,
  //banner5,
  banner6,
  banner2,
  //banner7,
  banner8,
  //banner9,
];

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [products, setProducts] = useState({
    men: [],
    women: [],
    kids: [],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/products`
      );
      if (response.data && Array.isArray(response.data.data)) {
        const productsData = response.data.data;

        setProducts({
          men: productsData
            .filter((product) => product.category === "Men")
            .slice(0, 4),
          women: productsData
            .filter((product) => product.category === "Women")
            .slice(0, 4),
          kids: productsData
            .filter((product) => product.category === "Kids")
            .slice(15, 19),
        });
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return (
    <div className="max-screen bg-[#F9F5FF]">
      {/* Banner Section */}
      <div className="relative w-full h-[700px] overflow-hidden">
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Banner ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentBanner ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Category Sections */}
      <div className="py-16 px-6 max-w-4xl mx-auto">
        {["men", "women", "kids"].map((category) => (
          <section key={category} className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-purple-900 capitalize">
                {category} Collection
              </h2>
              <Link
                to={`/collections`}
                className="text-purple-600 hover:underline font-semibold"
              >
                View All
              </Link>
            </div>

            {products[category].length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {products[category].map((product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="group block overflow-hidden rounded-lg shadow-md bg-white transition-transform transform hover:scale-105 hover:shadow-xl"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-45 object-cover rounded-t-lg"
                    />
                    <div className="p-4 text-gray-800 text-center">
                      <h3 className="text-lg font-semibold truncate">
                        {product.name}
                      </h3>
                      <p className="text-purple-600 font-medium text-lg">
                        ${product.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.subcategory}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No {category} products available.
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
