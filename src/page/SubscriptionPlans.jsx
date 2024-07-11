import { Plans } from "../components/ui";
import Data from "./PlansData";
import { useState } from "react";
import { logo } from "../assets";
import search from "../assets/titlebar/search.svg";
import notification from "../assets/titlebar/notification.svg";
import placeholder from "../assets/user-avatar.png";
import chevron from "../assets/titlebar/chevron.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { handleLogout } from "../static/logout";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("monthly");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const user = useSelector((state) => state.user.user);

  const navigateToOverview = () => {
    navigate("/dashboard/overview");
  };

  const dispatch = useDispatch();

  const logout = () => {
    setIsDropdownOpen(false);
    handleLogout(dispatch);
  };

  const display_name = useSelector((state) => state?.user?.user?.display_name);
  const filteredPlans = Data.filter((plan) => plan.type === activeTab);

  return (
    <section className="min-h-screen bg-[#F9FAFA]">
      <div className="w-full flex justify-center items-center px-5">
        <div className="h-10 pb-10 flex justify-between items-center w-full pt-10 max-w-[1088px]">
          <div
            className="flex gap-1 flex-nowrap items-center w-fit cursor-pointer"
            onClick={navigateToOverview}
          >
            <img src={logo} className="" />
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
                <p className="font-inter hidden sm:block">
                  {display_name || "Yarri Sandra"}
                </p>
                <img className="w-3" src={chevron} />
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-50">
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      setIsDropdownOpen(false);
                    }}
                  >
                    <FaUserCircle className="w-4 h-4 mr-2 inline" />
                    Profile
                  </Link>
                  <Link
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
      </div>

      <div className="flex justify-center items-center flex-col pt-12 pb-10">
        <div className="flex gap-2 items-center py-5">
          <motion.button
            className={`plan-tab-btn border w-[120px] h-[48px] ${
              activeTab === "monthly"
                ? "bg-[#0F5901] text-white"
                : "bg-transparent text-[#0F5901]"
            }`}
            onClick={() => handleTabClick("monthly")}
            whileHover={{ scale: 1.1 }}
          >
            Monthly
          </motion.button>
          <motion.button
            className={`plan-tab-btn border w-[120px] h-[48px] ${
              activeTab === "yearly"
                ? "bg-[#0F5901] text-white"
                : "bg-transparent text-[#0F5901]"
            }`}
            onClick={() => handleTabClick("yearly")}
            whileHover={{ scale: 1.1 }}
          >
            Yearly
          </motion.button>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center flex-wrap lg:flex-row items-center gap-3"
        >
          {filteredPlans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plans
                title={plan.title}
                description={plan.description}
                amount={plan.amount}
                discountOff={plan.discountOff}
                details={plan.details}
                background={plan.background}
                currency={plan.currency}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
