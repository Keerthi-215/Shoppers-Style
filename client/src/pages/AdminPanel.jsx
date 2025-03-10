import { Link } from "react-router-dom";
import { UserCog } from "lucide-react"; // Import admin icon

export default function AdminPanel() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F3E8FF]">
      <div className="card w-96 bg-white shadow-xl p-6 rounded-lg">
        <div className="flex flex-col items-center mb-6">
          <UserCog className="w-12 h-12 text-[#9333EA]" /> {/* Admin Icon */}
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] to-[#A855F7] mt-2">
            Admin
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {" "}
          {/* Buttons as a vertical list */}
          <Link to="/create-product" className="w-full">
            <button className="btn w-full text-white bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 hover:bg-[#9333EA] transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg">
              New Product
            </button>
          </Link>
          <Link to="/view-product" className="w-full">
            <button className="btn w-full text-white bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 hover:bg-[#9333EA] transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg">
              View Products
            </button>
          </Link>
          <Link to="/order-list" className="w-full">
            <button className="btn w-full text-white bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 hover:bg-[#9333EA] transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg">
              Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
