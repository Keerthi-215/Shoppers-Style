import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateProduct = ({ api }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [productType, setProductType] = useState("Adult"); // New state for product type
  const [selectedSizes, setSelectedSizes] = useState([]);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Adult and Kids size options
  const adultSizes = ["S", "M", "L", "XL", "XXL"];
  const kidsSizes = [
    "0-2 years",
    "2-4 years",
    "4-6 years",
    "6-8 years",
    "8-10 years",
    "10-12 years",
  ];

  const handleImageUploadClick = () => fileInputRef.current.click();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleProductUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("productType", productType);
    formData.append("sizes", JSON.stringify(selectedSizes));

    try {
      const res = await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res) alert("Product created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#F3E8FF] to-[#EDE9FE] p-4">
      <div className="card w-full max-w-lg bg-white shadow-xl p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] to-[#A855F7] mt-2">
          Create Product
        </h2>

        <form onSubmit={handleProductUpload} className="space-y-3 mt-3">
          <input
            type="text"
            placeholder="Product Name"
            className="input input-bordered input-sm w-full"
            onChange={(e) => setProductName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="textarea textarea-bordered textarea-sm w-full"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered input-sm w-full"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Stock"
              className="input input-bordered input-sm w-full"
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Category"
              className="input input-bordered input-sm w-full"
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="text"
              placeholder="Subcategory"
              className="input input-bordered input-sm w-full"
              onChange={(e) => setSubcategory(e.target.value)}
            />
          </div>

          {/* Product Type Selection (Adult / Kids) */}
          <div className="mt-3">
            <label className="font-semibold">Product Type:</label>
            <select
              className="select select-bordered select-sm w-full mt-1"
              onChange={(e) => {
                setProductType(e.target.value);
                setSelectedSizes([]); // Reset sizes on type change
              }}
            >
              <option value="Adult">Adult</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* Multi-Select Sizes or Age Groups */}
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-sm bg-[#C084FC] text-white hover:bg-[#9333EA] w-full"
            >
              Select {productType === "Kids" ? "Age Group" : "Sizes"}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-1 shadow bg-white rounded-box w-48"
            >
              {(productType === "Kids" ? kidsSizes : adultSizes).map((size) => (
                <li key={size}>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-xs checkbox-primary"
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                    />
                    {size}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Display Selected Sizes / Age Groups */}
          {selectedSizes.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {selectedSizes.map((size) => (
                <span
                  key={size}
                  className="badge badge-sm bg-[#9333EA] text-white p-1"
                >
                  {size}
                </span>
              ))}
            </div>
          )}

          {/* Image Upload */}
          <button
            type="button"
            onClick={handleImageUploadClick}
            className="btn btn-sm w-full text-white bg-[#C084FC] hover:bg-[#9333EA]"
          >
            Upload Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Image Preview */}
          {imagePreview && (
            <div className="flex justify-center mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover w-24 h-24 rounded-lg shadow-md border border-gray-300"
              />
            </div>
          )}

          {/* Submit Button */}
          <button className="btn btn-sm w-full text-white bg-[#8768a3] hover:bg-[#7E22CE]">
            Upload Product
          </button>
        </form>

        {/* Admin Button */}
        <div className="text-center mt-3">
          <Link
            to="/admin"
            className="btn btn-sm text-white bg-[#975a68] hover:bg-[#BE123C]"
          >
            Go to Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
