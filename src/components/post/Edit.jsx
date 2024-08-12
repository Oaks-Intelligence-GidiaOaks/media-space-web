import { useState } from "react";
import PropTypes from "prop-types";
import CustomCarousel from "./CustomCarousel";
import left from "../../assets/carousel/left.svg";
import right from "../../assets/carousel/right.svg";
import catIcon from "../../assets/images/category.svg";
import dotsactive from "../../assets/carousel/dotsactive.svg";
import dotsinactive from "../../assets/carousel/dotsinactive.svg";
import { IoVideocam } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { useGetCategoryQuery } from "../../service/category.service";
import UploadedItem from "./UploadedItem";
import { showAlert } from "../../static/alert";
import { useSelector } from "react-redux";
import axios from "axios";
import { useGetPostQuery } from "../../service/admin/post.service";
import { BeatLoader } from "react-spinners";

const Edit = ({
  content,
  medias,
  avatar,
  userId,
  postId,
  onClose,
  category
}) => {
  const { data: Category } = useGetCategoryQuery();

  const [message, setMessage] = useState(content || "");
  // const [media, setMedia] = useState([]);
  const [selectedPostMedia, setSelectedPostMedia] = useState([]);
  const [imgPreview, setImgPreview] = useState(medias || null);
  // const [content, setContent] = useState("");
  const [cat, setCategory] = useState(category);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { refetch } = useGetPostQuery();

  const token = useSelector((state) => state.user?.token);

  const adjustTextareaHeight = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSchedulePostMediaChange = async (event) => {
    const files = Array.from(event.target.files);

    // Add new files to the existing imgPreview state
    setImgPreview((prevImgPreview) => [...(prevImgPreview || []), ...files]);

    // Update selectedPostMedia to include previous media and new files
    setSelectedPostMedia((prevSelectedPostMedia) => [
      ...(prevSelectedPostMedia || []),
      ...files
    ]);
  };

  // Remove selected item
  const handleRemove = (item) => {
    if (selectedPostMedia.includes(item)) {
      setSelectedPostMedia(selectedPostMedia.filter((media) => media !== item));
    }
  };

  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("Submitting");

    const formData = new FormData();
    if (selectedPostMedia.length > 0) {
      selectedPostMedia.forEach((media) => formData.append("media", media));
    }

    if (category) {
      formData.append("category", category);
    }

    formData.append("content", message);
    // formData.append("audience", audience);

    if (!content.trim()) {
      showAlert("", "Post content cannot be empty", "error");
      setSubmitting(false);
      return;
    }

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.patch(
        `${apiUrl}/admin/user/post/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` })
          }
        }
      );

      console.log("Post Updated successfully:", response.data);
      setSelectedPostMedia([]);
      setMessage("");
      setCategory("");
      showAlert("Great!", "Post Updated successfully", "success");
      refetch();
    } catch (error) {
      console.error("Error Updating post:", error);
      showAlert(
        "Oops!",
        error?.response?.data?.message || "An error occurred",
        "error"
      );
    } finally {
      setSubmitting(false);
      onClose();
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={(e) => e.preventDefault()} className="w-full me">
        {/* <Diary content={message} /> */}
        <div className="flex gap-3 items-start mb-3 w-full">
          <div className={`rounded-full border-4 w-[40px] h-[40px]`}>
            <img
              src={avatar}
              className="rounded-full w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className=" w-full rounded-md py-2 flex justify-between make-post-input">
            <textarea
              className="make-post-input focus:outline-none focus:ring-0 w-full text-wrap h-auto border-0 rounded-md resize-none"
              placeholder="Share your thoughts..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onInput={adjustTextareaHeight}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="border mb-10 flex bg-[#EFF2FC] rounded-md">
            <label className="flex gap-2 items-center p-1 text-sm cursor-pointer">
              <IoMdPhotos className="text-[#34B53A]" size={20} />
              <p className="make-post-input text-sm text-[#838383]">Photo</p>
              <input
                type="file"
                onChange={handleSchedulePostMediaChange}
                accept="image/*"
                multiple
                style={{ display: "none" }}
              />
            </label>
          </div>
          <div className="border mb-10 flex bg-[#EFF2FC] rounded-md">
            <label className="flex gap-2 items-center p-1 text-sm cursor-pointer">
              <IoVideocam className="text-red-600" size={20} />
              <p className="make-post-input text-sm text-[#838383]">Video</p>
              <input
                type="file"
                onChange={handleSchedulePostMediaChange}
                accept="video/*"
                multiple
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>

        {selectedPostMedia?.length > 0 ? (
          <div className="uploaded-items-container p-2 rounded-md max-h-[400px] overflow-y-auto flex flex-wrap mt-3">
            {selectedPostMedia.map((item, index) => (
              <UploadedItem
                key={index}
                item={item}
                onRemove={handleRemove}
                onItemSelect={handleItemSelect}
              />
            ))}
          </div>
        ) : (
          <CustomCarousel
            media_urls={imgPreview}
            left={left}
            right={right}
            dotsinactive={dotsinactive}
            dotsactive={dotsactive}
          />
        )}

        <div className="flex items-center justify-between mt-5">
          <div className="w-[169px] h-[33px] flex">
            <img src={catIcon} width={24} alt="" />
            <select
              value={category}
              onChange={handleCategoryChange}
              className="focus:outline-none focus:ring-0 border-0 bg-transparent w-full h-full px-2 make-post-input text-[#6B6B6B] text-[9.21px]"
            >
              <option className="w-full" value="">
                Select Category
              </option>
              {Category?.data?.map((data, index) => (
                <option value={cat} key={index}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-5">
            <div onClick={handleSubmit}>
              <button className="flex font-[600] items-center justify-center text-[11.14px] w-[121px] h-[33px] p-[10px] rounded-[3.48px] bg-[#34b53a] text-white">
                {submitting ? (
                  <BeatLoader color="#ffffff" loading={true} />
                ) : (
                  "Update Post"
                )}
              </button>
            </div>
            <div
              onClick={onClose}
              className="flex font-[600] cursor-pointer items-center justify-center text-[11.14px] w-[121px] h-[33px] p-[10px] rounded-[3.48px] text-[#34b53a] bg-white border border-[#34b53a]"
            >
              Cancel
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;

Edit.propTypes = {
  content: PropTypes.string,
  medias: PropTypes.array,
  avatar: PropTypes.string,
  userId: PropTypes.string.isRequired,
  badgeColor: PropTypes.string,
  postId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
