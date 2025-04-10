// components/Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-16 font-body font-extrabold">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 mx-1 text-black ${currentPage === 1 ? "text-gray-600" : "text-black"}`}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 py-1.5 mx-1 ${
            page === currentPage ? 'bg-primary text-white' : 'text-black'
          }`}
        >
          0{page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 mx-1 text-black ${currentPage === totalPages ? "text-gray-600" : "text-black"}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
