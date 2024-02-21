import React from "react";
import photo from "../assets/images/Photo.svg";
import Graphic from "../assets/icons/Graphic.svg";
import { Link } from "react-router-dom";
import { ORGANIZATIONS_USERS } from "../routes/CONSTANT";

const OrganizationMetricCard = () => {
  return (
    <div className=" w-full p-6 max-w-[159.45px] bg-white border border-gray-400 shadow-md rounded-lg">
      <Link to={ORGANIZATIONS_USERS}>
        <div className=" space-y-3">
          <div>
            <img
              src={photo}
              alt=""
              className="w-10 h-10 bg-cover rounded-full shadow-lg"
            />

            <span className=" font-inter text-xs text-[#000000]">
              Oaks Intelligence
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[31.26px] mb-3 leading-[40.71px] font-inter font-medium ">
                0K
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
      </Link>
    </div>
  );
};

export default OrganizationMetricCard;
