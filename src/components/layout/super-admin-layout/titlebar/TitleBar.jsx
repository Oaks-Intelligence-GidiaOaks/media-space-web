import { useState } from "react";
import { logo_new } from "../../../../assets";
import search from "../../../../assets/titlebar/search.svg";
import notification from "../../../../assets/titlebar/notification.svg";
import placeholder from "../../../../assets/user-avatar.png";
import chevron from "../../../../assets/titlebar/chevron.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../../../static/logout";
import { useSelector } from "react-redux";

const TitleBar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  // console.log(user);

  const navigateToOverview = () => {
    navigate("/dashboard/overview");
  };

  const dispatch = useDispatch();

  const logout = () => {
    setIsDropdownOpen(false);
    handleLogout(dispatch);
  };

  const display_name = useSelector(
    (state) => state?.user?.user?.display_name || "NULL"
  );

  return (
    <div className="h-10 pb-10 flex justify-between pt-10 w-full pl-1 sm:pl-0 pr-2 sticky top-0 bg-white z-50">
      <div
        className="flex flex-nowrap items-center w-fit cursor-pointer"
        onClick={navigateToOverview}
      >
        <img src={logo_new} className="" />
      </div>
      <div className="flex gap-2 sm:gap-4 items-center">
        <button
          aria-label="Search"
          className="hover:bg-primary-gray rounded p-[2px]"
        >
          <img src={search} className="w-[18px] sm:w-[22px]" />
        </button>
        <button
          aria-label="Notifications"
          className="relative hover:bg-primary-gray rounded p-1"
        >
          <img src={notification} className="w-[14px] sm:w-4" />
          <div className="w-1 h-1 rounded-full absolute bg-red-500 top-[2px] right-[2px]" />
        </button>
        {/* Dropdown button */}
        <div className="relative inline-block text-left">
          <button
            aria-label="Profile"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex flex-nowrap gap-2 items-center hover:bg-primary-gray rounded p-1"
          >
            <img
              src={user?.photo_url || placeholder}
              className="w-[18px] sm:w-6 rounded-full"
            />
            <p className="font-inter hidden sm:block">{display_name}</p>
            <img className="w-3" src={chevron} />
          </button>
          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-50">
              <Link
                to={"/dashboard/company_profile"}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  setIsDropdownOpen(false);
                }}
              >
                <FaUserCircle className="w-4 h-4 mr-2 inline" />
                Profile
              </Link>
              <Link
                to={"/dashboard/settings"}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  setIsDropdownOpen(false);
                }}
              >
                <FaCog className="w-4 h-4 mr-2 inline" />
                Settings
              </Link>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => logout()}
              >
                <FaSignOutAlt className="w-4 h-4 mr-2 inline" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
