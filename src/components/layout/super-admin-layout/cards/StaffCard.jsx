import PropTypes from "prop-types";
import mail from "../../../../assets/mail.svg";
import phone from "../../../../assets/phone.svg";
import eclipse from "../../../../assets/eclipse.svg";
import { Dropdown } from "flowbite-react";
import "./style.css";
import { useEffect } from "react";
import { useToggleStaffMutation } from "../../../../service/admin/staff.service";
import { showAlert } from "../../../../static/alert";
import { useGetAllStaffQuery } from "../../../../service/admin/staff.service";

function StaffCard({
  avatar,
  fullname,
  join_date,
  title,
  email,
  phoneNumber,
  user_id,
}) {
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

  return (
    <div className="staff-card w-[366px] h-[auto] bg-white opacity-100 shadow-md">
      <div className="card-content py-5 px-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full h-[64px] w-[64px] avatar-box">
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
                <button className="add-btn bg-[rgba(239, 244, 255, 0.6)]">
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
            <img src={phone} alt="phone" />
            <p className="staff-email">{phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
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
};

export default StaffCard;
