import React from "react";

const InputField = ({
  id,
  type,
  name,
  value,
  label,
  onChange,
  icon: Icon,
  placeholder,
}) => {
  return (
    <div className="relative mb-4 lg:mb-0 2xl:mt-6 lg:mt-4">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="block px-2 w-full placeholder:text-sm placeholder:font-Inter py-3 bg-transparent border-0 border-b border-black appearance-none focus:border-b-primary-dark-green focus:outline-none focus:ring-0 peer"
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className=" px-2 absolute text-primary-gray  bg-transparent duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-dark-green peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
      >
        {label}
      </label>

      {Icon && (
        <Icon color="" className="text-primary-gray absolute top-4 right-2" />
      )}
    </div>
  );
};

export default InputField;
