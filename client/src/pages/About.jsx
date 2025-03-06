import { Link } from "react-router-dom";
import { ShoppingBag, Star, ShieldCheck, Truck } from "lucide-react";
import team1 from "./../assets/images/team1.jpg";
import team2 from "../assets/images/team2.jpg";
import team3 from "../assets/images/team3.jpg";
import teamPhoto from "../assets/images/team-photo.jpg"; // Add the team image here

const teamMembers = [
  { name: "Jessica Parker", role: "Founder & CEO", image: team1 },
  { name: "Katherine Charlotte", role: "Head of Design", image: team2 },
  { name: "Bhashar Alwarad", role: "Marketing Lead", image: team3 },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Team Photo */}
      <div className="relative w-full h-screen">
        <img
          src={teamPhoto}
          alt="Our Team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-4xl md:text-3xl text-white font-bold">
            Shoppers Team
          </h2>
        </div>
      </div>

      {/* About Shoppers */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Who We Are</h2>
        <p className="mt-6 text-lg text-gray-300 leading-relaxed">
          <span className="text-purple-400 font-semibold">Shoppers</span> is an
          innovative online fashion destination dedicated to bringing you the
          latest trends at unbeatable prices. Whether you're looking for
          everyday essentials or statement pieces, we provide high-quality
          clothing and accessories for men, women, and kids.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-12 w-12 text-purple-400" />
              <h3 className="text-xl font-semibold mt-4">Premium Quality</h3>
              <p className="text-gray-400 mt-2">
                We ensure top-quality materials and craftsmanship.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-12 w-12 text-purple-400" />
              <h3 className="text-xl font-semibold mt-4">Fast Shipping</h3>
              <p className="text-gray-400 mt-2">
                Your orders are delivered quickly and securely.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-12 w-12 text-purple-400" />
              <h3 className="text-xl font-semibold mt-4">Top-Rated Service</h3>
              <p className="text-gray-400 mt-2">
                Our customer support ensures a smooth shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Meet Our Team</h2>
        <p className="mt-4 text-lg text-gray-300">
          Our passionate team is dedicated to delivering the best fashion
          experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg text-center shadow-md"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-purple-500"
              />
              <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
              <p className="text-purple-400 font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-700 py-12 text-center">
        <h2 className="text-3xl font-bold">Shop the Latest Trends</h2>
        <p className="mt-2 text-lg">
          Find your perfect style with Shoppers today!
        </p>
        <Link
          to="/collections"
          className="mt-6 px-6 py-3 bg-white text-purple-500 rounded-lg flex items-center gap-2 justify-center w-fit mx-auto"
        >
          <ShoppingBag className="h-5 w-5" />
          Start Shopping
        </Link>
      </section>
    </div>
  );
}
