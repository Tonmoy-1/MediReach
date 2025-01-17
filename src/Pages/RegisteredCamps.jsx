/* eslint-disable react/prop-types */

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const RegisteredCamps = () => {
  const { user } = useContext(AuthContext);
  const { data: registeredCamps, isLoading } = useQuery({
    queryKey: ["registeredCamps"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/registerCamps/${user?.email}`
      );
      return data;
    },
  });
  console.log(registeredCamps);
  if (isLoading) return <p>Loading.........</p>;
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-5">
          Registered Camps
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
                <th className="px-6 py-3 text-sm font-medium">Camp Name</th>
                <th className="px-6 py-3 text-sm font-medium">Camp Fees</th>
                <th className="px-6 py-3 text-sm font-medium">
                  Participant Name
                </th>
                <th className="px-6 py-3 text-sm font-medium">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-sm font-medium">Confirmation</th>
                <th className="px-6 py-3 text-sm font-medium">Actions</th>
                <th className="px-6 py-3 text-sm font-medium">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {registeredCamps.map((camp, index) => (
                <tr
                  key={camp._id}
                  className={`${
                    index % 2 === 0
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "bg-white dark:bg-gray-800"
                  } border-b border-gray-300 dark:border-gray-700`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-300">
                    {camp?.campDetails?.name}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-300">
                    $ {camp?.campDetails?.fees}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-800 dark:text-gray-300">
                    {camp.participantName}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <button
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        camp.paymentStatus === "Paid"
                          ? "disable"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {camp.paymentStatus}
                    </button>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        camp.isConfirmed
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {camp.isConfirmed ? "Confirmed" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm ">
                    <button
                      //   onClick={() => handleFeedback(camp.id)}
                      className="px-4 py-2 bg-teal-500 text-white rounded-lg text-xs font-medium hover:bg-teal-400"
                    >
                      Feedback
                    </button>
                  </td>
                  <td className="px-6 py-3 text-sm ">
                    <button
                      //   onClick={() => handleCancel(camp.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-400"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {registeredCamps.length === 0 && (
            <div className="mt-5 text-center text-gray-600 dark:text-gray-400">
              No registered camps to display.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredCamps;
