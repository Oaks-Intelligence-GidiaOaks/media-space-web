import { faq } from "../../../../assets";
import { questions } from "./questions";
import Accordion from "./Accordion";

function Faq() {
  console.table(questions);

  return (
    <section className="bg-[#F7FEEE]">
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
    </section>
  );
}

export default Faq;
