import { useSelector } from "react-redux";
import { Cards, StaffCard } from "../../components/layout/super-admin-layout";
import { useGetAminUserStatsQuery } from "../../service/admin/statistics.service";
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
  const user = useSelector((state) => state.user.user);
  const { data: userStats, isLoading: loadStats } = useGetAminUserStatsQuery();
  const [openBadgesModal, setOpenBadgesModal] = useState(false);

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
      showAlert("", "Badge created Successfully!", "success");
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error]);

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
                    title={userStats?.data?.total_users_count}
                    subtitle={"Total Staff"}
                    img={users}
                  />
                )}

                {loadStats ? (
                  <ShimmerThumbnail width={250} height={150} />
                ) : (
                  <Cards
                    title={userStats?.data?.new_users_count}
                    subtitle={"New Users"}
                    img={users}
                  />
                )}

                {loadStats ? (
                  <ShimmerThumbnail width={250} height={150} />
                ) : (
                  <Cards
                    title={userStats?.data?.returning_users_count}
                    subtitle={"Returning Users"}
                    img={users}
                  />
                )}
              </div>

              <div className="staff-section pt-5 pb-5">
                <div className="flex pb-5 justify-between items-center">
                  <select
                    name=""
                    id=""
                    className="w-[121px] h-[39px] focus:outline-none focus:ring-0 text-[12px]"
                  >
                    <option value="">Total Staff</option>
                  </select>

                  <div className="flex items-center gap-3">
                    <button
                      className="badge-btn"
                      onClick={() => setOpenBadgesModal(true)}
                    >
                      Create Badge
                    </button>
                    <button className="ads-btn">Add Staff</button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-5">
                  {loadStats ? (
                    <ShimmerThumbnail width={366} height={250} />
                  ) : (
                    <StaffCard
                      fullname={"Todd H. Harrison"}
                      title={"Project Manager"}
                      join_date={"Joined May/19/2020"}
                      avatar={avatar}
                      email={"todd.harrison@pegasus.web"}
                      phoneNumber={"+1 260 799 9872"}
                    />
                  )}

                  {loadStats ? (
                    <ShimmerThumbnail width={366} height={250} />
                  ) : (
                    <StaffCard
                      fullname={"Todd H. Harrison"}
                      title={"Project Manager"}
                      join_date={"Joined May/19/2020"}
                      avatar={avatar}
                      email={"todd.harrison@pegasus.web"}
                      phoneNumber={"+1 260 799 9872"}
                    />
                  )}

                  {loadStats ? (
                    <ShimmerThumbnail width={366} height={250} />
                  ) : (
                    <StaffCard
                      fullname={"Todd H. Harrison"}
                      title={"Project Manager"}
                      join_date={"Joined May/19/2020"}
                      avatar={avatar}
                      email={"todd.harrison@pegasus.web"}
                      phoneNumber={"+1 260 799 9872"}
                    />
                  )}

                  {loadStats ? (
                    <ShimmerThumbnail width={366} height={250} />
                  ) : (
                    <StaffCard
                      fullname={"Todd H. Harrison"}
                      title={"Project Manager"}
                      join_date={"Joined May/19/2020"}
                      avatar={avatar}
                      email={"todd.harrison@pegasus.web"}
                      phoneNumber={"+1 260 799 9872"}
                    />
                  )}

                  {loadStats ? (
                    <ShimmerThumbnail width={366} height={250} />
                  ) : (
                    <StaffCard
                      fullname={"Todd H. Harrison"}
                      title={"Project Manager"}
                      join_date={"Joined May/19/2020"}
                      avatar={avatar}
                      email={"todd.harrison@pegasus.web"}
                      phoneNumber={"+1 260 799 9872"}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

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
