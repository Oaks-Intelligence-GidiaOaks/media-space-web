import React from "react";

const MonthDropDown = ({ selectedMonth, onChange }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleChange = (e) => {
    const selectedMonth = e.target.value;
    onChange(selectedMonth);
  };

  return (
    <div className="">
      <select
        className=" focus:ring-0 font-medium border-none text-sm rounded text-primary-dark-gray focus:border-none shadow-lg"
        value={selectedMonth}
        onChange={handleChange}
      >
        <option value="" className="">
          Monthly
        </option>
        {months.map((month, index) => (
          <option key={index} value={month} className="">
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthDropDown;
