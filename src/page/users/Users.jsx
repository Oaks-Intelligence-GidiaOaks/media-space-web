import { useSelector } from "react-redux";
import { Cards } from "../../components/layout/super-admin-layout";
import { icon_success, icon_error, users } from "../../assets";
import "./style.css";
import { Dropdown, DropdownItem, Table } from "flowbite-react";
import { menu, delete_img, approve, empty } from "../../assets";
import { useState } from "react";
import { useGetNewSignupQuery } from "../../service/admin/newSignup.service";
import { useGetAminUserStatsQuery } from "../../service/admin/statistics.service";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { IoIosCheckmark } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

function Users() {
  const user = useSelector((state) => state.user.user);
  const { data: userStats, isLoading: loadStats } = useGetAminUserStatsQuery();

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

  const { data: userData, isLoading, refetch } = useGetNewSignupQuery();
  const list = userData?.data;
  console.log(list);

  const handleAction = (id, action) => {
    console.log(`Performing action '${action}' for ID '${id}'`);
  };

  return (
    <div className="px-3">
      <div className="">
        {/* {user && user.role == "OrgAdmin" ? ( */}
        {user && user.role == "SuperAdmin" ? (
          <>super admin section</>
        ) : (
          <>
            <div className="w-full super-admin-card-box items-center justify-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-10 md:grid md:grid-cols-2 md:justify-between lg:grid lg:grid-cols-4 xl:grid-cols-4">
              {loadStats ? (
                <ShimmerThumbnail width={250} height={150} />
              ) : (
                <Cards
                  title={userStats?.data?.total_users_count}
                  subtitle={"Total users "}
                  percentage={"10.2%"}
                  img={users}
                  icon={icon_success}
                  text={"+1.01% this week"}
                />
              )}

              {loadStats ? (
                <ShimmerThumbnail width={250} height={150} />
              ) : (
                <Cards
                  title={userStats?.data?.new_users_count}
                  subtitle={"New Users"}
                  percentage={"10.2%"}
                  img={users}
                  icon={icon_success}
                  text={"+1.01% this week"}
                />
              )}

              {loadStats ? (
                <ShimmerThumbnail width={250} height={150} />
              ) : (
                <Cards
                  title={userStats?.data?.returning_users_count}
                  subtitle={"Returning Users"}
                  percentage={"2.56%"}
                  img={users}
                  icon={icon_error}
                  text={"-0.91% this week"}
                />
              )}

              {loadStats ? (
                <ShimmerThumbnail width={250} height={150} />
              ) : (
                <Cards
                  title={userStats?.data?.inactive_users_count}
                  subtitle={"Inactive Users"}
                  percentage={"3.1%"}
                  img={users}
                  icon={icon_success}
                  text={"+0.49% this week"}
                />
              )}
            </div>

            <div className="table-section pt-10">
              <p className="table-title-users pb-5">New Sign Up</p>
              <div className="overflow-x-auto shadow-lg">
                {isLoading ? (
                  <ShimmerThumbnail width={"100%"} height={"100%"} />
                ) : (
                  <>
                    {list && list.length > 0 ? (
                      <Table hoverable>
                        <Table.Head className="users-table-head">
                          <Table.HeadCell>No.</Table.HeadCell>
                          <Table.HeadCell>Date</Table.HeadCell>
                          <Table.HeadCell>Name</Table.HeadCell>
                          <Table.HeadCell>Organization Name</Table.HeadCell>
                          <Table.HeadCell>Email Address</Table.HeadCell>
                          <Table.HeadCell>Location</Table.HeadCell>
                          <Table.HeadCell>Organization Size</Table.HeadCell>
                          <Table.HeadCell>Status</Table.HeadCell>
                          <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                          {list.map((row, index) => (
                            <Table.Row
                              className="bg-white dark:border-gray-700 dark:bg-gray-800 users-table-row"
                              key={row._id}
                            >
                              <Table.Cell>{index + 1}</Table.Cell>
                              <Table.Cell>{row.createdAt}</Table.Cell>
                              <Table.Cell>{row.display_name}</Table.Cell>
                              <Table.Cell>{"N/A"}</Table.Cell>
                              <Table.Cell>{row.email}</Table.Cell>
                              <Table.Cell>{row.location ?? ""}</Table.Cell>
                              <Table.Cell>
                                {row.organizationSize ?? ""}
                              </Table.Cell>
                              <Table.Cell>
                                {row.disabled == "false" ? (
                                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    Active
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                    Inactive
                                  </span>
                                )}
                              </Table.Cell>
                              <Table.Cell>
                                <Dropdown>
                                  <DropdownItem
                                    onClick={() =>
                                      handleAction(row._id, "approve")
                                    }
                                  >
                                    <div className="flex items-center justify-center">
                                      <IoIosCheckmark
                                        className="text-green-500"
                                        size={20}
                                      />
                                      <small>
                                        <p className="text-green-500">
                                          Approve
                                        </p>
                                      </small>
                                    </div>
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() =>
                                      handleAction(row._id, "delete")
                                    }
                                  >
                                    <div className="flex items-center justify-center">
                                      <TiDelete
                                        className="text-red-500"
                                        size={15}
                                      />
                                      &nbsp;
                                      <small>
                                        <p className="text-red-500">Delete</p>
                                      </small>
                                    </div>
                                  </DropdownItem>
                                </Dropdown>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-500 pb-20">
                        <p className="pb-5">No data yet</p>
                        <img src={empty} width={200} height={200} alt="" />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Users;
