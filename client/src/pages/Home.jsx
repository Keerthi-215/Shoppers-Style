import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

// Import banner images from assets
import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.jpg";
import banner4 from "../assets/images/banner4.jpg";
import banner5 from "../assets/images/banner5.jpg";
import banner6 from "../assets/images/banner6.jpg";
import banner7 from "../assets/images/banner7.png";
import banner8 from "../assets/images/banner8.png";
import banner9 from "../assets/images/banner9.png";
import banner10 from "../assets/images/banner10.png";

const banners = [
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
  banner7,
  banner8,
  banner9,
  banner10,
];

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F5FF] text-white">
      {/* Banner Section */}
      <div className="relative w-full h-screen overflow-hidden">
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
        {/* Brighter Gradient Overlay */}
        <div className="py-16 px-6 max-w-4xl mx-auto text-center">
          {/* <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-white drop-shadow-lg">
            Elevate Your Style
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow-md">
            Discover the latest trends and refresh your wardrobe with our
            premium collection.
          </p>
          <Link
            to="/collections"
            className="mt-6 px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white text-lg font-semibold rounded-full flex items-center gap-2 shadow-xl transition-all transform hover:scale-105"
          >
            <ShoppingBag className="h-6 w-6" />
            Shop Now
          </Link> */}
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Trending Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15">
          {[
            {
              path: "/collections/men",
              image: "../assets/men-fashion.jpg",
              label: "Men's Fashion",
            },
            {
              path: "/collections/women",
              image: "../assets/women-fashion.jpg",
              label: "Women's Fashion",
            },
            {
              path: "/collections/kids",
              image: "../assets/kids-fashion.jpg",
              label: "Kids' Fashion",
            },
          ].map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="group relative block overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={category.image}
                alt={category.label}
                className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105 brightness-110"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {category.label}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
