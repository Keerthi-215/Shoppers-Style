import React from "react";
import {
  Search,
  User,
  ShoppingCart,
  Home,
  Grid,
  Info,
  Phone,
} from "lucide-react";
const ShoppersHeader = () => {
  return (
    <header className="w-full bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Contemporary Logo with Dark Theme */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-purple-500"
              >
                {/* Ultra-modern abstract logo */}
                <rect
                  x="10"
                  y="20"
                  width="30"
                  height="5"
                  rx="2.5"
                  fill="currentColor"
                />
                <rect
                  x="10"
                  y="30"
                  width="20"
                  height="5"
                  rx="2.5"
                  fill="currentColor"
                />
                <circle
                  cx="40"
                  cy="32.5"
                  r="7.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M15 10L25 15L35 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="ml-2">
                <span
                  className="text-xl font-bold text-white"
                  style={{ letterSpacing: "-0.05em" }}
                >
                  shop<span className="text-purple-400">pers</span>
                </span>
                <div className="h-0.5 w-16 bg-gray-700 mt-0.5"></div>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <nav className="hidden md:flex space-x-10">
            <a
              href="/"
              className="flex items-center text-sm font-medium text-gray-300 hover:text-purple-400"
            >
              <Home className="mr-1 h-4 w-4" />
              Home
            </a>
            <a
              href="/collections"
              className="flex items-center text-sm font-medium text-gray-300 hover:text-purple-400"
            >
              <Grid className="mr-1 h-4 w-4" />
              Collections
            </a>
            <a
              href="/about"
              className="flex items-center text-sm font-medium text-gray-300 hover:text-purple-400"
            >
              <Info className="mr-1 h-4 w-4" />
              About
            </a>
            <a
              href="/contact"
              className="flex items-center text-sm font-medium text-gray-300 hover:text-purple-400"
            >
              <Phone className="mr-1 h-4 w-4" />
              Contact
            </a>
          </nav>
          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-300 hover:text-purple-400">
              <Search className="h-5 w-5" />
            </button>
            <a href="/login" className="text-gray-300 hover:text-purple-400">
              <User className="h-5 w-5" />
            </a>
            <a
              href="/cart"
              className="relative text-gray-300 hover:text-purple-400"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </a>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-300 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default ShoppersHeader;
