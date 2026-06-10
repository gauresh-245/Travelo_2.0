import React from "react";

const PaymentSuccess = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-md rounded-2xl p-8 text-center shadow-2xl">
        <div className="text-green-600 text-6xl mb-4">✔</div>

        <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>

        <p className="text-gray-600 mb-6">Your booking has been confirmed.</p>

        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl"
        >
          Back to Packages
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
