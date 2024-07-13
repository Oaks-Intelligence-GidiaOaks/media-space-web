import { Plans } from "../components/ui";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useGetPlansQuery } from "../service/admin/plan.service";
import { handleLogout } from "../static/logout";
import search from "../assets/titlebar/search.svg";
import notification from "../assets/titlebar/notification.svg";
import placeholder from "../assets/user-avatar.png";
import chevron from "../assets/titlebar/chevron.svg";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { logo } from "../assets";
import { Spinner } from "flowbite-react";

const SubscriptionPlans = () => {
  const { data: availablePlans, isLoading } = useGetPlansQuery();
  const subscription_plans = availablePlans?.data;
  // console.log(subscription_plans);

  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("monthly");
  const [country, setCountry] = useState("NG"); // Default to Nigeria (NG) or US for United States

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
    navigate("/signin");
  };

  const display_name = useSelector((state) => state?.user?.user?.display_name);

  const filteredPlans =
    subscription_plans?.map((plan, index) => {
      const priceField = `${activeTab}_price_${
        country === "NG" ? "naira" : "dollar"
      }`;
      const uniqueFeatures = plan.features.filter(
        (feature) =>
          !(
            index > 0 &&
            subscription_plans[index - 1].features.some(
              (prevFeature) => prevFeature.module_name === feature.module_name
            )
          )
      );

      return {
        ...plan,
        price: plan[priceField],
        uniqueFeatures,
        previousPlanName: index > 0 ? subscription_plans[index - 1].name : null,
      };
    }) || [];

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

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
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
                  id={plan._id}
                  title={plan.name}
                  description={plan.description}
                  amount={plan.price}
                  discountOff={plan.discountOff}
                  details={plan.features}
                  background={plan.background}
                  currency={country === "NG" ? "₦" : "$"}
                  previousPlanName={plan.previousPlanName}
                  uniqueFeatures={plan.uniqueFeatures}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default SubscriptionPlans;
