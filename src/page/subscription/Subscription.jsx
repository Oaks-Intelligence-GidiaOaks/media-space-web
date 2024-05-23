import { useSelector } from "react-redux";
import {
  Cards,
  AdsCard,
  CategoryCard,
} from "../../components/layout/super-admin-layout";
import { ShimmerThumbnail } from "react-shimmer-effects";
import ads from "../../assets/ads.svg";
import ads_active from "../../assets/ads_active.svg";
import "./style.css";
import { useState, useEffect } from "react";
import Modals from "../../components/modals/Modal";
import { Tabs } from "flowbite-react";
import { GoBell } from "react-icons/go";
import upload from "../../assets/upload.png";
import rectangle from "../../assets/rectangle.png";
import { HiSpeakerphone } from "react-icons/hi";
import { Form, Field } from "react-final-form";
// import cat from "../../assets/category_outline.png";
import validate from "validate.js";
import axios from "axios";
import {
  useGetAllAdminAdvertQuery,
  useAdminAdvertStatsQuery,
  useToggleAdvertByIdMutation,
} from "../../service/admin/advert.service";
import { showAlert } from "../../static/alert";
import { useGetCategoryQuery } from "../../service/category.service";

const constraints = {
  media: {
    presence: true,
  },
  description: {
    presence: true,
  },
  visibility: {
    presence: true,
  },
  exposure_time: {
    presence: true,
  },
  duration: {
    presence: true,
  },
  landing_page_link: {
    presence: true,
  },
};

