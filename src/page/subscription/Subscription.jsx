import { useSelector } from "react-redux";
import { Cards, AdsCard } from "../../components/layout/super-admin-layout";
import { useGetAminUserStatsQuery } from "../../service/admin/statistics.service";
import { ShimmerThumbnail } from "react-shimmer-effects";
import ads from "../../assets/ads.svg";
import ads_active from "../../assets/ads_active.svg";
import bell from "../../assets/bell.svg";
import speaker from "../../assets/speaker.svg";
import "./style.css";
import { useState } from "react";
import Modals from "../../components/modals/Modal";
import { Tabs } from "flowbite-react";
import { GoBell } from "react-icons/go";
import { HiSpeakerphone } from "react-icons/hi";
import advert from "../../assets/advert.svg";
import advert2 from "../../assets/advert2.svg";
import advert3 from "../../assets/advert3.svg";
import { Form, Field } from "react-final-form";
import validate from "validate.js";
import axios from "axios";

const constraints = {
  fileInput: {
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
  const { data: userStats, isLoading: loadStats } = useGetAminUserStatsQuery();
  const [openAdsModal, setOpenAdsModal] = useState(false);

  const [cardsData, setCardsData] = useState([
    {
      id: 1,
      tag: "Staff",
      description: "This is a short description of this ads",
      status: true,
      media: advert,
    },
    {
      id: 2,
      tag: "Subscribers",
      description: "This is a short description of this advert3",
      status: false,
      media: advert3,
    },
    {
      id: 3,
      tag: "Public",
      description: "This is a short description of this ads",
      status: true,
      media: advert2,
    },
    {
      id: 4,
      tag: "Staff",
      description: "This is a short description of this ads",
      status: true,
      media: advert,
    },
    {
      id: 5,
      tag: "Public",
      description: "This is a short description of this ads",
      status: true,
      media: advert2,
    },
    {
      id: 6,
      tag: "Subscribers",
      description: "This is a short description of this advert3",
      status: false,
      media: advert3,
    },
  ]);

  const handleToggle = (cardId, isChecked) => {
    setCardsData((prevCardsData) =>
      prevCardsData.map((card) =>
        card.id === cardId ? { ...card, status: isChecked } : card
      )
    );
    console.log(cardId);
  };

  const token = useSelector((state) => state.user?.token);

  const onSubmit = async (values) => {
    console.log(values);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.post(`${apiUrl}/admin/advert`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      console.log("Post submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      // setSubmitting(false);
    }
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
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
                  <Tabs.Item active title="Subscription" icon={GoBell}>
                    No content for subscription, view ads tab
                  </Tabs.Item>
                  <Tabs.Item title="Ads" icon={HiSpeakerphone}>
                    <div className="w-full super-admin-card-box items-center justify-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-10 md:grid md:grid-cols-2 md:justify-between lg:grid lg:grid-cols-4 xl:grid-cols-4">
                      {loadStats ? (
                        <ShimmerThumbnail width={250} height={150} />
                      ) : (
                        <Cards
                          title={userStats?.data?.total_users_count}
                          subtitle={"Total Ads"}
                          img={ads}
                        />
                      )}

                      {loadStats ? (
                        <ShimmerThumbnail width={250} height={150} />
                      ) : (
                        <Cards
                          title={userStats?.data?.new_users_count}
                          subtitle={"Active Ads"}
                          img={ads_active}
                        />
                      )}

                      {loadStats ? (
                        <ShimmerThumbnail width={250} height={150} />
                      ) : (
                        <Cards
                          title={userStats?.data?.returning_users_count}
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
                          className="ads-btn"
                          onClick={() => setOpenAdsModal(true)}
                        >
                          Create Ad
                        </button>
                      </div>
                    </div>

                    <div className="ad-list flex flex-wrap gap-3">
                      {cardsData.map((card) => (
                        <AdsCard
                          key={card.id}
                          tag={card.tag}
                          description={card.description}
                          status={card.status}
                          media={card.media}
                          onToggle={(isChecked) =>
                            handleToggle(card.id, isChecked)
                          }
                        />
                      ))}
                    </div>
                  </Tabs.Item>
                </Tabs>
              </div>
            </>
          )}
        </div>
      </div>

      <Modals
        title="Upload Ads"
        openModal={openAdsModal}
        modalSize="lg"
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
                <Field name="fileInput">
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
                  form.getState().errors.fileInput && (
                    <small className="text-red-600">
                      {form.getState().errors.fileInput}
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
                  <option value="public">public</option>
                  <option value="private">private</option>
                  <option value="subscribers">subscribers</option>
                  <option value="followers">followers</option>
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
                  <label htmlFor="department" className="badge-label pb-2">
                    Exposure time
                  </label>
                  <Field
                    name="exposure_time"
                    id="exposure_time"
                    component="input"
                    type="time"
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
                  <label htmlFor="department" className="badge-label pb-2">
                    Duration
                  </label>
                  <Field
                    name="duration"
                    id="duration"
                    component="select"
                    type="text"
                    className="h-[38px] focus:outline-none focus:ring-0 ad-input"
                  >
                    <option value="">select</option>
                    <option value="public">public</option>
                    <option value="private">private</option>
                  </Field>
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
