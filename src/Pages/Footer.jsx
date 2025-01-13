const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              About MCMS
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              The Medical Camp Management System (MCMS) simplifies the
              organization and participation of medical camps. It bridges the
              gap between organizers and participants to improve healthcare
              access in communities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-teal-600 dark:hover:text-teal-400 transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-teal-600 dark:hover:text-teal-400 transition"
                >
                  Available Camps
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-teal-600 dark:hover:text-teal-400 transition"
                >
                  Join Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-teal-600 dark:hover:text-teal-400 transition"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-teal-600 dark:hover:text-teal-400 transition"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@mcms.com"
                    className="hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    info@mcms.com
                  </a>
                </span>
              </li>
              <li>
                <span className="text-sm">
                  <strong>Phone:</strong> +123 456 7890
                </span>
              </li>
              <li>
                <span className="text-sm">
                  <strong>Address:</strong> 123 Medical Lane, Health City, HC
                  45678
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-gray-700 my-8"></div>

        {/* Newsletter & Social Media */}
        <div className="md:flex md:justify-between md:items-center">
          {/* Newsletter */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Subscribe to our Newsletter
            </h3>
            <form className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-500 focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-700"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6 justify-center">
            <a
              href="#"
              className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm mt-8 text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} MCMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
