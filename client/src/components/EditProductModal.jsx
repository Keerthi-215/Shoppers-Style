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
    size: "",
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
        size: product.size || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      <div className="bg-purple-100 p-6 rounded-xl shadow-lg w-96 max-h-[80vh] overflow-y-auto border border-purple-300">
        <h2 className="text-2xl font-bold mb-4 text-purple-800 text-center">
          Edit Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-purple-700">
            Product Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-purple-800 border-purple-400 focus:ring-purple-500"
              required
            />
          </label>
          <label className="block text-purple-700">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-white text-purple-800 border-purple-400 focus:ring-purple-500"
            />
          </label>
          <label className="block text-purple-700">
            Price
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-purple-800 border-purple-400 focus:ring-purple-500"
              required
            />
          </label>
          <label className="block text-purple-700">
            Stock
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-purple-800 border-purple-400 focus:ring-purple-500"
            />
          </label>
          <label className="block text-purple-700">
            Category
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-purple-800 border-purple-400 focus:ring-purple-500"
              required
            />
          </label>
          <label className="block text-purple-700">
            Subcategory
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-purple-800 border-purple-400 focus:ring-purple-500"
            />
          </label>
          <label className="block text-purple-700">
            Size
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="input input-bordered w-full bg-white text-purple-800 border-purple-400 focus:ring-purple-500"
            />
          </label>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="btn bg-purple-300 hover:bg-purple-400 text-purple-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-purple-600 hover:bg-purple-700 text-white"
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
