import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const Sidebar = ({ sidebarItems }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [indicatorPosition, setIndicatorPosition] = useState(0);

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

  // calculate currentpageindex on page mount.
  useEffect(() => {
    if (pathname.includes("overview")) {
      setCurrentTabIndex(0);
    } else if (pathname.includes("organizations")) {
      setCurrentTabIndex(1);
    } else if (pathname.includes("subscription")) {
      setCurrentTabIndex(2);
    } else if (pathname.includes("notifications")) {
      setCurrentTabIndex(3);
    } else if (pathname.includes("settings")) {
      setCurrentTabIndex(4);
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

  return (
    // sidebar container
    <div className="w-[clamp(50px,10%,119px)] sticky h-screen mx-5 top-0">
      {/* sidebar */}
      <div className="w-full h-[clamp(480px,80%,713px)] pt-10 rounded-[1.25rem] relative bg-primary-black mt-14 after:content('') after:text-white after:absolute after:w-full after:h-1/2 after:block after:-right-[6px] after:-z-10 after:rounded-[1.25rem] after:bg-gradient-to-b after:from-[#EB9207] after:to-[transparent] after:top-[6%]">
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
                    transition: "all 300ms ease",
                  }}
                />
                <p
                  className={`text-xs font-medium font-poppins ${activeTextStyling(
                    sidebarItem.route
                  )}`}
                  style={{
                    transition: "all 300ms ease",
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
              transition: "all 300ms ease",
            }}
          />
        </div>
        {/* green glow */}
        <div className="w-full h-full rounded-[1.25rem] overflow-hidden relative">
          <div className="w-40 h-40 rounded-full bg-primary-dark-green absolute -bottom-28 -left-4 blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
