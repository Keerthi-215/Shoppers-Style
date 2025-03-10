import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

function FAQ() {
  // State to track which FAQ items are open
  const [openItems, setOpenItems] = useState({});

  // Toggle FAQ item open/closed state
  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // FAQ data organized by categories
  const faqData = [
    {
      category: "Ordering & Payment",
      items: [
        {
          id: "order1",
          question: "How do I place an order?",
          answer:
            "Browse our collection, select your desired items, choose your size and color, and add them to your cart. Proceed to checkout, enter your shipping and payment information, and confirm your order. You'll receive an order confirmation email shortly after.",
        },
        {
          id: "order2",
          question: "What payment methods do you accept?",
          answer:
            "We accept credit/debit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secure and encrypted for your protection.",
        },
        {
          id: "order3",
          question: "Can I modify or cancel my order after it's placed?",
          answer:
            "You can modify or cancel your order within 1 hour of placing it by contacting our customer service team. Once your order enters the processing stage, we may not be able to make changes.",
        },
        {
          id: "order4",
          question: "Do you offer gift cards?",
          answer:
            "Yes! Digital gift cards are available in various denominations and can be sent directly to the recipient's email with a personalized message.",
        },
      ],
    },
    {
      category: "Shipping & Delivery",
      items: [
        {
          id: "shipping1",
          question: "What are your shipping options and costs?",
          answer:
            "We offer standard shipping (5-7 business days) for $5.99, expedited shipping (2-3 business days) for $12.99, and free standard shipping on orders over $75. International shipping options vary by country.",
        },
        {
          id: "shipping2",
          question: "How can I track my order?",
          answer:
            "Once your order ships, you'll receive a confirmation email with a tracking number and link. You can also track your order by logging into your account and visiting the 'Order History' section.",
        },
        {
          id: "shipping3",
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to over 60 countries worldwide. International shipping rates and delivery times vary by location. Please note that customers are responsible for any import duties or taxes imposed by their country.",
        },
        {
          id: "shipping4",
          question: "My order hasn't arrived yet. What should I do?",
          answer:
            "Please check your order tracking information first. If your order appears to be delayed beyond the estimated delivery date, please contact our customer service team with your order number for assistance.",
        },
      ],
    },
    {
      category: "Returns & Exchanges",
      items: [
        {
          id: "returns1",
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for unworn, unwashed items with original tags attached. Items on final sale or marked as clearance are not eligible for returns. Please see our full return policy for details.",
        },
        {
          id: "returns2",
          question: "How do I start a return or exchange?",
          answer:
            "Log into your account, go to 'Order History', select the order containing the item(s) you wish to return, and follow the return instructions. You'll receive a prepaid shipping label and return confirmation via email.",
        },
        {
          id: "returns3",
          question: "How long does it take to process my return?",
          answer:
            "Once we receive your return, it typically takes 3-5 business days to process. Refunds are issued to your original payment method and may take an additional 3-7 business days to appear on your statement.",
        },
        {
          id: "returns4",
          question: "Can I exchange an item for a different size or color?",
          answer:
            "Yes, exchanges are available for size and color changes. Start the exchange process through your account's 'Order History' section. Please note that exchanges are subject to current stock availability.",
        },
      ],
    },
    {
      category: "Sizing & Product Information",
      items: [
        {
          id: "sizing1",
          question: "How do I find my correct size?",
          answer:
            "We provide detailed size guides for all our products. To find your perfect fit, take your measurements and refer to the size chart on each product page. If you're between sizes, we generally recommend sizing up.",
        },
        {
          id: "sizing2",
          question: "What materials do you use in your clothing?",
          answer:
            "We use a variety of high-quality materials, including organic cotton, recycled polyester, sustainable linen, and more. Each product page lists the specific materials and care instructions for that item.",
        },
        {
          id: "sizing3",
          question: "Are your products ethically made?",
          answer:
            "Yes, we're committed to ethical manufacturing. All our products are made in factories that adhere to fair labor practices, safe working conditions, and fair wages. Learn more on our Sustainability page.",
        },
        {
          id: "sizing4",
          question: "How should I care for my clothing?",
          answer:
            "Care instructions vary by item and material. Generally, we recommend washing in cold water, avoiding bleach, and air drying when possible to extend the life of your garments. Specific care instructions are included on each product's tag and page.",
        },
      ],
    },
    {
      category: "Account & Membership",
      items: [
        {
          id: "account1",
          question: "How do I create an account?",
          answer:
            "Click the 'Account' icon in the top right corner of our website and select 'Sign Up'. Enter your email address and create a password. You can also sign up during checkout as a guest.",
        },
        {
          id: "account2",
          question: "What are the benefits of creating an account?",
          answer:
            "Account members can track orders, save favorite items, access order history, store shipping information for faster checkout, and receive exclusive offers and early access to sales.",
        },
        {
          id: "account3",
          question: "How do I update my account information?",
          answer:
            "Log into your account, navigate to 'Account Settings', and you can update your personal information, change your password, or modify your communication preferences.",
        },
        {
          id: "account4",
          question: "Do you have a loyalty or rewards program?",
          answer:
            "Yes, our Style Rewards program lets you earn points on purchases, referrals, and social media engagement. Points can be redeemed for discounts, free shipping, and exclusive items. Join through your account dashboard.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h1>

        <p className="text-gray-600 text-center mb-12">
          Find answers to the most common questions about our products, ordering
          process, shipping, returns, and more. Can't find what you're looking
          for?{" "}
          <Link
            to="/contact"
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Contact us
          </Link>
          .
        </p>

        {/* Search input (optional) */}
        {/* <div className="mb-10">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
            <button className="absolute right-3 top-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div> */}

        {/* FAQ Categories and Items */}
        <div className="space-y-8">
          {faqData.map((category) => (
            <div
              key={category.category}
              className="bg-white rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-800 p-6 border-b border-gray-200">
                {category.category}
              </h2>
              <div className="p-4">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="flex justify-between items-center w-full py-4 px-2 text-left focus:outline-none"
                    >
                      <span className="font-medium text-gray-700">
                        {item.question}
                      </span>
                      <span className="ml-6 flex-shrink-0">
                        {openItems[item.id] ? (
                          <svg
                            className="h-5 w-5 text-purple-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5 text-purple-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </span>
                    </button>
                    {openItems[item.id] && (
                      <div className="pb-4 px-2 text-gray-600">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
