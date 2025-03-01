import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <div>
        <button className="btn  btn-success">
          <Link to="/create-product">Add a new Product</Link>
        </button>
      </div>
    </div>
  );
}
