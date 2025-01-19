import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Spinner from "../Spinner";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  // get feedback data using tanstack
  const { data: paymentData = [], isLoading } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payment-data`);
      return data;
    },
  });
  if (isLoading) return <Spinner></Spinner>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">
        Payment History
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="px-4 py-2 text-left">Camp Name</th>
              <th className="px-4 py-2 text-left">Camp Fees</th>
              <th className="px-4 py-2 text-left">Payment Status</th>
              <th className="px-4 py-2 text-left">Confirmation Status</th>
              <th className="px-4 py-2 text-left">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((payment, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "bg-white dark:bg-gray-800"
                } border-b border-gray-300 dark:border-gray-700`}
              >
                <td className="px-4 py-2">{payment.campName}</td>
                <td className="px-4 py-2">${payment.campFees}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    payment.paymentStatus === "Paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {payment.paymentStatus}
                </td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    payment.confirmationStatus === "Confirmed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {payment.confirmationStatus}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  {payment.transactionId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
