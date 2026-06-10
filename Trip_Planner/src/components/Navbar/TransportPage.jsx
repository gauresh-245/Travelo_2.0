import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Train,
  Plane,
  MapPin,
  Clock,
  Ticket,
  Star,
  Calendar,
  Search,
  ChevronRight,
  Mountain,
  Waves,
  Castle,
  TreePine,
  Snowflake,
  Sun,
} from "lucide-react";

const destinations = [
  {
    id: "kashmir",
    name: "Kashmir",
    description:
      "The Paradise on Earth with stunning valleys and snow-capped mountains",
    icon: <Mountain className="w-6 h-6" />,
    color: "from-blue-500 to-purple-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
    trains: [
      {
        name: "Jhelum Express",
        number: "11077",
        from: "Pune",
        duration: "37h",
        price: "₹1,850",
        departure: "06:45",
        rating: 4.3,
      },
      {
        name: "Jammu Mail",
        number: "12345",
        from: "Delhi",
        duration: "12h",
        price: "₹950",
        departure: "22:30",
        rating: 4.5,
      },
      {
        name: "Kashmir Queen",
        number: "14654",
        from: "Jaipur",
        duration: "28h",
        price: "₹2,150",
        departure: "15:20",
        rating: 4.2,
      },
    ],
    flights: [
      {
        airline: "IndiGo",
        number: "6E-205",
        from: "Delhi",
        duration: "1h 30m",
        price: "₹4,850",
        departure: "08:15",
        rating: 4.7,
      },
      {
        airline: "Air India",
        number: "AI-825",
        from: "Mumbai",
        duration: "2h 45m",
        price: "₹6,250",
        departure: "14:30",
        rating: 4.6,
      },
      {
        airline: "SpiceJet",
        number: "SG-415",
        from: "Bangalore",
        duration: "3h 15m",
        price: "₹5,450",
        departure: "11:45",
        rating: 4.4,
      },
    ],
  },
  {
    id: "goa",
    name: "Goa",
    description:
      "Sun-kissed beaches, vibrant nightlife, and Portuguese heritage",
    icon: <Waves className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
    trains: [
      {
        name: "Goa Express",
        number: "12779",
        from: "Delhi",
        duration: "35h",
        price: "₹2,250",
        departure: "11:30",
        rating: 4.4,
      },
      {
        name: "Karnataka Express",
        number: "12627",
        from: "Bangalore",
        duration: "12h",
        price: "₹850",
        departure: "20:45",
        rating: 4.6,
      },
      {
        name: "Konkan Express",
        number: "10111",
        from: "Mumbai",
        duration: "8h",
        price: "₹650",
        departure: "07:15",
        rating: 4.5,
      },
    ],
    flights: [
      {
        airline: "IndiGo",
        number: "6E-335",
        from: "Delhi",
        duration: "2h 15m",
        price: "₹3,850",
        departure: "09:30",
        rating: 4.8,
      },
      {
        airline: "GoAir",
        number: "G8-305",
        from: "Mumbai",
        duration: "1h 15m",
        price: "₹2,950",
        departure: "13:45",
        rating: 4.5,
      },
      {
        airline: "Vistara",
        number: "UK-801",
        from: "Bangalore",
        duration: "1h 45m",
        price: "₹4,250",
        departure: "16:20",
        rating: 4.7,
      },
    ],
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    description: "Land of kings with majestic forts and rich cultural heritage",
    icon: <Castle className="w-6 h-6" />,
    color: "from-red-500 to-amber-500",
    bgColor: "bg-gradient-to-br from-red-50 to-amber-50",
    trains: [
      {
        name: "Rajdhani Express",
        number: "12951",
        from: "Mumbai",
        duration: "15h",
        price: "₹3,250",
        departure: "16:55",
        rating: 4.7,
      },
      {
        name: "Palace on Wheels",
        number: "20901",
        from: "Delhi",
        duration: "7h",
        price: "₹4,500",
        departure: "08:00",
        rating: 4.9,
      },
      {
        name: "Jaipur Superfast",
        number: "12955",
        from: "Ahmedabad",
        duration: "9h",
        price: "₹1,250",
        departure: "21:30",
        rating: 4.4,
      },
    ],
    flights: [
      {
        airline: "Air India",
        number: "AI-473",
        from: "Mumbai",
        duration: "1h 45m",
        price: "₹3,650",
        departure: "10:15",
        rating: 4.6,
      },
      {
        airline: "IndiGo",
        number: "6E-539",
        from: "Delhi",
        duration: "1h 15m",
        price: "₹2,850",
        departure: "14:45",
        rating: 4.5,
      },
      {
        airline: "SpiceJet",
        number: "SG-273",
        from: "Bangalore",
        duration: "2h 30m",
        price: "₹4,150",
        departure: "18:20",
        rating: 4.3,
      },
    ],
  },
  {
    id: "kerala",
    name: "Kerala",
    description: "God's Own Country with backwaters and lush greenery",
    icon: <TreePine className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    trains: [
      {
        name: "Kerala Express",
        number: "12625",
        from: "Delhi",
        duration: "48h",
        price: "₹2,850",
        departure: "11:45",
        rating: 4.5,
      },
      {
        name: "Maveli Express",
        number: "16603",
        from: "Mumbai",
        duration: "28h",
        price: "₹1,950",
        departure: "19:30",
        rating: 4.3,
      },
      {
        name: "Malabar Express",
        number: "16629",
        from: "Chennai",
        duration: "14h",
        price: "₹1,250",
        departure: "22:15",
        rating: 4.6,
      },
    ],
    flights: [
      {
        airline: "Air India",
        number: "AI-569",
        from: "Delhi",
        duration: "3h 15m",
        price: "₹5,250",
        departure: "07:45",
        rating: 4.7,
      },
      {
        airline: "IndiGo",
        number: "6E-539",
        from: "Mumbai",
        duration: "2h 15m",
        price: "₹3,950",
        departure: "12:30",
        rating: 4.8,
      },
      {
        airline: "AirAsia",
        number: "I5-745",
        from: "Bangalore",
        duration: "1h 30m",
        price: "₹2,850",
        departure: "16:45",
        rating: 4.4,
      },
    ],
  },
  {
    id: "ladakh",
    name: "Ladakh",
    description: "Land of high passes with breathtaking mountain landscapes",
    icon: <Snowflake className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
    trains: [
      {
        name: "Himalayan Queen",
        number: "14095",
        from: "Delhi",
        duration: "14h",
        price: "₹1,250",
        departure: "05:30",
        rating: 4.6,
      },
      {
        name: "Jammu Mail",
        number: "12345",
        from: "Mumbai",
        duration: "42h",
        price: "₹2,850",
        departure: "22:30",
        rating: 4.4,
      },
      {
        name: "Kashmir Express",
        number: "14653",
        from: "Kolkata",
        duration: "38h",
        price: "₹3,150",
        departure: "13:45",
        rating: 4.3,
      },
    ],
    flights: [
      {
        airline: "Air India",
        number: "AI-445",
        from: "Delhi",
        duration: "1h 15m",
        price: "₹6,850",
        departure: "09:30",
        rating: 4.9,
      },
      {
        airline: "IndiGo",
        number: "6E-205",
        from: "Mumbai",
        duration: "2h 45m",
        price: "₹7,250",
        departure: "14:15",
        rating: 4.7,
      },
      {
        airline: "Vistara",
        number: "UK-625",
        from: "Bangalore",
        duration: "4h 15m",
        price: "₹8,450",
        departure: "17:45",
        rating: 4.6,
      },
    ],
  },
  {
    id: "andaman",
    name: "Andaman",
    description: "Pristine islands with turquoise waters and coral reefs",
    icon: <Sun className="w-6 h-6" />,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
    trains: [
      {
        name: "Coromandel Express",
        number: "12841",
        from: "Chennai",
        duration: "28h",
        price: "₹1,850",
        departure: "15:20",
        rating: 4.5,
      },
      {
        name: "East Coast Express",
        number: "18645",
        from: "Kolkata",
        duration: "32h",
        price: "₹2,150",
        departure: "18:45",
        rating: 4.3,
      },
      {
        name: "Island Express",
        number: "13351",
        from: "Bangalore",
        duration: "36h",
        price: "₹2,450",
        departure: "12:30",
        rating: 4.4,
      },
    ],
    flights: [
      {
        airline: "IndiGo",
        number: "6E-961",
        from: "Chennai",
        duration: "2h",
        price: "₹5,850",
        departure: "08:45",
        rating: 4.8,
      },
      {
        airline: "Air India",
        number: "AI-589",
        from: "Kolkata",
        duration: "1h 45m",
        price: "₹4,950",
        departure: "11:30",
        rating: 4.6,
      },
      {
        airline: "SpiceJet",
        number: "SG-281",
        from: "Delhi",
        duration: "3h 30m",
        price: "₹7,250",
        departure: "16:15",
        rating: 4.7,
      },
    ],
  },
];

