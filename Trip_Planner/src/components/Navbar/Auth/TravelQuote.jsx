import { useState, useEffect } from "react";
import { Plane, Navigation, Compass, MapPin, BookOpen } from "lucide-react"; // Make sure BookOpen is imported
import { motion, AnimatePresence } from "framer-motion";

const travelQuotes = [
  {
    text: "The world is a book and those who do not travel read only one page",
    author: "Saint Augustine",
    icon: <BookOpen className="w-6 h-6" />, // Use BookOpen here
    color: "from-blue-500 to-cyan-400",
  },
  {
    text: "Adventure is worthwhile in itself",
    author: "Amelia Earhart",
    icon: <Plane className="w-6 h-6" />,
    color: "from-purple-500 to-pink-400",
  },
  {
    text: "Travel far, travel wide, travel with purpose",
    author: "Travelo",
    icon: <Compass className="w-6 h-6" />,
    color: "from-orange-500 to-yellow-400",
  },
  {
    text: "Every journey begins with a single step",
    author: "Lao Tzu",
    icon: <Navigation className="w-6 h-6" />,
    color: "from-green-500 to-emerald-400",
  },
];

const TravelQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % travelQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuote}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`p-8 rounded-2xl bg-gradient-to-br ${travelQuotes[currentQuote].color} text-white shadow-2xl`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            {travelQuotes[currentQuote].icon}
          </div>
          <div>
            <p className="text-xl font-semibold italic">
              "{travelQuotes[currentQuote].text}"
            </p>
            <p className="text-white/80 mt-2">
              — {travelQuotes[currentQuote].author}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TravelQuote;
