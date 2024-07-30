import { useState } from "react";
import { GoPerson } from "react-icons/go";
import facebook from "../assets/facebook.svg";
import goggle from "../assets/goggle.svg";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import { InputField, PasswordField } from "../components/ui";
import { Form, Field } from "react-final-form";
import validate from "validate.js";
import { updateFormdata, clearFormData } from "../redux/slices/register.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../static/alert";
import { INDEX, SIGN_UP } from "../routes/CONSTANT";
import * as images from "../assets";

const constraints = {
  display_name: {
    presence: true
  },
  email: {
    presence: true
  },
  username: {
    presence: true
  },
  password: {
    presence: true,
    length: {
      minimum: 6
    }
  },
  confirm_password: {
    presence: true,
    equality: "password"
  },
  terms: {
    presence: {
      message: "must be accepted"
    },
    inclusion: {
      within: [true],
      message: "^must be accepted"
    }
  }
};

const Register = () => {
  const [eyeState, setEyeState] = useState(false);

  const toggleEye = (e) => {
    e.preventDefault();
    setEyeState((prev) => !prev);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log(values);
    dispatch(clearFormData());
    dispatch(updateFormdata(values));
    navigate(SIGN_UP);
    showAlert("Sign up successful", "finish sign up", "success");
  };

  return (
    <div className="flex lg:h-screen bg-[]  flex-col lg:flex-row ">
      <div className="w-full flex-1">
        <div className="relative">
          <div className="h-screen w-full flex justify-center items-center bg-[#001900] bg-no-repeat overflow-hidden relative">
            <Link to={INDEX} className="flex" smooth={true}>
              <img
                className="absolute top-0 left-10 transform  text-white  mt-5"
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent"
                }}
                src={images.logo}
              />
            </Link>
            <img
              src={images.user_phone}
              alt="Background"
              className="absolute z-40 bg-cover left-1/2 bottom-0  transform -translate-x-1/2 w-[20rem]"
            />
          </div>

          <div className="absolute right-0 left-0 top-0 h-full w-full scale-100">
            <img src={images.world_2} alt="" className="mt-24 w- mx-auto   " />
          </div>
        </div>
      </div>
      <div className="w-full h-screen flex-1 rounded-tl-[10%]  lg:rounded-tl-[20%] mx-auto pt-20 px-8 lg:p-16 bg-white overflow-y-scroll scrollbar-thin bar  scrollbar-thumb-[#AEAEAE] scrollbar-track-gray-200">
        <div className=" mx-auto w-[80%] lg:mt-10 2xl:mt-40">
          <div className="">
            <div className="flex justify-center items-center mb-10">
              <div className="flex font-[500] mx-auto text-xs items-center">
                <p className=" bg-[#F7F7F8] text-sm w-[8.8rem] text-center rounded-lg text-[#757682]">
                  Built for you
                </p>
                <p className="text-[#3D7100]">Change</p>
              </div>
            </div>
            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <h1 className="font-Inter mb-7 flex justify-center items-center lg:py-0 text-primary-dark-green font-bold text-3xl">
                    Create Account
                  </h1>

                  <InputField
                    id="display_name"
                    type="text"
                    name="display_name"
                    label="Display Name"
                    component="input"
                    icon={GoPerson}
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.display_name && (
                      <small className="text-red-600">
                        {form.getState().errors.display_name}
                      </small>
                    )}
                  <InputField
                    id="username"
                    type="text"
                    name="username"
                    label="Username"
                    component="input"
                    icon={GoPerson}
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.username && (
                      <small className="text-red-600">
                        {form.getState().errors.username}
                      </small>
                    )}
                  <InputField
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    component="input"
                    icon={AiOutlineMail}
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.email && (
                      <small className="text-red-600">
                        {form.getState().errors.email}
                      </small>
                    )}

                  <PasswordField
                    name="password"
                    id="password"
                    component="input"
                    eyeState={eyeState}
                    toggleEye={toggleEye}
                    placeholder=" "
                    label="Password"
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.password && (
                      <small className="text-red-600">
                        {form.getState().errors.password}
                      </small>
                    )}
                  <PasswordField
                    name="confirm_password"
                    id="confirm_password"
                    component="input"
                    eyeState={eyeState}
                    toggleEye={toggleEye}
                    placeholder=" "
                    label="Re-enter Password"
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.confirm_password && (
                      <small className="text-red-600">
                        {form.getState().errors.confirm_password}
                      </small>
                    )}

                  <div className="flex items-center mt-4 gap-2">
                    <div>
                      <Field
                        type="checkbox"
                        name="terms"
                        component="input"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#FF3A29] d dark:focus:ring-blue-600"
                      />
                    </div>
                    <span className="text-xs font-Inter font-normal pt-1">
                      I accept the{" "}
                      <span className=" text-[#3D7100]">terms of use</span> and{" "}
                      <span className=" text-[#3D7100]">privacy policy</span>
                    </span>
                  </div>
                  {form.getState().errors.terms && (
                    <small className="text-red-600">
                      {form.getState().errors.terms}
                    </small>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-4 font-Montserrat font-bold py-2 px-8 mb-4 bg-primary-dark-green text-white hover:opacity-85"
                  >
                    {submitting ? (
                      <>
                        <span className="loading-dots">
                          <span className="loading-dots-dot"></span>
                          <span className="loading-dots-dot"></span>
                          <span className="loading-dots-dot"></span>
                        </span>
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>
              )}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 lg:gap-3 items-center w-full">
            <hr className="outline-gray-500" />
            <p className="text-center text-sm font-Montserrat text-gray-500 whitespace-nowrap">
              Or Sign Up With{" "}
            </p>
            <hr className="outline-gray-500" />
          </div>

          <div className="flex items-center justify-center w-full mt-4 gap-5">
            <div className="p-2 border border-gray-500 w-10 h-10 flex justify-center items-center rounded-full">
              <img
                src={goggle}
                alt=""
                className="bg-cover hover:cursor-pointer"
              />
            </div>
            <div className="p-2 border border-gray-500 w-10 h-10 flex justify-center items-center rounded-full">
              <img
                src={facebook}
                alt=""
                className="bg-cover hover:cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button className="font-Inter font-medium text-base text-primary-gray ">
              Already have an account?{" "}
              <Link to="/signin" className=" text-[#3D7100]">
                Sign In
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
