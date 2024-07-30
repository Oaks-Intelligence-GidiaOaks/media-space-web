import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import facebook from "../assets/facebook.svg";
import goggle from "../assets/goggle.svg";
import { InputField, PasswordField } from "../components/ui";
import { Form } from "react-final-form";
import validate from "validate.js";
import { useEffect } from "react";
import rtkMutation from "../utils/rtkMutation";
import { showAlert } from "../static/alert";
import { useLoginUserMutation } from "../service/user.service";
import {
  DASHBOARD,
  INDEX,
  REGISTER,
  FORGOT_PASSWORD
} from "../routes/CONSTANT";
import * as images from "../assets";

const constraints = {
  email: {
    presence: true
  },
  password: {
    presence: true,
    length: {
      minimum: 6
    }
  }
};

const Login = () => {
  const [eyeState, setEyeState] = useState(false);

  const toggleEye = (e) => {
    e.preventDefault();
    setEyeState((prev) => !prev);
  };

  const [loginUser, { error, isSuccess }] = useLoginUserMutation({
    provideTag: ["User"]
  });

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await rtkMutation(loginUser, values);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Login Successful!", "success");
      navigate(DASHBOARD);
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error, navigate]);

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
              className="absolute z-40 bg-cover bottom-0 left-1/2  transform -translate-x-1/2 w-[20rem]"
            />
          </div>

          <div className="absolute right-0 left-0 top-0 h-full w-full scale-100">
            <img src={images.world_2} alt="" className="mt-24 w- mx-auto   " />
          </div>
        </div>
      </div>

      <div className="w-full h-screen flex-1 flex flex-col justify-center items-center rounded-tl-[10%]  lg:rounded-tl-[20%]  mx-auto pt-20 px-8 lg:p-16 bg-white">
        <div className="sm:mt-20 lg:mt-0 2xl:mt-40 mx-auto w-[80%]">
          <div className="">
            <h1 className="font-Inter mb-7 lg:py-0 mx-auto flex justify-center items-center  text-primary-dark-green font-bold text-3xl">
              Hello, Welcome Back
            </h1>
            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
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
                    label="Password"
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.password && (
                      <small className="text-red-600">
                        {form.getState().errors.password}
                      </small>
                    )}
                  <div className="flex justify-between mt-4 items-center">
                    <div className="flex items-center gap-2">
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

                    <span className="text-xs font-Inter font-light text-primary-red hover:underline">
                      <Link to={FORGOT_PASSWORD}>forgot password?</Link>
                    </span>
                  </div>

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
                      "Log In"
                    )}
                  </button>
                </form>
              )}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 lg:gap-3 items-center w-full">
            <hr className="outline-gray-500" />
            <p className="text-center text-xs font-Montserrat text-gray-500 whitespace-nowrap">
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
              Don’t have an account?
              <Link to={REGISTER} className="pl-1 text-[#3D7100]">
                Register Here
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
