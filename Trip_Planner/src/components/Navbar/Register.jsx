import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plane,
  Globe,
  UserPlus,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import Globe3D from "./Auth/Globe3D";
import TravelQuote from "./Auth/TravelQuote";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    dreamDestination: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage("🎉 Registration successful! Your adventure begins now...");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError("✈️ Oops! Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDestinationSelect = (destination) => {
    setForm({ ...form, dreamDestination: destination });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <Globe3D />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-purple-900/30 to-slate-900/90" />

        {/* Animated floating elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Plane className="w-6 h-6 text-white/20" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl flex flex-col lg:flex-row gap-8"
        >
          {/* Left Side - Travel Inspiration */}
          <div className="lg:w-2/5 space-y-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white">
                  Join{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Travelo
                  </span>
                </h1>
              </div>

              <p className="text-white/70 text-lg">
                Start your journey with us. Plan, book, and experience
                unforgettable adventures around the globe.
              </p>
            </motion.div>

            <TravelQuote />

           

            {/* Travel Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-2xl font-bold text-cyan-400">50K+</div>
                <div className="text-sm text-white/60">Happy Travelers</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-2xl font-bold text-purple-400">150+</div>
                <div className="text-sm text-white/60">Destinations</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-2xl font-bold text-pink-400">24/7</div>
                <div className="text-sm text-white/60">Support</div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:w-3/5"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    Start Your Journey
                  </h2>
                </div>
                <div className="flex gap-2">
                  {[1, 2].map((s) => (
                    <div
                      key={s}
                      className={`w-3 h-3 rounded-full ${
                        step === s ? "bg-cyan-400" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl text-green-300 text-center"
                >
                  {message}
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl text-red-300 text-center"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-white/80">
                      <UserPlus className="w-4 h-4" />
                      Username
                    </label>
                    <input
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Enter your travel name"
                      required
                      onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-white/80">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <input
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                      type="email"
                      required
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-white/80">
                      <Phone className="w-4 h-4" />
                      Mobile
                    </label>
                    <input
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+91 98765 43210"
                      required
                      onChange={(e) =>
                        setForm({ ...form, mobile: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-white/80">
                      <Lock className="w-4 h-4" />
                      Password
                    </label>
                    <input
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      type="password"
                      placeholder="Create secure password"
                      required
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                  </div>
                </div>

                {form.dreamDestination && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-cyan-400" />
                        <span className="text-white">
                          Your dream destination:{" "}
                          <span className="font-bold text-cyan-300">
                            {form.dreamDestination}
                          </span>
                        </span>
                      </div>
                      <Plane className="w-5 h-5 text-purple-400" />
                    </div>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group relative bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white p-4 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Starting Your Journey...
                      </>
                    ) : (
                      <>
                        Begin Adventure
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-center text-white/60">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
                  >
                    Continue Your Journey →
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/40 text-sm">
        ✈️ Travelo - Where Journeys Begin
      </div>
    </div>
  );
};

export default Register;
