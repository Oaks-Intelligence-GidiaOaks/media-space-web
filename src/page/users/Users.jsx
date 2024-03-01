import { useSelector } from "react-redux";
import { Cards } from "../../components/layout/super-admin-layout";
import { icon_success, icon_error, users } from "../../assets";
import "./style.css";
import { Dropdown, DropdownItem, Table } from "flowbite-react";
import { menu, delete_img, approve } from "../../assets";
import { useState } from "react";

function Users() {
  const user = useSelector((state) => state.user.user);
  const data = [
    {
      id: 1,
      date: "2024-02-29",
      name: "John Doe",
      organizationName: "ABC Company",
      emailAddress: "john.doe@example.com",
      location: "New York",
      organizationSize: "Medium",
    },
    {
      id: 2,
      date: "2024-03-01",
      name: "Jane Smith",
      organizationName: "XYZ Inc.",
      emailAddress: "jane.smith@example.com",
      location: "Los Angeles",
      organizationSize: "Large",
    },
    {
      id: 3,
      date: "2024-03-02",
      name: "Alice Johnson",
      organizationName: "123 Industries",
      emailAddress: "alice.johnson@example.com",
      location: "Chicago",
      organizationSize: "Small",
    },
    {
      id: 4,
      date: "2024-03-03",
      name: "Bob Brown",
      organizationName: "ACME Corporation",
      emailAddress: "bob.brown@example.com",
      location: "Houston",
      organizationSize: "Large",
    },
    {
      id: 5,
      date: "2024-03-04",
      name: "Emily Davis",
      organizationName: "Sunshine Co.",
      emailAddress: "emily.davis@example.com",
      location: "Miami",
      organizationSize: "Medium",
    },
    {
      id: 6,
      date: "2024-03-05",
      name: "Michael Wilson",
      organizationName: "Tech Solutions Ltd.",
      emailAddress: "michael.wilson@example.com",
      location: "Seattle",
      organizationSize: "Large",
    },
    {
      id: 7,
      date: "2024-03-06",
      name: "Sophia Martinez",
      organizationName: "Smart Innovations",
      emailAddress: "sophia.martinez@example.com",
      location: "San Francisco",
      organizationSize: "Medium",
    },
    {
      id: 8,
      date: "2024-03-07",
      name: "William Taylor",
      organizationName: "Global Ventures",
      emailAddress: "william.taylor@example.com",
      location: "Boston",
      organizationSize: "Large",
    },
  ];
  const [dropdownState, setDropdownState] = useState({});

  const toggleDropdown = (id) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleDropdownPosition = (rowId, event) => {
    const dropdownHeight = 110; // Adjust this value according to the dropdown's height
    const viewportHeight = window.innerHeight;
    const rowRect = event.target.getBoundingClientRect();
    const spaceBelow = viewportHeight - rowRect.bottom;

    if (spaceBelow < dropdownHeight) {
      // If there's not enough space below the row, position the dropdown above it
      return dropdownHeight + rowRect.top - 10;
    }

    // Otherwise, position the dropdown below the row
    return rowRect.bottom + 10;
  };

  return (
    <div className="">
      {/* {user && user.role == "OrgAdmin" ? ( */}
      {user && user.role == "Admin" ? (
        <>admin section</>
      ) : (
        <>
          <div className="flex gap-10 px-3 pt-5 flex-col lg:flex-row lg:gap-10">
            <div className="w-full super-admin-card-box flex flex-col items-center justify-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-10 md:grid md:grid-cols-2 md:justify-between lg:grid lg:grid-cols-4">
              <Cards
                title={"89,935"}
                subtitle={"Total users "}
                percentage={"10.2%"}
                img={users}
                icon={icon_success}
                text={"+1.01% this week"}
              />

              <Cards
                title={"23,283.5"}
                subtitle={"New Users"}
                percentage={"10.2%"}
                img={users}
                icon={icon_success}
                text={"+1.01% this week"}
              />

              <Cards
                title={"46,827"}
                subtitle={"Returning Users"}
                percentage={"2.56%"}
                img={users}
                icon={icon_error}
                text={"-0.91% this week"}
              />

              <Cards
                title={"17,854"}
                subtitle={"Inactive Users"}
                percentage={"3.1%"}
                img={users}
                icon={icon_success}
                text={"+0.49% this week"}
              />
            </div>
          </div>
          <div className="table-section px-3 pt-10">
            <p className="table-title-users pb-5">New Sign Up</p>
            <div className="overflow-x-auto shadow-lg">
              <Table hoverable>
                <Table.Head className="users-table-head">
                  <Table.HeadCell>No.</Table.HeadCell>
                  <Table.HeadCell>Date</Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Organization Name</Table.HeadCell>
                  <Table.HeadCell>Email Address</Table.HeadCell>
                  <Table.HeadCell>Location</Table.HeadCell>
                  <Table.HeadCell>Organization Size</Table.HeadCell>
                  <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {data.map((row, index) => (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 users-table-row"
                      key={row.id}
                    >
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{row.date}</Table.Cell>
                      <Table.Cell>{row.name}</Table.Cell>
                      <Table.Cell>{row.organizationName}</Table.Cell>
                      <Table.Cell>{row.emailAddress}</Table.Cell>
                      <Table.Cell>{row.location}</Table.Cell>
                      <Table.Cell>{row.organizationSize}</Table.Cell>
                      <Table.Cell>
                        {/* {dropdownState[row.id] && (
                          <div className="absolute right-0 mt-2 w-auto bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-10">
                            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              <img src={approve} alt="" />
                            </button>
                            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              <img src={delete_img} alt="" />
                            </button>
                          </div>
                        )} */}
                        <button>
                          <img
                            src={menu}
                            alt=""
                            onClick={() => toggleDropdown(row.id)}
                          />
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Users;
