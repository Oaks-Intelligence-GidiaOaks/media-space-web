import PropTypes from "prop-types";
import { Badge, ToggleSwitch } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Modals from "../../../modals/Modal";
import { Form } from "react-router-dom";
import { Field } from "react-final-form";
import { showAlert } from "../../../../static/alert";
import { validate } from "validate.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { usePatchAdvertbyIdMutation } from "../../../../service/admin/advert.service";

function AdsCard({
  id,
  tag,
  media,
  description,
  status,
  onToggle,
  onDelete,
  durationTime,
  exposureTime,
  visible,
  refetch,
}) {
  // Assuming you want to display only the first media URL if present
  const mediaUrl = media.length > 0 ? media[0].media_url : null;
  const isVideo =
    (mediaUrl && mediaUrl.endsWith && mediaUrl.endsWith(".mp4")) ||
    mediaUrl.includes(".mp4");

  const token = useSelector((state) => state.user?.token);

  const [showModifications, setShowModifications] = useState(false);
  const [openEditAds, setOpenEditAds] = useState(false);
  const [showDeleteVerification, setShowDeleteVerification] = useState(false);
  // const [deleteVerified, setDeleteVerified] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(mediaUrl || "");
  const [visibility, setVisibility] = useState(visible || "");
  const [duration, setDuration] = useState(durationTime || "");
  const [exposure, setExposure] = useState(exposureTime || "");
  const [descript, setDescript] = useState(description || "");
  const [previewAds, setPreviewAds] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [photo, setPhoto] = useState(null);

  const [patchAd, { isSuccess, error }] = usePatchAdvertbyIdMutation();

  // Vefiry Ads Delete action
  const verifyDelete = () => {
    setShowModifications(false);
    setShowDeleteVerification(true);
  };

  // Show edit and delete window
  const handleShowModification = () => {
    if (showModifications) {
      setShowModifications(false);
    } else {
      setShowModifications(true);
    }
    // console.log("Modifying");
  };

  // Decides operation for delete and edit
  const handleModification = (type) => {
    setShowDeleteVerification(false);
    setShowModifications(false);
    if (type === "edit") {
      setOpenEditAds(true);
    } else {
      onDelete(id);
    }
  };

  // Handle Ads Update
  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();

    // Append other values to formData
    if (descript) {
      formData.append("description", descript);
    }

    if (duration) {
      formData.append("duration", duration);
    }

    if (exposure) {
      formData.append("exposure_time", exposure);
    }

    if (visibility) {
      formData.append("visibility", visibility);
    }

    if (photo) {
      formData.append("media", photo);
    }

    // console.log(formData);

    // try {
    //   await patchAd(bodyData, id);
    //   refetch();
    //   setOpenEditAds(false);
    //   setPreviewSrc("");
    //   setSubmitting(false);
    //   console.log("Ads Edited successfully");
    // } catch (error) {
    //   console.error("Error editing ads:", error);
    //   setOpenEditAds(false);
    //   setPreviewSrc("");
    //   setSubmitting(false);
    //   showAlert("", error.response.data.message, "error");
    // }

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.patch(
        `${apiUrl}/admin/advert/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      console.log("Ad updated successfully:", response.data);
      showAlert("Great", "Ad Updated successfully", "success");
      setOpenEditAds(false);
      setSubmitting(false);
      // setPreviewSrc("");
      // setDescript("");
      // setDuration("");
      // setExposure("");
      // setDescript("")
      refetch();
    } catch (error) {
      console.error("Error submitting post:", error);
      showAlert("", error.response.data.message, "error");
      // setOpenAdsModal(false);
      setSubmitting(false);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      previewImage(file);
      // console.log(file.name.split(".")[1].includes(".mp4"));
    }
  };

  // function to set up preview image or video
  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewSrc(event.target.result);
      // console.log(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Togle between preview screen and edit screen
  const setShowPreview = () => {
    if (!previewSrc) {
      showAlert("No Selected Image", "Kindly select an Image", "error");
      return;
    }
    setPreviewAds(!previewAds);
  };

  return (
    <div className="ads-card-list relative">
      <div className="tag absolute top-2 right-2">
        <div className="flex items-center gap-3 relative">
          <Badge color="gray">{tag}</Badge>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
            onClick={handleShowModification}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          {showModifications && (
            <div
              // onClick={() => onModifications(id)}
              className="tag absolute flex flex-col gap-2 text-center bg-white w-[110px] h-[69px] rounded-xl p-2 top-5 cursor-pointer -right-2"
            >
              <Badge
                className="bg-[#EFF4FF] w-[89px] h-[26px] rounded-lg  text-center p-2 flex items-center justify-center"
                color=""
                onClick={() => handleModification("edit")}
              >
                Edit
              </Badge>
              <Badge
                className="bg-[#EFF4FF] w-[89px] h-[26px] rounded-lg  text-center p-2 flex items-center justify-center"
                color="red"
                onClick={() => verifyDelete()}
              >
                Delete
              </Badge>
            </div>
          )}
        </div>
      </div>
      <div className="ad-content flex justify-center flex-col p-5">
        {isVideo ? (
          <video className="media w-[314px] h-[139px] mt-5 mb-3" controls>
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div
            className="media w-[314px] h-[139px] bg-cover mt-5 mb-3"
            style={{ backgroundImage: `url(${mediaUrl})` }}
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

      {/* Edit adds modal */}
      <Modals
        title="Edit Ad"
        openModal={openEditAds}
        modalSize="lg"
        onClose={() => setOpenEditAds(false)}
      >
        <form onSubmit={onSubmit}>
          <div className="mb-4 flex flex-col">
            <label className="cursor-pointer">
              {/* <img src={previewSrc} alt="" /> */}
              {isVideo || photo?.name.split(".")[1].includes(".mp4") ? (
                <video className="media h-[139px] mt-5 mb-3" controls>
                  <source src={previewSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div
                  className="media h-[139px] bg-cover mt-5 mb-3"
                  style={{ backgroundImage: `url(${previewSrc})` }}
                ></div>
              )}

              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
                // className="hidden w-[100px] h-[100px]"
              />
            </label>
          </div>
          <div className="mb-4 flex items-center justify-end">
            <label className="cursor-pointer pb-2 items-end text-[15px] rounded-full border px-5 p-2">
              Upload Image
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
                // className="hidden w-[100px] h-[100px]"
              />
            </label>
          </div>
          {!previewAds ? (
            <>
              <div className="mb-5 flex text-[#676767] flex-col">
                <label htmlFor="department" className="badge-label pb-2">
                  Ads Description
                </label>
                <input
                  value={descript}
                  onChange={(e) => setDescript(e.target.value)}
                  type="text"
                  className="h-[38px] focus:outline-none focus:ring-0 ad-input"
                />
              </div>

              <div className="mb-5 flex text-[#676767] flex-col">
                <label htmlFor="department" className="badge-label pb-2">
                  Visibility
                </label>
                <select
                  // name="visibility"
                  // id="visibility"
                  // component="select"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  // type="text"
                  className="h-[38px] focus:outline-none focus:ring-0 ad-input"
                >
                  <option value="">select</option>
                  <option value="Public">Public</option>
                  <option value="Staff">Staff</option>
                  <option value="Subscribers">Subscribers</option>
                  <option value="Followers">Followers</option>
                </select>
              </div>

              <div className="flex text-[#676767] justify-between mb-5 gap-3 w-full">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="department"
                    className="badge-label pb-2 text-sm"
                  >
                    Exposure time{" "}
                  </label>
                  <input
                    value={exposure}
                    onChange={(e) => setExposure(e.target.value)}
                    type="number"
                    min={1}
                    max={6}
                    className="h-[38px] focus:outline-none focus:ring-0 ad-input"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="department"
                    className="badge-label pb-2 text-sm"
                  >
                    Duration{" "}
                  </label>
                  <input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    type="number"
                    min={1}
                    max={6}
                    className="h-[38px] focus:outline-none focus:ring-0 ad-input"
                  />
                </div>
              </div>

              <div className="mt-10 flex justify-end items-center gap-5 py-5 bg-[#F8F8F8]">
                <p
                  onClick={setShowPreview}
                  className="cursor-pointer rounded-full border-[1px] px-5 p-2"
                >
                  {"Preview"}
                </p>
                <button type="submit" className="badge-create">
                  {submitting ? (
                    <>
                      <span className="loading-dots">
                        <span className="loading-dots-dot"></span>
                        <span className="loading-dots-dot"></span>
                        <span className="loading-dots-dot"></span>
                      </span>
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="mt-10 text-[20px] font-semibold">{descript}</p>
              <div className="flex justify-end items-center gap-5 py-5 pr-5 mt-5 bg-[#F8F8F8]">
                <p
                  onClick={setShowPreview}
                  className="cursor-pointer rounded-full border-[1px] px-5 p-2"
                >
                  {"Close"}
                </p>
                <button type="submit" className="badge-create">
                  {submitting ? (
                    <>
                      <span className="loading-dots">
                        <span className="loading-dots-dot"></span>
                        <span className="loading-dots-dot"></span>
                        <span className="loading-dots-dot"></span>
                      </span>
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </Modals>

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
              return;
            }}
            className="cursor-pointer rounded-full border px-5 p-2"
          >
            {/* {previewAds ? "Back" : "Preview"} */}
            {"No"}
          </p>
          <p
            className="cursor-pointer rounded-full bg-red-700 text-white border px-5 p-2"
            onClick={() => handleModification("delete")}
          >
            Yes
          </p>
        </div>
      </Modals>
    </div>
  );
}

AdsCard.propTypes = {
  tag: PropTypes.string.isRequired,
  media: PropTypes.arrayOf(
    PropTypes.shape({
      media_type: PropTypes.string.isRequired,
      media_url: PropTypes.string.isRequired,
    })
  ).isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default React.memo(AdsCard);
