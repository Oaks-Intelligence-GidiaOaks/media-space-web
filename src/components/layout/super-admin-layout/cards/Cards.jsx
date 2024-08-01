import PropTypes from "prop-types";

function Cards({ title, subtitle, img, icon, percentage, text }) {
  return (
    <div className="card-box p-2 w-full">
      <div className="flex justify-between items-center">
        <div>
          <p className="s-card-title">{title}</p>
          <p className="s-card-subtitle">{subtitle}</p>
        </div>
        <img src={img} alt="image card" />
      </div>

      {icon || percentage || text ? (
        <div className="flex items-center gap-3">
          {icon ? <img src={icon} alt="" /> : ""}
          {icon ? <p className="s-card-text">{percentage}</p> : ""}
          <p className="s-card-text">{text}</p>
        </div>
      ) : null}
    </div>
  );
}

Cards.propTypes = {
  title: PropTypes.number.isRequired || "",
  subtitle: PropTypes.string.isRequired || "",
  img: PropTypes.string,
  icon: PropTypes.string,
  percentage: PropTypes.string,
  text: PropTypes.string
};

export default Cards;
