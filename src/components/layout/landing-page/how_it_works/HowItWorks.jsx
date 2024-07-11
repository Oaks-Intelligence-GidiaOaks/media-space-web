import { Link } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

function HowItWorks() {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);
  return (
    <section className="how-it-works">
      <h1 className="works-head pt-16 pb-10 text-center">
        How Media Space works
      </h1>
      <div className="flex flex-col lg:flex-row justify-center lg:justify-evenly gap-10 pt-5 lg:pt-30">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center lg:items-start"
        >
          <div className="flex flex-col items-center lg:items-start">
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
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center lg:items-start"
        >
          <div className="flex flex-col items-center lg:items-start">
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
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center lg:items-start"
        >
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
        </motion.div>
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
