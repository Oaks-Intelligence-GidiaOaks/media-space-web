import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const Accordion = ({ items }) => {
  const [isOpen, setIsOpen] = useState(null);

  const toggleAccordion = (index) => {
    if (index === isOpen) {
      setIsOpen(null);
    } else {
      setIsOpen(index);
    }
  };

  return (
    <div className="bg-[#7ADD020D] p-5 rounded-[calc(1rem+4px)]">
      {items.map((item, index) => (
        <div key={index} className="border rounded-lg p-4 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <h2 className="faq-accordion">{item.question}</h2>
            {isOpen === index ? (
              <MdExpandLess size={20} />
            ) : (
              <MdExpandMore size={20} />
            )}
          </div>
          {isOpen === index && <p className="answer mt-3">{item.answer}</p>}
        </div>
      ))}
    </div>
  );
};

// Prop validation
Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Accordion;
