import { Link } from "react-router-dom";
import { INDEX } from "../../../../routes/CONSTANT";

function Hero() {
  return (
    <section className="hero bg-[#F7FEEE] h-screen flex justify-center items-center">
      <div className="container">
        <div className="hero-content text-center">
          <h6 className="hero-title pb-5">Welcome to Kommunita</h6>
          <h5 className="hero-subtitle pb-3">
            <span className="spotlight">Elevate</span> Your Communication <br />
            Experience
          </h5>
          <h5 className="hero-lead pt-5 pb-8">
            Empower Your Organization with Seamless Integration <br /> and
            Customized Communication Spaces!
          </h5>

          <div className="flex justify-center">
            <Link to={INDEX} className="hero-btn">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
