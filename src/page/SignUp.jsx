import { useState, useEffect, useMemo } from "react";
import { GoPerson } from "react-icons/go";
import { MdNumbers } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import medianote from "../assets/medianote.svg";
import Ellipse from "../assets/Ellipse.svg";
import { motion } from "framer-motion";
import { InputField, DropDownMenu } from "../components/ui";
// import { FilePicker } from "../components/containers";
import { Form } from "react-final-form";
import validate from "validate.js";
import { useSelector } from "react-redux";
import { countries } from "../static/countries";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../static/alert";
import rtkMutation from "../utils/rtkMutation";
import { useRegisterUserMutation } from "../service/user.service";
import { updateFormdata } from "../redux/slices/register.slice";
import { LOGIN } from "../routes/CONSTANT";
import { FormSpy } from "react-final-form";

const constraints = {
  organization_name: {
    presence: true,
  },
  organization_email: {
    presence: true,
  },
  website_url: {
    presence: true,
  },
  email: {
    presence: true,
  },
};

const SignUp = () => {
  const register = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [industry_type, setSelectedIndustry] = useState("");
  // const [selectedCompanySize, setSelectedCompanySize] = useState("");
  const [location, setSelectedCompanyLocation] = useState("");

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  const state = useSelector((state) => state.register);

  const [registerUser, { error, isSuccess }] = useRegisterUserMutation({
    provideTag: ["User"],
  });

  const onSubmit = async () => {
    try {
      const formData = {
        ...state,
        location,
        industry_type,
      };
      console.log(formData);
      await rtkMutation(registerUser, formData);
    } catch (error) {
      // console.log(error);
      showAlert("Oops", error.message || "An error occurred", "error");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(LOGIN);
      showAlert(
        "Account created successfully!",
        "Pls login to continue",
        "success"
      );
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [error, isSuccess, navigate]);

  const formSpyComponent = useMemo(
    () => (
      <FormSpy subscription={{ values: true }}>
        {({ values }) => {
          dispatch(updateFormdata(values));
          return null;
        }}
      </FormSpy>
    ),
    [dispatch]
  );

  const industries = [
    "Agriculture",
    "Automotive",
    "Banking",
    "Construction",
    "Education",
    "Energy",
    "Entertainment",
    "Finance",
    "Healthcare",
    "Information Technology",
    "Manufacturing",
    "Retail",
    "Telecommunications",
    "Transportation",
    "Travel & Tourism",
    "Utilities",
    "Other",
  ];

  // const companySizes = ["Micro", "Small", "Medium", "Large", "Enterprise"];

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
          <div className="">
            <Form
              onSubmit={onSubmit}
              validate={validateForm}
              initialValues={register || ""}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  {formSpyComponent}

                  <h1 className="font-Inter py-4 lg:py-0 text-primary-dark-green font-medium text-3xl">
                    Company Details
                  </h1>
                  <InputField
                    id="organization_name"
                    type="text"
                    name="organization_name"
                    label="Organization name"
                    component="input"
                    icon={GoPerson}
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.organization_name && (
                      <small className="text-red-600">
                        {form.getState().errors.organization_name}
                      </small>
                    )}
                  <InputField
                    id="website_url"
                    type="text"
                    name="website_url"
                    label="Organization Website URL"
                    component="input"
                    icon={GoPerson}
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.website_url && (
                      <small className="text-red-600">
                        {form.getState().errors.website_url}
                      </small>
                    )}
                  <InputField
                    id="phone_number"
                    type="number"
                    name="phone_number"
                    label="Phone Number"
                    component="input"
                    icon={MdNumbers}
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.organization_name && (
                      <small className="text-red-600">
                        {form.getState().errors.organization_name}
                      </small>
                    )}

                  <DropDownMenu
                    options={countries}
                    onSelect={(option) => setSelectedCompanyLocation(option)}
                    displayText="Select Location"
                  />
                  <InputField
                    id="organization_email"
                    type="organization_email"
                    name="organization_email"
                    component="input"
                    label="Organization Email address"
                    icon={AiOutlineMail}
                    placeholder=" "
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.organization_email && (
                      <small className="text-red-600">
                        {form.getState().errors.organization_email}
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
                    readOnly
                  />
                  {form.getState().submitFailed &&
                    form.getState().errors.email && (
                      <small className="text-red-600">
                        {form.getState().errors.email}
                      </small>
                    )}

                  <DropDownMenu
                    options={industries}
                    onSelect={(option) => setSelectedIndustry(option)}
                    displayText="Select Industry"
                  />

                  {/* <DropDownMenu
                    options={companySizes}
                    onSelect={(option) => setSelectedCompanySize(option)}
                    displayText="Select Company Size"
                  /> */}

                  {/* <div className="mb-4 lg:mb-0 2xl:mt-6 lg:mt-4">
                    <h1 className="w-[clamp(280px,70%,600px)] font-Inter font text-sm text-primary-light-gray py-3">
                      Upload certificate of Incorporation
                    </h1>
                    <Field
                      name="certOfInc" // Make sure this matches your form state
                      render={({ input }) => (
                        <FilePicker
                          width="w-[100%]"
                          form={form}
                          valueSetter={input.onChange}
                        />
                      )}
                    />
                  </div> */}

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
                      "Finish"
                    )}
                  </button>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
