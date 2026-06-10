import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ ONLY FIX – REQUIRED

import { getDestinationBySlug } from "../../data/destinationData";
import {
  FaMapMarkerAlt,
  FaUtensils,
  FaTheaterMasks,
  FaArrowLeft,
  FaStar,
  FaCalendar,
  FaMoneyBillWave,
  FaUsers,
  FaLandmark,
  FaPalette,
  FaMusic,
  FaCar,
  FaHotel,
  FaClock,
  FaHeart,
} from "react-icons/fa";

const DestinationPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const destination = getDestinationBySlug(slug);
  const [activeTab, setActiveTab] = useState("places");
  const [isScrolled, setIsScrolled] = useState(false);

  // Reset scroll position when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add hash-based tab navigation
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (["places", "food", "culture", "tips"].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location]);

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <div className="text-center">
          <div className="text-9xl mb-4">🗺️</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Destination Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The destination you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isScrolled ? 0 : -100 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <FaArrowLeft /> Back to Planner
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {destination.title}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">
              <FaStar />
            </span>
            <span className="font-semibold">4.8</span>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed scale-105"
          style={{ backgroundImage: `url(${destination.coverImage})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* 3D Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-7xl md:text-8xl font-bold mb-6 tracking-tight"
            >
              {destination.title}
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto"
            >
              {destination.description ||
                "Experience the perfect blend of culture, nature, and adventure"}
            </motion.p>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 mb-12"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaCalendar className="text-blue-300" />
                <span>Best Season: {destination.bestSeason || "All Year"}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaMoneyBillWave className="text-green-300" />
                <span>Budget: {destination.budgetRange || "₹₹₹"}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaUsers className="text-purple-300" />
                <span>Perfect for: {destination.perfectFor || "Everyone"}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="inline-block animate-bounce"
            >
              <div className="text-white text-4xl">↓</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        {/* Interactive Tabs */}
        <div className=" top-20 z-40 bg-white/80 backdrop-blur-lg rounded-2xl p-2 mb-12 shadow-lg">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => {
                setActiveTab("places");
                window.history.pushState(null, "", `#places`);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "places"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaMapMarkerAlt /> Must-Visit Places
            </button>
            <button
              onClick={() => {
                setActiveTab("food");
                window.history.pushState(null, "", `#food`);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "food"
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaUtensils /> Local Cuisine
            </button>
            <button
              onClick={() => {
                setActiveTab("culture");
                window.history.pushState(null, "", `#culture`);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "culture"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaTheaterMasks /> Culture & Heritage
            </button>
            <button
              onClick={() => {
                setActiveTab("tips");
                window.history.pushState(null, "", `#tips`);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "tips"
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaLandmark /> Travel Tips
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-20">
          {/* Places Tab */}
          {activeTab === "places" && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                  <FaMapMarkerAlt className="text-blue-500" />
                  Iconic Destinations
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Discover the most breathtaking locations and hidden gems
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destination.places.map((place, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-500"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                          #{index + 1}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-800">
                          {place.name}
                        </h3>
                        <button className="text-blue-500 hover:text-blue-600 text-2xl hover:scale-110 transition-transform">
                          <FaHeart />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {place.description ||
                          "A must-visit destination offering unique experiences"}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FaLandmark />
                          <span>{place.type || "Landmark"}</span>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                          ₹{place.priceRange || "Free"}
                        </span>
                      </div>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/50 rounded-3xl transition-all duration-500" />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Food Tab - FIXED IMAGE SIZING */}
          {activeTab === "food" && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                  <FaUtensils className="text-orange-500" />
                  Culinary Delights
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Taste the authentic flavors and traditional recipes
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destination.foods.map((food, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ rotateY: 5, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-500"
                  >
                    {/* FIXED: Same image size as places */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                          #{index + 1}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-800">
                          {food.name}
                        </h3>
                        <button className="text-red-500 hover:text-red-600 text-2xl hover:scale-110 transition-transform">
                          <FaHeart />
                        </button>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {food.description ||
                          "Traditional dish with authentic flavors"}
                      </p>

                      <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                          Spice: {food.spiceLevel || "🌶️🌶️"}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            food.isVegetarian
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {food.isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} size={14} />
                          ))}
                        </div>
                        <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
                          Must Try
                        </span>
                      </div>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-400/50 rounded-3xl transition-all duration-500" />

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-orange-200 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-red-200 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Culture Tab */}
          {activeTab === "culture" && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                  <FaTheaterMasks className="text-purple-500" />
                  Culture & Heritage
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Immerse yourself in rich traditions and artistic expressions
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={destination.cultureImage}
                      alt="Cultural Heritage"
                      className="w-full h-[600px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* 3D Decorative Elements */}
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl" />
                  <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-pink-300/20 rounded-full blur-2xl" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  {[
                    {
                      title: "Traditional Attire",
                      description:
                        "Explore the vibrant traditional clothing and textiles",
                      icon: <FaPalette />,
                      color: "from-purple-500 to-pink-500",
                      details:
                        "Colorful fabrics, intricate embroidery, and symbolic jewelry",
                    },
                    {
                      title: "Festivals & Celebrations",
                      description:
                        "Experience colorful festivals throughout the year",
                      icon: <FaCalendar />,
                      color: "from-blue-500 to-cyan-500",
                      details:
                        "Seasonal celebrations with music, dance, and rituals",
                    },
                    {
                      title: "Art & Craft",
                      description:
                        "Discover exquisite local handicrafts and artwork",
                      icon: <FaPalette />,
                      color: "from-orange-500 to-yellow-500",
                      details:
                        "Handmade pottery, weaving, painting, and sculpture",
                    },
                    {
                      title: "Music & Dance",
                      description:
                        "Traditional performing arts and musical heritage",
                      icon: <FaMusic />,
                      color: "from-green-500 to-emerald-500",
                      details:
                        "Folk dances, classical music, and traditional instruments",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl text-white flex-shrink-0`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {item.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.section>
          )}

          {/* Tips Tab */}
          {activeTab === "tips" && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                  <FaLandmark className="text-emerald-500" />
                  Travel Tips & Guide
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Everything you need to know for a perfect trip
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <FaClock />,
                    title: "Best Time",
                    desc: destination.bestSeason || "Oct-Mar",
                    color: "bg-blue-100 text-blue-600",
                  },
                  {
                    icon: <FaMoneyBillWave />,
                    title: "Daily Budget",
                    desc: destination.budgetRange || "₹2,000-5,000",
                    color: "bg-green-100 text-green-600",
                  },
                  {
                    icon: <FaCar />,
                    title: "Transport",
                    desc: "Local cabs/buses",
                    color: "bg-purple-100 text-purple-600",
                  },
                  {
                    icon: <FaHotel />,
                    title: "Stay",
                    desc: "Hotels/Homestays",
                    color: "bg-orange-100 text-orange-600",
                  },
                ].map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`${tip.color} p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="text-3xl mb-4 flex justify-center">
                      {tip.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{tip.title}</h3>
                    <p className="text-sm opacity-90">{tip.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 md:p-12 shadow-lg">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  Essential Information
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-emerald-700">
                      Do's
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Respect local customs",
                        "Carry cash in local currency",
                        "Learn basic greetings",
                        "Try local cuisine",
                        "Dress modestly in religious sites",
                        "Bargain politely in markets",
                      ].map((doItem, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            ✓
                          </div>
                          <span className="text-gray-700">{doItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-red-600">
                      Don'ts
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Don't litter",
                        "Avoid political discussions",
                        "Don't wear revealing clothes in religious places",
                        "Don't bargain aggressively",
                        "Don't point with fingers",
                        "Don't disrespect local traditions",
                      ].map((dontItem, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            ✗
                          </div>
                          <span className="text-gray-700">{dontItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-24 text-center"
        >
          <div className="relative">
            {/* 3D Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20" />

            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl overflow-hidden">
              {/* Floating Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2" />

              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Explore {destination.title}?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Start planning your perfect trip with our custom itinerary
                builder
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/"
                  className="px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <FaArrowLeft /> Plan My Trip
                </Link>
                <button className="px-8 py-4 bg-black/20 backdrop-blur-sm text-white rounded-full text-lg font-semibold hover:bg-black/30 transition-all duration-300 border border-white/20 flex items-center gap-2">
                  Download Guide
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3D Floating Navigation Helper */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50" />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="relative w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
          >
            ↑
          </button>
        </div>
      </div>

      {/* Add CSS for line clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DestinationPage;
