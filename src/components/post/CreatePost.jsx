import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import media from "../../assets/media.svg";
import profile_placeholder from "../../assets/media.svg";
import DropdownMenu from "../ui/DropDown";
import { BiWorld, BiLock, BiGroup } from "react-icons/bi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdAddAPhoto } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { LuCalendarClock } from "react-icons/lu";
import { BeatLoader } from "react-spinners";
import "react-quill/dist/quill.snow.css";
import UploadedItem from "./UploadedItem";
import { FaTimes } from "react-icons/fa";
import { showAlert } from "../../static/alert";
import axios from "axios";
import Modals from "../modals/Modal";
import Date from "../../assets/modals/date.svg";
import time from "../../assets/modals/time.svg";
import globe from "../../assets/modals/globe.svg";
import { useGetCategoryQuery } from "../../service/category.service";
import { useGetPostQuery } from "../../service/admin/post.service";
import "../style.css";
import Post from "./Post";
import { Spinner } from "flowbite-react";

const CreatePost = () => {
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const token = useSelector((state) => state.user?.token);
  const user = useSelector((state) => state.user?.user);

  const [selectedPostMedia, setSelectedPostMedia] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("Public");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const viewMoreRef = useRef(null);
  const [viewMore, setIsViewMore] = useState(false);

  const { data: Category } = useGetCategoryQuery();
  const { data: postData, isFetching, refetch } = useGetPostQuery();
  console.log(postData?.data);

  const [submitting, setSubmitting] = useState(false);

  // Remove selected item
  const handleRemove = (item) => {
    if (selectedPostMedia.includes(item)) {
      setSelectedPostMedia(selectedPostMedia.filter((media) => media !== item));
    }
  };

  const handleScheduleDateChange = (event) => {
    setScheduleDate(event.target.value);
  };

  const handleScheduleTimeChange = (event) => {
    setScheduleTime(event.target.value);
  };

  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  // Handle content change
  const handleContentChange = (event) => {
    if (event.target.value.length <= 500) {
      setContent(event.target.value);
    }
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    const formData = new FormData();
    selectedPostMedia.forEach((media) => formData.append("media", media));
    formData.append("content", content);
    formData.append("category", category);
    formData.append("audience", audience);
    formData.append("schedule_date", scheduleDate);
    formData.append("schedule_time", scheduleTime);

    if (!content.trim()) {
      showAlert("", "Post content cannot be empty", "error");
      setSubmitting(false);
      return;
    }

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.post(`${apiUrl}/admin/user/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });

      console.log("Post submitted successfully:", response.data);
      setSelectedPostMedia([]);
      setContent("");
      setCategory("");
      setScheduleDate("");
      setScheduleTime("");
      setOpenScheduleModal(false);
      showAlert("Great!", "Post created successfully", "success");
      refetch();
    } catch (error) {
      console.error("Error submitting post:", error);
      showAlert(
        "Oops!",
        error?.response?.data?.message || "An error occurred",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const adjustTextareaHeight = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const handleSchedulePostMediaChange = async (event) => {
    const files = Array.from(event.target.files);
    setSelectedPostMedia([...selectedPostMedia, ...files]);
  };

  const handleAudienceChange = (event) => {
    setAudience(event.target.value);
  };

  return (
    <>
      <div className={`${openScheduleModal ? "hidden" : "flex"}`}>
        <div className="w-full bg-white rounded-md border h-auto">
          <div
            className={`flex p-2 gap-4 justify-start px-7 ${
              isVisible ? "items-start" : "items-center"
            } w-full py-5`}
          >
            <div>
              <div className="flex items-center justify-center h-[40px] w-[40px] rounded-full border-4">
                <img
                  src={user?.photo_url || profile_placeholder}
                  className="rounded-full w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>

            <div className="w-full">
              {isVisible ? (
                <textarea
                  className="make-post-input focus:outline-none focus:ring-0 w-full text-wrap h-auto border-0 rounded-md p-2 resize-none"
                  placeholder="Share your thoughts..."
                  value={content}
                  onChange={handleContentChange}
                  onInput={adjustTextareaHeight}
                />
              ) : (
                <label
                  onClick={toggleVisibility}
                  className="bg-white make-post-input  cursor-pointer"
                >
                  Share your thoughts...
                </label>
              )}
              {isVisible && (
                <div className="flex pr-10 justify-end text-[7px]">
                  {" "}
                  <span>{content.length}/500</span>
                </div>
              )}
            </div>
          </div>

          {/* upload picture or video */}
          <div className="bg-white flex justify-between items-center px-5 md:px-7 pb-1 md:pb-5 pt-7">
            <div className="flex items-center justify-between md:gap-10">
              <div className="rounded-md pb- flex justify-between make-post-input">
                <div className=" flex rounded-md">
                  <label className="flex gap-2 items-center p-1 text-sm cursor-pointer">
                    {/* <IoCameraOutline className="text-[#3D7100]" size={20} /> */}
                    <img src={media} alt="" />
                    <p className="make-post-input text-xs xl:text-sm">Media</p>
                    <input
                      type="file"
                      onChange={handleSchedulePostMediaChange}
                      accept="image/*,video/*"
                      multiple
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              </div>

              <div className="bg-gray-200 rounded-md py- flex items-center px-">
                <div className="flex items-center space-x-2 w-35">
                  <div className="text-gray-600 text-xs xl:text-sm ">
                    {audience === "Public" ? (
                      <BiWorld size={20} className="text-[#3D7100]" />
                    ) : audience === "Private" ? (
                      <BiLock
                        size={20}
                        className="text-xs xl:text-sm text-[#3D7100]"
                      />
                    ) : (
                      <BiGroup
                        size={20}
                        className="text-xs xl:text-sm text-[#3D7100]"
                      />
                    )}
                  </div>
                  <select
                    value={audience}
                    onChange={handleAudienceChange}
                    className="focus:outline-none focus:ring-0 border-0 text-xs xl:text-sm bg-transparent w-full h-full make-post-input"
                  >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                    <option value="Followers">Followers</option>
                  </select>
                </div>
              </div>

              <div className="text-center py-1 px-4 rounded-md bg-gray-200">
                <DropdownMenu
                  aria_label={"viewMore"}
                  dropdownRef={viewMoreRef}
                  onClick={() => {
                    setIsViewMore(!viewMore);
                  }}
                  display_value={
                    <>
                      <small className="text-xs xl:text-sm">View More</small>
                      <MdOutlineKeyboardArrowRight
                        className="inline-block"
                        size={20}
                      />
                    </>
                  }
                  isDropdownOpen={viewMore}
                  listItem={
                    <div className="px-4 py-2">
                      <button
                        className="block px-1 py-3 text-[1rem] text-black font-Inter hover:bg-gray-100 w-full text-left"
                        onClick={() => setOpenScheduleModal(true)}
                      >
                        <LuCalendarClock className="w-4 h-4 mr-2 inline" />
                        <span className="font-semibold">Schedule Post</span>
                      </button>{" "}
                    </div>
                  }
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting || !content}
              className={`${
                !content
                  ? "bg-gray-200 text-gray-600"
                  : "bg-[#3D7100] text-white"
              } hidden md:block px-8 h-10 rounded-3xl`}
            >
              {submitting ? (
                <BeatLoader color="#ffffff" loading={true} />
              ) : (
                "Post"
              )}
            </button>
          </div>

          {isExpanded && (
            <div className="flex w-full justify-center h-[120px] rounded-[4px] gap-5 items-center mb-2 bg-[#EDFFF0]">
              <button
                className="hover:bg-[#2CC84A] hover:text-white w-[66.58px] h-[50.66px] flex flex-col justify-center items-center schedule-btn gap-2"
                onClick={() => setOpenScheduleModal(true)}
              >
                {/* <img src={schedule} alt="" /> */}
                <CiCalendarDate size={20} />

                <p>Schedule Post</p>
              </button>
            </div>
          )}
          <button
            onClick={handleSubmit}
            disabled={submitting || !content}
            className={`${
              !content ? "bg-gray-200 text-gray-600" : "bg-[#3D7100] text-white"
            } md:hidden mx-6 px-8 py-1 mb-3 rounded-3xl`}
          >
            {submitting ? (
              <BeatLoader color="#ffffff" loading={true} />
            ) : (
              "Post"
            )}
          </button>
          {selectedPostMedia && (
            <div className="uploaded-items-container p-2 rounded-md max-h-80 overflow-y-auto flex flex-wrap mt-3">
              {[...selectedPostMedia].map((item, index) => (
                <UploadedItem
                  key={index}
                  item={item}
                  onRemove={handleRemove}
                  onItemSelect={handleItemSelect}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {viewModalOpen && selectedItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-20">
          <div className="max-w-screen-lg w-full max-h-full p-4">
            {selectedItem.type.startsWith("image") ? (
              <img
                src={URL.createObjectURL(selectedItem)}
                alt=""
                className="max-w-full max-h-screen mx-auto"
              />
            ) : (
              <video
                src={URL.createObjectURL(selectedItem)}
                controls
                className="max-w-full max-h-screen mx-auto"
              />
            )}
            <button
              onClick={() => setViewModalOpen(false)}
              className="absolute top-0 right-0 m-4 p-2 bg-white rounded-full hover:bg-gray-200"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {postData?.data?.length > 0 ? (
        <h3 className="font-Inter pt-5 font-bold">My Feeds</h3>
      ) : null}

      {isFetching ? (
        <div className="mt-5 items-center justify-center w-full flex">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-content-start items-start flex-col md:flex-row md:flex-wrap gap-2 w-full py-3">
          {postData?.data?.map((row, index) => (
            <Post
              key={index}
              media_urls={row?.media_urls}
              content={row?.content}
              postTime={row?.createdAt}
              post_id={row?._id}
              type={row?.type}
              fullname={user?.display_name}
              username={user?.username}
              avatar={user?.photo_url || ""}
              userId={user?._id}
              category={row?.category}
            />
          ))}
        </div>
      )}

      <Modals
        openModal={openScheduleModal}
        modalSize="3xl"
        onClose={() => setOpenScheduleModal(false)}
        // btnText="Schedule"
      >
        <textarea
          className="make-post-input focus:outline-none focus:ring-0 pb-4 flex-wrap border-0 w-full"
          placeholder="Share your thoughts..."
          value={content}
          onChange={handleContentChange}
        ></textarea>

        <div className="uploaded-items-container p-4 border border-white rounded-md max-h-80 overflow-y-auto mt-4 flex flex-wrap">
          {[...selectedPostMedia].map((item, index) => (
            <UploadedItem
              key={index}
              item={item}
              onRemove={handleRemove}
              onItemSelect={handleItemSelect}
            />
          ))}
        </div>

        <div className="flex justify-between pb-5 pt-5">
          <div className="text-add-post">Add to your post</div>

          <div className="border flex w-[130px] rounded-md ml-3">
            <label className="flex gap-2 items-center p-1 text-sm cursor-pointer">
              <MdAddAPhoto className="text-[#34B53A]" size={20} />
              <p className="font-Inte">Photo/Video</p>
              <input
                type="file"
                onChange={handleSchedulePostMediaChange}
                accept="image/*,video/*"
                multiple
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-between pb-4">
          <div className="flex-col">
            <label htmlFor="date" className="modal-label">
              Schedule date
            </label>
            <div className="input-bg-modal flex">
              <img src={Date} alt="" />
              <input
                type="Date"
                className="w-[278px] modal-input border-0 bg-[#f4f4f4] focus:outline-none focus:ring-0"
                onChange={handleScheduleDateChange}
                placeholder="Select date"
              />
            </div>
          </div>

          <div className="flex-col">
            <label htmlFor="date" className="modal-label">
              Schedule time
            </label>
            <div className="input-bg-modal flex">
              <img src={time} alt="" />
              <input
                type="time"
                className="w-[278px] modal-input border-0 bg-[#f4f4f4] focus:outline-none focus:ring-0"
                onChange={handleScheduleTimeChange}
                placeholder="Select time"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-10 pb-2">
          <div className="flex flex-col w-full">
            <label htmlFor="date" className="modal-label pb-1">
              Select Category
            </label>
            <div className="input-bg-modal flex">
              <img src={time} alt="" />
              <select
                value={category}
                onChange={handleCategoryChange}
                className="focus:outline-none focus:ring-0 border-0 bg-transparent w-full"
              >
                <option value="">select category</option>
                {Category?.data?.map((data, index) => (
                  <option value={data?.name} key={index}>
                    {data?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="date" className="modal-label pb-1">
              Choose Audience
            </label>
            <div className="input-bg-modal flex justify-between">
              <img src={globe} alt="" />
              <select
                value={audience}
                onChange={handleAudienceChange}
                className="focus:outline-none focus:ring-0 border-0 bg-transparent w-full"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Followers">Followers</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-5">
          <button onClick={handleSubmit} className="modal-btn w-full">
            {submitting ? (
              <BeatLoader color="#ffffff" loading={true} />
            ) : (
              "Schedule"
            )}
          </button>
        </div>
      </Modals>
    </>
  );
};

export default CreatePost;
