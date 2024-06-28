import PropTypes from "prop-types";

const Legend = ({ items }) => {
  return (
    <div className="flex justify-center items-center w-full gap-4">
      {items.map((item, index) => (
        <div key={index} className="flex justify-center items-center">
          <div className="flex justify-center items-center gap-1">
            <div
              style={{
                width: "8.47px",
                height: "8.47px",
                backgroundColor: item.color,
                borderRadius: "100%",
              }}
            ></div>
            <span className="guage-legend">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

Legend.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Legend;
