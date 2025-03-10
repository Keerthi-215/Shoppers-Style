import { useState, useEffect } from "react";
import axios from "axios";

const EditProductModal = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    subcategory: "",
    sizes: [], // Supports multiple size selections
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        category: product.category || "",
        subcategory: product.subcategory || "",
        sizes: product.sizes || [], // Ensure existing sizes are pre-checked
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        sizes: checked
          ? [...prev.sizes, value] // Add size if checked
          : prev.sizes.filter((size) => size !== value), // Remove size if unchecked
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/products/${product._id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-purple-100 p-4 rounded-xl shadow-lg w-96 max-h-[80vh] overflow-y-auto border border-purple-300">
        <h2 className="text-xl font-bold mb-3 text-purple-800 text-center">
          Edit Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <label className="block text-purple-700 text-sm">
            Product Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-purple-800 border-purple-400 focus:ring-purple-500 h-8 text-sm"
              required
            />
          </label>
          <label className="block text-purple-700 text-sm">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-white text-purple-800 border-purple-400 focus:ring-purple-500 h-16 text-sm"
            />
          </label>
          <label className="block text-purple-700 text-sm">
            Price
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-purple-800 border-purple-400 focus:ring-purple-500 h-8 text-sm"
              required
            />
          </label>
          <label className="block text-purple-700 text-sm">
            Stock
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-purple-800 border-purple-400 focus:ring-purple-500 h-8 text-sm"
            />
          </label>
          <label className="block text-purple-700 text-sm">
            Category
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-purple-800 border-purple-400 focus:ring-purple-500 h-8 text-sm"
              required
            />
          </label>
          <label className="block text-purple-700 text-sm">
            Subcategory
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-purple-800 border-purple-400 focus:ring-purple-500 h-8 text-sm"
            />
          </label>

          {/* ✅ Size Selection Checkboxes */}
          <label className="block text-purple-700 text-sm">
            Available Sizes
          </label>
          <div className="grid grid-cols-3 gap-1 p-1 border border-purple-300 rounded-lg bg-white">
            {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
              <label key={size} className="flex items-center space-x-1 text-xs">
                <input
                  type="checkbox"
                  name="sizes"
                  value={size}
                  checked={formData.sizes.includes(size)}
                  onChange={handleChange}
                  className="form-checkbox text-purple-600 h-3 w-3"
                />
                <span>{size}</span>
              </label>
            ))}
          </div>

          {/* ✅ Aligned Buttons Properly & Reduced Size */}
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded-lg text-sm transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition duration-200"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
