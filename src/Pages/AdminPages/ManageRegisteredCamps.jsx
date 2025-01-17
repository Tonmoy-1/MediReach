import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ManageRegisteredCamps = () => {
  const { data: registerData, isLoading } = useQuery({
    queryKey: ["allcamps"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/registerCamps`
      );
      return data;
    },
  });
  console.log(registerData);
  if (isLoading) return <p>Loading.........</p>;

  //   const handleCancel = async (campId) => {
  //     try {
  //       // Cancel registration for the specific camp
  //       await axios.delete(
  //         `${import.meta.env.VITE_API_URL}/registered-camps/${campId}`
  //       );
  //       setRegisteredCamps((prevCamps) =>
  //         prevCamps.filter((camp) => camp._id !== campId)
  //       );
  //       alert("Registration canceled successfully.");
  //     } catch (error) {
  //       console.error("Error canceling registration:", error);
  //       alert("Failed to cancel registration.");
  //     }
  //   };

  return (
    <div className="min-h-screen py-10  dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-teal-600 dark:text-white mb-6 text-center">
          Manage Registered Camps
        </h1>
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-300">
                  Camp Name
                </th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-300">
                  Camp Fees
                </th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-300">
                  Participant Name
                </th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-300">
                  Payment Status
                </th>
                <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-300">
                  Confirmation Status
                </th>
                <th className="px-4 py-2 text-center text-gray-800 dark:text-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {registerData.length > 0 ? (
                registerData.map((camp) => (
                  <tr
                    key={camp._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                      {camp?.campDetails?.name}
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                      ${camp?.campDetails?.fees}
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                      {camp.participantName}
                    </td>
                    <td
                      className={`px-4 font-bold py-2 ${
                        camp.paymentStatus === "pay"
                          ? "text-red-600"
                          : "text-green-600"
                      } `}
                    >
                      {camp.paymentStatus === "pay" ? "Unpaid" : "Paid"}
                    </td>
                    <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                      {camp.confirmationStatus}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        // onClick={() => handleCancel(camp._id)}
                        className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-500 rounded-lg"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-6 text-center text-gray-600 dark:text-gray-400"
                  >
                    No registered camps found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
