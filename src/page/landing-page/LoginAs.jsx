import { Link, useNavigate } from "react-router-dom";
import * as images from "../../assets";
import { INDEX, LOGIN, SIGN_UP_AS } from "../../routes/CONSTANT";
import { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";


const LoginAs = () => {
    const [selectedDiv, setSelectedDiv] = useState(null);
    const [selectedPath, setSelectedPath] = useState(null);
    const navigate = useNavigate();
  
    const handleDivClick = (userType, path) => {
      setSelectedDiv(userType);
      setSelectedPath(path);
    };
  
    const handlePathClick = () => {
      if (selectedPath && selectedDiv) {
        if (selectedPath.startsWith('http')) {
          window.location.href = selectedPath;
        } else {
          navigate(selectedPath);
        }
      }
    };


  return (
<div className="min-h-screen bg-white px-5 md:px-10 xl:px-20   w-full">
      <div className="py-8">
        <Link to={INDEX} className="flex">
          <img src={images.logo_new} alt="logo" />
        </Link>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col my-auto items-center justify-center bg-[#F7F9FC] p-8 md:px-24 md:py-12 rounded-lg">
          <h1 className="font-semibold text-lg md:text-2xl leading-snug mb-6 text-center">
            How would you like to log in?
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-">
            <div className={`rounded-lg border cursor-pointer bg-[#FFFFFF] p-4 md:p-8 w-full md:w-96 ${selectedDiv ===1 ? "border-[#3D7100]" : ""}`} 
          onClick={() => handleDivClick(1, 'https://user.kommunita.com/login')}
            >
              <h4 className="font-semibold flex items-center justify-between text-[1.25rem] mb-2">
                As an Individual <IoCheckmarkCircle className={`text-[#007D00] ${selectedDiv === 1 ? "flex" : 'hidden'}`} size={20} />
              </h4>
              <p className="text-[1rem] text-[#5E5E6B] ">
                Log in on Kommunita as a user to continue your journey
              </p>
            </div>
            <div className={`rounded-lg border cursor-pointer bg-[#FFFFFF] p-4 md:p-8 w-full md:w-96 ${selectedDiv ===2 ? "border-[#3D7100]" : ""}`} 
         onClick={() => handleDivClick(2, LOGIN)}
            >
              <h4 className="font-semibold flex items-center justify-between text-[1.25rem] mb-2">
                As a Business <IoCheckmarkCircle className={`text-[#007D00] ${selectedDiv === 2 ? "flex" : 'hidden'}`} size={20} />
              </h4>
              <p className="text-[1rem] text-[#5E5E6B] ">
                Continue as a business owner exploring Kommunita?
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-10 justify-between gap-5 px-10 w-full md:w-auto">
            <button  onClick={handlePathClick}
             className="action-button text-white py-2 rounded hover:bg-[#75a143] hover:text-black transition duration-300">
              Continue
            </button>
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link to={SIGN_UP_AS} className="text-[#3D7100] underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginAs
