// import { faq } from "../../../../assets";
import { questions } from "./questions";
import Accordion from "./Accordion";
// import { useLocation } from 'react-router-dom';
// import { useEffect } from "react";
import * as images from "../../../../assets";


function Faq() {
  // console.table(questions);
  // const location = useLocation();
  // useEffect(() => {
  //   if (location.hash) {
  //     const element = document.querySelector(location.hash);
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }
  // }, [location]);

  return (
    <section className="bg-[#F7FEEE] relative" id="faq">
      <div className="faq-outer">
        <div className="block md:flex faq-box mt-10 mb-20">
          <h5 className="faq-title p-5 md:block">
            Answers to <br className="hidden md:flex" /> Frequently{" "}
            <br className="hidden md:flex" /> Asked{" "}
            <br className="hidden md:flex" /> Questions
          </h5>
          <div className="pt-5">
            <div className="">
              <div className="faq-questions p-5">
                <Accordion items={questions} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src={images.half2} alt="" className="hidden md:block absolute md:-left-10 lg:left-18 xl:left-32 bottom-0"/>
    </section>
  );
}

export default Faq;
