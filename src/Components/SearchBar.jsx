import PropTypes from "prop-types";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by Camp Name, Date, or Healthcare Professional"
        className="w-full max-w-lg p-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
