import { useState } from "react";
import { GoPerson } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import medianote from "../assets/medianote.svg";
import Ellipse from "../assets/Ellipse.svg";
import { motion } from "framer-motion";
import { InputField, DropDownMenu } from "../components/ui";
import { FilePicker } from "../components/containers";

const SignUp = () => {
  const [eyeState, setEyeState] = useState(false);

  const [form, setForm] = useState({
    orgName: "",
    orgEmail: "",
    email: "",
  });

  const setValue = (fieldName, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

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
              src={medianote}
              alt="Background"
              className="absolute bg-cover   transform -translate-x-1/2 w-[30%]"
            />
          </div>

          <div className="absolute right-0 left-0 top-0 h-full w-full scale-100">
            <motion.img
              initial={{ y: -400, x: -400 }}
              animate={{ y: 0, x: 0 }}
              transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
              src={Ellipse}
              alt=""
              className="  w-[60%]"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-screen lg:w-2/5 rounded-tl-[10%]  lg:rounded-tl-[20%] mx-auto pt-20 px-8 lg:p-16 bg-white overflow-y-scroll scrollbar-thin bar  scrollbar-thumb-[#AEAEAE] scrollbar-track-gray-200">
        <div className=" lg:mt-0 2xl:mt-40">
          <form className="">
            <h1 className="font-Inter py-4 lg:py-0 text-primary-dark-green font-medium text-3xl">
              Company Details
            </h1>
            <InputField
              id="name"
              type="text"
              name="orgName"
              label="Organization name"
              // onChange={handleChange}
              icon={GoPerson}
              placeholder="Display name"
            />

            <DropDownMenu displayText="Location" />
            <InputField
              id="username"
              type="email"
              name="orgEmail"
              label="Organization Email address"
              // onChange={handleChange}
              icon={AiOutlineMail}
              placeholder="Organization Email address"
            />
            <InputField
              id="email"
              type="email"
              name="email"
              label="Email"
              // onChange={handleChange}
              icon={AiOutlineMail}
              placeholder=" Email address"
            />

            <DropDownMenu displayText="Select Industry" />
            <DropDownMenu displayText="Company Size" />

            <div className="mb-4 lg:mb-0 2xl:mt-6 lg:mt-4">
              <h1 className="w-[clamp(280px,70%,600px)] font-Inter font text-sm text-primary-light-gray py-3">Upload certificate of Incorporation</h1>
            <FilePicker
              width="w-[100%]"
              form={form}
              valueSetter={setValue}
            />

            </div>

            <button
              type="submit"
              className="w-full mt-4 font-Montserrat font-bold py-2 px-8 mb-4 rounded-full bg-primary-dark-green text-white hover:opacity-85"
            >
              Finish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;