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
import { motion } from "framer-motion";
import { InputField, PasswordField } from "../components/ui";

const Login = () => {
  const [eyeState, setEyeState] = useState(false);

  const toggleEye = (e) => {
    e.preventDefault();
    setEyeState((prev) => !prev);
  };
  return (
    <div className="flex lg:h-screen bg-[#001900]  flex-col lg:flex-row ">
      <div className="w-full lg:w-3/5">
        <div className="relative">
          <div className="h-screen w-full flex justify-center items-center bg-[#001900] bg-no-repeat overflow-hidden relative">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1, ease: "easeIn" }}
              className="absolute text-center font-Inter top-0 left-1/2 transform -translate-x-1/2 text-white text-3xl font-semibold mt-20"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #6E9D37 0%, #74A12D 52%, #97B24C 99.99%, #94B04A 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              KOMMUNITA
            </motion.h1>
            <motion.img
              initial={{ y: 200, opacity: 0, scale: 1 }}
              animate={{ y: 0, opacity: 1, scale: 1.1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              src={BgGroup}
              alt="Background"
              className="absolute bottom-0 transform -translate-x-1/2 w-[60%]"
            />
          </div>

          <div className="absolute right-0 left-0 top-0 h-full w-full scale-100">
            <motion.img
              initial={{ y: -400, x: -400 }}
              animate={{ y: 0, x: 0 }}
              transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
              src={Ellipse}
              alt=""
              className=" w-[60%]"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-screen lg:w-2/5 rounded-tl-[10%]  lg:rounded-tl-[20%]  mx-auto pt- px-820 lg:p-16 bg-white">
        <div className="lg:mt-0 2xl:mt-40">
          <form className="">
            <h1 className="font-Inter py-2 text-primary-dark-green font-semibold text-3xl">
              Sign In
            </h1>

            <InputField
              id="email"
              type="email"
              name="email"
              label="Email"
              // onChange={handleChange}
              icon={AiOutlineMail}
              placeholder=" Email address"
            />
            <PasswordField
              name="passwore"
              id="password"
              // onChange={handleChange}
              eyeState={eyeState}
              toggleEye={toggleEye}
              placeholder="Password"
              label="Password"
            />
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
