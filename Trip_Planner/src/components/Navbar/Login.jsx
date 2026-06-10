import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, LogIn, User, Lock, ArrowRight, Compass } from "lucide-react";

import Globe3D from "./Auth/Globe3D";
import TravelQuote from "./Auth/TravelQuote";
import TravelChecklist from "./Auth/TravelChecklist";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      // IMPORTANT: Pass both pieces of data to your Context
      login(res.data.user, res.data.token);

      if (res.data.user.isAdmin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }







      setMessage(`🌟 Welcome back, ${res.data.user.username}!`);

    } catch (err) {
      // Capture the specific error message from the backend
      setError(
        err.response?.data?.message ||
        "🔐 Login failed. Check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
      {/* Background/Globe Elements */}
      <div className="absolute inset-0">
        <Globe3D />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-blue-900/30 to-slate-900/90" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-6xl flex flex-col lg:flex-row gap-8"
        >
          {/* Left Panel - Info */}
          <div className="lg:w-2/5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-2xl">
                <Plane className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">Travelo</h1>
            </div>
            <TravelQuote />
            <TravelChecklist />
          </div>

          {/* Right Panel - Form */}
          <motion.div className="lg:w-3/5 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-8">
              <LogIn className="text-emerald-400" />
              <h2 className="text-3xl font-bold text-white">Login</h2>
            </div>

            {message && (
              <div className="p-4 mb-4 bg-emerald-500/20 text-emerald-300 rounded-xl text-center">
                {message}
              </div>
            )}
            {error && (
              <div className="p-4 mb-4 bg-red-500/20 text-red-300 rounded-xl text-center">
                {error}
              </div>
            )}

            <form onSubmit={submit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-white/80 flex items-center gap-2">
                  <User size={16} /> Username
                </label>
                <input
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter username"
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-white/80 flex items-center gap-2">
                  <Lock size={16} /> Password
                </label>
                <input
                  type="password"
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full p-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-2xl font-bold hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {isLoading ? "Boarding..." : "Continue Adventure"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
