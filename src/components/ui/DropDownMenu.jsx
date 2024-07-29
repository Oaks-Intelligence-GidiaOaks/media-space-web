import { useState, useEffect, useRef } from "react";
import { BiChevronDown } from "react-icons/bi";
import PropTypes from "prop-types";

const DropdownMenu = ({ options, onSelect, displayText }) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const optionsRef = useRef([]);

  // Function to handle option selection
  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    setInputValue("");
    onSelect(option);
  };

  // Function to handle keyboard events for navigation
  const handleKeyDown = (event) => {
    if (/^[a-zA-Z]$/.test(event.key)) {
      const firstMatchingIndex = options.findIndex((option) =>
        (typeof option === "object" ? option.name : option)
          .toLowerCase()
          .startsWith(event.key.toLowerCase())
      );
      if (firstMatchingIndex !== -1) {
        optionsRef.current[firstMatchingIndex].scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  };

  // Attach keydown event listener
  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, options]);

  return (
    <div className="w-full mb-4 lg:mb-0 2xl:mt-6 lg:mt-4">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 text-sm flex items-center justify-between border-0 border-b border-black appearance-none ${
          selected && "focus:border-b-primary-dark-green"
        } ${!selected && "text-gray-700"}`}
      >
        <span className="text-primary-gray">
          {selected
            ? selected.length > 25
              ? selected.substring(0, 25) + "..."
              : selected
            : displayText || "Select option"}
        </span>
        <BiChevronDown
          size={20}
          className={` text-primary-gray ${
            open && "rotate-180 transition-all duration-300"
          }`}
        />
      </div>

      <ul
        className={`bg-gray-200 mt-1 overflow-y-auto ${
          open ? "max-h-60 transition duration-300" : "max-h-0"
        }`}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Select option"
            className="placeholder:text-gray-700 hidden p-2 outline-none"
          />
        </div>
        {options.map((option, index) => (
          <li
            key={typeof option === "object" ? option.name : option}
            ref={(el) => (optionsRef.current[index] = el)}
            className={`p-2 mt-1 text-sm hover:bg-sky-600 hover:text-white
              ${
                (typeof option === "object"
                  ? option.name
                  : option
                ).toLowerCase() === selected.toLowerCase() &&
                "bg-sky-600 rounded text-white"
              }
              ${
                (typeof option === "object" ? option.name : option)
                  .toLowerCase()
                  .startsWith(inputValue) &&
                inputValue &&
                "block"
              }
              ${!inputValue && "block"}
            `}
            onClick={() =>
              handleSelect(typeof option === "object" ? option.name : option)
            }
          >
            {typeof option === "object" ? option.name : option}
          </li>
        ))}
      </ul>
    </div>
  );
};

DropdownMenu.propTypes = {
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  displayText: PropTypes.string
};

export default DropdownMenu;
