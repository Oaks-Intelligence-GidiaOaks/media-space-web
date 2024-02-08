import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import facebook from "../assets/facebook.svg";
import goggle from "../assets/goggle.svg";
import instagram from "../assets/instagram.svg";
import linkedin from "../assets/linkedin.svg";
import BgGroup from "../assets/BgGroup.svg";
import Ellipse from "../assets/Ellipse.svg";
import {  motion } from "framer-motion";

const Login = () => {
  const [eyeState, setEyeState] = useState(false);

  const toggleConfirmEye = (e) => {
    e.preventDefault();
    setEyeState((prev) => !prev);
  };
  return (
    <div className="flex lg:h-screen bg-[#001900]  flex-col lg:flex-row ">
      <div className="w-full lg:w-3/5">
        <div className="relative">
          <div className="h-screen w-full flex justify-center items-center bg-[#001900] bg-no-repeat overflow-hidden relative">
            <h1
              className="absolute text-center font-Inter top-0 left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold mt-20"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #6E9D37 0%, #74A12D 52%, #97B24C 99.99%, #94B04A 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              KOMMUNITA
            </h1>
            <motion.img
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              src={BgGroup}
              alt="Background"
              className="absolute bottom-0 transform -translate-x-1/2 w-[60%]"
            />
          </div>

          <div className="absolute right-0 left-0 top-0 h-full w-full">
            <motion.img
              initial={{ y: -650, x: -650 }}
              animate={{ y: 0, x: 0 }}
              transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
              src={Ellipse}
              alt=""
              className=" scale-100 w-[60%]"
            />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/5 rounded-tl-[10%]  lg:rounded-tl-[20%]  mx-auto p-8 lg:p-16 bg-white">
        <div className="">
          <form className="">
            <h1 className="font-Inter py-2 text-primary-dark-green font-bold text-4xl">
              Sign In
            </h1>
            <div className="relative mt-6">
              <input
                id="email"
                type="email"
                className="block px-2 w-full py-3 bg-transparent border-0 border-b border-black appearance-none focus:border-b-primary-dark-green focus:outline-none focus:ring-0 peer"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className=" px-2 absolute text-primary-gray  bg-transparent duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-dark-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >
                Email address
              </label>
              <AiOutlineMail
                color=""
                className=" text-primary-gray absolute top-4 right-2"
              />
            </div>
            <div className="relative mt-6">
              <input
                type={eyeState ? "text" : "password"}
                className="block px-2 w-full py-3 bg-transparent  border-0 border-b border-black appearance-none focus:border-b-primary-dark-green focus:outline-none focus:ring-0 peer"
                placeholder="Password"
              />
              <label
                htmlFor=""
                className=" px-2 absolute  text-primary-gray bg-transparent duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-dark-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >
                Password
              </label>

              <div
                className="text-primary-gray absolute top-4 right-2 hover:cursor-pointer"
                onClick={toggleConfirmEye}
              >
                {eyeState ? <BsEye size={20} /> : <BsEyeSlash size={20} />}
              </div>
            </div>
            <div className="flex items-center mt-4 gap-2">
              <div>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="text-[#FF3A29]"
                />
                <label htmlFor="Remember Me"></label>
              </div>
              <span className="text-xs font-Inter font-light ">
                Keep me sign in
              </span>
            </div>

            <button
              type="submit"
              className="w-full mt-4 font-Montserrat font-bold py-2 px-8 mb-4 rounded-full bg-primary-dark-green text-white hover:opacity-85"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 grid grid-cols-3 gap-3 items-center max-w-md">
            <hr className="outline-gray-500" />
            <p className="text-center text-xs font-Montserrat text-gray-500 whitespace-nowrap">
              Or Sign Up With{" "}
            </p>
            <hr className="outline-gray-500" />
          </div>

          <div className="flex items-center justify-center w-full mt-4 gap-3">
            <div className="p-2 border border-gray-500 w-12 h-12 flex justify-center items-center rounded-full">
              <img
                src={goggle}
                alt=""
                className="bg-cover hover:cursor-pointer"
              />
            </div>
            <div className="p-2 border border-gray-500 w-12 h-12 flex justify-center items-center rounded-full">
              <img
                src={facebook}
                alt=""
                className="bg-cover hover:cursor-pointer"
              />
            </div>
            <div className="p-2 border border-gray-500 w-12 h-12 flex justify-center items-center rounded-full">
              <img
                src={instagram}
                alt=""
                className="bg-cover hover:cursor-pointer"
              />
            </div>
            <div className="p-2 border border-gray-500 w-12 h-12 flex justify-center items-center rounded-full">
              <img
                src={linkedin}
                alt=""
                className="bg-cover hover:cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button className="font-Inter font-medium text-base text-primary-gray ">
              Already have an account?{" "}
              <Link to="/signup" className=" text-primary-red">
                Sign up
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
