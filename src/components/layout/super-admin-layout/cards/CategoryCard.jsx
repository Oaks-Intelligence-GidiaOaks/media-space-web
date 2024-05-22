// import PropTypes from "prop-types";
import { Badge } from "flowbite-react";

function CategoryCard({ tag, media, title }) {
  return (
    <div className="ads-card-list relative">
      <div className="tag absolute top-2 right-2">
        <Badge color="gray">{tag}</Badge>
      </div>
      <div className="flex justify-center flex-col p-5 mt-5">
        <img src={media} alt="" className="object-cover h-[150px]" />

        <div className="flex justify-between mt-5">
          <div className="ads-description flex flex-wrap">{title}</div>
        </div>
      </div>
    </div>
  );
}

// CategoryCard.propTypes = {
//   tag: PropTypes.string.isRequired,
//   media: PropTypes.arrayOf(
//     PropTypes.shape({
//       media_type: PropTypes.string.isRequired,
//       media_url: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   description: PropTypes.string.isRequired,
//   status: PropTypes.bool.isRequired,
//   onToggle: PropTypes.func.isRequired,
// };

export default CategoryCard;
