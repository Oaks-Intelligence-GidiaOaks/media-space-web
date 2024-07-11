import { Link } from "react-router-dom";
import {
  card_img,
  card_img_1,
  card_img_2,
  card_img_3,
  card_img_4,
} from "../../../../assets";
import { motion } from "framer-motion";

function Features() {
  return (
    <section className="features">
      <div className="justify-center hidden md:flex pt-3">
        <div className="features-board">
          <div className="flex flex-col sm:justify-center sm:items-center md:justify-start md:items-start pt-10 md:p-20">
            <p className="features-board-head">Transform</p>
            <p className="features-board-title">
              your organization's <br /> communication landscape
            </p>
            <p className="features-board-text pt-5">
              Discover the revolutionary features of Kommunita, <br /> your
              go-to SaaS solution designed to <br /> effortlessly integrate into
              your favorite apps <br /> while providing a communication space
              that <br /> is both familiar yet distinct from anything you <br />{" "}
              have ever experienced.
            </p>
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="flex pt-7">
                <Link to={""} className="footer-signup">
                  Get started
                </Link>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="justify-center block md:hidden lg:hidden pt-3">
        <div className="features-board">
          <div className="flex flex-col justify-center items-center pt-10 md:p-20">
            <p className="features-board-head">Transform</p>
            <p className="features-board-title text-center">
              your organization's communication landscape
            </p>
            <p className="features-board-text pt-5">
              Discover the revolutionary features of Kommunita, <br /> your
              go-to SaaS solution designed to <br /> effortlessly integrate into
              your favorite apps <br /> while providing a communication space
              that <br /> is both familiar yet distinct from anything you <br />{" "}
              have ever experienced.
            </p>
            <div className="flex pt-7">
              <Link to={""} className="footer-signup">
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-28 pt-12 pb-20">
        <div className="features-layer-1 p-2">
          <div className="text-start flex gap-5 pb-5">
            <div className="bar"></div>
            <p className="feature-title">What is Kommunita for?</p>{" "}
          </div>

          <p className="feature-head pb-5">
            Your organization becomes <br className="hidden md:flex" />
            <span className="feature-spotlight">
              the architect of its <br className="hidden md:flex" />{" "}
              communication future
            </span>{" "}
            with <br className="hidden md:flex" /> Kommunita
          </p>

          <p className="feature-text">
            Say goodbye to communication silos as Kommunita
            <br className="hidden md:flex" /> effortlessly weaves through the
            digital <br className="hidden md:flex" /> landscape, ensuring that
            your team stays united <br className="hidden md:flex" /> and your
            messages resonate across platforms.{" "}
            <br className="hidden md:flex" /> Immerse yourself in a world where
            integration is not <br className="hidden md:flex" /> just a feature,
            but a transformative force that <br className="hidden md:flex" />{" "}
            amplifies the strength of your organization.
          </p>

          <div className="flex pt-7">
            <Link to={""} className="footer-signup">
              Get started
            </Link>
          </div>
        </div>

        <div className="features-layer-2">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <div className="feature-card relative">
                <img src={card_img} className="absolute top-0 right-0" alt="" />
                <div className="card-content p-5">
                  <img src={card_img_1} alt="" />
                  <p className="card-title pt-5 pb-3">
                    Integration at Your Fingertips
                  </p>
                  <p className="card-text">
                    Break free from communication silos! Kommunita seamlessly
                    integrates into your existing apps and workflows, ensuring
                    uninterrupted communication across your organization.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <div className="feature-card relative">
                <img src={card_img} className="absolute top-0 right-0" alt="" />
                <div className="card-content p-5">
                  <img src={card_img_2} alt="" />
                  <p className="card-title pt-5 pb-3">Tailor Your Experience</p>
                  <p className="card-text">
                    Recognizing the uniqueness of every organization, Media
                    Space allows you to customize your communication spaces and
                    workflows. Adapt our versatile solution to perfectly align
                    with your organizational goals.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 pt-6">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <div className="feature-card relative">
                <img src={card_img} className="absolute top-0 right-0" alt="" />
                <div className="card-content p-5">
                  <img src={card_img_3} alt="" />
                  <p className="card-title pt-5 pb-3">
                    Cross-Platform Brilliance
                  </p>
                  <p className="card-text">
                    Whether you're on desktop or mobile, Kommunita ensures a
                    seamless experience. Stay connected and engaged with your
                    team anytime, anywhere.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <div className="feature-card relative">
                <img src={card_img} className="absolute top-0 right-0" alt="" />
                <div className="card-content p-5">
                  <img src={card_img_4} alt="" />
                  <p className="card-title pt-5 pb-3">
                    Real-Time Collaboration
                  </p>
                  <p className="card-text">
                    Ignite creativity and innovation with our real-time
                    collaboration features. Foster teamwork and efficient
                    communication within your organization.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
