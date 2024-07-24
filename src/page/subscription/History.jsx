import { useSelector } from "react-redux";
import { Cards } from "../../components/layout/super-admin-layout";
import { icon_success, icon_error } from "../../assets";
import "./style.css";
import { Dropdown, DropdownItem, Table } from "flowbite-react";
import { useState } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { IoIosCheckmark } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { showAlert } from "../../static/alert";
import PaginationControls from "../../components/ui/PaginationControls";
import { empty } from "../../assets";
import bell from "../../assets/notiBell.svg";

const dummyUserData = [
  {
    _id: "1",
    createdAt: "2024-07-01",
    display_name: "Basic Plan",
    expDate: "2025-07-01",
    amount: "$10",
    status: "Active"
  },
  {
    _id: "2",
    createdAt: "2024-07-02",
    display_name: "Premium Plan",
    expDate: "2025-07-02",
    amount: "$20",
    status: "Inactive"
  }
  // Add more dummy data as needed
];

const dummyUserStats = {
  total_users_count: "$5,000",
  new_users_count: "$400",
  returning_users_count: "$100"
};

function Users() {
  const user = useSelector((state) => state.user.user);
  const userStats = dummyUserStats;

  const list = dummyUserData || [];
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const newList = list?.map((nw, id) => {
    return { ...nw, index: id + 1 };
  });

  console.log(newList);

  const totalPages = Math.ceil(newList?.length / itemsPerPage);

  const currentList = newList?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAction = async (id, action) => {
    console.log(id, action);
  };

  return (
    <div className="px-3 pt-5">
      <div className="">
        {user && user.role == "OrgAdmin" ? (
          <>
            <div className="w-full super-admin-card-box items-center justify-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-10 md:grid md:grid-cols-2 md:justify-between lg:grid lg:grid-cols-4 xl:grid-cols-4">
              <Cards
                title={userStats.total_users_count}
                subtitle={"Total Subscriptions"}
                percentage={"10.2%"}
                img={bell}
                icon={icon_success}
                text={"+1.01% this week"}
              />

              <Cards
                title={userStats.new_users_count}
                subtitle={"Current Plan"}
                percentage={"10.2%"}
                img={bell}
                icon={icon_success}
                text={"+1.01% this week"}
              />

              <Cards
                title={userStats.returning_users_count}
                subtitle={"Previous Plan"}
                percentage={"2.56%"}
                img={bell}
                icon={icon_error}
                text={"-0.91% this week"}
              />
            </div>

            <div className="table-section pt-10">
              <select className="rounded-md h-[39px] bg-white border shadow border-[#EFF0F6] history-filter focus:outline-none focus:ring-0 mb-2 w-auto">
                <option value="">All</option>
                <option value="">Yearly Subscriptions</option>
                <option value="">Monthly Subscriptions</option>
                <option value="">Expired Subscriptions</option>
              </select>
              <div className="overflow-x-auto shadow-lg">
                {list && list.length > 0 ? (
                  <Table hoverable>
                    <Table.Head className="users-table-head">
                      <Table.HeadCell>s/n.</Table.HeadCell>
                      <Table.HeadCell>Subscription Date</Table.HeadCell>
                      <Table.HeadCell>Plan</Table.HeadCell>
                      <Table.HeadCell>Exp. Date</Table.HeadCell>
                      <Table.HeadCell>Amount</Table.HeadCell>
                      <Table.HeadCell>Status</Table.HeadCell>
                      <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {currentList.map((row, index) => (
                        <Table.Row
                          className="bg-white dark:border-gray-700 dark:bg-gray-800 users-table-row"
                          key={row._id}
                        >
                          <Table.Cell>{row.index || index + 1}</Table.Cell>
                          <Table.Cell>{row.createdAt}</Table.Cell>
                          <Table.Cell>{row.display_name}</Table.Cell>
                          <Table.Cell>{row.expDate}</Table.Cell>
                          <Table.Cell>{row.amount}</Table.Cell>
                          <Table.Cell>
                            {row.status === "Active" ? (
                              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-[#34C759] ring-1 ring-inset gap-1 ring-green-600/20">
                                <span className="h-[8px] w-[8px] bg-[#34C759] rounded-full"></span>{" "}
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-[#FF0000] ring-1 gap-1  ring-inset ring-red-600/10">
                                <span className="h-[8px] w-[8px] bg-[#FF0000] rounded-full"></span>{" "}
                                Expired
                              </span>
                            )}
                          </Table.Cell>
                          <Table.Cell>
                            <Dropdown>
                              <DropdownItem
                                onClick={() => handleAction(row._id, "upgrade")}
                              >
                                <div className="flex items-center justify-center">
                                  <TiDelete
                                    className="text-[#34C759]"
                                    size={15}
                                  />
                                  &nbsp;
                                  <small>
                                    <p className="text-[#34C759]">
                                      Upgrade Plan
                                    </p>
                                  </small>
                                </div>
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => handleAction(row._id, "cancel")}
                              >
                                <div className="flex items-center justify-center">
                                  <TiDelete
                                    className="text-[#E71D36]"
                                    size={15}
                                  />
                                  &nbsp;
                                  <small>
                                    <p className="text-[#E71D36]">
                                      Cancel Plan
                                    </p>
                                  </small>
                                </div>
                              </DropdownItem>
                            </Dropdown>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </Table>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500 pb-20">
                    <p className="pb-5">No data yet</p>
                    <img src={empty} width={200} height={200} alt="" />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Users;
