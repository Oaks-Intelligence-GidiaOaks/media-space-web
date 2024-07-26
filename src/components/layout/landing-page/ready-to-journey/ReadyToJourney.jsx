import { Link } from "react-router-dom";
import * as images from "../../../../assets";
import { REGISTER, SIGN_UP_AS } from "../../../../routes/CONSTANT";

const ReadyToJourney = () => {
  return (
    <section className="mt-24 w-full px-5 md:px-20 bg-[#141414] relative">
      <img
        src={images.net}
        alt=""
        className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 "
      />
      <img
        src={images.Glow}
        alt=""
        className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 "
      />
      <div className="pt-24 relative z-30">
        <p className="mx-auto  text-sm w-[13.8rem] text-center rounded-md text-[#fff]">
          Ready to journey with us?
        </p>
        <h2 className="text-[2.5rem] leading-[3rem] mb-11 font-[600] text-center text-[#F7F7F8] ">
        Get Started for Free <br />
        Create an Account
        </h2>
        <div className="flex pb-24 gap-5">
        <div className="flex mx-auto gap-5">
          <Link to={SIGN_UP_AS} className=" action-button sm:mr-1">
            Get started
          </Link>
          <Link
            to={SIGN_UP_AS}
            className=" action-button border border-[#3D7100] bg-transparent text-[#FBFBFB]  sm:mr-1"
          >
            Speak to Support
          </Link>
        </div>
        </div>
      </div>
      <img
        src={images.rectangle_down}
        alt=""
        className="absolute bottom-0 right-0 "
      />
    </section>
  );
};

export default ReadyToJourney;
