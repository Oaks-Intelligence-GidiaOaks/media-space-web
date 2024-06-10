// import PropTypes from "prop-types";
import { Badge, ToggleSwitch } from "flowbite-react";
import { useState } from "react";
import Modals from "./../../../modals/Modal";

function CategoryCard({ tag, media, title, ondelete, id, onToggle, status }) {
  const [showDelete, setShowDelete] = useState(false);

  const [showDeleteVerification, setShowDeleteVerification] = useState(false);

  return (
    <div className="ads-card-list relative">
      <div className="tag absolute top-2 right-2">
        <div className="flex items-center gap-5">
          <Badge color="gray">{tag}</Badge>
          <div>
            <div
              onClick={() => setShowDelete(!showDelete)}
              className="cursor-pointer"
            >
              {!showDelete ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              )}
            </div>
          </div>
          {showDelete && (
            <div
              onClick={() => setShowDeleteVerification(true)}
              className="tag absolute top-8 cursor-pointer bottom-2 right-1"
            >
              <Badge color="red">Delete</Badge>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center flex-col p-5 mt-5">
        <img src={media} alt="" className="object-cover h-[150px]" />

        <div className="flex justify-between mt-5">
          <div className="ads-description flex flex-wrap">{title}</div>
          <div>
            <ToggleSwitch
              checked={status}
              onChange={(checked) => onToggle(checked ? true : false)}
            />
          </div>
        </div>
      </div>

      {/* verify Delete Modal */}
      <Modals
        title="Do you want to Delete this Ads?"
        openModal={showDeleteVerification}
        modalSize="xl"
        onClose={() => setShowDeleteVerification(false)}
      >
        <div className="flex justify-end items-center gap-5 pt-5">
          <p
            onClick={() => {
              setShowDeleteVerification(false);
              setShowDelete(false);
              return;
            }}
            className="cursor-pointer rounded-full border px-5 p-2"
          >
            {/* {previewAds ? "Back" : "Preview"} */}
            {"No"}
          </p>
          <p
            className="cursor-pointer rounded-full bg-red-700 text-white border px-5 p-2"
            onClick={() => {
              setShowDeleteVerification(false);
              setShowDelete(false);
              ondelete(id);
            }}
          >
            Yes
          </p>
        </div>
      </Modals>
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
