import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import more from "./more.svg";
import "./style.css";

const Card = ({
  id,
  topic,
  desc,
  created,
  count,
  deleteSurvey,
  endSurvey,
  editSurvey,
  classes,
  badge,
  status,
  hideEdit
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDeleteClick = () => {
    if (deleteSurvey) {
      deleteSurvey(id);
    }
    setDropdownVisible(false);
  };

  const handleEndClick = () => {
    if (endSurvey) {
      endSurvey(id);
    }
    setDropdownVisible(false);
  };

  const handleEditClick = () => {
    if (editSurvey) {
      editSurvey();
    }
    setDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`active-survey-card-box bg-white h-auto border shadow ${classes} w-full flex flex-col gap-3 relative`}
    >
      <button
        className="absolute right-3 top-3"
        onClick={toggleDropdown}
        ref={buttonRef}
      >
        <img src={more} alt="more" />
      </button>

      {dropdownVisible && (
        <div
          className="dropdown-menu absolute right-3 top-10 p-4"
          ref={dropdownRef}
        >
          <ul className="flex flex-col gap-3">
            {hideEdit ? null : (
              <li className="hover:bg-slate-100 dropdown-item p-2">
                <button onClick={handleEditClick} className="w-full text-start">
                  Edit Survey
                </button>
              </li>
            )}

            <li className="hover:bg-slate-100 dropdown-item p-2">
              <button className="w-full text-start" onClick={handleEndClick}>
                Close Survey
              </button>
            </li>
            {/* <li className="hover:bg-slate-100 dropdown-item p-2">Share</li> */}
            <li className="hover:bg-slate-100 dropdown-item p-2 text-[#FF3E3E]">
              <button className="w-full text-start" onClick={handleDeleteClick}>
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}

      <h6 className="survey-topic-text">{topic}</h6>
      <p className="survey-desc-text flex flex-wrap">{desc}</p>
      <p className="survey-created-date">
        {format(new Date(created), "do MMMM, yyyy")}
      </p>

      {!status && badge && (
        <div className="survey-badge flex justify-center">closed</div>
      )}

      <p className="survey-response-count">
        {count} <span className="survey-response-text">responses</span>
      </p>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  deleteSurvey: PropTypes.func.isRequired,
  endSurvey: PropTypes.func.isRequired,
  editSurvey: PropTypes.func,
  classes: PropTypes.string,
  badge: PropTypes.bool,
  status: PropTypes.bool,
  hideEdit: PropTypes.bool
};

export default Card;
