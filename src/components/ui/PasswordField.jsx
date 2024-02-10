import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs"; // Import the eye icons

const PasswordField = ({
  id,
  eyeState,
  toggleEye,
  placeholder,
  label,
  value,
  onChange
}) => {
  return (
    <div className="relative 2xl:mt-6 lg:mt-4">
      <input
        type={eyeState ? "text" : "password"}
        className="block px-2 w-full py-3 placeholder:text-sm bg-transparent border-0 border-b border-black appearance-none focus:border-b-primary-dark-green focus:outline-none focus:ring-0 peer"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="px-2 absolute text-primary-gray bg-transparent duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-dark-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
      >
        {label}
      </label>
      <div
        className="text-primary-gray absolute top-4 right-2 hover:cursor-pointer"
        onClick={toggleEye}
      >
        {eyeState ? <BsEye size={20} /> : <BsEyeSlash size={20} />}
      </div>
    </div>
  );
};

export default PasswordField;
