import PropTypes from "prop-types";
import mail from "../../../../assets/mail.svg";
import phone from "../../../../assets/phone.svg";
import eclipse from "../../../../assets/eclipse.svg";
import { Dropdown } from "flowbite-react";
import "./style.css";
import { useEffect, useState } from "react";
import {
  useToggleStaffMutation,
  useGetAllStaffQuery,
} from "../../../../service/admin/staff.service";
import { useAssignBadgeMutation } from "../../../../service/admin/badge.service";
import validate from "validate.js";
import { showAlert } from "../../../../static/alert";
import { useGetAllBadgeQuery } from "../../../../service/admin/badge.service";
import Modals from "../../../modals/Modal";
import { Form, Field } from "react-final-form";
import rtkMutation from "../../../../utils/rtkMutation";

const constraints = {
  badge_id: {
    presence: true,
  },
};

function StaffCard({
  avatar,
  fullname,
  join_date,
  title,
  email,
  phoneNumber,
  user_id,
  badge,
}) {
  console.log(badge);
  const [openModal, setOpenModal] = useState(false);

  const { data: adminbadges } = useGetAllBadgeQuery();

  const [addRemoveStaff, { error, isSuccess }] = useToggleStaffMutation({
    provideTag: ["Staff"],
  });

  const { refetch } = useGetAllStaffQuery();

  const toggle = async () => {
    await addRemoveStaff({ user_id });
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Staff updated Successfully!", "success");
      refetch();
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error, refetch]);

  const [
    assignBadge,
    { error: assignBadgeError, isSuccess: assignBadgeSuccess },
  ] = useAssignBadgeMutation({
    provideTag: ["Badge"],
  });

  const onSubmit = async (values) => {
    await rtkMutation(assignBadge, values);
    console.log(values);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  useEffect(() => {
    if (assignBadgeSuccess) {
      showAlert("", "Badge assigned Successfully!", "success");
      refetch();
      setOpenModal(false);
    } else if (assignBadgeError) {
      showAlert(
        "Oops",
        assignBadgeError.data.message || "An error occurred",
        "error"
      );
    }
  }, [assignBadgeError, assignBadgeSuccess, refetch]);

  return (
    <>
      <div className="staff-card w-[366px] h-[auto] bg-white opacity-100 shadow-md">
        <div className="card-content py-5 px-5">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`rounded-full h-[64px] w-[64px] border-4`}
                style={{ borderColor: badge }}
              >
                <img src={avatar} alt="" />
              </div>
              <div className="flex flex-col">
                <p className="staff-name">{fullname}</p>
                <p className="staff-title">{title}</p>
                <p className="joined-date">{join_date}</p>
              </div>
            </div>
            <div className="action">
              <Dropdown
                label=" "
                dismissOnClick={false}
                renderTrigger={() => (
                  <img src={eclipse} className="cursor-pointer" alt="action" />
                )}
              >
                <Dropdown.Item>
                  <button
                    className="add-btn bg-[rgba(239, 244, 255, 0.6)]"
                    onClick={() => setOpenModal(true)}
                  >
                    Add Badge
                  </button>
                </Dropdown.Item>

                <Dropdown.Item>
                  {" "}
                  <button
                    className="remove-btn bg-[rgba(239, 244, 255, 0.6)]"
                    onClick={toggle}
                  >
                    Remove Staff
                  </button>
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <div className="pt-5">
            <div className="flex items-center gap-2">
              <img src={mail} alt="email" />
              <p className="staff-email">{email}</p>
            </div>
            <div className="flex items-center gap-2">
              {phoneNumber && <img src={phone} alt="phone" />}
              <p className="staff-email">{phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <Modals
        title="Assign Badge"
        openModal={openModal}
        modalSize="md"
        onClose={() => setOpenModal(false)}
      >
        <Form
          onSubmit={onSubmit}
          validate={validateForm}
          initialValues={{ user_id }}
          render={({ handleSubmit, form, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-3 flex flex-col">
                <label htmlFor="department" className="badge-label pb-2">
                  Select Badge
                </label>
                <Field
                  id="badge_id"
                  name="badge_id"
                  component="select"
                  className="badge-department"
                >
                  <option value="">Select badge</option>
                  {adminbadges &&
                    adminbadges.data.map((badge) => (
                      <option key={badge._id} value={badge._id}>
                        {badge.department}
                      </option>
                    ))}
                </Field>

                {form.getState().submitFailed &&
                  form.getState().errors.badge_id && (
                    <small className="text-red-600">
                      {form.getState().errors.badge_id}
                    </small>
                  )}
              </div>

              <Field
                name="user_id"
                id="color"
                component="input"
                type="hidden"
                className="h-[38px]"
              />

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
                    "Assign"
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

StaffCard.propTypes = {
  avatar: PropTypes.string,
  fullname: PropTypes.string.isRequired,
  join_date: PropTypes.string.isRequired,
  title: PropTypes.string,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  user_id: PropTypes.string.isRequired,
  badge: PropTypes.string,
};

export default StaffCard;
