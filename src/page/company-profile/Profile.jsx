import { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { useGetUserQuery } from "../../service/user.service";
import "./style.css";
import edit_line from "../../assets/images/edit_line.svg";
// import Resizer from "react-image-file-resizer";
// import UploadedItem from "../../components/main/UploadedItem";
import axios from "axios";
import { showAlert } from "../../static/alert";
// import { useGetFeedsQuery } from "../../service/feeds.service";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
// import { useGetOrganizationQuery } from "../../service/organization.service";

const Profile = () => {
  const { data: profile, refetch } = useGetUserQuery();
  // const { data: org, refetchOrg } = useGetOrganizationQuery();

  // console.log(profile?.user);

  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // State variables for form fields
  const [website_url, setWebsite_url] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [orgName, setOrgName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // const { refetch } = useGetFeedsQuery();
  const token = useSelector((state) => state.user?.token);

  // logout
  const dispatch = useDispatch();

  // State variable for checking if all fields are filled
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

  // useEffect to update input field statuses and check if all fields are filled
  useEffect(() => {
    // Check if all fields are filled
    setIsAllFieldsFilled(!!website_url);
  }, [website_url]);

  // Set values once profile data is available
  useEffect(() => {
    if (profile?.user?.organization_id) {
      setWebsite_url(profile?.user?.organization_id?.website_url || "");
      setEmail(profile?.user?.organization_id?.organization_email || "");
      setLocation(profile?.user?.organization_id?.location || "");
      setOrgName(profile?.user?.organization_id?.organization_name || "");
    }
  }, [profile]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    if (imageFile) {
      formData.append("logo", imageFile);
    }
    if (website_url) {
      formData.append("website_url", website_url);
    }

    // formData.append("tech_title", techtitle);
    // formData.append("website_url", website_url);
    // formData.append("fullname", fullname);

    console.log(formData);

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.put(
        `${apiUrl}/admin/organization`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      console.log("Organization ddetails updated successfully:", response.data);

      showAlert(
        "Great!",
        "Organization ddetails updated successfully",
        "success"
      );
      refetch();
    } catch (error) {
      console.error("Error updating Organization ddetails:", error);
      showAlert(
        "Oops!",
        error?.response?.data?.message || "An error occurred",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // console.log(currentPassword);
  return (
    <>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center justify-center gap-10"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 rounded-t-lg tabs ${
                activeTab === "profile"
                  ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                  : "text-[#8D92AC]"
              }`}
              onClick={() => handleTabClick("profile")}
              role="tab"
              aria-controls="profile"
              aria-selected={activeTab === "profile"}
            >
              Company Profile
            </button>
          </li>
        </ul>
      </div>
      <div>
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "profile" ? "" : "hidden"
          }`}
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div className="pt-5 px-10 pb-20">
            <div className="flex gap-3 items-center mb-5">
              <div>
                <div className="rounded-lg w-[100px] h-[100px] border flex flex-col gap-3 items-center">
                  <img
                    className="object-cover w-[100px] cursor-pointer"
                    src={previewSrc || profile?.user?.organization_id?.logo_url}
                    alt=""
                  />
                  <label className="cursor-pointer settings-change-text text-[#398DEE]">
                    Change
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      style={{ display: "none" }}
                      // className="hidden w-[100px] h-[100px]"
                    />
                  </label>
                </div>
              </div>
              <div>
                {profile?.user?.display_name && (
                  <div className="flex gap-2 pb-1">
                    <p className="settings-profile-name">
                      {profile?.user?.organization_id?.organization_name}
                    </p>
                    <img src={edit_line} alt="" className="cursor-pointer" />
                  </div>
                )}
              </div>
            </div>
            <div className="pt-10 mt-10">
              <form onSubmit={handleSubmit}>
                {/* <div className="flex items-center lg:gap-16 lg:flex-row flex-col  justify-between pb-3">
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Full Name</label>
                    <input
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                      placeholder={"Please enter your fullname"}
                    />
                  </div>
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Tech Title</label>
                    <input
                      value={techtitle}
                      onChange={(e) => setTechtitle(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                      placeholder={"Please enter your techtitle"}
                    />
                  </div>
                </div> */}
                <div className="flex items-center lg:gap-5 lg:flex-row flex-col  justify-between pb-3">
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Website Url</label>
                    <input
                      value={website_url}
                      onChange={(e) => setWebsite_url(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                      placeholder={"Please enter your Display Name"}
                    />
                  </div>
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Organization Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                      disabled
                      placeholder={"Please enter your email"}
                    />
                  </div>
                </div>
                <div className="flex items-center lg:gap-5 lg:flex-row flex-col  justify-between pb-3">
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Organization Name</label>
                    <input
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                      disabled
                      placeholder={"Please enter your email"}
                    />
                  </div>
                  <div className="flex flex-col mb-5 w-full">
                    <label className="settings-label">Location</label>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="settings-input outline-none"
                      type="text"
                      disabled
                      placeholder={"Please enter your email"}
                    />
                  </div>
                </div>
                {/* <div className="flex flex-col mb-5 w-full pb-3">
                  <label className="settings-label">Bio</label>
                  <textarea
                    placeholder=""
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="settings-textarea outline-none"
                    cols="30"
                    rows="7"
                  ></textarea>
                </div> */}
                <button
                  className={`w-full ${
                    isAllFieldsFilled ? "setting-btn-active" : "settings-btn"
                  }`}
                  disabled={!isAllFieldsFilled}
                >
                  {submitting ? (
                    <BeatLoader color="#ffffff" loading={true} />
                  ) : (
                    "Save"
                  )}
                </button>{" "}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
