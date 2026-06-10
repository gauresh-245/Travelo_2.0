import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  MapPin,
  AlertTriangle,
  Hotel,
  Plane,
  Train,
  LayoutDashboard,
  Search,
  ClipboardList,
  Ban,
  Calendar,
  Users,
  CreditCard,
} from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [cancellationRequests, setCancellationRequests] = useState([]);
  const [activeSection, setActiveSection] = useState("bookings");
  const [activeTab, setActiveTab] = useState("hotel");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);

      const [bookingRes, cancelRes] = await Promise.all([
        axios.get(
          "http://localhost:5000/api/bookings/admin/booking-requests",
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        axios.get(
          "http://localhost:5000/api/bookings/admin/cancellation-requests",
          { headers: { Authorization: `Bearer ${token}` } }
        ),
      ]);

      setBookingRequests(bookingRes.data.requests || []);
      setCancellationRequests(cancelRes.data.requests || []);
    } catch (err) {
      console.error("Admin fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const categorized = (data) => ({
    hotel: data.filter(d => d.transportType === "hotel"),
    flight: data.filter(d => d.transportType === "flight"),
    train: data.filter(d => d.transportType === "train"),
  });

  const handleBookingAction = async (action, id) => {
    const endpoint =
      action === "approve" ? "approve-booking" : "reject-booking";

    await axios.put(
      `http://localhost:5000/api/bookings/admin/${endpoint}/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchAll();
  };

  const handleCancelAction = async (action, id) => {
    const endpoint =
      action === "approve" ? "approve-cancel" : "reject-cancel";

    await axios.put(
      `http://localhost:5000/api/bookings/admin/${endpoint}/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchAll();
  };

  const tabs = [
    { id: "hotel", label: "Hotels", icon: <Hotel /> },
    { id: "flight", label: "Flights", icon: <Plane /> },
    { id: "train", label: "Trains", icon: <Train /> },
  ];

  const data =
    activeSection === "bookings"
      ? categorized(bookingRequests)
      : categorized(cancellationRequests);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-950 text-white overflow-x-hidden relative">
      {/* 3D Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating 3D Orbs */}
      <div className="fixed top-20 right-20 w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_30px_10px_rgba(34,211,238,0.3)]"></div>
      <div className="fixed bottom-40 left-10 w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-[0_0_20px_5px_rgba(168,85,247,0.3)]"></div>
      <div className="fixed top-40 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_20px_5px_rgba(52,211,153,0.3)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* HEADER with 3D Effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50"></div>
              <LayoutDashboard className="relative w-8 h-8 text-cyan-300" />
            </div>
            <div className="font-mono text-cyan-300 text-lg tracking-wider">
              ADMIN CONTROL CENTER
            </div>
          </div>

          <h1 className="text-6xl font-black mb-8 relative">
            <span className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent">
              Management Portal
            </span>
            <div className="absolute -bottom-2 left-0 w-48 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
          </h1>

          {/* MAIN SECTIONS - 3D Button Effect */}
          <div className="flex gap-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-xl -z-10"></div>
            
            <motion.button
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection("bookings")}
              className={`relative px-8 py-4 rounded-2xl font-bold flex items-center gap-3 
                transition-all duration-300 overflow-hidden group ${
                activeSection === "bookings"
                  ? "shadow-[0_20px_50px_rgba(16,185,129,0.3)]"
                  : "bg-white/5 backdrop-blur-lg border border-white/10"
              }`}
            >
              {/* 3D Button Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                activeSection === "bookings"
                  ? "from-emerald-500 to-emerald-600"
                  : "from-white/10 to-transparent"
              } opacity-90`}></div>
              
              {/* Button Edge Glow */}
              <div className={`absolute inset-0 border ${
                activeSection === "bookings"
                  ? "border-emerald-400/50"
                  : "border-white/20"
              } rounded-2xl`}></div>
              
              {/* Animated Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <ClipboardList className="relative w-6 h-6" />
              <span className="relative">Booking Requests</span>
            </motion.button>

            <motion.button
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection("cancellations")}
              className={`relative px-8 py-4 rounded-2xl font-bold flex items-center gap-3 
                transition-all duration-300 overflow-hidden group ${
                activeSection === "cancellations"
                  ? "shadow-[0_20px_50px_rgba(239,68,68,0.3)]"
                  : "bg-white/5 backdrop-blur-lg border border-white/10"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${
                activeSection === "cancellations"
                  ? "from-red-500 to-red-600"
                  : "from-white/10 to-transparent"
              } opacity-90`}></div>
              
              <div className={`absolute inset-0 border ${
                activeSection === "cancellations"
                  ? "border-red-400/50"
                  : "border-white/20"
              } rounded-2xl`}></div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <Ban className="relative w-6 h-6" />
              <span className="relative">Cancellation Requests</span>
            </motion.button>
          </div>
        </motion.div>

        {/* CATEGORY TABS - 3D Glass Effect */}
        <div className="flex gap-4 mb-10 p-4 bg-gradient-to-r from-white/5 to-white/3 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
          {tabs.map(t => (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(t.id)}
              className={`relative px-6 py-3 rounded-xl flex items-center gap-3 
                transition-all duration-300 overflow-hidden group ${
                activeTab === t.id 
                  ? "shadow-[0_10px_30px_rgba(34,211,238,0.4)]"
                  : "hover:bg-white/10"
              }`}
            >
              {/* Background Gradient for Active Tab */}
              {activeTab === t.id && (
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 opacity-90"></div>
              )}
              
              {/* Border Glow */}
              <div className={`absolute inset-0 rounded-xl border ${
                activeTab === t.id 
                  ? "border-cyan-400/50"
                  : "border-transparent"
              }`}></div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <span className={`relative ${activeTab === t.id ? "text-black" : "text-gray-300"}`}>
                {t.icon}
              </span>
              <span className={`relative font-bold ${activeTab === t.id ? "text-black" : "text-white"}`}>
                {t.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* CONTENT - 3D Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection + activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {data[activeTab].length === 0 ? (
              <div className="col-span-full text-center py-32 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                </div>
                <div className="relative">
                  <Search className="w-16 h-16 mx-auto mb-6 text-gray-400 opacity-30" />
                  <div className="text-2xl font-light text-gray-400 opacity-60">
                    No pending requests
                  </div>
                </div>
              </div>
            ) : (
              data[activeTab].map((b) => (
                <motion.div
                  key={b._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group"
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* 3D Glass Card */}
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden">
                    
                    {/* Animated Border */}
                    <div className="absolute inset-0 border border-white/10 rounded-3xl"></div>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Card Content */}
                    <div className="relative">
                      {/* Header with Icon */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {b.hotel_name}
                          </h3>
                          <div className="flex items-center text-gray-400 mt-2">
                            <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                            <span className="text-sm">{b.location}</span>
                          </div>
                        </div>
                        <div className={`p-3 rounded-xl ${
                          activeSection === "bookings" 
                            ? "bg-emerald-500/20 border border-emerald-500/30"
                            : "bg-red-500/20 border border-red-500/30"
                        }`}>
                          {activeSection === "bookings" ? (
                            <ClipboardList className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <Ban className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                      </div>

                      <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                        {b.hotel_address}
                      </p>

                      {/* DETAILS - 3D Blocks */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10">
                          <div className="flex items-center gap-2 text-gray-300 mb-1">
                            <Calendar className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs">Check-in</span>
                          </div>
                          <div className="font-semibold">
                            {new Date(b.checkIn).toDateString()}
                          </div>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10">
                          <div className="flex items-center gap-2 text-gray-300 mb-1">
                            <Users className="w-4 h-4 text-purple-400" />
                            <span className="text-xs">Guests</span>
                          </div>
                          <div className="font-semibold">{b.guests} Guests</div>
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-black/40 to-transparent rounded-xl border border-white/10">
                        <span className="text-gray-400">Total Amount</span>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-emerald-400" />
                          <span className="text-2xl font-bold text-white">₹{b.amount}</span>
                        </div>
                      </div>

                      {/* USER INFO - Glass Panel */}
                      <div className="bg-gradient-to-br from-black/40 to-black/20 p-4 rounded-xl mb-6 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="font-bold">{b.userId?.username?.charAt(0) || "U"}</span>
                          </div>
                          <div>
                            <p className="font-bold text-white">{b.userId?.username}</p>
                            <p className="text-xs text-gray-400">{b.userId?.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* CANCELLATION REASON */}
                      {activeSection === "cancellations" && (
                        <div className="mb-6 p-4 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-300 italic">
                              {b.cancellationReason}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* ACTIONS - 3D Buttons */}
                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            activeSection === "bookings"
                              ? handleBookingAction("approve", b._id)
                              : handleCancelAction("approve", b._id)
                          }
                          className="flex-1 py-4 rounded-xl font-bold relative overflow-hidden group"
                        >
                          {/* Button Background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600"></div>
                          
                          {/* Button Glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          
                          <span className="relative text-black">APPROVE</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            activeSection === "bookings"
                              ? handleBookingAction("reject", b._id)
                              : handleCancelAction("reject", b._id)
                          }
                          className="flex-1 py-4 rounded-xl font-bold relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          <span className="relative text-black">REJECT</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;