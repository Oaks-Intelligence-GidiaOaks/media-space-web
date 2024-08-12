import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Sidebar, Titlebar } from "../components/layout/super-admin-layout";
import { sidebarItems } from "../constants";

const SuperAdminLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-row h-screen w-full mx-auto overflow-hidden overflow-y-scroll">
      <Sidebar sidebarItems={sidebarItems} />
      <div className="flex-1 flex flex-col">
        <div className="h-screen">
          <Titlebar />

          <div className="flex-1 overflow-y-auto pt-10 sm:pt-0 min-h-[200vh] px-2 sm:px-0">
            <div className="">{<Outlet />}</div>
          </div>
        </div>
      </div>
    </div>

    // <div className="flex flex-row h-screen w-full mx-auto">
    //   <Sidebar sidebarItems={sidebarItems} />
    //   <div className="flex-1 flex flex-col">
    //     <div className="w-full max-w-[1440px] h-full mx-auto flex flex-col">
    //       <Titlebar />
    //       <div className="flex-1 overflow-y-auto pt-10 sm:pt-0 px-2 sm:px-0">
    //         <div className="min-h-[200vh]">{<Outlet />}</div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SuperAdminLayout;
