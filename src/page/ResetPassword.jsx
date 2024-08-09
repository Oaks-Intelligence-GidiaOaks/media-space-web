import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PasswordField, InputField } from "../components/ui";
import { Form } from "react-final-form";
import { useEffect } from "react";
import rtkMutation from "../utils/rtkMutation";
import { showAlert } from "../static/alert";
import { INDEX, LOGIN, FORGOT_PASSWORD } from "../routes/CONSTANT";
import * as images from "../assets";
import {
  useUpdatePasswordMutation,
  useGetCodeMutation
} from "../service/user.service";
import { TbPasswordFingerprint } from "react-icons/tb";
import PropTypes from "prop-types"; // Import PropTypes

const ResetPassword = ({ email }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate(FORGOT_PASSWORD);
    }
  }, [email, navigate]);

  const [eyeState, setEyeState] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const toggleEye = (e) => {
    e.preventDefault();
    setEyeState((prev) => !prev);
  };

  const [Reset, { error, isSuccess }] = useUpdatePasswordMutation({
    provideTag: ["User"]
  });

  const onSubmit = async (values) => {
    console.log(values);
    await rtkMutation(Reset, values);
  };

  const validateForm = (values) => {
    const errors = {};

    // Validate presence
    if (!values.newPassword) {
      errors.newPassword = "Password is required";
    } else {
      // Validate length
      if (values.newPassword.length < 8) {
        errors.newPassword = "Password must be at least 8 characters long";
      }

      // Validate format
      const lowercase = /[a-z]/.test(values.newPassword);
      const uppercase = /[A-Z]/.test(values.newPassword);
      const number = /\d/.test(values.newPassword);
      const specialChar = /[!@#$%^&*]/.test(values.newPassword);

      if (!lowercase) {
        errors.newPassword =
          "Password must contain at least one lowercase letter";
      } else if (!uppercase) {
        errors.newPassword =
          "Password must contain at least one uppercase letter";
      } else if (!number) {
        errors.newPassword = "Password must contain at least one number";
      } else if (!specialChar) {
        errors.newPassword =
          "Password must contain at least one special character (!@#$%^&*)";
      }
    }

    // Validate confirm_password
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (values.confirm_password !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!values.code) {
      errors.code = "Username is required";
    }

    return errors;
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("Password changed Successfully!", "Pls Login", "success");
      navigate(LOGIN);
    } else if (error) {
      showAlert("", error?.data?.message, "error");
    }
  }, [isSuccess, error, navigate]);

  const [Forgot, { error: otpError, isSuccess: otpSuccess, isLoading }] =
    useGetCodeMutation({
      provideTag: ["User"]
    });

  const resendOtp = async () => {
    await rtkMutation(Forgot, { email });
    setTimer(60);
    setIsButtonDisabled(true);
  };

  useEffect(() => {
    if (otpSuccess) {
      showAlert("", "Otp has been resent", "success");
    } else if (otpError) {
      showAlert("Oops", otpError.data.message || "An error occurred", "error");
    }
  }, [otpSuccess, otpError]);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setIsButtonDisabled(false);
    }
  }, [timer]);

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
              Reset Password
            </h1>
            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <InputField
                    id="code"
                    type="number"
                    name="code"
                    label="Enter OTP"
                    component="input"
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.code && (
                      <small className="text-red-600">
                        {form.getState().errors.code}
                      </small>
                    )}

                  <PasswordField
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    component="input"
                    icon={TbPasswordFingerprint}
                    placeholder=" "
                    toggleEye={toggleEye}
                    eyeState={eyeState}
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.newPassword && (
                      <small className="text-red-600">
                        {form.getState().errors.newPassword}
                      </small>
                    )}

                  <PasswordField
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    component="input"
                    icon={TbPasswordFingerprint}
                    placeholder=" "
                    toggleEye={toggleEye}
                    eyeState={eyeState}
                  />

                  {form.getState().submitFailed &&
                    form.getState().errors.confirmPassword && (
                      <small className="text-red-600">
                        {form.getState().errors.confirmPassword}
                      </small>
                    )}

                  <button
                    type="submit"
                    className="w-full mt-4 font-Montserrat font-bold py-2 px-8 mb-4 rounded-full bg-primary-dark-green text-white hover:opacity-85"
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
                      "Reset Password"
                    )}
                  </button>
                </form>
              )}
            />

            <button
              className={`w-full mt-4 font-Montserrat font-bold py-2 px-8 mb-4 rounded-full bg-primary-dark-green text-white hover:opacity-85 ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={resendOtp}
              disabled={isButtonDisabled}
            >
              {isLoading
                ? "Sending..."
                : `Resend OTP ${isButtonDisabled ? `(${timer}s)` : ""}`}
            </button>
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

ResetPassword.propTypes = {
  email: PropTypes.string
};

export default ResetPassword;
