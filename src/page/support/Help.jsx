import React from "react";
import * as images from "../../assets";
import { FaSearch } from "react-icons/fa";

const Help = () => {
  return (
    <div className="bg-[#112420] h-[25 relative pt-24 pb-20 px-5 md:px-20 ">
      <div className="text-white py-10">
        <h1 className="text-5xl font-bold pb-5 font-[Helvetica]">Hello 👋</h1>
        <h1 className="text-5xl font-bold font-[Helvetica]">
          How can we help you?
        </h1>
      </div>

      <form
        action=""
        className="bg-white md:w-[27.5rem] px-10 rounded-full flex justify-between items-center"
      >
        <input
          type="text"
          placeholder="Search"
          className="border-none w-full"
        />
        <FaSearch />
      </form>

      <img src={images.help} alt="" className="absolute top-0 right-0" />
    </div>
  );
};

export default Help;
