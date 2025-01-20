import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: data = [], isLoading } = useQuery({
    queryKey: ["campData"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/registerCamps`);
      return data;
    },
  });

  if (isLoading) return <Spinner />;

  // Calculate summary metrics
  const totalCamps = data.length;
  const totalParticipants = data.reduce(
    (sum, camp) => sum + camp.campDetails.participantCount,
    0
  );
  const totalFeesPaid = data.reduce(
    (sum, camp) =>
      camp.paymentStatus === "Paid"
        ? sum + parseInt(camp.campDetails.fees)
        : sum,
    0
  );

  const paymentData = [
    {
      name: "Paid",
      value: data.filter((camp) => camp.paymentStatus === "Paid").length,
    },
    {
      name: "Pending",
      value: data.filter((camp) => camp.paymentStatus !== "Paid").length,
    },
  ];

  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <div className="container mx-auto p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">
        Participant Analytics
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          { label: "Total Camps", value: totalCamps },
          { label: "Total Participants", value: totalParticipants },
          { label: "Total Fees Paid", value: `$${totalFeesPaid}` },
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center hover:shadow-xl transition-all"
          >
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
              {item.label}
            </h3>
            <p className="text-5xl font-bold text-green-500 dark:text-green-400 mt-4">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-300 text-center">
            Camp Fees Overview
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={data.map((camp) => ({
                name: camp.campDetails.name,
                fees: parseInt(camp.campDetails.fees),
              }))}
            >
              <XAxis dataKey="name" tick={{ fill: "#10B98E" }} />
              <YAxis tick={{ fill: "#10B98E" }} />
              <Tooltip />
              <Bar dataKey="fees" fill="#10B98E" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-300 text-center">
            Payment Status Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie data={paymentData} dataKey="value" outerRadius={120} label>
                {paymentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                align="center"
                iconSize={16}
                iconType="circle"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

Analytics.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      campDetails: PropTypes.shape({
        participantCount: PropTypes.number.isRequired,
        fees: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      paymentStatus: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Analytics;
