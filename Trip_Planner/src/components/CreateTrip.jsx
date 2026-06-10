import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import HotelSearch from "./HotelSearch";

/* =========================
    LOCAL IMAGES
========================= */
import goaImg from "../assets/goa_place.jpg";
import jammuKashmirImg from "../assets/jammu_kashmir.jpg";
import himachalImg from "../assets/himachal_pradesh.jpg";
import munnarImg from "../assets/munnar.jpg";
import keralaImg from "../assets/kerala.jpg";
import rajasthanImg from "../assets/rajasthan.jpg";
import delhiImg from "../assets/delhi.jpg";
import agraImg from "../assets/agra.jpg";
import ootyImg from "../assets/ooty.jpg";
import darjeelingImg from "../assets/darjeeling.jpg";
import kanyakumariImg from "../assets/kanyakumari.jpg";

/* =========================
    HELPERS
========================= */
const toSlug = (text) =>
  text.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

/* =========================
    CONSTANTS
========================= */
export const BudgetOptions = [
  { icon: "💵", id: 1, title: "Cheap" },
  { icon: "💰", id: 2, title: "Moderate" },
  { icon: "💸", id: 3, title: "Luxury" },
];

const predefinedLocations = [
  "Goa", "Jammu & Kashmir", "Himachal Pradesh", "Munnar", "Kerala",
  "Rajasthan", "Delhi", "Agra", "Ooty", "Darjeeling", "Kanyakumari",
];

const seasonalSuggestions = [
  {
    season: "Winter",
    emoji: "❄️",
    description: "Snowy mountain views and cozy evenings.",
    locations: ["Jammu & Kashmir", "Himachal Pradesh", "Darjeeling"],
    gradient: "from-blue-100 to-indigo-100",
  },
  {
    season: "Monsoon",
    emoji: "🌧️",
    description: "Lush greenery and waterfalls.",
    locations: ["Kerala", "Munnar", "Goa"],
    gradient: "from-green-100 to-emerald-100",
  },
  {
    season: "Summer",
    emoji: "☀️",
    description: "Heritage and cool hill escapes.",
    locations: ["Rajasthan", "Delhi", "Agra", "Ooty", "Kanyakumari"],
    gradient: "from-orange-100 to-yellow-100",
  },
];

const localImages = {
  Goa: goaImg,
  "Jammu & Kashmir": jammuKashmirImg,
  "Himachal Pradesh": himachalImg,
  Munnar: munnarImg,
  Kerala: keralaImg,
  Rajasthan: rajasthanImg,
  Delhi: delhiImg,
  Agra: agraImg,
  Ooty: ootyImg,
  Darjeeling: darjeelingImg,
  Kanyakumari: kanyakumariImg,
};

const getImage = (location) =>
  localImages[location] ||
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800";

/* =========================
    COMPONENT
========================= */
function CreateTrip() {
  const [tripData, setTripData] = useState({
    Destination: "",
    NoofDays: "",
    Budget: "",
  });

  const [query, setQuery] = useState("");
  const [showHotels, setShowHotels] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleSubmit = () => {
    const { Destination, NoofDays, Budget } = tripData;
    if (!Destination || !NoofDays || !Budget) {
      alert("Please fill all fields");
      return;
    }
    setShowHotels(true);
  };

  const handleBudgetSelect = (title) => {
    setTripData((p) => ({ ...p, Budget: title }));
    setSelectedBudget(title);
  };

  if (showHotels) {
    return (
      <HotelSearch
        destination={tripData.Destination}
        budget={tripData.Budget}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-100 py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-20">

        {/* HEADER */}
        <div className="text-center space-y-4 mt-20">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Plan Your Trip ✨
          </h1>
          <p className="text-gray-600 text-lg">
            Build your journey step by step
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-10 space-y-12">

          {/* STEP 1 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">1</span>
              Destination
            </h2>

            <div ref={containerRef} className="relative">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setTripData((p) => ({ ...p, Destination: e.target.value }));
                  setSuggestions(
                    predefinedLocations.filter((l) =>
                      l.toLowerCase().includes(e.target.value.toLowerCase())
                    )
                  );
                }}
                placeholder="Search destination"
                className="w-full p-4 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-200 outline-none"
              />

              {suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white rounded-xl shadow-lg mt-2 overflow-hidden">
                  {suggestions.map((s) => (
                    <div
                      key={s}
                      onClick={() => {
                        setQuery(s);
                        setTripData((p) => ({ ...p, Destination: s }));
                        setSuggestions([]);
                      }}
                      className="flex items-center gap-3 p-4 hover:bg-blue-50 cursor-pointer"
                    >
                      <img src={getImage(s)} className="w-10 h-10 rounded-lg" />
                      <span className="font-medium">{s}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* STEP 2 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">2</span>
              Duration
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[3, 5, 7, 10].map((d) => (
                <button
                  key={d}
                  onClick={() =>
                    setTripData((p) => ({ ...p, NoofDays: d.toString() }))
                  }
                  className={`py-4 rounded-xl font-semibold transition-all ${tripData.NoofDays === d.toString()
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 hover:bg-blue-100"
                    }`}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">3</span>
              Budget
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {BudgetOptions.map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleBudgetSelect(b.title)}
                  className={`p-6 rounded-2xl text-center transition-all ${selectedBudget === b.title
                      ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl"
                      : "bg-gray-100 hover:shadow-md"
                    }`}
                >
                  <div className="text-5xl mb-2">{b.icon}</div>
                  <div className="text-xl font-bold">{b.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            className="w-full py-5 rounded-2xl text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] transition-all"
          >
            Create My Trip 🚀
          </button>
        </div>

        {/* SEASONAL INSPIRATION */}
        {/* SECTION TITLE */}
        <div className="text-center space-y-3">
          <h1 className="text-6xl font-extrabold text-gray-800">
            Seasonal Inspiration 🌍
          </h1>
          <p className="text-gray-600 text-lg">
            Discover the best destinations based on the season
          </p>
        </div>

        <div className="space-y-12">
          {seasonalSuggestions.map((s) => (
            <div
              key={s.season}
              className={`rounded-3xl p-8 bg-gradient-to-r ${s.gradient} shadow-lg`}
            >
              <h3 className="text-3xl font-bold mb-6">
                {s.emoji} {s.season}
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                {s.locations.map((loc) => (
                  <Link
                    key={loc}
                    to={`/destination/${toSlug(loc)}`}
                    className="rounded-xl overflow-hidden bg-white shadow hover:shadow-xl transition-all"
                  >
                    <img
                      src={getImage(loc)}
                      className="h-56 w-full object-cover"
                    />
                    <div className="p-4 font-bold text-center">{loc}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default CreateTrip;
