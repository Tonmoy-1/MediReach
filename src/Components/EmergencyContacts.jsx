import { FaAmbulance, FaPhoneAlt, FaHospital } from "react-icons/fa";

export default function EmergencyContacts() {
  const contacts = [
    { name: "Ambulance", number: "102", icon: <FaAmbulance /> },
    { name: "Emergency Hotline", number: "112", icon: <FaPhoneAlt /> },
    { name: "Nearest Hospital", number: "911", icon: <FaHospital /> },
  ];

  return (
    <section className="bg-red-100 dark:bg-gray-900 py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Emergency Contacts
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Save these emergency numbers for immediate assistance.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:scale-105 transition"
          >
            <div className="text-5xl text-red-500 dark:text-red-400">
              {contact.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-4">
              {contact.name}
            </h3>
            <p className="text-lg font-bold text-red-600 dark:text-red-400">
              {contact.number}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
