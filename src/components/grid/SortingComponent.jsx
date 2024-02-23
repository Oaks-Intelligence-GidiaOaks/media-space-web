import React, { useState } from "react";

const SortingComponent = ({ data, onSortChange }) => {
  const [sortType, setSortType] = useState(null);

  const newData = data;

  const handleSort = (type) => {
    let sorted = [...newData];
    if (type === "asc") {
      sorted.sort((a, b) => (a < b ? -1 : 1));
      onSortChange(sorted);
    } else if (type === "desc") {
      sorted.sort((a, b) => (a > b ? -1 : 1));
      onSortChange(sorted);
    } else {
      onSortChange(null);
    }
    setSortType(type);
  };

  return (
    <div className="mb-3">
      <button
        className="bg-primary-dark-green text-white rounded-lg p-2 px-3 mr-3"
        onClick={() => handleSort("asc")}
      >
        Sort Ascending
      </button>
      <button
        className="bg-primary-dark-green text-white rounded-lg p-2 px-3 mr-3"
        onClick={() => handleSort("desc")}
      >
        Sort Descending
      </button>
      <button
        className="bg-primary-dark-green text-white rounded-lg p-2 px-3 mr-3"
        onClick={() => handleSort(null)}
      >
        Reset
      </button>
    </div>
  );
};

export default SortingComponent;
