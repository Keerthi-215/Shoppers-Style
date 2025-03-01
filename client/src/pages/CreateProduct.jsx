import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateProduct = ({ api }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [size, setSize] = useState("");

  const fileInputRef = useRef(null);

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleProductUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (image) {
      console.log(image);
      formData.append("image", image);
    }
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("size", size);

    try {
      console.log(formData);
      const res = await api.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",

          //   authorization: `token`,
        },
      });
      if (res) {
        alert("Product created successfully");
      }
    } catch (error) {
      console.log(error);
      //   alert("Product creation failed");
    }
  };
  return (
    <div>
      <button className="btn btn-success">
        <Link to="/admin">Go to Admin</Link>
      </button>

      <div>
        <form onSubmit={handleProductUpload}>
          <h2 className="text-xl font-bold">Create Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 w-full"
            onChange={(e) => setProductName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border p-2 w-full"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 w-full"
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stock"
            className="border p-2 w-full"
            onChange={(e) => setStock(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            className="border p-2 w-full"
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subcategory"
            className="border p-2 w-full"
            onChange={(e) => setSubcategory(e.target.value)}
          />
          <input
            type="text"
            placeholder="Size"
            className="border p-2 w-full"
            onChange={(e) => setSize(e.target.value)}
          />
          <button
            type="button"
            onClick={handleImageUploadClick}
            className="w-full btn btn-secondary"
          >
            Upload Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="object-cover w-32 h-32 mx-auto rounded-full"
              />
            </div>
          )}
          {/* <input
            type="file"
            className="border p-2 w-full"
            onChange={(e) => setImage(e.target.files[0])}
          /> */}
          <button className="bg-purple-500 text-white p-2 w-full">
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
