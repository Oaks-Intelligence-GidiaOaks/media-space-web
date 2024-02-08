import { Link } from "react-router-dom";

function HowItWorks() {
  return (
    <section className="how-it-works">
      <h1 className="works-head pt-16 pb-10 text-center">
        How Media Space works
      </h1>
      <div className="flex flex-col lg:flex-row justify-center lg:justify-evenly gap-10 pt-5 lg:pt-30">
        <div className="flex flex-col items-center">
          <p className="works-label ml-5">01</p>
          <div className="flex gap-6 pt-4">
            <div className="blocker"></div>
            <div className="blocker-box">
              <p className="blocker-title pb-3">Seamless Integration</p>
              <p className="blocker-content">
                Integrate Media Space <br /> effortlessly into your current{" "}
                <br /> apps and workflows for a <br /> smooth transition.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="works-label ml-5">02</p>
          <div className="flex gap-6 pt-4">
            <div className="blocker"></div>
            <div className="blocker-box">
              <p className="blocker-title pb-3">Customize Your Space</p>
              <p className="blocker-content">
                Integrate Media Space <br /> effortlessly into your current{" "}
                <br /> apps and workflows for a <br /> smooth transition.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="works-label ml-5">03</p>
          <div className="flex gap-6 pt-4">
            <div className="blocker"></div>
            <div className="blocker-box">
              <p className="blocker-title pb-3">Real-Time Collaboration</p>
              <p className="blocker-content">
                Integrate Media Space <br /> effortlessly into your current{" "}
                <br /> apps and workflows for a <br /> smooth transition.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-10 pt-20 pb-20">
        <Link to={""} className="footer-signup">
          Get started
        </Link>
        <Link to={""} className="footer-signin">
          Learn more
        </Link>
      </div>
    </section>
  );
}

export default HowItWorks;
