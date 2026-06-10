// src/components/HotelSearch.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Ensure 'react-icons' is installed: npm install react-icons
import {
  FaStar,
  FaMapMarkerAlt,
  FaWallet,
  FaCheckCircle,
  FaBed,
  FaSpinner,
} from "react-icons/fa";

// Import local hotel images
import hotel1 from "../assets/hotel1.jpg";
import hotel2 from "../assets/hotel2.jpg";
import hotel3 from "../assets/hotel3.jpg";
import hotel4 from "../assets/hotel4.jpg";
import hotel5 from "../assets/hotel5.jpg";

// --- Custom Tailwind Configuration Note ---
// If you cannot edit tailwind.config.js, replace custom color classes:
// 'bg-terracotta' -> 'bg-red-800' (or similar deep red/brown)
// 'text-terracotta' -> 'text-red-800'
// 'text-gold' -> 'text-yellow-600'
// -----------------------------------------------------------------

// --- Skeleton Loader Component (Updated with the new aesthetic) ---
const CardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg animate-pulse overflow-hidden p-0 border border-stone-100">
    <div className="h-56 w-full bg-stone-200"></div>
    <div className="p-5">
      <div className="h-6 bg-stone-300 rounded-lg w-3/4 mb-3"></div>
      <div className="h-3 bg-stone-200 rounded w-1/2 mb-4"></div>
      <div className="flex justify-between items-center mb-4">
        <div className="h-5 bg-stone-200 rounded-full w-1/4"></div>
        <div className="h-5 bg-stone-200 rounded-full w-1/6"></div>
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-stone-100">
        <div className="h-10 bg-gold rounded-lg w-1/3"></div>
        <div className="h-12 bg-terracotta rounded-full w-1/3"></div>
      </div>
    </div>
  </div>
);
// ---------------------------------

function HotelSearch({ destination, budget: initialBudget, travelType }) {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(initialBudget || "All");
  const [error, setError] = useState(null);

  const localImageMap = {
    "Aguada Anchorage": hotel1,
    "Hotels Royal Batoo Srinagar": hotel2,
    "Hotels Hevean Pahalgam": hotel3,
    "The Dunes Continental": hotel4,
    "Zostel Ooty": hotel5,
  };

  useEffect(() => {
    setSelectedBudget(initialBudget || "All");
  }, [initialBudget]);

  useEffect(() => {
    if (!destination) {
      setHotels([]);
      return;
    }

    const controller = new AbortController();
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.append("destination", destination);
        if (selectedBudget && selectedBudget !== "All")
          params.append("budget", selectedBudget);
        if (travelType) params.append("travelType", travelType);

        const res = await fetch(
          `http://localhost:5000/api/hotels/filter?${params.toString()}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setHotels(data || []);
      } catch (err) {
        if (err.name !== "AbortError")
          setError("Failed to load hotels. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
    return () => controller.abort();
  }, [destination, travelType, selectedBudget]);

  const handleBookNow = (hotel) => {
    navigate("/hotel-details", { state: { hotel } });
  };

  const handleImageError = (e, hotelName) => {
    e.target.onerror = null;
    e.target.src = localImageMap[hotelName] || hotel1;
  };

  const budgets = ["All", "Cheap", "Moderate", "Luxury"];

  return (
    // Base background uses a warm, soft neutral (stone-50)
    <div className="min-h-screen bg-stone-50 text-gray-900 mt-20">
      {/* Header with Muted, High-End Gradient */}
      <header className="py-16 px-6 bg-gradient-to-r from-stone-800 to-terracotta shadow-xl text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-light mb-2 tracking-wide">
            Curated Stays in{" "}
            <span className="font-bold text-gold">{destination}</span>
          </h1>
          <p className="text-lg font-extralight opacity-80 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gold" />
            Find your perfect retreat.
          </p>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto -mt-10 relative z-20">
        {/* Floating Budget Filter Bar (Clean & Elevated) */}
        <div className="mb-10 p-4 bg-white rounded-full shadow-lg border border-stone-100 flex justify-center flex-wrap gap-3">
          <span className="font-semibold text-gray-700 flex items-center mr-3">
            <FaWallet className="mr-2 text-terracotta" />
            Budget Preference:
          </span>
          {budgets.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBudget(b)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition duration-300 ease-in-out transform shadow-md ${
                selectedBudget === b
                  ? "bg-terracotta text-white shadow-terracotta/50 bg-red-900 scale-105"
                  : "bg-white text-gray-700 border border-stone-300 hover:bg-stone-100 hover:scale-[1.02]"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Info Bar */}
        <div className="mb-8 text-lg font-semibold text-gray-800 flex items-center justify-between border-b border-stone-300 pb-3">
          <p className="flex items-center">
            <span className="text-xl font-bold text-terracotta mr-2">
              {hotels.length}
            </span>
            Results Matching Your Taste
          </p>
          <p className="text-sm font-normal text-gray-500">
            Sorted by Boutique Rating
          </p>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}
        {error && (
          <div className="text-red-600 bg-red-100 p-4 rounded-lg text-center font-medium shadow-md flex items-center justify-center">
            <FaCheckCircle className="mr-2" /> {error}
          </div>
        )}

        {!loading && hotels.length === 0 && !error && (
          <div className="text-gray-600 text-center py-20 bg-white rounded-xl shadow-lg border border-stone-200">
            <FaBed className="text-5xl text-terracotta mx-auto mb-4" />
            <h3 className="text-xl font-semibold">No Boutique Hotels Found.</h3>
            <p>Try adjusting your filters for more options.</p>
          </div>
        )}

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loading &&
            hotels.map((hotel) => {
              const imageSrc =
                hotel.imageUrl && hotel.imageUrl.trim() !== ""
                  ? hotel.imageUrl
                  : localImageMap[hotel.name] || hotel1;

              return (
                <div
                  key={hotel._id}
                  // Soft, elevated card style
                  className="bg-white rounded-xl shadow-xl transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-2xl overflow-hidden border border-stone-200"
                >
                  {/* Image with subtle zoom on hover */}
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={hotel.name}
                      className="h-full w-full object-cover transition duration-500 ease-in-out hover:scale-110"
                      onError={(e) => handleImageError(e, hotel.name)}
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-xl text-gray-800 mb-1 line-clamp-1">
                      {hotel.name}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center mb-4 line-clamp-2">
                      <FaMapMarkerAlt className="mr-1 w-3 h-3 text-terracotta" />
                      {hotel.address}
                    </p>

                    {/* Rating & Type Section */}
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
                      <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                        <FaStar className="text-gold text-base" />
                        <span className="text-sm font-medium text-gray-800">
                          {hotel.starRating || "N/A"} Star
                        </span>
                      </div>
                      <span className="text-xs font-medium text-terracotta bg-red-50 px-3 py-1 rounded-full border border-red-200">
                        {hotel.type}
                      </span>
                    </div>

                    {/* Price (Muted Gold Accent) and Book Button */}
                    <div className="flex justify-between items-center pt-3">
                      <div>
                        <p className="text-3xl font-bold text-gold">
                          ₹{hotel.pricePerNight || "Contact"}
                        </p>
                        <p className="text-xs text-gray-500 font-medium tracking-wider">
                          PER NIGHT
                        </p>
                      </div>
                      <button
                        onClick={() => handleBookNow(hotel)}
                        className="px-6 py-3 bg-terracotta text-white rounded-full shadow-lg shadow-terracotta/50 bg-red-900 transition duration-300 ease-in-out transform hover:scale-105 font-medium flex items-center"
                      >
                        <FaCheckCircle className="mr-2" />
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default HotelSearch;
