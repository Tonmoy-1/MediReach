/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckOutFrom";
const stripePromise = loadStripe(import.meta.env.VITE_STRPE_PUBLIC_KEY);
const PaymentModal = ({ isOpen, onClose, fees, camp }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-5xl lg:w-3/4 rounded-lg shadow-lg overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-teal-600 dark:text-gray-100">
              Payment System
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Check All Information Deeply Before payment!
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="ml-4 p-4">
          <h2 className="md:text-2xl mb-2 font-bold text-lg">
            Your Total Bill
          </h2>
          <h2 className="font-bold md:text-4xl">$ {fees}</h2>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          <Elements stripe={stripePromise}>
            {/* from components */}
            <CheckoutForm camp={camp}></CheckoutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
