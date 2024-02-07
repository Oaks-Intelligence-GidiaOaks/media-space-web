import { Nav } from "../../components";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import { INDEX } from "../../routes/CONSTANT";

function LandingPage() {
  return (
    <>
      <Nav />

      <section className="hero flex items-center justify-center h-screen">
        <div className="hero-content my-auto">
          <h6 className="hero-title pb-5">Welcome to Media Space</h6>
          <h5 className="hero-subtitle text-center pb-3">
            <span className="spotlight">Elevate</span> Your Communication <br />
            Experience
          </h5>
          <h5 className="hero-lead pt-5 pb-8">
            Empower Your Organization with Seamless Integration <br /> and
            Customized Communication Spaces!
          </h5>

          <div className="flex justify-center">
            <Link to={INDEX} className="flex hero-btn">
              Get started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
