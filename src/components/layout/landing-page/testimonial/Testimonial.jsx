import { useState } from "react";
import { quote_img, user } from "../../../../assets";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";

function Testimonial() {
  const quotes = [
    {
      text: "Media Space has transformed the way we communicate within our organization. The seamless integration into our existing tools made the transition smooth, and the customization options allowed us to create a branded communication hub that truly reflects our identity. Real-time collaboration has never been easier, making Media Space an invaluable asset for our team.",
      username: "Jonathan R.",
      title: "Marketing Director",
      company: "Tech Innovations Corp.",
    },
    {
      text: "Media Space has transformed the way we communicate within our organization. The seamless integration into our existing tools made the transition smooth, and the customization options allowed us to create a branded communication hub that truly reflects our identity. Real-time collaboration has never been easier, making Media Space an invaluable asset for our team.",
      username: "Jonathan R.",
      title: "Marketing Director",
      company: "Tech Innovations Corp.",
    },
    {
      text: "Media Space has transformed the way we communicate within our organization. The seamless integration into our existing tools made the transition smooth, and the customization options allowed us to create a branded communication hub that truly reflects our identity. Real-time collaboration has never been easier, making Media Space an invaluable asset for our team.",
      username: "Jonathan R.",
      title: "Marketing Director",
      company: "Tech Innovations Corp.",
    },
    {
      text: "Media Space has transformed the way we communicate within our organization. The seamless integration into our existing tools made the transition smooth, and the customization options allowed us to create a branded communication hub that truly reflects our identity. Real-time collaboration has never been easier, making Media Space an invaluable asset for our team.",
      username: "Jonathan R.",
      title: "junior Director",
      company: "Tech Innovations Corp.",
    },
    {
      text: "Media Space has transformed the way we communicate within our organization. The seamless integration into our existing tools made the transition smooth, and the customization options allowed us to create a branded communication hub that truly reflects our identity. Real-time collaboration has never been easier, making Media Space an invaluable asset for our team.",
      username: "Jonathan R.",
      title: "Marketing ",
      company: "Tech Innovations Corp.",
    },
    {
      text: "Media Space has transformed the way we communicate within our organization. The seamless integration into our existing tools made the transition smooth, and the customization options allowed us to create a branded communication hub that truly reflects our identity. Real-time collaboration has never been easier, making Media Space an invaluable asset for our team.",
      username: "Jonathan R.",
      title: " Director",
      company: "Tech Innovations Corp.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("forward");

  const goToNextSlide = () => {
    setDirection("forward");
    setCurrentSlide((prevSlide) =>
      prevSlide === quotes.length - 1 ? 0 : prevSlide + 1
    );
  };

  const goToPrevSlide = () => {
    setDirection("backward");
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? quotes.length - 1 : prevSlide - 1
    );
  };

  return (
    <section className="testimonial bg-[#F7FEEE]">
      <p className="testimonial-head pt-10 pb-10">What our Users say</p>
      <div className="carousel-content flex justify-center items-center gap-6">
        <button onClick={goToPrevSlide}>
          <IoArrowBackCircleOutline size={50} />
        </button>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            className="quote-content "
            initial={{
              opacity: 0,
              x: direction === "forward" ? "100%" : "-100%",
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === "forward" ? "-100%" : "100%" }}
            transition={{ duration: 0.5 }}
          >
            {" "}
            <div className="flex gap-3">
              <div className="quote-img w-30">
                <img src={quote_img} className="hidden sm:flex" />
              </div>
              <div>
                <p className="quote-text flex flex-grow">
                  {quotes[currentSlide].text}
                </p>
                <div className="flex items-center gap-5 pt-5">
                  <img src={user} alt="" />
                  <div className="quote-user">
                    <p className="quote-username">
                      {quotes[currentSlide].username}
                    </p>
                    <p className="quote-title">{quotes[currentSlide].title}</p>
                    <p className="quote-company">
                      {quotes[currentSlide].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <button onClick={goToNextSlide}>
          <IoArrowForwardCircleOutline size={50} />
        </button>
      </div>
      {/* <div className="flex justify-center mt-4">
        <button onClick={goToPrevSlide} className="px-4 py-2 mr-2">
          <IoIosArrowDropleft size={50} />
        </button>
        <button onClick={goToNextSlide} className="px-4 py-2">
          <IoIosArrowDropright size={50} />
        </button>
      </div> */}
    </section>
  );
}

Testimonial.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Testimonial;
