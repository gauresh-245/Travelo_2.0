import React, { useEffect, useState } from "react";
import {
  MapPin,
  Star,
  ArrowRight,
  Sparkles,
  Zap,
  Crown,
  Coffee,
} from "lucide-react";

/* ================= IMAGE IMPORTS ================= */
// GOA
import goa1 from "../../assets/goa_slider1.jpg";
import goa2 from "../../assets/goa_slider2.jpg";
import goa3 from "../../assets/goa_slider3.jpg";

// HIMACHAL
import himachal1 from "../../assets/himachal_pradesh_slider1.jpg";
import himachal2 from "../../assets/himachal_pradesh_slider2.jpg";
import himachal3 from "../../assets/himachal_pradesh_slider3.jpg";

// KERALA
import kerala1 from "../../assets/kerala_slider1.jpg";
import kerala2 from "../../assets/kerala_slider2.jpg";
import kerala3 from "../../assets/kerala_slider3.jpg";

// RAJASTHAN
import rajasthan1 from "../../assets/Rajasthan_slider1.jpg";
import rajasthan2 from "../../assets/Rajasthan_slider2.jpg";
import rajasthan3 from "../../assets/Rajasthan_slider3.jpg";

// KANYAKUMARI
import kanya1 from "../../assets/kanyakumari_slider1.jpg";
import kanya2 from "../../assets/kanyakumari_slider2.jpg";
import kanya3 from "../../assets/kanyakumari_slider3.jpg";

/* ================= UPDATED DYNAMIC DATA ================= */

const destinations = [
  {
    id: "goa",
    name: "Goa",
    packages: [
      {
        tier: "Budget Explorer",
        icon: <Coffee className="text-orange-400" />,
        duration: "3N / 4D",
        price: "₹8,999",
        originalPrice: "₹11,000",
        description: "Explore the hippie side of North Goa with scooter rentals and beach shacks.",
        highlights: ["Hostel Stay", "Scooter Rental", "Anjuna Night Market"],
        rating: 4.5,
        images: [goa1, goa2], 
      },
      {
        tier: "Luxury Elite",
        icon: <Crown className="text-cyan-400" />,
        duration: "5N / 6D",
        price: "₹29,999",
        originalPrice: "₹35,000",
        description: "Private villas in South Goa with personal chefs and yacht parties.",
        highlights: ["Private Pool Villa", "Yacht Cruise", "Fine Dining"],
        rating: 4.9,
        images: [goa3, goa1], 
      }
    ],
  },
  {
    id: "himachal",
    name: "Himachal",
    packages: [
      {
        tier: "Adventure Trek",
        icon: <Zap className="text-green-400" />,
        duration: "5N / 6D",
        price: "₹12,499",
        originalPrice: "₹15,000",
        description: "Riverside camping in Kasol and trekking to the Kheerganga peaks.",
        highlights: ["Riverside Tents", "Kheerganga Trek", "Bonfire Night"],
        rating: 4.7,
        images: [himachal1, himachal2],
      },
      {
        tier: "Family Retreat",
        icon: <Coffee className="text-blue-400" />,
        duration: "6N / 7D",
        price: "₹24,999",
        originalPrice: "₹30,000",
        description: "Luxury wood cabins in Manali and Shimla with private SUV sightseeing.",
        highlights: ["4-Star Resorts", "Private SUV", "Solang Valley"],
        rating: 4.8,
        images: [himachal3, himachal1],
      }
    ],
  },
  {
    id: "kerala",
    name: "Kerala",
    packages: [
      {
        tier: "Nature Stay",
        icon: <Zap className="text-emerald-400" />,
        duration: "4N / 5D",
        price: "₹16,499",
        originalPrice: "₹20,000",
        description: "Eco-friendly stays in Munnar tea gardens and spice plantation tours.",
        highlights: ["Tea Garden Resort", "Trekking", "Spice Tour"],
        rating: 4.6,
        images: [kerala1, kerala2],
      },
      {
        tier: "Royal Backwaters",
        icon: <Crown className="text-yellow-400" />,
        duration: "5N / 6D",
        price: "₹31,999",
        originalPrice: "₹38,000",
        description: "Full-board private luxury houseboat in Alleppey with Ayurvedic spa.",
        highlights: ["Private Houseboat", "Ayurvedic Massage", "Kathakali Performance"],
        rating: 4.9,
        images: [kerala3, kerala1],
      }
    ],
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    packages: [
      {
        tier: "Heritage Walk",
        icon: <Coffee className="text-amber-500" />,
        duration: "4N / 5D",
        price: "₹14,999",
        originalPrice: "₹18,000",
        description: "Experience the blue city of Jodhpur and heritage stays in old Havelis.",
        highlights: ["Haveli Stay", "Fort Tours", "Local Folk Music"],
        rating: 4.7,
        images: [rajasthan1, rajasthan2],
      },
      {
        tier: "Imperial Palace",
        icon: <Crown className="text-red-400" />,
        duration: "6N / 7D",
        price: "₹34,999",
        originalPrice: "₹42,000",
        description: "Stay in actual palaces of Udaipur and private desert camping in Jaisalmer.",
        highlights: ["Palace Stay", "Camel Safari", "Private Desert Dinner"],
        rating: 4.9,
        images: [rajasthan3, rajasthan1],
      }
    ],
  },
  {
    id: "kanyakumari",
    name: "Kanyakumari",
    packages: [
      {
        tier: "Peaceful Shores",
        icon: <Zap className="text-blue-300" />,
        duration: "2N / 3D",
        price: "₹9,499",
        originalPrice: "₹12,000",
        description: "Witness the sun rising and setting over the confluence of three oceans.",
        highlights: ["Vivekananda Rock", "Sunrise View", "Beach Temples"],
        rating: 4.5,
        images: [kanya1, kanya2],
      }
    ],
  }
];

