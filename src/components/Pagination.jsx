import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({ pageCount, onPageChange }) {
  return (
    <div className="pb-4">
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        onPageChange={onPageChange}
        containerClassName="flex justify-center space-x-1 font-semibold items-center"
        previousLabel="Previous"
        nextLabel="Next"
        activeClassName="text-white"
        pageClassName="px-3 rounded-lg bg-slate-400 p-1"
        previousClassName="px-3 p-1 border rounded-lg bg-slate-700 text-white"
        nextClassName="px-3 p-1 border rounded-lg bg-slate-700 text-white"
        breakClassName="px-3 rounded-lg bg-slate-400 p-1"
        disabledClassName="opacity-50"
      />
    </div>
  )
}

export default Pagination;