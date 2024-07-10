import { Link } from "react-router-dom";
import { INDEX } from "../../../../routes/CONSTANT";
import imagehero from "../../../../assets/imagehero.svg";
import { REGISTER } from "../../../../routes/CONSTANT";

function Hero() {
  return (
    <>
      <section className="h-[558px] heroimg w-full">
        <div className="w-full h-full flex justify-center items-center px-3">
          <div className="flex flex-col items-center justify-center">
            <h3 className="first-hero-head hero-subtitle text-[#7ADD02] text-center">
              Elevate{" "}
              <span className="text-[#FBFBFB]">
                Your <br /> Communication Experience
              </span>
            </h3>
            <p className="first-hero-subtitle text-[#FBFBFB] pt-6 pb-14">
              Empower Your Organization with Seamless Integration <br /> and
              Customized Communication Spaces!
            </p>

            <div className="flex gap-5">
              <Link to={REGISTER} className="flex action-button sm:mr-1">
                Get started
              </Link>
              <Link
                to={REGISTER}
                className="flex action-button border border-[#3D7100] bg-transparent text-white sm:mr-1"
              >
                learn more
              </Link>
            </div>
          </div>
          <img src={imagehero} className="hidden lg:flex" alt="" />
        </div>
      </section>
      <section className="hero bg-[#F7FEEE] h-screen flex justify-center items-center">
        <div className="container">
          <div className="hero-content text-center">
            <h5 className="hero-subtitle pb-3">
              <span className="spotlight">Share</span> a Community with <br />
              People around the World
            </h5>
            <h5 className="hero-lead pt-5 pb-8">
              Do more with Kommunita and grow your <br /> organization’s reach
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
