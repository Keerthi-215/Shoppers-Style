import React from "react";
const CartItem = ({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) => {
  return (
    <div className="flex justify-between items-center border-b p-4">
      <div className="flex items-center">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-auto h-[450px] object-cover rounded-md shadow-md"
        />
        <div className="ml-4">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600">Category: {item.category}</p>
          <p className="text-sm text-gray-600">Price: ${item.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => decreaseQuantity(item._id)} // Use _id for consistency
          className="px-2 py-1 bg-gray-300 rounded-full"
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => increaseQuantity(item._id)} // Use _id for consistency
          className="px-2 py-1 bg-gray-300 rounded-full"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(item._id)} // Use _id for consistency
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded-full"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
export default CartItem;
