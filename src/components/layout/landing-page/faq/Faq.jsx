// import { faq } from "../../../../assets";
import { questions } from "./questions";
import Accordion from "./Accordion";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import * as images from "../../../../assets";


function Faq() {
  console.table(questions);
  // const location = useLocation();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (location.hash) {
  //     const element = document.querySelector(location.hash);
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }
  // }, [location]);

  return (
    <section className="bg-[] relative  px-5 md:px-20" id="faq">
      <div className="faq-outer w-full">
        <div className="block md:flex justify-between w-full  mb-20">
          <div className="md:w-1/3">
          <h5 className="faq-title text-[3.75rem] md:block text-[#3D7100]">
          FAQS
          </h5>
            <p className="block text-center md:hidden">Here are answers to some of the <br /> questions you may have</p>
            <p className="hidden md:block">Here are answers to some of the <br /> questions you may have</p>
          </div>
          <div className="pt-5 md:w-2/3">
              <div className="faq-questions p-5">
                <Accordion items={questions} />
              </div>
          </div>
        </div>
      </div>
      <img src={images.Question_mark} alt="" className="hidden md:block absolute left-0 bottom-0 dance"/>
    </section>
  );
}

export default Faq;
