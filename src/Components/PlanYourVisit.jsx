import { FaMapMarkerAlt } from "react-icons/fa";

const locations = [
  { city: "Dhaka", address: "123 Main St, Dhaka", time: "9 AM - 5 PM" },
  {
    city: "Chittagong",
    address: "456 Market St, Chittagong",
    time: "9 AM - 6 PM",
  },
  { city: "Sylhet", address: "789 Highway Rd, Sylhet", time: "9 AM - 4 PM" },
];

const PlanYourVisit = () => {
  return (
    <section className="py-16 px-8 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Plan Your Visit
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Find a clinic or doctor near you and book your visit easily through
          MediReach.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-[#10B98E] text-2xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {location.city}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {location.address}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Operating Hours: {location.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanYourVisit;
