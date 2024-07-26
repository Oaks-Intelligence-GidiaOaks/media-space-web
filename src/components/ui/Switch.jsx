import PropTypes from "prop-types";
import './style.css'



const Switch = ({isChecked, onClick}) => {
 
  return (
    <div
      className={`toggle-icon-container relative flex items-center ${
        isChecked ? "is-checked" : ""
      }`}
      onClick={onClick}
      role="button"
    >
      <div
        className={`toggle-button absolute rounded-full ${
          isChecked ? "translate-x-6" : ""
        }`}
      ></div>
    </div>
  );
};

Switch.propTypes = {
    isChecked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

export default Switch;