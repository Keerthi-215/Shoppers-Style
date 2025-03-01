import React from "react";
import { Link } from "react-router-dom";
import { Home, Grid, Info, Phone, User } from "lucide-react";

const NavigationPanel = () => {
  return (
    <nav className="hidden md:flex space-x-10">
      <Link
        to="/"
        className="flex items-center text-sm font-medium text-gray-300 hover:text-purple-400"
      >
        <Home className="mr-1 h-4 w-4" />
        Home
      </Link>
      <Link
        to="/collections"
        className="flex items-center text-sm font-medium text-gray-300 hover:text-purple-400"
      >
        <Grid className="mr-1 h-4 w-4" />
        Collections
      </Link>
      <Link
        to="/about"
        className="flex items-center text-sm font-medium text-gray-300 hover:text-purple-400"
      >
        <Info className="mr-1 h-4 w-4" />
        About
      </Link>
      <Link
        to="/contact"
        className="flex items-center text-sm font-medium text-gray-300 hover:text-purple-400"
      >
        <Phone className="mr-1 h-4 w-4" />
        Contact
      </Link>
      <div className="flex space-x-6">
        <Link to="/register" className="text-gray-300 hover:text-purple-400">
          Register
        </Link>
        <Link to="/login" className="text-gray-300 hover:text-purple-400">
          Login
        </Link>
        <Link to="/logout" className="text-gray-300 hover:text-purple-400">
          Logout
        </Link>
        <Link to="/profile" className="text-gray-300 hover:text-purple-400">
          <User className="h-5 w-5" />
        </Link>
      </div>
    </nav>
  );
};

export default NavigationPanel;