const TransportCard = ({ data, destination, isTrain }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPrice = () => parseInt(data.price.replace(/[₹,]/g, ""));


  const handleRequestBooking = async () => {
  if (!user) {
    navigate("/login");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const payload = {
  hotel_name: isTrain ? data.name : data.airline,
  hotel_address: `${isTrain ? "Train" : "Flight"} No ${data.number}`,
  location: destination,
  amount: getPrice(),
  transportType: isTrain ? "train" : "flight", // ✅ FIXED
  status: "REQUESTED",
  checkIn: new Date(),
  guests: 1,
};


    await fetch("http://localhost:5000/api/bookings/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    alert("Request sent to admin. Please wait for approval.");
    navigate("/mytrips");
  } catch (error) {
    console.error(error);
    alert("Failed to send request");
  }
};




  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`p-2 rounded-lg ${isTrain ? "bg-blue-100" : "bg-cyan-100"
                }`}
            >
              {isTrain ? (
                <Train size={18} className="text-blue-600" />
              ) : (
                <Plane size={18} className="text-cyan-600" />
              )}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {isTrain ? "Train" : "Flight"}
            </span>
          </div>
          <h4 className="text-xl font-bold text-gray-800">
            {isTrain ? data.name : data.airline}
          </h4>
          <p className="text-gray-600 text-sm">No: {data.number}</p>
        </div>
        <div className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full font-bold">
          <Star size={14} className="text-yellow-500 fill-current" />{" "}
          {data.rating}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold">{data.departure}</div>
          <div className="text-xs text-gray-500">Departure</div>
        </div>
        <div className="flex-1 mx-4 h-0.5 bg-gray-200 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-blue-500 text-xs font-bold">
            {data.duration}
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{destination}</div>
          <div className="text-xs text-gray-500">Destination</div>
        </div>
      </div>

      <div className="flex gap-2">

        <button
          onClick={handleRequestBooking}
          className={`w-full py-3 rounded-xl font-bold text-sm text-white ${isTrain ? "bg-blue-600" : "bg-cyan-600"
            }`}
        >
          Request to Admin
        </button>
      </div>
    </motion.div>
  );
};

