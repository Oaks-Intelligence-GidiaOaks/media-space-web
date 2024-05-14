import { useSelector } from "react-redux";
import { Cards, StaffCard } from "../../components/layout/super-admin-layout";
import { useGetAminStaffStatsQuery } from "../../service/admin/statistics.service";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { users } from "../../assets";
import avatar from "../../assets/avatar.svg";
import { useState, useEffect } from "react";
import Modals from "../../components/modals/Modal";
import { Form, Field } from "react-final-form";
import validate from "validate.js";
import rtkMutation from "../../utils/rtkMutation";
import { useCreateBadgeMutation } from "../../service/admin/badge.service";
import { showAlert } from "../../static/alert";
import {
  useGetAllStaffQuery,
  useToggleStaffMutation,
  useGetOrganizationListQuery,
} from "../../service/admin/staff.service";
import { useGetAllBadgeQuery } from "../../service/admin/badge.service";
import { Table } from "flowbite-react";

const constraints = {
  department: {
    presence: true,
  },
  color: {
    presence: true,
    format: {
      pattern: /^#[0-9A-Fa-f]{6}$/, // Regular expression pattern for hex color code
      message: "^Invalid color format. Please use hexadecimal color code.",
    },
  },
};

function Staff() {
  const {
    data: adminbadges,
    isLoading: adminBadgeloading,
    refetch: badgeRefetch,
  } = useGetAllBadgeQuery();
  console.log(adminbadges);

  const [selectedStaffId, setSelectedStaffId] = useState("");

  const user = useSelector((state) => state.user.user);
  const { data: adminStaffStats, isLoading: loadStats } =
    useGetAminStaffStatsQuery();

  const { data: staffData, isLoading: staffLoading } = useGetAllStaffQuery();
  console.log(staffData);

  const { data: userList } = useGetOrganizationListQuery();
  console.log(userList, "user list");

  const [openBadgesModal, setOpenBadgesModal] = useState(false);
  const [createdBadgesModal, setOpenCreatedBadgesModal] = useState(false);

  const [createBadge, { error, isSuccess }] = useCreateBadgeMutation({
    provideTag: ["Badge"],
  });

  const onSubmit = async (values) => {
    await rtkMutation(createBadge, values);
    console.log(values);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  useEffect(() => {
    if (isSuccess) {
      setOpenBadgesModal(false);
      badgeRefetch();
      showAlert("", "Badge created Successfully!", "success");
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error, badgeRefetch]);

  const [filterCriteria, setFilterCriteria] = useState("");

  // Function to handle filter selection change
  const handleFilterChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  // Function to filter staff data based on badge presence
  const filterStaffByBadge = (staffData, filterCriteria) => {
    if (filterCriteria === "with_badge") {
      return staffData.filter((staff) => staff.department.length > 0);
    } else if (filterCriteria === "without_badge") {
      return staffData.filter((staff) => staff.department.length === 0);
    } else {
      return staffData; // Return original data if no filter criteria is specified
    }
  };

  const handleStaffSelectChange = (e) => {
    setSelectedStaffId(e.target.value);
  };

  const [
    addRemoveStaff,
    { error: staffToggleError, isSuccess: staffToggleSuccess },
  ] = useToggleStaffMutation({
    provideTag: ["Staff"],
  });

  const { refetch } = useGetAllStaffQuery();

  const toggle = async () => {
    await addRemoveStaff({ user_id: selectedStaffId });
  };

  useEffect(() => {
    if (staffToggleSuccess) {
      showAlert("", "Staff updated Successfully!", "success");
      refetch();
    } else if (staffToggleError) {
      showAlert(
        "Oops",
        staffToggleError.data.message || "An error occurred",
        "error"
      );
    }
  }, [staffToggleSuccess, staffToggleError, refetch]);

  return (
    <>
      <div className="px-3">
        <div className="">
          {user && user.role == "SuperAdmin" ? (
            <>super admin section</>
          ) : (
            <>
              <div className="w-full super-admin-card-box items-center justify-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-10 md:grid md:grid-cols-2 md:justify-between lg:grid lg:grid-cols-4 xl:grid-cols-4">
                {loadStats ? (
                  <ShimmerThumbnail width={250} height={150} />
                ) : (
                  <Cards
                    title={adminStaffStats?.data?.total_staff}
                    subtitle={"Total Staff"}
                    img={users}
                  />
                )}

                {loadStats ? (
                  <ShimmerThumbnail width={250} height={150} />
                ) : (
                  <Cards
                    title={adminStaffStats?.data?.staff_with_badge}
                    subtitle={"Staff with Badge"}
                    img={users}
                  />
                )}

                {loadStats ? (
                  <ShimmerThumbnail width={250} height={150} />
                ) : (
                  <Cards
                    title={adminStaffStats?.data?.staff_without_badge}
                    subtitle={"Staff without Badge"}
                    img={users}
                  />
                )}
              </div>

              <div className="staff-section pt-5 pb-5">
                <div className="flex pb-5 justify-between items-center border rounded-md p-3">
                  <div className="flex items-center gap-5">
                    <select
                      name=""
                      id=""
                      className="w-[200px] h-[39px] focus:outline-none focus:ring-0 text-[12px]"
                      value={filterCriteria}
                      onChange={handleFilterChange}
                    >
                      <option value="">Total Staff</option>
                      <option value="with_badge">Staff With Badge</option>
                      <option value="without_badge">Staff Without Badge</option>
                    </select>

                    <div>
                      <div className="flex items-center gap-5">
                        <select
                          name="staffSelect"
                          id="staffSelect"
                          className="w-[200px] h-[39px] focus:outline-none focus:ring-0 text-[12px]"
                          value={selectedStaffId}
                          onChange={handleStaffSelectChange}
                        >
                          <option value="">Select Staff</option>
                          {userList &&
                            userList.data.map((staff) => (
                              <option key={staff._id} value={staff._id}>
                                {staff.display_name}
                              </option>
                            ))}
                        </select>
                        <button className="ads-btn" onClick={toggle}>
                          Add Staff
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      className="badge-btn"
                      onClick={() => setOpenBadgesModal(true)}
                    >
                      Create Badge
                    </button>
                    <button
                      className="badge-btn"
                      onClick={() => setOpenCreatedBadgesModal(true)}
                    >
                      View created Badges
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-5 pt-5">
                  {staffLoading ? (
                    <ShimmerThumbnail width={366} height={250} />
                  ) : staffData && staffData?.data?.length > 0 ? (
                    filterStaffByBadge(staffData.data, filterCriteria).map(
                      (staff, index) => (
                        <StaffCard
                          user_id={staff._id}
                          key={index}
                          fullname={staff.display_name}
                          title={"Project Manager"}
                          join_date={
                            "Joined " +
                            new Date(staff.createdAt).toLocaleDateString()
                          }
                          avatar={avatar}
                          email={staff.email}
                          phoneNumber={staff.phoneNumber || ""}
                          badge={staff?.department?.map(
                            (dept) => dept.badge.color
                          )}
                        />
                      )
                    )
                  ) : (
                    <p>No staff created</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Modals
        title="Created Badges"
        openModal={createdBadgesModal}
        modalSize="lg"
        onClose={() => setOpenCreatedBadgesModal(false)}
      >
        {adminBadgeloading ? (
          <ShimmerThumbnail width={"100%"} height={"100%"} />
        ) : (
          <>
            {adminbadges?.data && adminbadges?.data.length > 0 ? (
              <Table hoverable>
                <Table.Head className="users-table-head">
                  <Table.HeadCell>No.</Table.HeadCell>
                  <Table.HeadCell>Department</Table.HeadCell>
                  <Table.HeadCell>Color</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {adminbadges?.data.map((row, index) => (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 users-table-row"
                      key={row._id}
                    >
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{row.department}</Table.Cell>
                      <Table.Cell
                        className={`h-10 w-10 bg-[${row.color}]`}
                      ></Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500 pb-20">
                <p className="pb-5">No badge created yet</p>
                {/* <img src={empty} width={200} height={200} alt="" /> */}
              </div>
            )}
          </>
        )}
      </Modals>

      <Modals
        title="Create Badges"
        openModal={openBadgesModal}
        modalSize="md"
        onClose={() => setOpenBadgesModal(false)}
      >
        <Form
          onSubmit={onSubmit}
          validate={validateForm}
          render={({ handleSubmit, form, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-3 flex flex-col">
                <label htmlFor="department" className="badge-label pb-2">
                  Department
                </label>
                <Field
                  id="department"
                  type="text"
                  name="department"
                  component="input"
                  className="badge-department"
                />
                {form.getState().submitFailed &&
                  form.getState().errors.department && (
                    <small className="text-red-600">
                      {form.getState().errors.department}
                    </small>
                  )}
              </div>
              <div className=" flex flex-col">
                <label htmlFor="department" className="badge-label pb-2">
                  Badge color
                </label>
                <Field
                  name="color"
                  id="color"
                  component="input"
                  type="color"
                  className="h-[38px]"
                />
                {form.getState().submitFailed &&
                  form.getState().errors.color && (
                    <small className="text-red-600">
                      {form.getState().errors.color}
                    </small>
                  )}
              </div>

              <div className="flex justify-end pt-5">
                <button type="submit" className="badge-create">
                  {submitting ? (
                    <>
                      <span className="loading-dots">
                        <span className="loading-dots-dot"></span>
                        <span className="loading-dots-dot"></span>
                        <span className="loading-dots-dot"></span>
                      </span>
                    </>
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </form>
          )}
        />
      </Modals>
    </>
  );
}

export default Staff;
