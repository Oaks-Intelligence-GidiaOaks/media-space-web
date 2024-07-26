import Chatbot from "../../components/ui/Chatbot";
import React from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const SupportActions = () => {
  return (
    <div className="pb-28 relative">
      <div className="flex flex-col md:flex-row justify-center px-5 md:px-20 my-24 items-center gap-5 mb-">
        <Link to={"get-started"}>
          <div
            className={`rounded-lg border cursor-pointer bg-[#FFFFFF] p-4 md:p-8 w-full md:w-96`}
          >
            <h4 className="font-semibold flex items-center justify-between text-[1.25rem] mb-2">
              Get Started
            </h4>
            <p className="text-[1rem] text-[#5E5E6B] ">
              Get access to our pool of resources to get started on Kommunita.
            </p>
            <div className="flex gap-5 items-center text-[#3D7100] pt-5">
              <p className="text-[1rem] ">Explore</p>
              <RiArrowRightLine
                size={20}
                className="text-[#3D7100] text-[1rem] "
              />
            </div>
          </div>
        </Link>
        <Link to={""}>
          <div
            className={`rounded-lg border cursor-pointer bg-[#FFFFFF] p-4 md:p-8 w-full md:w-96`}
          >
            <h4 className="font-semibold flex items-center justify-between text-[1.25rem] mb-2">
              Tutorials
            </h4>
            <p className="text-[1rem] text-[#5E5E6B] ">
              Want to learn how to use Kommunita? We have Beginner-friendly
              tutorials for you.
            </p>
            <div className="flex gap-5 items-center text-[#3D7100] pt-5">
              <p className="text-[1rem] ">Get Started</p>
              <RiArrowRightLine
                size={20}
                className="text-[#3D7100] text-[1rem] "
              />
            </div>
          </div>
        </Link>
      </div>
      <hr color="" className="mx-5 md:mx-20" />
      <div className="md:flex justify-between gap-10 pt-10 items-start px-5 md:px-20">
        <div className="flex flex-col gap-5 md:w-1/3">
          <h4 className="font-semibold text-[1.75rem] ">Contact us</h4>
          <p>
            Do you have questions or concerns that we can help you with? Please
            use the contact form below, and we'll get back to you promptly.
          </p>
        </div>
        <div className="md:w-2/3 mt-5 md:mt-0">
          <form action="" className="flex flex-col">
            <div className="gap-5 grid md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="border-0 border-none px-0 my-0 outline-none focus:outline-none focus:border-[#FCB900]"
                />
                <div className="mt-0 pt-0 h-[1px] w-full bg-[#2F2F37]" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border-none px-0"
                />
                <div className="mt-0 pt-0 h-[1px] w-full bg-[#2F2F37]" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  placeholder="Email Address"
                  className="border-none px-0"
                />
                <div className="mt-0 pt-0 h-[1px] w-full bg-[#2F2F37]" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">Phone Number</label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border-none px-0"
                />
                <div className="mt-0 pt-0 h-[1px] w-full bg-[#2F2F37]" />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Your Message</label>
              <input
                type="text"
                placeholder="Message"
                className="border-none px-0"
              />
              <div className="mt-0 pt-0 h-[1px] w-full bg-[#2F2F37]" />
            </div>
            {/* <br /> */}
            <button className="action-button mt-5 md:w-1/2">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default SupportActions;
