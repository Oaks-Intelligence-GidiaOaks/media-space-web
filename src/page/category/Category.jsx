import { useSelector } from "react-redux";
import { ShimmerThumbnail } from "react-shimmer-effects";
import ads from "../../assets/ads.svg";
import categoryGray from "../../assets/category_outline.png";
import categoryActive from "../../assets/categoryActive.svg";
import surveyActive from "../../assets/surveyActive.svg";
import survey from "../../assets/survey.svg";
import post from "../../assets/post.svg";
import postActive from "../../assets/postActive.svg";
import ads_active from "../../assets/ads_active.svg";
import "./style.css";
import { useState, useEffect } from "react";
import Modals from "../../components/modals/Modal";
import { Tabs } from "flowbite-react";
import { GoBell } from "react-icons/go";
import upload from "../../assets/upload.png";
import CreateCategory from "../../components/category/CreateCategory";
// import rectangle from "../../assets/rectangle.png";
// import { HiSpeakerphone } from "react-icons/hi";
import { Form, Field } from "react-final-form";
// import cat from "../../assets/category_outline.png";
import validate from "validate.js";
import axios from "axios";
import { showAlert } from "../../static/alert";
// import { useGetCategoryQuery } from "../../service/category.service";
// import PaginationControls from "../../components/ui/PaginationControls";

const constraints = {
  media: {
    presence: true
  },
  description: {
    presence: true
  },
  visibility: {
    presence: true
  },
  exposure_time: {
    presence: true
  },
  duration: {
    presence: true
  },
  landing_page_link: {
    presence: true
  }
};

