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
      <div className="flex items-center gap-3">
        <img src={icon} alt="" />
        <p className="s-card-text">{percentage}</p>
        <p className="s-card-text">{text}</p>
      </div>
    </div>
  );
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Cards;
