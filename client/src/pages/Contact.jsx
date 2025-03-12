import { useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/contact`,
        formData
      );
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F3E8FF] p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg border border-purple-300">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Contact Us
        </h2>

        {/* Contact Information */}
        {/* <div className="mb-6 space-y-3">
          <div className="flex items-center gap-3 bg-[#E9D5FF] p-3 rounded-lg shadow">
            <Mail className="text-purple-700" size={22} />
            <p className="font-medium text-gray-800">
              contact@shoppersstyle.com
            </p>
          </div>
          <div className="flex items-center gap-3 bg-[#E9D5FF] p-3 rounded-lg shadow">
            <Phone className="text-purple-700" size={22} />
            <p className="font-medium text-gray-800">+1 (888) 765-4321</p>
          </div>
          <div className="flex items-center gap-3 bg-[#E9D5FF] p-3 rounded-lg shadow">
            <MapPin className="text-purple-700" size={22} />
            <p className="font-medium text-gray-800">
              500 Trendy Ave, Los Angeles, CA, USA
            </p>
          </div>
        </div> */}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-800 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-purple-300 rounded-lg focus:ring focus:ring-purple-400 bg-[#F3E8FF] text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-purple-300 rounded-lg focus:ring focus:ring-purple-400 bg-[#F3E8FF] text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-purple-300 rounded-lg focus:ring focus:ring-purple-400 bg-[#F3E8FF] text-gray-800 h-28"
              required
            ></textarea>
          </div>

          {success && <p className="text-green-600 text-center">{success}</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-700 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-purple-800 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
            {!loading && <Send size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
