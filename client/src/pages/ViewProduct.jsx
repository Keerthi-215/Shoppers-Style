import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import EditProductModal from "../components/EditProductModal"; // Import modal component

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/products`
      );
      if (response.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        setError("Unexpected API response format.");
      }
    } catch (error) {
      setError("Failed to load products.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/products/${productId}`
      );
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-6 bg-purple-200 text-gray-800">
      <button
        onClick={() => navigate("/admin")}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
      >
        ← Back
      </button>
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">
        Product List
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full rounded-lg shadow-lg border border-gray-300 bg-gray-100">
          <thead>
            <tr className="bg-purple-700 text-white">
              {/* <th className="p-3">Image</th> */}
              <th className="p-3">Product ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-purple-200">
                  {/* <td className="p-3">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${
                        product.image
                      }`}
                      className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                    />
                  </td> */}
                  <td className="p-3">{product._id}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">${product.price}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="btn bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-2"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn bg-red-200 hover:bg-red-600 text-white flex items-center gap-2"
                    >
                      <Trash className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={fetchProducts}
        />
      )}
    </div>
  );
};

export default ViewProducts;
