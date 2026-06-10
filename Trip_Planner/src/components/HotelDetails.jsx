import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { debug } from "../utils/debug";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const StarRating = ({ rating }) => (
  <div className="flex items-center text-amber-500">
    {Array(5)
      .fill()
      .map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "fill-current" : "fill-gray-300"}`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545-4.745-4.605 6.572-.955L10 0l2.878 5.785 6.572.955-4.745 4.605 1.123 6.545z" />
        </svg>
      ))}
    <span className="ml-2 text-sm font-semibold text-gray-700">
      ({rating}/5)
    </span>
  </div>
);

const SectionIcon = ({ children }) => (
  <div className="p-3 bg-emerald-100 rounded-full text-emerald-600 mr-4">
    {children}
  </div>
);

function HotelDetails() {
  const { user } = useContext(AuthContext);

  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastBookingData, setLastBookingData] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { hotel } = location.state || {
    hotel: {
      name: "The Emerald Grand Residency",
      address: "14/B, Sunset Boulevard, Hill View",
      destination: "Goa",
      state: "Maharashtra",
      pricePerNight: 5500,
      budget: "Luxury",
      starRating: 4.8,
      imageUrl:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      phone: "+91-88888-77777",
      email: "booking@emeraldgrand.com",
      type: "Resort & Spa",
      availability: "Available",
      whoTraveling: "All Travelers",
      rooms: 120,
    },
  };

  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "1",
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (!hotel) {
      navigate("/create-trip");
      return;
    }
    if (hotel) {
      const imageUrl =
        hotel.imageUrl ||
        hotel.image ||
        hotel.photo ||
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop";
      setCurrentImage(imageUrl);
    }
  }, [hotel, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const customerReviews = [
    {
      name: "Raj Sharma",
      rating: 5,
      comment: "Absolutely stunning property!",
      date: "2 weeks ago",
      travelerType: "Solo Traveler",
      avatar: "👨‍💼",
      verified: true,
    },
    {
      name: "Priya Patel",
      rating: 4,
      comment: "Perfect location!",
      date: "1 month ago",
      travelerType: "Couple",
      avatar: "👩‍❤️‍👨",
      verified: true,
    },
    {
      name: "Amit Kumar",
      rating: 5,
      comment: "Exceptional service!",
      date: "3 days ago",
      travelerType: "Family",
      avatar: "👨‍👩‍👧‍👦",
      verified: true,
    },
    {
      name: "Sarah Johnson",
      rating: 4,
      comment: "Great value!",
      date: "1 week ago",
      travelerType: "Business Traveler",
      avatar: "💼",
      verified: true,
    },
  ];

  const guestLoves = [
    { text: "Spectacular ocean views", icon: "🌊", count: "92%" },
    { text: "Friendly and attentive staff", icon: "👨‍💼", count: "89%" },
    { text: "Luxurious spa facilities", icon: "💆", count: "87%" },
    { text: "Delicious culinary experience", icon: "🍽️", count: "94%" },
    { text: "Perfect beachfront location", icon: "🏖️", count: "96%" },
    { text: "Modern and clean rooms", icon: "✨", count: "91%" },
  ];

  const amenities = {
    popular: [
      {
        name: "Infinity Pool",
        icon: "🏊",
        description: "Stunning ocean-view pool",
      },
      {
        name: "Luxury Spa",
        icon: "💆",
        description: "Award-winning spa treatments",
      },
      {
        name: "Fine Dining",
        icon: "🍽️",
        description: "5-star restaurant experience",
      },
      {
        name: "Beach Access",
        icon: "🏖️",
        description: "Private beach entrance",
      },
    ],
    room: [
      { name: "Smart Room Control", icon: "📱", available: true },
      { name: "Premium Bedding", icon: "🛏️", available: true },
      { name: "Mini Bar", icon: "🍷", available: true },
      { name: "Nespresso Machine", icon: "☕", available: true },
      { name: "4K Smart TV", icon: "📺", available: true },
      { name: "Air Conditioning", icon: "❄️", available: true },
    ],
    services: [
      { name: "24/7 Concierge", icon: "🛎️", available: true },
      { name: "Airport Transfer", icon: "🚗", available: true },
      { name: "Laundry Service", icon: "👕", available: true },
      { name: "Tour Desk", icon: "🗺️", available: true },
      { name: "Business Center", icon: "💼", available: true },
      { name: "Valet Parking", icon: "🅿️", available: true },
    ],
  };

  const policies = [
    {
      icon: "🕐",
      title: "Check-in",
      value: "2:00 PM",
      subtitle: "Early check-in available",
    },
    {
      icon: "🕐",
      title: "Check-out",
      value: "12:00 PM",
      subtitle: "Late check-out on request",
    },
    {
      icon: "👤",
      title: "Age Requirement",
      value: "18+ years",
      subtitle: "Primary guest",
    },
    {
      icon: "📄",
      title: "ID Required",
      value: "Govt. ID Mandatory",
      subtitle: "Aadhaar, Passport, DL",
    },
    {
      icon: "🐕",
      title: "Pets",
      value: "Not Allowed",
      subtitle: "Service animals welcome",
    },
    {
      icon: "🚭",
      title: "Smoking",
      value: "Designated Areas",
      subtitle: "Non-smoking rooms available",
    },
  ];

  const nearbyAttractions = [
    { name: "Candolim Beach", distance: "200 m", walk: "3 min", type: "Beach" },
    {
      name: "Fort Aguada",
      distance: "1.2 km",
      walk: "15 min",
      type: "Historic Site",
    },
    {
      name: "Saturday Night Market",
      distance: "3 km",
      drive: "8 min",
      type: "Shopping",
    },
    { name: "Baga Beach", distance: "4 km", drive: "10 min", type: "Beach" },
  ];

  const calculateTotal = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return nights * (hotel?.pricePerNight || 0);
  };

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const start = new Date(bookingData.checkIn);
    const end = new Date(bookingData.checkOut);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const handleInputChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

 


  // --- PDF GENERATOR FUNCTION ---
  const generateTicketPDF = (booking) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129);
    doc.text("HOTEL BOOKING TICKET", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Booking Reference: ${booking.booking_reference}`, 105, 30, {
      align: "center",
    });

    const tableRows = [
      ["Guest Name", booking.userName],
      ["Hotel Name", booking.hotel_name],
      ["Location", booking.location],
      ["Check-In", new Date(booking.checkIn).toLocaleDateString("en-IN")],
      ["Check-Out", new Date(booking.checkOut).toLocaleDateString("en-IN")],
      ["Guests", `${booking.guests} Person(s)`],
      ["Total Paid", `INR ${booking.amount?.toLocaleString("en-IN")}`],
      ["Status", "CONFIRMED"],
    ];

    doc.autoTable({
      startY: 40,
      head: [["Field", "Description"]],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [16, 185, 129] },
    });

    doc.save(`Ticket_${booking.booking_reference}.pdf`);
  };

  // --- UPDATED CONFIRM BOOKING ---
  const handleConfirmBooking = async () => {
    const token = localStorage.getItem("token");

    const payload = {
      hotel_name: hotel.name,
      location: hotel.destination,
      hotel_image: hotel.imageUrl,
      hotel_price: hotel.pricePerNight,
      hotel_address: hotel.address,
      hotel_rating: hotel.starRating,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      total_nights: calculateNights(),
      amount: grandTotal,
      userEmail: user.email,
      userName: user.username,
    };

    const res = await fetch(
      "http://localhost:5000/api/bookings/request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (data.success) {
      alert("Request sent to admin");
      navigate("/mytrips");
    }
  };


  const handleImageError = () => {
    setCurrentImage(
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop"
    );
  };

  const BookingSuccessPopup = ({ onClose, booking }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center shadow-xl">
        <div className="text-5xl mb-3">🎉</div>
        <h2 className="text-2xl font-bold text-emerald-700 mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-gray-600 mb-4">
          Your hotel has been successfully booked.
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => generateTicketPDF(booking)}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
          >
            Generate Hotel Ticket PDF
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );

  const totalPrice = calculateTotal();
  const nights = totalPrice / (hotel?.pricePerNight || 1);
  const grandTotal = totalPrice + Math.round(totalPrice * 0.23);

  if (!hotel)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading hotel details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-sans mt-20">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="relative h-96 lg:h-[550px] overflow-hidden shadow-xl rounded-xl">
          <div className="absolute inset-0">
            <img
              src={currentImage}
              alt={hotel.name}
              className={`w-full h-full object-cover object-center transition-transform duration-700 ${imageLoaded ? "scale-100" : "scale-105"
                }`}
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          </div>
          <div className="relative z-10 h-full flex items-end p-8 text-white">
            <div>
              <h1 className="text-4xl lg:text-6xl font-extrabold mb-2 leading-tight drop-shadow-lg">
                {hotel.name}
              </h1>
              <p className="text-xl lg:text-3xl font-medium opacity-95 flex items-center drop-shadow-md">
                📍 {hotel.state || hotel.destination}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1 space-y-3">
                  <StarRating rating={hotel.starRating || 4.8} />
                  <div className="flex items-center space-x-6 text-sm font-medium">
                    <span className="text-green-600 font-bold">
                      {hotel.availability || "INSTANT BOOKING"}
                    </span>
                    <span className="text-emerald-700 font-semibold uppercase tracking-wider">
                      {hotel.budget}
                    </span>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0 lg:text-right">
                  <div className="text-4xl font-extrabold text-emerald-600 mb-1">
                    ₹{hotel.pricePerNight?.toLocaleString("en-IN") || "5,500"}
                  </div>
                  <div className="text-base text-gray-500">
                    per night + taxes
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto">
                  {[
                    {
                      id: "overview",
                      label: "Experience Overview",
                      icon: "📖",
                    },
                    { id: "amenities", label: "Amenities", icon: "⭐" },
                    { id: "location", label: "Location", icon: "📍" },
                    { id: "reviews", label: "Reviews", icon: "💬" },
                    { id: "policies", label: "Policies", icon: "📋" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-4 font-bold text-sm transition-all duration-300 ${activeTab === tab.id
                          ? "border-b-4 border-emerald-500 text-emerald-700 bg-emerald-50"
                          : "text-gray-500 hover:text-emerald-600 hover:bg-gray-50"
                        }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    <div className="border-b pb-6 border-gray-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <SectionIcon>📖</SectionIcon> Welcome to {hotel.name}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Experience unparalleled luxury at {hotel.name}, where
                        contemporary elegance meets traditional hospitality.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <SectionIcon>💖</SectionIcon> What Guests Love
                        </h4>
                        <div className="space-y-3">
                          {guestLoves.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg"
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-xl">{item.icon}</span>
                                <span className="text-gray-700 font-medium">
                                  {item.text}
                                </span>
                              </div>
                              <span className="text-emerald-600 font-bold">
                                {item.count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <SectionIcon>🎯</SectionIcon> Quick Facts
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                            <span className="text-gray-700">Property Type</span>
                            <span className="font-semibold text-emerald-700">
                              {hotel.type}
                            </span>
                          </div>
                          <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                            <span className="text-gray-700">Ideal For</span>
                            <span className="font-semibold text-emerald-700">
                              {hotel.whoTraveling || "All Travelers"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "amenities" && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <SectionIcon>⭐</SectionIcon> World-Class Amenities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {amenities.popular.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center p-4 bg-white border rounded-lg shadow-sm text-center"
                        >
                          <div className="text-3xl mb-2">{item.icon}</div>
                          <h5 className="font-bold text-gray-900 mb-1">
                            {item.name}
                          </h5>
                          <p className="text-xs text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "location" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <SectionIcon>🗺️</SectionIcon> Prime Location
                    </h3>
                    <div className="bg-emerald-50 rounded-xl p-4">
                      <p className="text-lg text-gray-800 font-bold mb-1">
                        {hotel.address}
                      </p>
                      <p className="text-gray-600">
                        {hotel.state || hotel.destination}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {nearbyAttractions.map((attraction, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 border rounded-lg"
                        >
                          <div>
                            <div className="font-semibold">
                              {attraction.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {attraction.type}
                            </div>
                          </div>
                          <div className="text-right font-bold text-emerald-600">
                            {attraction.distance}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <SectionIcon>💬</SectionIcon> Guest Reviews
                    </h3>
                    <div className="space-y-4">
                      {customerReviews.map((review, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-xl p-4 border"
                        >
                          <div className="flex justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">{review.avatar}</div>
                              <div className="font-bold">{review.name}</div>
                            </div>
                            <div className="text-right">
                              {"⭐".repeat(review.rating)}
                            </div>
                          </div>
                          <p className="text-gray-700 italic">
                            "{review.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "policies" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <SectionIcon>📜</SectionIcon> Property Policies
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {policies.map((policy, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-4 text-center"
                        >
                          <div className="text-2xl mb-2">{policy.icon}</div>
                          <h4 className="font-bold text-emerald-800 text-sm">
                            {policy.title}
                          </h4>
                          <p className="text-gray-700 font-medium text-sm">
                            {policy.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-emerald-700 mb-4">
                🏨 Secure Reservation
              </h3>
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={bookingData.checkIn}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={bookingData.checkOut}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg"
                    min={
                      bookingData.checkIn ||
                      new Date().toISOString().split("T")[0]
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Guests
                  </label>
                  <select
                    name="guests"
                    value={bookingData.guests}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} Guest{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t pt-4 mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>
                    ₹{hotel.pricePerNight} × {nights > 0 ? nights : 0} nights
                  </span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-emerald-800 pt-2 border-t">
                  <span>Grand Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              
              <button
                onClick={handleConfirmBooking}
                disabled={
                  !bookingData.checkIn ||
                  !bookingData.checkOut ||
                  totalPrice === 0
                }
                className="w-full py-3 bg-emerald-500 text-white rounded-lg font-bold disabled:bg-gray-400"
              >
                Send  Request to Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {false && (
        <BookingSuccessPopup
          booking={lastBookingData}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}

export default HotelDetails;   