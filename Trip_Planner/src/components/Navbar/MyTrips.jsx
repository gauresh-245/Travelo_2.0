import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  MapPin,
  FileText,
  XCircle,
  Train,
  Plane,
  Hotel,
  Ship,
  Car,
  Download,
  MoreVertical,
  CheckCircle,
  X,
  Clock,
  Globe,
  CreditCard,
  Eye,
  Share2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Search,
  Filter,
  Tag,
  TrendingUp,
  Compass,
  Zap,
  Wallet,
  Map,
  Luggage,
  Shield,
  Award,
  UserCircle,
  Bell,
  Settings,
  LogOut,
  Menu,
  ArrowUpRight,
  Star,
  Heart,
  Navigation,
  Wind,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-950"></div>
    </div>
  );
};





// Navbar Component
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-gray-900/90 backdrop-blur-xl border-b border-gray-800/50"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-50"></div>
                <Plane className="relative w-7 h-7 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                TRAVELO
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-1 ml-8">
              <a
                href="/"
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium hover:bg-white/5 rounded-lg"
              >
                Home
              </a>
              <a
                href="/explore"
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium hover:bg-white/5 rounded-lg"
              >
                Packages
              </a>
              <a
                href="/transports"
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium hover:bg-white/5 rounded-lg"
              >
                Transports
              </a>
              <a
                href="/mytrips"
                className="px-4 py-2 text-white bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg font-medium flex items-center space-x-2 group"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>My Trips</span>
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/create-trip")}
                  className="hidden md:flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Plan Journey</span>
                </button>

                <div className="relative group">
                  <button className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/5 transition-all duration-300">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur"></div>
                      <div className="relative w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-white">
                        {user.username}
                      </div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 transform rotate-90 group-hover:rotate-0 transition-transform" />
                  </button>

                  <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-4 border-b border-gray-800/50">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-50"></div>
                          <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                            {user.username?.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {user.username}
                          </div>
                          <div className="text-sm text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 space-y-1">
                      <a
                        href="/profile"
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white"
                      >
                        <UserCircle className="w-4 h-4" />
                        <span>My Profile</span>
                      </a>
                      <a
                        href="/mytrips"
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 text-blue-400"
                      >
                        <Compass className="w-4 h-4" />
                        <span>My Trips</span>
                      </a>
                      <a
                        href="/notifications"
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white"
                      >
                        <Bell className="w-4 h-4" />
                        <span>Notifications</span>
                      </a>
                      <a
                        href="/settings"
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </a>
                      <button className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-red-400 hover:text-red-300">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <a
                  href="/login"
                  className="px-6 py-2.5 text-gray-300 hover:text-white transition-colors font-medium hover:bg-white/5 rounded-xl"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Register
                </a>
              </div>
            )}

            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800/50 pt-4">
            <div className="flex flex-col space-y-2">
              <a
                href="/"
                className="px-4 py-2.5 text-gray-300 hover:text-white transition-colors font-medium hover:bg-white/5 rounded-lg"
              >
                Home
              </a>
              <a
                href="/explore"
                className="px-4 py-2.5 text-gray-300 hover:text-white transition-colors font-medium hover:bg-white/5 rounded-lg"
              >
                Packages
              </a>
              <a
                href="/transports"
                className="px-4 py-2.5 text-gray-300 hover:text-white transition-colors font-medium hover:bg-white/5 rounded-lg"
              >
                Transports
              </a>
              <a
                href="/mytrips"
                className="px-4 py-2.5 text-white bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg font-medium flex items-center space-x-2"
              >
                <Compass className="w-4 h-4" />
                <span>My Trips</span>
              </a>
              <button className="w-full mt-4 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                <Sparkles className="w-4 h-4" />
                <span>Plan Journey</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const MyTrips = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchUserBookings();
  }, [user]);

  const fetchUserBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:5000/api/bookings/my-bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) setBookings(data.bookings || []);
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };








  const handleCancelRequest = async (bookingId) => {
    const reason = prompt("Reason for cancellation?");
    if (!reason) return;

    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/bookings/request-cancel/${bookingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
      }
    );

    alert("Cancellation request sent to admin");
    fetchUserBookings();
  };


  const handlePayment = async (booking) => {
    try {
      // 1️⃣ Create order from backend using booking amount
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: booking.amount, // ✅ USER-CLICKED AMOUNT
        }),
      });

      const order = await res.json();

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_RroEoSQw6Z52TI", // ✅ your approach (allowed)
        amount: order.amount, // paise (from backend)
        currency: "INR",
        name: "Travelo Management System",
        description: "Trip Booking Payment",
        order_id: order.id,

        handler: async function (response) {
  await fetch("http://localhost:5000/api/payment/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
      bookingId: booking._id, // 🔥 REQUIRED
    }),
  });

  alert("✅ Payment Successful!");

  // 🔁 REFRESH BOOKINGS
  fetchUserBookings();
},
  

        theme: {
          color: "#0f766e",
        },
      };

      // 4️⃣ Open Razorpay popup
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("❌ Payment Failed");
    }
  };






  const generateTicketPDF = (booking) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129);
    doc.text("BOOKING TICKET", 105, 20, { align: "center" });
    const tableRows = [
      [
        "Type",
        booking.hotel_address.includes("Train")
          ? "TRAIN"
          : booking.hotel_address.includes("Flight")
            ? "FLIGHT"
            : "HOTEL",
      ],
      ["Service Name", booking.hotel_name],
      ["Destination", booking.location],
      ["Details", booking.hotel_address],
      ["Amount", `INR ${booking.amount}`],
      ["Status", booking.status],
    ];
    autoTable(doc, { startY: 40, head: [["Field", "Info"]], body: tableRows });
    doc.save(`Ticket_${booking.booking_reference}.pdf`);
  };

  const filteredBookings = bookings
    .filter((b) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "cancelled") return b.status === "CANCELLED";
      if (activeFilter === "confirmed") return b.status === "CONFIRMED";
      if (activeFilter === "upcoming") {
        const tripDate = new Date(b.checkIn);
        const today = new Date();
        return tripDate > today && b.status === "CONFIRMED";
      }
      return true;
    })
    .filter(
      (b) =>
        b.hotel_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getTransportIcon = (address) => {
    if (address.includes("Train"))
      return <Train className="w-6 h-6 text-blue-400" />;
    if (address.includes("Flight"))
      return <Plane className="w-6 h-6 text-cyan-400" />;
    if (address.includes("Cruise"))
      return <Ship className="w-6 h-6 text-purple-400" />;
    if (address.includes("Car"))
      return <Car className="w-6 h-6 text-orange-400" />;
    return <Hotel className="w-6 h-6 text-emerald-400" />;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "REQUESTED":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "APPROVED":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "CONFIRMED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "CANCELLED":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      case "PENDING":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  const getTripType = (booking) => {
    if (booking.hotel_address.includes("Train")) return "Train Journey";
    if (booking.hotel_address.includes("Flight")) return "Flight";
    if (booking.hotel_address.includes("Cruise")) return "Cruise";
    if (booking.hotel_address.includes("Car")) return "Car Rental";
    return "Hotel Stay";
  };

  const getTripTypeColor = (booking) => {
    if (booking.hotel_address.includes("Train"))
      return "bg-blue-500/10 text-blue-400";
    if (booking.hotel_address.includes("Flight"))
      return "bg-cyan-500/10 text-cyan-400";
    if (booking.hotel_address.includes("Cruise"))
      return "bg-purple-500/10 text-purple-400";
    if (booking.hotel_address.includes("Car"))
      return "bg-orange-500/10 text-orange-400";
    return "bg-emerald-500/10 text-emerald-400";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 border-4 border-blue-500/20 border-t-blue-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass className="w-12 h-12 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-300 text-lg font-medium">
            Loading your travel portfolio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AnimatedBackground />
      <Navbar />

      {/* Main Content */}
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    Travel Portfolio
                  </span>
                </h1>
                <p className="text-gray-400 text-lg">
                  {bookings.length} journeys across{" "}
                  {new Set(bookings.map((b) => b.location)).size} destinations
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/explore")}
                  className="inline-flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-gray-700/50 text-gray-300 rounded-xl font-medium hover:bg-white/20 hover:border-gray-600 hover:text-white transition-all duration-300"
                >
                  <Globe className="w-5 h-5" />
                  <span>Explore More</span>
                </button>
                <button
                  onClick={() => navigate("/create-trip")}
                  className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>New Journey</span>
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {bookings.filter((b) => b.status === "CONFIRMED").length}
                    </div>
                    <div className="text-sm text-gray-400">Active Trips</div>
                  </div>
                  <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-cyan-500/30 transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {
                        bookings.filter(
                          (b) =>
                            new Date(b.checkIn) > new Date() &&
                            b.status === "CONFIRMED"
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-400">Upcoming</div>
                  </div>
                  <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                    <Clock className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {new Set(bookings.map((b) => b.location)).size}
                    </div>
                    <div className="text-sm text-gray-400">Destinations</div>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-amber-500/30 transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      ₹
                      {bookings
                        .reduce((sum, b) => sum + b.amount, 0)
                        .toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Total Spent</div>
                  </div>
                  <div className="p-3 bg-amber-500/10 rounded-xl group-hover:bg-amber-500/20 transition-colors">
                    <CreditCard className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-sm"></div>
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search destinations, hotels, or references..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="relative w-full pl-12 pr-4 py-3.5 bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-3.5 bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-200"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="price">Sort by Price</option>
                    <option value="name">Sort by Name</option>
                  </select>
                  <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                <div className="flex bg-white/5 backdrop-blur-sm border border-gray-700/50 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${viewMode === "grid"
                      ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${viewMode === "list"
                      ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {[
                {
                  id: "all",
                  label: "All Trips",
                  icon: <Globe className="w-4 h-4" />,
                },
                {
                  id: "upcoming",
                  label: "Upcoming",
                  icon: <Clock className="w-4 h-4" />,
                },
                {
                  id: "confirmed",
                  label: "Confirmed",
                  icon: <CheckCircle className="w-4 h-4" />,
                },
                {
                  id: "cancelled",
                  label: "Cancelled",
                  icon: <X className="w-4 h-4" />,
                },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${activeFilter === filter.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/25"
                    : "bg-white/5 backdrop-blur-sm text-gray-400 border border-gray-700/50 hover:text-white hover:border-gray-600"
                    }`}
                >
                  {filter.icon}
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trips Grid */}
          {filteredBookings.length === 0 ? (
            <div className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-800/50 shadow-xl">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full flex items-center justify-center">
                <Compass className="w-16 h-16 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No journeys found
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Your adventure begins here. Start planning your next
                unforgettable trip!
              </p>
              <button
                onClick={() => navigate("/explore")}
                className="inline-flex items-center space-x-3 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5" />
                <span>Discover Destinations</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBookings.map((booking) => {
                const isUpcoming = new Date(booking.checkIn) > new Date();
                const isCancelled = booking.status === "CANCELLED";

                return (
                  <div
                    key={booking._id}
                    id={`trip-${booking._id}`}
                    className={`group bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-800/50 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 ${isCancelled ? "opacity-60" : ""
                      }`}
                  >
                    {/* Card Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative p-6">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur"></div>
                            <div className="relative p-3 bg-gray-900/50 rounded-xl">
                              {getTransportIcon(booking.hotel_address)}
                            </div>
                          </div>
                          <div>
                            <span
                              className={`px-3 py-1.5 rounded-full text-xs font-medium ${getTripTypeColor(
                                booking
                              )}`}
                            >
                              {getTripType(booking)}
                            </span>
                            {isUpcoming && !isCancelled && (
                              <div className="flex items-center space-x-1.5 mt-2">
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                                <span className="text-xs text-cyan-400 font-medium">
                                  Upcoming
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                          <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Trip Info */}
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-cyan-100 transition-colors">
                        {booking.hotel_name}
                      </h3>
                      <div className="flex items-center text-gray-400 mb-4">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{booking.location}</span>
                      </div>

                      <p className="text-gray-300 text-sm mb-6 line-clamp-2">
                        {booking.hotel_address}
                      </p>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>Travel Date</span>
                          </div>
                          <div className="font-medium text-white">
                            {new Date(booking.checkIn).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center text-gray-500 text-sm">
                            <Users className="w-4 h-4 mr-2" />
                            <span>Travelers</span>
                          </div>
                          <div className="font-medium text-white">
                            {booking.guests || "2"} Guests
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center pt-6 border-t border-gray-800/50">
                        <div className="space-y-1">
                          <div className="text-xs text-gray-400">
                            Total Amount
                          </div>
                          <div className="text-2xl font-bold text-white">
                            ₹{booking.amount}
                          </div>
                        </div>


                        <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                          {booking.status === "CONFIRMED" && (
                            <>
                              <button
                                onClick={() => generateTicketPDF(booking)}
                                className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg font-medium"
                              >
                                <Download className="w-4 h-4" />
                                <span>Ticket</span>
                              </button>

                              <button
                                onClick={() => handleCancelRequest(booking._id)}
                                className="flex items-center space-x-2 px-4 py-2.5 bg-red-600/10 border border-red-500/30 text-red-400 rounded-lg font-medium"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Request Cancellation</span>
                              </button>
                            </>
                          )}

                          {booking.status === "APPROVED" && (
                            <button
                              onClick={() => handlePayment(booking)}
                              className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 rounded-lg font-medium"
                            >
                              <CreditCard className="w-4 h-4" />
                              <span>Pay ₹{booking.amount}</span>
                            </button>


                          )}

                          {booking.status === "REQUESTED" && (
                            <span className="text-sm text-amber-400 font-semibold">
                              ⏳ Waiting for admin approval
                            </span>
                          )}

                        </div>



                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Trip Details Modal */}
          {selectedTrip && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-xl"
                onClick={() => setSelectedTrip(null)}
              />

              <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-800/50 w-full max-w-2xl overflow-hidden shadow-2xl">
                <button
                  onClick={() => setSelectedTrip(null)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl">
                      {getTransportIcon(selectedTrip.hotel_address)}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {selectedTrip.hotel_name}
                      </h2>
                      <div className="flex items-center text-gray-400">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{selectedTrip.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Check-in Date</div>
                      <div className="font-medium text-white">
                        {new Date(selectedTrip.checkIn).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Amount Paid</div>
                      <div className="text-3xl font-bold text-emerald-400">
                        ₹{selectedTrip.amount}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">Guests</div>
                      <div className="font-medium text-white">
                        {selectedTrip.guests || "2"} Travelers
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-gray-500">
                        Booking Reference
                      </div>
                      <div className="font-mono text-sm text-gray-300 bg-gray-800/50 p-2 rounded-lg">
                        {selectedTrip.booking_reference}
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="text-sm text-gray-500 mb-2">Details</div>
                    <div className="text-gray-300 bg-gray-800/50 p-4 rounded-lg">
                      {selectedTrip.hotel_address}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-gray-800/50">
                    <button
                      onClick={() => generateTicketPDF(selectedTrip)}
                      className="flex-1 flex items-center justify-center space-x-3 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Ticket</span>
                    </button>

                    <button className="flex items-center justify-center space-x-3 px-6 py-3.5 bg-white/5 border border-gray-700/50 text-gray-300 rounded-xl font-medium hover:bg-white/10 hover:text-white transition-all duration-300">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate("/create-trip")}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-5 rounded-full shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-110 transition-all duration-300 group z-40"
      >
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>
    </>
  );
};

export default MyTrips;     