const DestinationCard = ({ destination, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className={`relative rounded-2xl p-6 text-left transition-all ${isActive
      ? `bg-gradient-to-br ${destination.color} text-white shadow-xl`
      : `${destination.bgColor} shadow border-transparent`
      }`}
  >
    <div className="flex justify-between items-center mb-4">
      <div
        className={`p-3 rounded-xl ${isActive ? "bg-white/20" : "bg-white shadow-sm"
          }`}
      >
        {destination.icon}
      </div>
      <div
        className={`flex items-center gap-1 px-3 py-1 rounded-full ${isActive ? "bg-white/20" : "bg-white"
          }`}
      >
        <Star size={14} className="text-yellow-500 fill-current" />
        <span className="font-bold">
          {destination.trains.length + destination.flights.length}
        </span>
      </div>
    </div>
    <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
    <p className="text-xs opacity-80 line-clamp-2">{destination.description}</p>
  </motion.button>
);

const Transport = () => {
  const [selectedDestination, setSelectedDestination] = useState(
    destinations[0]
  );
  const [activeTab, setActiveTab] = useState("trains");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = destinations.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen mt-20 bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">
            Find Your <span className="text-blue-600">Transport</span>
          </h1>
          <div className="relative max-w-md mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search destination..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isActive={selectedDestination.id === dest.id}
              onClick={() => setSelectedDestination(dest)}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("trains")}
            className={`px-10 py-3 rounded-full font-bold transition-all ${activeTab === "trains"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-gray-500 border"
              }`}
          >
            Trains
          </button>
          <button
            onClick={() => setActiveTab("flights")}
            className={`px-10 py-3 rounded-full font-bold transition-all ${activeTab === "flights"
              ? "bg-cyan-600 text-white shadow-lg"
              : "bg-white text-gray-500 border"
              }`}
          >
            Flights
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === "trains"
            ? selectedDestination.trains.map((t, i) => (
              <TransportCard
                key={i}
                data={t}
                destination={selectedDestination.name}
                isTrain={true}
              />
            ))
            : selectedDestination.flights.map((f, i) => (
              <TransportCard
                key={i}
                data={f}
                destination={selectedDestination.name}
                isTrain={false}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Transport;
