// search.js
import React from "react";

const Search = ({ query, onChange, onSearch }) => {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search by title"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
