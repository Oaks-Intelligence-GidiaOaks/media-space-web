import { useSelector } from "react-redux";
import categoryGray from "../../assets/category_outline.png";
import categoryActive from "../../assets/categoryActive.svg";
import surveyActive from "../../assets/surveyActive.svg";
import survey from "../../assets/survey.svg";
import post from "../../assets/post.svg";
import postActive from "../../assets/postActive.svg";
import "./style.css";
import { useState } from "react";
import CreateCategory from "../../components/category/CreateCategory";
import { CreatePost, CreatePolls } from "../../components";

const Category = () => {
  const user = useSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState("post");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const features = useSelector(
    (state) => state?.user?.user?.organization_features
  );

  return (
    <>
      <div className="px-3">
        <div className="">
          {user && user.role == "SuperAdmin" ? (
            <>super admin section</>
          ) : (
            <>
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
                  className={`${
                    activeTab === "post"
                      ? "flex w-full flex-col h-screen"
                      : "hidden"
                  }`}
                  id="post"
                  role="tabpanel"
                  aria-labelledby="post-tab"
                >
                  <CreatePost />
                </div>
                <div
                  className={`${
                    activeTab === "polls"
                      ? "flex w-full flex-col h-screen"
                      : "hidden"
                  }`}
                  id="polls"
                  role="tabpanel"
                  aria-labelledby="polls-tab"
                >
                  <CreatePolls />
                </div>
                <div
                  className={`${
                    activeTab === "category"
                      ? "flex w-full flex-col h-screen"
                      : "hidden"
                  }`}
                  id="category"
                  role="tabpanel"
                  aria-labelledby="category-tab"
                >
                  <CreateCategory />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
