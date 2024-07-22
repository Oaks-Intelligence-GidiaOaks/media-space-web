import { Link } from "react-router-dom";
import { INDEX } from "../../../../routes/CONSTANT";
import imagehero from "../../../../assets/imagehero.svg";
import { REGISTER } from "../../../../routes/CONSTANT";
import { CiPlay1 } from "react-icons/ci";
import * as images from "../../../../assets";
import TypingEffect from "../../../ui/TypingEffect";


function Hero() {
  return (
    <>
      <section className="h-[558px] heroimg w-full ">
        <div className="w-full bg-[#112420] text-[#FBFBFB] px-5 md:px-20 h-full flex justify-center items-center">
          <div className="flex flex-col">
            <h3 className="first-hero-head hero-subtitle text-[#fff]">
            Discover <span className="text-[#7ADD02] "> Seamless <br /> Community Management <br />
              </span> in one Place
            </h3>
            <p className="first-hero-subtitle w-full pt-6 pb-14">
            Don't just sell products to your customers, Grow a <br /> community with them​.
            </p>

            <div className="flex gap-5">
              <Link to={REGISTER} className=" action-button sm:mr-1">
                Get started
              </Link>
              <Link
                to={REGISTER}
                className=" action-button border border-[#3D7100] bg-transparent text-[#FBFBFB]  sm:mr-1"
              >
                Watch Demo <CiPlay1 className="inline" />
              </Link>
            </div>
          </div>
          <img src={imagehero} className="hidden lg:flex" alt="" />
        </div>
      </section>
      <section className="hero bg-[#F7FEEE] min-h-screen pt-36 flex justify-center items-center">
        <div className="container relative">
          <img src={images.hero_map} alt="hero map" className=" mx-auto" />
          <div className="hero-content text-center">
            <h5 className="hero-subtitle pb-3">
              <span className="spotlight"> <TypingEffect /></span> your community <br />
              with people around the world
              
            </h5>
            <h5 className="hero-lead pt-5 pb-8">
            Do more with Kommunita and grow your Ideal reach
            </h5>

            <div className="flex pb-32 justify-center">
              <Link to={INDEX} className="hero-btn">
                Get started
              </Link>
            </div>
          </div>
          <img src={images.map1} alt="hero map" className="w-10 h-10 lg:w-20 lg:h-20 rounded absolute -top-10 right-[20%] mx-auto zoom" />
          <img src={images.map2} alt="hero map" className="w-10 h-10 lg:w-20 lg:h-20 rounded absolute -top-10 left-[20%] mx-auto zoom" />
          <img src={images.map3} alt="hero map" className="w-10 h-10 lg:w-20 lg:h-20 rounded absolute top-32 left-[8%] mx-auto zoom" />
          <img src={images.map4} alt="hero map" className="w-10 h-10 lg:w-20 lg:h-20 rounded absolute top-32 right-[8%] mx-auto zoom" />
          <img src={images.map5} alt="hero map" className="w-10 h-10 lg:w-20 lg:h-20 rounded absolute top-32 md:top-60 right-[45%] mx-auto zoom" />
          <img src={images.map6} alt="hero map" className="w-10 h-10 lg:w-20 lg:h-20 rounded absolute bottom-52 left-[5%] mx-auto zoom" />
          <img src={images.map7} alt="hero map" className="w-10 h-10 lg:w-20 lg:h-20 rounded absolute bottom-52 right-[5%] mx-auto zoom" />
        </div>
      </section>
    </>
  );
}

export default Hero;
