import { useState } from "react";
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
  classes,
  badge
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDeleteClick = () => {
    if (deleteSurvey) {
      deleteSurvey(id);
    }
  };

  const handleEndClick = () => {
    if (endSurvey) {
      endSurvey(id);
    }
  };

  return (
    <div
      className={`active-survey-card-box bg-white h-auto border shadow ${classes} w-full flex flex-col gap-3 relative`}
    >
      <button className="absolute right-3 top-3" onClick={toggleDropdown}>
        <img src={more} alt="more" />
      </button>

      {dropdownVisible && (
        <div className="dropdown-menu absolute right-3 top-10 p-4">
          <ul className="flex flex-col gap-3">
            <li className="hover:bg-slate-100 dropdown-item p-2">
              Edit Survey
            </li>
            <li className="hover:bg-slate-100 dropdown-item p-2">
              <button className="w-full text-start" onClick={handleEndClick}>
                Close Survey
              </button>
            </li>
            <li className="hover:bg-slate-100 dropdown-item p-2">Preview</li>
            <li className="hover:bg-slate-100 dropdown-item p-2">Share</li>
            <li className="hover:bg-slate-100 dropdown-item p-2 text-[#FF3E3E]">
              <button className="w-full text-start" onClick={handleDeleteClick}>
                Delete
              </button>
            </li>
          </ul>
        </div>
      )}

      <h className="survey-topic-text">{topic}</h>
      <p className="survey-desc-text flex flex-wrap">{desc}</p>
      <p className="survey-created-date">
        {format(new Date(created), "do MMMM, yyyy")}
      </p>

      {badge && <div className="survey-badge flex justify-center">closed</div>}

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
  classes: PropTypes.string,
  badge: PropTypes.bool
};

export default Card;
