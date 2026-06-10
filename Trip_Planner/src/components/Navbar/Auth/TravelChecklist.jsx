import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Luggage,
  Camera,
  FileText,
  CreditCard,
  Smartphone,
} from "lucide-react"; // Changed Passport to FileText

const checklistItems = [
  { id: 1, text: "Valid Passport", icon: <FileText className="w-5 h-5" /> }, // Changed to FileText
  { id: 2, text: "Travel Insurance", icon: <CreditCard className="w-5 h-5" /> },
  { id: 3, text: "Camera Gear", icon: <Camera className="w-5 h-5" /> },
  { id: 4, text: "Packed Bags", icon: <Luggage className="w-5 h-5" /> },
  { id: 5, text: "Mobile with Maps", icon: <Smartphone className="w-5 h-5" /> },
];

const TravelChecklist = () => {
  const [checkedItems, setCheckedItems] = useState([]);

  const toggleItem = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      <h4 className="text-white/90 font-semibold">Travel Checklist</h4>
      <div className="space-y-3">
        {checklistItems.map((item) => {
          const isChecked = checkedItems.includes(item.id);
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl backdrop-blur-sm transition-all ${
                isChecked
                  ? "bg-green-500/20 border border-green-500/30"
                  : "bg-white/10 border border-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    isChecked ? "bg-green-500/30" : "bg-white/10"
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`font-medium ${
                    isChecked ? "text-green-300 line-through" : "text-white/80"
                  }`}
                >
                  {item.text}
                </span>
              </div>
              {isChecked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-1 bg-green-500 rounded-full"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
      {checkedItems.length === checklistItems.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-green-300 font-semibold"
        >
          🎉 You're all set for your adventure!
        </motion.div>
      )}
    </div>
  );
};

export default TravelChecklist;
