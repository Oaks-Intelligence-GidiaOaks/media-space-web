import PropTypes from "prop-types";
import { Badge, ToggleSwitch } from "flowbite-react";

function AdsCard({ tag, media, description, status, onToggle }) {
  const isVideo = media && media.endsWith && media.endsWith(".mp4");

  return (
    <div className="ads-card-list relative">
      <div className="tag absolute top-2 right-2">
        <Badge color="gray">{tag}</Badge>
      </div>
      <div className="ad-content flex justify-center flex-col p-5">
        {isVideo ? (
          <video className="media w-[314px] h-[139px] mt-5 mb-3" controls>
            <source src={media} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div
            className="media w-[314px] h-[139px] bg-cover mt-5 mb-3"
            style={{ backgroundImage: `url(${media})` }}
          ></div>
        )}

        <div className="flex justify-between">
          <div className="ads-description flex flex-wrap">{description}</div>
          <div>
            <ToggleSwitch
              checked={status}
              onChange={(checked) => onToggle(checked ? true : false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

AdsCard.propTypes = {
  tag: PropTypes.string.isRequired,
  media: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default AdsCard;
