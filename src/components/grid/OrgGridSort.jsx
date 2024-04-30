import React, { useState } from "react";
import { Table, Pagination } from "flowbite-react";
// import organizationData from "../constants/organizationsData.json";
import more from "../../assets/more.svg";
import { MonthDropDown } from "../ui";

const OrgGridSort = ({ data, title, action }) => {
  const newData = data?.organizations;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState(newData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  if (!sortedData) {
    return (
      <p className="font-semibold text-2xl">
        No data to render, kindly send in data as prop
      </p>
    );
  }
  const columns = Object.keys(sortedData[0])
    .filter((i) => i !== "_id" && i !== "apiKey")
    .map((key) => ({
      key: key,
      label: key,
    }));

  // console.log("Columns: ", columns);

  const ITEMS_PER_PAGE = newData?.length > 10 ? 10 : newData?.length;
  const totalPages = Math.ceil(newData?.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, newData.length);

  const onPageChange = (page) => setCurrentPage(page);

  // Function to handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sorted = [...newData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
    setSortConfig({ key, direction });
  };

  return (
    <div className="overflow-x-auto mx-auto w-full border border-[#E6EDFF] scrollbar-thin  scrollbar-thumb-[#AEAEAE] scrollbar-track-gray-200">
      <div className="p-3 flex items-center justify-between">
        <h1 className=" font-Inter font-semibold text-lg text-primary-dark-gray">
          {title}
        </h1>

        <MonthDropDown
        // selectedMonth={selectedMonth}
        // onChange={handleMonthSelection}
        />
      </div>
      <Table hoverable className="">
        <Table.Head className="normal-case font-Inter text-sm text-primary-dark-gray font-medium">
          {columns.map((column) => (
            <Table.HeadCell
              className="max-w-[80px]"
              key={column.key}
              onClick={() => handleSort(column.key)}
            >
              {column.label}
              {sortConfig.key === column.key && (
                <span>{sortConfig.direction === "asc" ? " 🔼" : " 🔽"}</span>
              )}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y m-3">
          {sortedData.slice(startIndex, endIndex).map((org, i) => (
            <Table.Row
              key={i}
              className=" font-Inter bg-white hover:bg-gray-200 text-xs font-normal text-primary-dark-gray"
            >
              {columns.map((column) => (
                // <td key={column.key}>{row[column.key]}</td>
                <Table.Cell key={column.key} className="whitespace-nowrap">
                  {/* {"Test"} */}
                  {org[column.key]}
                </Table.Cell>
              ))}
              <Table.Cell
                onClick={(e) => {
                  action && action(e);
                }}
                className=" hover:cursor-pointer"
              >
                <img src={more} alt="" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

OrgGridSort.defaultProps = {
  title: "Title prop (title)",
  // data: organizationData,
};

export default OrgGridSort;
