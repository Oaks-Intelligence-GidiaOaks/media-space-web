import PropTypes from "prop-types";
import "./style.css";
import tick from "../../assets/icons/tick.svg";

const Plans = ({
  id,
  title,
  description,
  amount,
  discountOff,
  background,
  currency,
  previousPlanName,
  uniqueFeatures,
}) => {
  const submitplan = () => {
    console.log(id);
  };

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
              {amount !== "free" && amount !== "negotiable" ? (
                <>
                  {currency}
                  {amount}
                </>
              ) : (
                <>{amount}</>
              )}
            </p>
            {discountOff && (
              <p className="plan-discount line-through">
                {currency}
                {discountOff}
              </p>
            )}
          </div>

          <div className="plan-separator w-full mb-4"></div>

          <div className="flex flex-col gap-3">
            {previousPlanName && (
              <div className="flex justify-start items-start gap-2">
                <img src={tick} alt="" />
                <p className="plan-details-text flex-wrap">
                  Everything in the {previousPlanName}
                </p>
              </div>
            )}
            {uniqueFeatures.map((detail, index) => (
              <div key={index} className="flex justify-start items-start gap-2">
                <img src={tick} alt="" />
                <p className="plan-details-text flex-wrap">
                  {detail.module_name}
                </p>
              </div>
            ))}
          </div>

          <button
            className="plan-btn h-[28.77px] w-[198.36px] bg-[#0F5901] rounded-[5px] absolute bottom-0"
            onClick={submitplan}
          >
            START FREE TRIAL
          </button>
        </div>
      </div>
    </div>
  );
};

Plans.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  discountOff: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  background: PropTypes.string,
  currency: PropTypes.string,
  previousPlanName: PropTypes.string,
  uniqueFeatures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Plans;
