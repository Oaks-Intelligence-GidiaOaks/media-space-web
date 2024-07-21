import { Link } from "react-router-dom";
import { INDEX } from "../../../../routes/CONSTANT";
import imagehero from "../../../../assets/imagehero.svg";
import { REGISTER } from "../../../../routes/CONSTANT";
import { CiPlay1 } from "react-icons/ci";
import * as images from "../../../../assets";


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
      <section className="hero bg-[#F7FEEE] h-screen flex justify-center items-center">
        <div className="container">
          <img src={images.hero_map} alt="hero map" className=" mx-auto" />
          <div className="hero-content text-center">
            <h5 className="hero-subtitle pb-3">
              <span className="spotlight">Build</span> your community <br />
              with people around the world
               
            </h5>
            <h5 className="hero-lead pt-5 pb-8">
            Do more with Kommunita and grow your Ideal reach
            </h5>

            <div className="flex justify-center">
              <Link to={INDEX} className="hero-btn">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
