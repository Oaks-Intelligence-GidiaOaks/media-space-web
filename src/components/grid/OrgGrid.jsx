import React, { useState } from "react";
import { Table, Pagination } from "flowbite-react";
import organizationData from "../constants/organizationsData.json";
import more from "../../assets/more.svg";
import { MonthDropDown } from "../ui";
import SortingComponent from "./SortingComponent";

function OrgGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(organizationData.organizations);

  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, data.length);

  const onPageChange = (page) => setCurrentPage(page);

  // function to handle filtering
  // const handleMonthSelection = (month) => {
  //   setSelectedMonth(month);
  // };

  // sorting function
  const handleSortChange = (sortedData) => {
    if (!sortedData) {
      setData(organizationData.organizations);
      return;
    }
    setData(sortedData);
  };

  return (
    // <div>
    <div className="overflow-x-auto mx-auto max-w-4xl border border-[#E6EDFF] scrollbar-thin  scrollbar-thumb-[#AEAEAE] scrollbar-track-gray-200">
      <div className="p-3 flex items-center justify-between">
        <h1 className=" font-Inter font-semibold text-lg text-primary-dark-gray">
          Organizations
        </h1>

        <MonthDropDown
        // selectedMonth={selectedMonth}
        // onChange={handleMonthSelection}
        />
      </div>

      <SortingComponent data={data} onSortChange={handleSortChange} />
      <Table hoverable className="">
        <Table.Head className="normal-case font-Inter text-sm text-primary-dark-gray font-medium">
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>API Keys</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Organization Name</Table.HeadCell>
          <Table.HeadCell>Location</Table.HeadCell>
          <Table.HeadCell>Total users</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y m-3">
          {data.slice(startIndex, endIndex).map((org) => (
            <Table.Row
              key={org.No}
              className=" font-Inter bg-white hover:bg-gray-200 text-xs font-normal text-primary-dark-gray"
            >
              <Table.Cell className="whitespace-nowrap">{org.No}</Table.Cell>
              <Table.Cell>{org.APIKeys}</Table.Cell>
              <Table.Cell>{org.Date}</Table.Cell>
              <Table.Cell>{org.OrganizationName}</Table.Cell>
              <Table.Cell>{org.Location}</Table.Cell>
              <Table.Cell>{org.Totalusers}</Table.Cell>
              <Table.Cell>{org.Status}</Table.Cell>
              <Table.Cell className=" hover:cursor-pointer">
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
}

export default OrgGrid;
