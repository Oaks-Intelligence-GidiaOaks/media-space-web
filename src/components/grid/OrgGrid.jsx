import React from "react";
import { Table } from "flowbite-react";
import organizationData from "../constant/organizationsData.json";
import more from "../../assets/more.svg";
import { MonthDropDown } from "../ui";

function OrgGrid() {
  return (
    <div className="overflow-x-auto mx-auto max-w-4xl border border-[#E6EDFF] scrollbar-thin  scrollbar-thumb-[#AEAEAE] scrollbar-track-gray-200">
      <div className="p-3 flex items-center justify-between">
        <h1 className=" font-Inter font-semibold text-lg text-primary-dark-gray">Organizations</h1>

        <MonthDropDown />
      </div>

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
          {organizationData.organizations.map((org) => (
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
    </div>
  );
}

export default OrgGrid;