const Category = () => {
  const user = useSelector((state) => state.user.user);
  const [openAdsModal, setOpenAdsModal] = useState(false);
  const [previewAds, setPreviewAds] = useState(false);

  const [previewSrc, setPreviewSrc] = useState("");

  const token = useSelector((state) => state.user?.token);

  const [activeTab, setActiveTab] = useState("category");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const onSubmit = async (values) => {
    console.log(values);
    const formData = new FormData();

    // Append other values to formData
    Object.keys(values).forEach((key) => {
      if (key !== "media") {
        formData.append(key, values[key]);
      }
    });

    // Append media files to formData
    if (values.media && values.media[0]) {
      formData.append("media", values.media[0]);
    }

    // console.log(formData);

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.post(`${apiUrl}/admin/advert`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });

      console.log("Post submitted successfully:", response.data);
      showAlert("Great", "Ads created successfully", "success");
      setOpenAdsModal(false);
      setPreviewSrc("");
      refetch();
    } catch (error) {
      console.error("Error submitting post:", error.response.data.message);
      showAlert("", error.response.data.message, "error");
      // setOpenAdsModal(false);
    }
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  const handleImageChange = async (file) => {
    // const file = event.target.files[0];
    if (file) {
      console.log(file);
      previewImage(file);
    }
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const setShowPreview = () => {
    if (!previewSrc) {
      showAlert("No Selected Image", "Kindly select an Image", "error");
      return;
    }
    setPreviewAds(!previewAds);
  };

  const features = useSelector(
    (state) => state?.user?.user?.organization_features
  );

  // DELETE ADs FUNCTION

  return (
    <>
      <div className="px-3">
        <div className="">
          {user && user.role == "SuperAdmin" ? (
            <>super admin section</>
          ) : (
            <>
              {/* <div className="flex justify-center items-center pb-10 gap-10">
                <div className="flex justify-center items-center gap-2">
                  <img src={bell} alt="bell" />
                  <p className="subscription">Subscription</p>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <img src={speaker} alt="" />
                  <p className="ads">Ads</p>
                </div>
              </div> */}

              <div className="overflow-x-auto">
                <div className="mb-[50px]">
                  <div className="border-gray-200 dark:border-gray-700">
                    <ul
                      className="flex flex-row -mb-px sm:text-xl text-gray-400 text-center justify-center gap-2 md:gap-5 lg:gap-10"
                      role="tablist"
                    >
                      {features.includes("Post") && (
                        <li className="me-2" role="presentation">
                          <button
                            className={`inline-block p-4 rounded-t-lg  ${
                              activeTab === "post"
                                ? "border-[#4C9C25] text-[#4C9C25] md:font-semibold"
                                : "text-[#8D92AC]"
                            }`}
                            onClick={() => handleTabClick("post")}
                            role="tab"
                            aria-controls="post"
                            aria-selected={activeTab === "post"}
                          >
                            <div className="flex gap-2 items-center">
                              <img
                                src={activeTab === "post" ? postActive : post}
                                alt=""
                              />
                              <p>Post</p>
                            </div>
                          </button>
                        </li>
                      )}

                      {features.includes("Poll") && (
                        <li className="me-2" role="presentation">
                          <button
                            className={`inline-block p-4 rounded-t-lg  ${
                              activeTab === "polls"
                                ? "border-[#4C9C25] text-[#4C9C25] md:font-semibold"
                                : "text-[#8D92AC]"
                            }`}
                            onClick={() => handleTabClick("polls")}
                            role="tab"
                            aria-controls="polls"
                            aria-selected={activeTab === "polls"}
                          >
                            <div className="flex gap-2 items-center">
                              <img
                                src={
                                  activeTab === "polls" ? surveyActive : survey
                                }
                                alt=""
                              />
                              <p>Polls</p>
                            </div>
                          </button>
                        </li>
                      )}

                      <li className="me-2" role="presentation">
                        <button
                          className={`inline-block p-4 rounded-t-lg ${
                            activeTab === "category"
                              ? "border-[#4C9C25] text-[#4C9C25] md:font-semibold"
                              : "text-[#8D92AC]"
                          }`}
                          onClick={() => handleTabClick("category")}
                          role="tab"
                          aria-controls="category"
                          aria-selected={activeTab === "category"}
                        >
                          <div className="flex gap-2 items-center">
                            <img
                              src={
                                activeTab === "category"
                                  ? categoryActive
                                  : categoryGray
                              }
                              alt=""
                            />
                            <p>Categories</p>
                          </div>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  className={`${activeTab === "post" ? "" : "hidden"}`}
                  id="post"
                  role="tabpanel"
                  aria-labelledby="post-tab"
                >
                  No content for post, view category tab
                </div>
                <div
                  className={`${activeTab === "polls" ? "" : "hidden"}`}
                  id="polls"
                  role="tabpanel"
                  aria-labelledby="polls-tab"
                >
                  No content for polls, view category tab
                </div>
                <div
                  className={`${activeTab === "category" ? "" : "hidden"}`}
                  id="category"
                  role="tabpanel"
                  aria-labelledby="category-tab"
                >
                  <CreateCategory />
                </div>
                <Tabs aria-label="Full width tabs" style="fullWidth">
                  {/* POST SECTION */}
                  {/* <Tabs.Item active title="Post" icon={GoBell}>
                    No content for post, view category tab
                  </Tabs.Item> */}

                  {/* POLLS and SURVEY SECTION */}
                  {/* <Tabs.Item active title="Polls and Survey" icon={GoBell}>
                    No content for polls, view category tab
                  </Tabs.Item> */}

                  {/* CATEGORY SECTION */}
                  {/* <Tabs.Item active title="Category" icon={""}>
                    <CreateCategory />
                  </Tabs.Item> */}
                </Tabs>
              </div>
            </>
          )}
        </div>
      </div>

      <Modals
        title="Upload"
        openModal={openAdsModal}
        modalSize="xl"
        onClose={() => setOpenAdsModal(false)}
      >
        <Form
          onSubmit={onSubmit}
          validate={validateForm}
          render={({ handleSubmit, form, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col">
                <label className="cursor-pointer">
                  <img
                    width={"100%"}
                    height={50}
                    className="object-contain"
                    src={previewSrc || upload}
                    alt=""
                  />
                  <Field name="media">
                    {({ input: { value, onChange, ...input } }) => (
                      <input
                        {...input}
                        type="file"
                        style={{ display: "none" }}
                        onChange={({ target }) => {
                          onChange(target.files);
                          handleImageChange(target.files[0]);
                        }}
                        // {...props}
                      />
                    )}
                  </Field>
                  {form.getState().submitFailed &&
                    form.getState().errors.media && (
                      <small className="text-red-600">
                        {form.getState().errors.media}
                      </small>
                    )}
                </label>
              </div>
              {!previewAds ? (
                <>
                  {/* <div className="mb-4 flex flex-col">
                    <label htmlFor="fileInput" className="badge-label pb-2">
                      Uploading File
                    </label>
                  </div> */}
                  <div className="mb-4 flex flex-col">
                    <label htmlFor="fileInput" className="badge-label pb-2">
                      Ad Description
                    </label>
                    <Field
                      name="description"
                      id="description"
                      component="textarea"
                      rows="1"
                      type="text"
                      className="focus:outline-none focus:ring-0 ad-input-textarea"
                    />
                    {form.getState().submitFailed &&
                      form.getState().errors.description && (
                        <small className="text-red-600">
                          {form.getState().errors.description}
                        </small>
                      )}
                  </div>

                  <div className="mb-4 flex flex-col">
                    <label htmlFor="department" className="badge-label pb-2">
                      Visibility
                    </label>
                    <Field
                      name="visibility"
                      id="visibility"
                      component="select"
                      type="text"
                      className="h-[38px] focus:outline-none focus:ring-0 ad-input"
                    >
                      <option value="">select</option>
                      <option value="Public">Public</option>
                      <option value="Staff">Staff</option>
                      <option value="Subscribers">Subscribers</option>
                      <option value="Followers">Followers</option>
                    </Field>
                    {form.getState().submitFailed &&
                      form.getState().errors.visibility && (
                        <small className="text-red-600">
                          {form.getState().errors.visibility}
                        </small>
                      )}
                  </div>

                  <div className="flex justify-between mb-4 gap-3 w-full">
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="department"
                        className="badge-label pb-2 text-sm"
                      >
                        Exposure time{" "}
                        {/* <span className="text-xs">
                      (number between 1 and 6 representing hours)
                    </span> */}
                      </label>
                      <Field
                        name="exposure_time"
                        id="exposure_time"
                        component="input"
                        type="number"
                        min="0"
                        className="h-[38px] focus:outline-none focus:ring-0 ad-input"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.exposure_time && (
                          <small className="text-red-600">
                            {form.getState().errors.exposure_time}
                          </small>
                        )}
                    </div>
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="department"
                        className="badge-label pb-2 text-sm"
                      >
                        Duration{" "}
                        {/* <span className="text-xs">
                      (number between 1 and 7 representing days)
                    </span> */}
                      </label>
                      <Field
                        name="duration"
                        id="duration"
                        component="input"
                        type="number"
                        min="0"
                        className="h-[38px] focus:outline-none focus:ring-0 ad-input"
                      />

                      {form.getState().submitFailed &&
                        form.getState().errors.duration && (
                          <small className="text-red-600">
                            {form.getState().errors.duration}
                          </small>
                        )}
                    </div>
                  </div>
                  <div className=" flex flex-col">
                    <label htmlFor="department" className="badge-label pb-2">
                      Landing page link
                    </label>
                    <Field
                      name="landing_page_link"
                      id="landing_page_link"
                      component="input"
                      type="text"
                      className="h-[38px] focus:outline-none focus:ring-0 ad-input"
                    />
                    {form.getState().submitFailed &&
                      form.getState().errors.landing_page_link && (
                        <small className="text-red-600">
                          {form.getState().errors.landing_page_link}
                        </small>
                      )}
                  </div>
                  <div className="flex justify-end items-center gap-5 pt-5">
                    <p
                      onClick={setShowPreview}
                      className="cursor-pointer rounded-full border px-5 p-2"
                    >
                      {/* {previewAds ? "Back" : "Preview"} */}
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
                        "Create"
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[20px] font-semibold">
                    {form.getState().values.description}
                  </p>
                  <div className="flex justify-end items-center gap-5 py-5 pr-5 mt-5 bg-[#F8F8F8]">
                    <p
                      onClick={setShowPreview}
                      className="cursor-pointer rounded-full border px-5 p-2"
                    >
                      {/* {previewAds ? "Back" : "Preview"} */}
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
                        "Create"
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        />
      </Modals>
    </>
  );
};

export default Category;
