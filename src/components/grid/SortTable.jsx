import React, { useState } from "react";

const SortTable = ({ data, onSortChange }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const columns = Object.keys(data[0]).map((key) => ({ key: key, label: key }));

  // Function to handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    onSortChange(sorted);
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <select
        className="rounded-xl my-3"
        name="sort"
        value={sortConfig.key}
        onChange={(e) => handleSort(e.target.value)}
      >
        <option defaultValue="sort" disabled="">
          Sort
        </option>
        {columns.map((column) => (
          <option key={column.key} onClick={() => handleSort(column.key)}>
            {column.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortTable;