const Subscription = () => {
  const user = useSelector((state) => state.user.user);
  const [openAdsModal, setOpenAdsModal] = useState(false);
  const [openCreateCategory, setOpenCreatecategory] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [categoryVisibility, setCategoryVisibility] = useState("");
  const [categoryPageLink, setCategoryPageLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");

  const {
    data: advertdata,
    isLoading: loadAdvert,
    refetch,
  } = useGetAllAdminAdvertQuery();

  const {
    data: categoryData,
    isLoading: loadCategory,
    refetch: refetchCategory,
  } = useGetCategoryQuery();

  const {
    data: advertStats,
    isLoading: loadAdvertStats,
    refetch: refetchAdvertStats,
  } = useAdminAdvertStatsQuery();

  const adverts = advertdata?.data || [];
  const category = categoryData?.data || [];

  // console.log(adverts);

  console.log(categoryData?.data);

  const [toggleAds, { isSuccess, error }] = useToggleAdvertByIdMutation();

  const handleToggle = async (cardId) => {
    console.log(cardId);
    try {
      await toggleAds(cardId);
      console.log("Ads toggled successfully");
    } catch (error) {
      console.error("Error deleting ads:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Advert toggled Successfully!", "success");
      refetchAdvertStats();
      refetch();
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error, refetch]);

  const token = useSelector((state) => state.user?.token);

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

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.post(`${apiUrl}/admin/advert`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      console.log("Post submitted successfully:", response.data);
      showAlert("Great", "Ads created successfully", "success");
      setOpenAdsModal(false);
      refetch();
    } catch (error) {
      console.error("Error submitting post:", error.response.data.message);
      showAlert("", error.response.data.message, "error");
      // setOpenAdsModal(false);
    }
  };

  const onSubmitCategory = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // console.log("Clicked");
    const formData = new FormData();

    // console.log(photo, categoryName, categoryVisibility, categoryPageLink);

    if (!photo || !categoryName || !categoryVisibility || !categoryPageLink) {
      setSubmitting(false);
      return;
    }
    // Append other values to formData
    formData.append("name", categoryName);
    formData.append("visibility", categoryVisibility);
    formData.append("category_page_link", categoryPageLink);

    // Append media file to formData
    formData.append("photo", photo);

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.post(
        `${apiUrl}/admin/user/category/single`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      console.log("Category Created successfully:", response.data);
      showAlert("Great", "Category created successfully", "success");
      setOpenCreatecategory(false);
      setCategoryName("");
      setCategoryPageLink("");
      setCategoryVisibility("");
      setPhoto(null);
      setPreviewSrc(null);
      refetchCategory();
      setSubmitting(false);
    } catch (error) {
      console.error("Error Creating Category:", error.response.data.message);
      setSubmitting(false);
      showAlert("", error.response.data.message, "error");
      setOpenCreatecategory(false);
      // setOpenAdsModal(false);
    }
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
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
                <Tabs aria-label="Full width tabs" style="fullWidth">
                  <Tabs.Item active title="Category" icon={""}>
                    <div className="flex justify-between items-center">
                      <div className="mb-4 flex flex-col">
                        <select
                          name="visibility"
                          id="visibility"
                          component="select"
                          type="text"
                          className="h-[38px] focus:outline-none focus:ring-0 ad-input"
                        >
                          <option value="">All Categories</option>
                          <option value="Public">Public</option>
                          <option value="Staff">Staff</option>
                          <option value="Subscribers">Subscribers</option>
                          <option value="Followers">Followers</option>
                        </select>
                      </div>
                      <div>
                        <button
                          className="ads-btn mr-5"
                          onClick={() => setOpenCreatecategory(true)}
                        >
                          Create Category
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-5 flex-wrap">
                      {category && category.length > 0 ? (
                        [...category]
                          .sort(
                            (a, b) =>
                              new Date(b.createdAt) - new Date(a.createdAt)
                          )
                          .map((cat) =>
                            loadAdvert ? (
                              <ShimmerThumbnail
                                key={cat._id}
                                width={362}
                                height={269}
                              />
                            ) : (
                              <CategoryCard
                                key={cat?._id}
                                tag={cat?.visibility || "public"}
                                title={cat?.name}
                                media={cat?.photo_url}
                              />
                            )
                          )
                      ) : (
                        <p className="flex justify-center text-lg">
                          Resource is still loading or No data available
                        </p>
                      )}
                    </div>
                  </Tabs.Item>
                  <Tabs.Item active title="Subscription" icon={GoBell}>
                    No content for subscription, view ads tab
                  </Tabs.Item>
                  <Tabs.Item title="Ads" icon={HiSpeakerphone}>
                    <div className="w-full super-admin-card-box items-center justify-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-10 md:grid md:grid-cols-2 md:justify-between lg:grid lg:grid-cols-4 xl:grid-cols-4">
                      {loadAdvertStats ? (
                        <ShimmerThumbnail width={250} height={150} />
                      ) : (
                        <Cards
                          title={advertStats?.data?.total_adverts}
                          subtitle={"Total Ads"}
                          img={ads}
                        />
                      )}

                      {loadAdvertStats ? (
                        <ShimmerThumbnail width={250} height={150} />
                      ) : (
                        <Cards
                          title={advertStats?.data?.active_adverts}
                          subtitle={"Active Ads"}
                          img={ads_active}
                        />
                      )}

                      {loadAdvertStats ? (
                        <ShimmerThumbnail width={250} height={150} />
                      ) : (
                        <Cards
                          title={advertStats?.data?.inactive_adverts}
                          subtitle={"In active Ads"}
                          img={ads_active}
                        />
                      )}
                    </div>

                    <div className="ads-section pt-5">
                      <div className="flex justify-between items-center pb-5">
                        <select
                          name=""
                          id=""
                          className="w-[121px] h-[39px] focus:outline-none focus:ring-0 text-[12px]"
                        >
                          <option value="">Total Ads</option>
                        </select>

                        <button
                          className="ads-btn mr-5"
                          onClick={() => setOpenAdsModal(true)}
                        >
                          Create Ad
                        </button>
                      </div>
                    </div>

                    <div className="ad-list flex flex-wrap gap-5">
                      {adverts && adverts.length > 0 ? (
                        [...adverts]
                          .sort(
                            (a, b) =>
                              new Date(b.createdAt) - new Date(a.createdAt)
                          )
                          .map((card) =>
                            loadAdvert ? (
                              <ShimmerThumbnail
                                key={card._id}
                                width={362}
                                height={269}
                              />
                            ) : (
                              <AdsCard
                                key={card._id}
                                tag={card.visibility}
                                description={card.description}
                                status={card.status === "active" ? true : false}
                                media={card.media_urls}
                                onToggle={(isChecked) =>
                                  handleToggle(card._id, isChecked)
                                }
                              />
                            )
                          )
                      ) : (
                        <p className="flex justify-center text-lg">
                          Resource is still loading or No data available
                        </p>
                      )}
                    </div>
                  </Tabs.Item>
                </Tabs>
              </div>
            </>
          )}
        </div>
      </div>

      {/*  category modal */}
      <Modals
        title="Create category"
        openModal={openCreateCategory}
        modalSize="xl"
        onClose={() => setOpenCreatecategory(false)}
      >
        <form onSubmit={onSubmitCategory}>
          <div className="mb-4 flex flex-col">
            <label className="cursor-pointer">
              <img src={previewSrc || upload} alt="" />

              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
                // className="hidden w-[100px] h-[100px]"
              />
            </label>
          </div>
          <div className="mb-4 flex flex-col">
            <label className="badge-label cursor-pointer pb-2">
              Upload File
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
                // className="hidden w-[100px] h-[100px]"
              />
            </label>
          </div>

          <div className=" flex flex-col">
            <label htmlFor="department" className="badge-label pb-2">
              Title
            </label>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              type="text"
              className="h-[38px] focus:outline-none focus:ring-0 ad-input"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="department" className="badge-label pb-2">
              Visibility
            </label>
            <select
              name="visibility"
              id="visibility"
              component="select"
              value={categoryVisibility}
              onChange={(e) => setCategoryVisibility(e.target.value)}
              type="text"
              className="h-[38px] focus:outline-none focus:ring-0 ad-input"
            >
              <option value="">select</option>
              <option value="Public">Public</option>
              <option value="Staff">Staff</option>
              <option value="Subscribers">Subscribers</option>
              <option value="Followers">Followers</option>
            </select>
          </div>

          <div className=" flex flex-col">
            <label htmlFor="department" className="badge-label pb-2">
              Landing page link
            </label>

            <input
              value={categoryPageLink}
              onChange={(e) => setCategoryPageLink(e.target.value)}
              className="h-[38px] focus:outline-none focus:ring-0 ad-input"
              type="text"
            />
          </div>

          <div className="flex items-center gap-5 justify-end pt-5 mt-8 pb-5">
            <p
              onClick={() => setOpenCreatecategory(false)}
              className="bg-white cursor-pointer p-2 rounded-3xl px-4 font-semibold border-[1px] border-black"
            >
              Cancel
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
                "Create Category"
              )}
            </button>
          </div>
        </form>
      </Modals>
      <Modals
        title="Upload Ads"
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
                <label htmlFor="fileInput" className="badge-label pb-2">
                  Upload File
                </label>
                <Field name="media">
                  {({ input: { value, onChange, ...input } }) => (
                    <input
                      {...input}
                      type="file"
                      onChange={({ target }) => onChange(target.files)}
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
              </div>

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
                    <span className="text-xs">
                      (number between 1 and 6 representing hours)
                    </span>
                  </label>
                  <Field
                    name="exposure_time"
                    id="exposure_time"
                    component="input"
                    type="number"
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
                    <span className="text-xs">
                      (number between 1 and 7 representing days)
                    </span>
                  </label>
                  <Field
                    name="duration"
                    id="duration"
                    component="input"
                    type="number"
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

              <div className="flex justify-end pt-5">
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
            </form>
          )}
        />
      </Modals>
    </>
  );
};

export default Subscription;
