
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Nav } from "../components";
import useBreadcrumbs from "../components/ui/Breadcrumbs";
import Chatbot from "../components/ui/Chatbot";

const SupportLayout = () => {
  const breadcrumbs = useBreadcrumbs();
  return (
    <>
      <Nav />
      <div className="px-5 md:px-20 bg-[#112420] py-5 relative">
        <div className="md:flex justify-between items-center ">
          <ol className="flex gap-4 text-white">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={index} className="breadcrumb-item">
                {index < breadcrumbs.length - 1 ? (
                  <Link to={breadcrumb.to} className="font-semibold">
                    {breadcrumb.label}
                  </Link>
                ) : (
                  breadcrumb.label
                )}
                {index < breadcrumbs.length - 1 && " > "}
              </li>
            ))}
          </ol>
          <form
            action=""
            className="bg-white mt-4 md:mt-0 lg:w-[27.5rem] px-10 rounded-full flex justify-between items-center"
          >
            <input
              type="text"
              placeholder="Search"
              className="border-none w-full"
            />
            <FaSearch />
          </form>
        </div>
      </div>
     <div className="min-h-[50vh]">
     <Outlet />
     <Chatbot />
     </div>
    </>
  );
};

export default SupportLayout;
