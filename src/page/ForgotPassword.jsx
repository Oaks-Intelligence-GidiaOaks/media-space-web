import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../components/ui";
import { Form } from "react-final-form";
import validate from "validate.js";
import { useEffect } from "react";
import rtkMutation from "../utils/rtkMutation";
import { showAlert } from "../static/alert";
import { useGetCodeMutation } from "../service/user.service";
import { INDEX, LOGIN } from "../routes/CONSTANT";
import * as images from "../assets";
import ResetPassword from "./ResetPassword";

const constraints = {
  email: {
    presence: true,
    email: true
  }
};

const ForgotPassword = () => {
  const [Forgot, { error, isSuccess }] = useGetCodeMutation({
    provideTag: ["User"]
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState();

  const onSubmit = async (values) => {
    console.log(values);
    await rtkMutation(Forgot, values);
    setEmail(values.email);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert(
        "Otp has been sent",
        "Check your email for your password reset code",
        "success"
      );
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error, navigate]);

  if (isSuccess) {
    return <ResetPassword email={email} />;
  }

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
            <h1 className="font-Inter mb-12 lg:py-0 mx-auto flex justify-center items-center  text-primary-dark-green font-bold text-3xl">
              Forgot Password
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
                      "Get Code"
                    )}
                  </button>
                </form>
              )}
            />
          </div>

          <div className="mt-4 grid grid-cols-3 lg:gap-3 items-center w-full">
            <hr className="outline-gray-500" />
            <p className="text-center text-xs font-Montserrat text-gray-500 whitespace-nowrap">
              OR
            </p>
            <hr className="outline-gray-500" />
          </div>

          <div className="flex items-center justify-center mt-4">
            <button className="font-Inter font-medium text-base text-primary-gray flex gap-4">
              Go back to Login
              <Link to={LOGIN} className=" text-primary-red">
                Sign In
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
