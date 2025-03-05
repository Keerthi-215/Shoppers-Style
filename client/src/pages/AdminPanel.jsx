import { Link } from "react-router-dom";
import { UserCog } from "lucide-react"; // Import admin icon

export default function AdminPanel() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F3E8FF]">
      <div className="card w-96 bg-white shadow-xl p-6 rounded-lg">
        <div className="flex flex-col items-center mb-4">
          <UserCog className="w-12 h-12 text-[#9333EA]" /> {/* Admin Icon */}
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] to-[#A855F7] mt-2">
            Admin
          </h2>
        </div>
        <div className="flex justify-center">
          <Link to="/create-product" className="w-full">
            <button className="btn w-full text-white bg-[#C084FC] hover:bg-[#9333EA]">
              New Product
            </button>
          </Link>
          <Link to="/view-product" className="w-full">
            <button className="btn w-full text-white bg-[#C084FC] hover:bg-[#9333EA]">
              View Products
            </button>
          </Link>
          <Link to="/view-orders" className="w-full">
            <button className="btn w-full text-white bg-[#C084FC] hover:bg-[#9333EA]">
              Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