/* ================= SLIDER COMPONENT ================= */

const DestinationSlider = ({ destination }) => {
  const [selectedPkgIdx, setSelectedPkgIdx] = useState(0);
  const activePkg = destination.packages[selectedPkgIdx];
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % activePkg.images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activePkg.images.length]);

  const handleTierChange = (idx) => {
    setSelectedPkgIdx(idx);
    setCurrentImg(0);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden mb-24 group bg-black">
      {/* BACKGROUND IMAGE WITH CROSSFADE */}
      {activePkg.images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentImg ? "opacity-50 scale-100" : "opacity-0 scale-110"
          }`}
        >
          <img src={img} alt="bg" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        </div>
      ))}

      <div className="relative z-20 h-full flex items-center px-6 md:px-24 py-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: CONTENT */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-2 text-cyan-400 mb-4 font-bold tracking-widest uppercase text-sm">
               <MapPin size={16}/> {destination.name} Edition
            </div>
            
            <h1 className="text-6xl font-black text-white mb-6 uppercase tracking-tighter">
              {activePkg.tier}
            </h1>

            <div className="flex gap-2 mb-8 bg-white/5 p-1.5 rounded-2xl w-fit border border-white/10 backdrop-blur-md">
              {destination.packages.map((pkg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTierChange(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                    selectedPkgIdx === idx 
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                    : "text-gray-400 hover:text-white"
                  }`}
                >
                  {pkg.tier}
                </button>
              ))}
            </div>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed italic">
              "{activePkg.description}"
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Includes</h4>
                <div className="flex flex-col gap-2">
                  {activePkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-white font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> {h}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                 <p className="text-gray-400 text-xs font-bold uppercase mb-2">Starts At</p>
                 <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">{activePkg.price}</span>
                    <span className="text-sm line-through text-gray-500">{activePkg.originalPrice}</span>
                 </div>
                 <div className="mt-3 inline-block px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-black rounded-full uppercase">
                    {activePkg.duration} Trip
                 </div>
              </div>
            </div>

            <div className="flex gap-4">
               <button className="px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                  BOOK NOW <ArrowRight size={20}/>
               </button>
               <button className="px-10 py-4 border-2 border-white/20 hover:bg-white/10 text-white font-black rounded-2xl transition-all">
                  DETAILS
               </button>
            </div>
          </div>

          {/* RIGHT: IMAGE PREVIEW */}
          <div className="order-1 lg:order-2 relative">
             <div className="relative group/img">
                <div className="absolute -inset-4 bg-cyan-500/20 rounded-[3rem] blur-2xl group-hover/img:bg-cyan-500/30 transition-all" />
                <img 
                  src={activePkg.images[currentImg]} 
                  className="relative w-full h-[500px] object-cover rounded-[2.5rem] border border-white/10 shadow-2xl transition-transform duration-700"
                  alt="active-package"
                />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl">
                   <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Satisfaction</p>
                        <div className="flex items-center gap-1 mt-1">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} size={14} className={i < Math.floor(activePkg.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"} />
                           ))}
                           <span className="ml-2 text-white font-bold">{activePkg.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase">Tier</p>
                        <div className="flex items-center justify-end gap-2">
                           {activePkg.icon}
                           <p className="text-white font-bold text-xs">{activePkg.tier.split(' ')[0]}</p>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ================= MAIN PACKAGES PAGE ================= */

const Packages = () => {
  return (
    <div className="w-full bg-black text-white py-12">
      {/* HERO HEADER */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-20 mt-12">
        <h2 className="text-sm font-black text-cyan-400 tracking-[0.3em] uppercase mb-4">Exclusive Catalog</h2>
        <h1 className="text-5xl md:text-7xl font-black mb-6 italic">Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Escapes</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          From budget-friendly backpacking to imperial palace stays, choose the version of India that speaks to your soul.
        </p>
      </div>

      {/* RENDER ALL DESTINATIONS */}
      {destinations.map((destination) => (
        <DestinationSlider key={destination.id} destination={destination} />
      ))}

      {/* FINAL CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-16 rounded-[4rem] backdrop-blur-3xl">
          <Sparkles className="mx-auto mb-6 text-cyan-400" size={48} />
          <h2 className="text-4xl md:text-6xl font-black mb-6">Want a custom tier?</h2>
          <p className="text-xl text-gray-400 mb-10">Mix and match any activities to create your own personalized package.</p>
          <button className="px-12 py-5 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            CONTACT AN EXPERT
          </button>
        </div>
      </section>
    </div>
  );
};

export default Packages;