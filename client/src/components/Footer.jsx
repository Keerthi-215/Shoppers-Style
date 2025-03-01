import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const ShoppersFooter = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-bold text-white">About Us</h3>
            <p className="mt-2 text-sm">
              Shoppers is your go-to destination for the latest fashion trends.
              Shop high-quality clothing and accessories with us.
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold text-white">Customer Service</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a href="/contact" className="hover:text-purple-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-purple-400">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-purple-400">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="/shipping" className="hover:text-purple-400">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white">Get in Touch</h3>
            <div className="mt-2 text-sm space-y-2">
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2" /> support@shoppers.com
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2" /> +1 (800) 123-4567
              </p>
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> 123 Fashion St, NY, USA
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold text-white">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-purple-400">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-purple-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-purple-400">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Shoppers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ShoppersFooter;
