import React from "react";
import BgGroup from "../../assets/BgGroup.svg";

const Illustration = () => {
  return (
    <div className="">
      <div className="h-screen w-full bg-[#001900] bg-no-repeat rounded-tr-[5%] rounded-br-[5%] overflow-hidden relative">
        <h1
          className="absolute text-center font-Inter top-0 left-1/2 transform -translate-x-1/2 text-white text-4xl font-bold mt-20"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #6E9D37 0%, #74A12D 52%, #97B24C 99.99%, #94B04A 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          KOMMUNITA
        </h1>
        <img
          src={BgGroup}
          alt="Background"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[70%]"
        />
      </div>
    </div>
  );
};

export default Illustration;



