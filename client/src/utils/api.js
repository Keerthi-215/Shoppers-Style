import axios from "axios";

const API_BASE_URL = "https://shoppers-bsxp.onrender.com/api";

export const getUserOrders = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};
