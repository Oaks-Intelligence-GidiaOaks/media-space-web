import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import hamburgerMenu from "../../../../assets/sidebar/menu.svg";
import closeMenu from "../../../../assets/sidebar/close.svg";
import { useGetFeaturesQuery } from "../../../../service/superadmin/plan.service.js";
import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
const Sidebar = ({ sidebarItems }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [showMenu, setShowMenu] = useState(true);

  const activeIconStyling = (route) => {
    if (pathname.includes(route)) {
      return "brightness-200";
    } else {
      return "";
    }
  };

  const activeTextStyling = (route) => {
    if (pathname.includes(route)) {
      return "text-white";
    } else {
      return "text-secondary-white";
    }
  };

  useEffect(() => {
    if (pathname.includes("overview")) {
      setCurrentTabIndex(0);
    } else if (pathname.includes("analysis")) {
      setCurrentTabIndex(1);
    } else if (pathname.includes("category")) {
      setCurrentTabIndex(2);
    } else if (pathname.includes("users") && pathname.includes("staff")) {
      setCurrentTabIndex(4);
    } else if (pathname.includes("users")) {
      setCurrentTabIndex(3);
    } else if (pathname.includes("subscription")) {
      setCurrentTabIndex(5);
    } else if (pathname.includes("survey")) {
      setCurrentTabIndex(6);
    }
  }, [pathname]);

  //   calculate current tab index on tab click
  useEffect(() => {
    setIndicatorPosition(
      currentTabIndex === 0
        ? "-2px"
        : `calc(${currentTabIndex * 3.5}rem + ${currentTabIndex * 2}rem - 4px)`
    );
  }, [currentTabIndex]);

  const { data: featuresList } = useGetFeaturesQuery();
  const availableFeatures = featuresList?.data;
  console.log(availableFeatures);

  const features = useSelector(
    (state) => state?.user?.user?.organization_features
  );
  // console.log(features);

  return (
    // sidebar container
    <>
      {/* Sidebar for big screens */}
      <div className="w-[clamp(50px,10%,119px)] hidden fixed md:block md:sticky h-screen mx-5 top-0">
        {/* sidebar */}

        {/* h-[clamp(480px,80%,713px)] */}
        <div className="w-full h-auto pt-10 rounded-[1.25rem] relative bg-primary-black mt-14 after:content('') after:text-white after:absolute after:w-full after:h-1/2 after:block after:-right-[6px] after:-z-10 after:rounded-[1.25rem] after:bg-gradient-to-b after:from-[#EB9207] after:to-[transparent] after:top-[6%]">
          <div className="w-full flex flex-col gap-y-8 relative">
            {sidebarItems.map((sidebarItem, i) => {
              return (
                <button
                  key={sidebarItem.title}
                  className="flex flex-col gap-1 items-center h-14 relative z-[1] transition-all duration-300"
                  aria-label={sidebarItem.title}
                  onClick={() => {
                    setCurrentTabIndex(i);
                    navigate(`/${sidebarItem.route}`);
                  }}
                >
                  <img
                    src={sidebarItem.icon}
                    className={`h-8 brightness ${activeIconStyling(
                      sidebarItem.route
                    )}`}
                    style={{
                      transition: "all 300ms ease"
                    }}
                  />
                  <p
                    className={`hidden sm:block sm:text-[0.5rem] md:text-[0.65rem] lg::text-xs font-medium font-poppins ${activeTextStyling(
                      sidebarItem.route
                    )}`}
                    style={{
                      transition: "all 300ms ease"
                    }}
                  >
                    {sidebarItem.title}
                  </p>
                </button>
              );
            })}
            {/* indicator */}
            <div
              className={`absolute w-full h-[3.75rem] bg-[rgba(255,255,255,0.2)] left-0`}
              style={{
                top: indicatorPosition,
                transition: "all 300ms ease"
              }}
            />
          </div>
          {/* green glow */}
          <div className="w-full h-full rounded-[1.25rem] overflow-hidden absolute top-0">
            <div className="w-40 h-40 rounded-full bg-primary-dark-green absolute -bottom-28 -left-4 blur-3xl" />
          </div>
        </div>
      </div>
      {/* Sidebar for small screens */}
      <div className="w-[clamp(50px,10%,119px)] left-2 fixed md:hidden md:sticky h-screen ml-0 top-10">
        {/* menu button */}
        <button
          aria-label="Menu"
          onClick={() => setShowMenu(!showMenu)}
          className="transition-all duration-200 shadow-primary-dark hover:shadow-primary-dark-hovered w-full h-10 py-2 rounded-[1.25rem] relative mt-12 bg-primary-black flex justify-center items-center"
        >
          <img src={showMenu ? hamburgerMenu : closeMenu} className="h-full" />
        </button>
        {/* sidebar */}
        <div
          style={{
            left: showMenu ? "-100px" : 0,
            transition: "all 200ms ease-in-out",
            boxShadow: "5px 7px 12px rgba(0,0,0,0.3)"
          }}
          className="w-full h-fit py-10 rounded-[1.25rem] relative bg-primary-black mt-14 after:content('') after:text-white after:absolute after:w-full after:h-1/2 after:block after:-right-[6px] after:-z-10 after:rounded-[1.25rem] after:bg-gradient-to-b after:from-[#EB9207] after:to-[transparent] after:top-[6%]"
        >
          <div className="w-full flex flex-col gap-y-8 relative h-auto pb-5 z-50">
            {sidebarItems.map((sidebarItem, i) => {
              const isLastItem = i === sidebarItems.length - 1;

              return (
                <button
                  key={sidebarItem.title}
                  className={`flex flex-col gap-1 items-center justify-center h-14 relative z-[1] transition-all duration-300 ${
                    isLastItem ? "mb-10" : ""
                  }`}
                  aria-label={sidebarItem.title}
                  onClick={() => {
                    setCurrentTabIndex(i);
                    setShowMenu(!showMenu);
                    navigate(`/${sidebarItem.route}`);
                  }}
                >
                  <img
                    src={sidebarItem.icon}
                    className={`h-8 brightness ${activeIconStyling(
                      sidebarItem.route
                    )}`}
                    style={{
                      transition: "all 300ms ease"
                    }}
                    alt={sidebarItem.title}
                  />
                  {/* Uncomment this block to show the text label */}
                  {/* <p
        className={`hidden sm:block sm:text-[0.5rem] md:text-[0.65rem] lg::text-xs font-medium font-poppins ${activeTextStyling(
          sidebarItem.route
        )}`}
        style={{
          transition: "all 300ms ease",
        }}
      >
        {sidebarItem.title}
      </p> */}
                </button>
              );
            })}

            {/* indicator */}
            <div
              className={`absolute w-full h-[3.75rem] bg-[rgba(255,255,255,0.2)] left-0`}
              style={{
                top: indicatorPosition,
                transition: "all 300ms ease"
              }}
            />
          </div>
          {/* green glow */}
          <div className="w-full h-full rounded-[1.25rem] overflow-hidden absolute top-0">
            <div className="w-40 h-40 rounded-full bg-primary-dark-green absolute -bottom-28 -left-4 blur-3xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
