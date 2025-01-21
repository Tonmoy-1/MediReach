/* eslint-disable react/prop-types */
const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Function to generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage > totalPages - 3) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-between items-center mt-5">
      {/* Displaying item range */}
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * itemsPerPage + 1}
        </span>
        -
        <span className="font-semibold">
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{" "}
        of <span className="font-semibold">{totalItems}</span>
      </p>

      {/* Pagination controls */}
      <div className="flex space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          &lt;
        </button>

        {getPageNumbers().map((num, index) =>
          num === "..." ? (
            <span key={index} className="px-3 py-1">
              ...
            </span>
          ) : (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`px-3 py-1 border rounded ${
                currentPage === num
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              {num}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
