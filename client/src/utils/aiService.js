import axios from "axios";
import debounce from "lodash/debounce"; // Correct import statement

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // Ensure your key is in .env
const API_URL = "https://api.openai.com/v1/chat/completions";

/**
 * Function to fetch AI response with retry and debounce logic.
 */
const getAIResponse = debounce(async (prompt, retries = 3, delay = 2000) => {
  console.log("API_KEY:", API_KEY); // Log the API_KEY to verify it's loaded correctly

  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.post(
        API_URL,
        {
          model: "gpt-4", // Change if needed
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response?.status === 429 && i < retries - 1) {
        console.warn(`Rate limit hit. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error("Error fetching AI response:", error);
        return null;
      }
    }
  }
}, 1000); // Debounce for 1 second

export default getAIResponse;
