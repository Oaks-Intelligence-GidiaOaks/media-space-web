import PropTypes from "prop-types";
import "./style.css";
import tick from "../../assets/icons/tick.svg";

const Plans = ({
  title,
  description,
  amount,
  discountOff,
  details,
  background,
  currency,
}) => {
  return (
    <div
      className={`rounded-[10px] plan-box shadow hover:border hover:border-[#0f5901] ${
        background ? `bg-[${background}]` : "bg-[#fbfbfb]"
      }`}
    >
      <div className="p-3 h-full">
        <div className="relative h-full">
          <p className="plan-title pb-1">{title}</p>
          <p className="plan-description flex-wrap mb-3">{description}</p>
          <div className="flex gap-1 items-center justify-start pb-2">
            <p className="plan-amount">
              {currency}
              {amount}
            </p>
            <p className="plan-discount line-through">
              {currency}
              {discountOff}
            </p>
          </div>

          <div className="plan-separator w-full mb-4"></div>

          <div className="flex flex-col gap-3">
            {details.map((detail, index) => (
              <div key={index} className="flex justify-start items-start gap-2">
                <img src={tick} alt="" />
                <p className="plan-details-text flex-wrap">{detail}</p>
              </div>
            ))}
          </div>

          <button className="plan-btn h-[28.77px] w-[198.36px] bg-[#0F5901] rounded-[5px] absolute bottom-0">
            START FREE TRIAL
          </button>
        </div>
      </div>
    </div>
  );
};

Plans.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  discountOff: PropTypes.number,
  details: PropTypes.arrayOf(PropTypes.string).isRequired,
  background: PropTypes.string,
  currency: PropTypes.string,
};

Plans.defaultProps = {
  background: "#FFFFFF",
  currency: "$",
};

export default Plans;
