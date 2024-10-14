import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-l-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
                Previous
            </button>
            <span className="px-4 py-2 bg-white border-t border-b border-gray-300">{currentPage} / {totalPages}</span>
            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
