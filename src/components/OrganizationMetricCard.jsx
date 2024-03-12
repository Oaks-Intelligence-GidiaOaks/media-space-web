import photo from "../assets/images/Photo.svg";
import Graphic from "../assets/icons/Graphic.svg";
import PropTypes from "prop-types";

const OrganizationMetricCard = ({ orgName, users, image }) => {
  return (
    <div className=" w-full p-6 max-w-[159.45px] bg-white border border-gray-400 shadow-md rounded-lg">
      <div className=" space-y-3">
        <div>
          <img
            src={image || photo}
            alt=""
            className="w-10 h-10 bg-cover rounded-full shadow-lg"
          />

          <span className=" font-inter text-xs text-[#000000]">{orgName}</span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[31.26px] mb-3 leading-[40.71px] font-inter font-medium ">
              {users || 0}K
            </h1>
            <span className="text-xs">Users</span>
          </div>

          <div className="flex justify-between">
            <span className=" text-sm font-inter text-primary-dark-green leading-[20.35px]">
              +0%
            </span>
            <span className=" text-sm font-inter text-primary-red leading-[20.35px]">
              -0%
            </span>
          </div>
        </div>

        <div>
          <img src={Graphic} alt="" />
        </div>
      </div>
    </div>
  );
};

OrganizationMetricCard.propTypes = {
  orgName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  users: PropTypes.number.isRequired,
};

export default OrganizationMetricCard;
