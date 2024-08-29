import "./styles.css";
import { useState } from "react";
import { CreateSurvey, ActiveSurvey } from "../../components";
import { useActiveSurveyQuery } from "../../service/admin/survey.service";
import { Spinner } from "flowbite-react";

function Survey() {
  const [activeTab, setActiveTab] = useState("active-survey");

  const tabs = [
    { id: "create-survey", label: "Create Survey" },
    { id: "active-survey", label: "Active Survey" },
    { id: "history", label: "History" },
    { id: "analytics", label: "Analytics" }
  ];

  const { data: activeSurvey, isFetching: activeSurveyFetching } =
    useActiveSurveyQuery();

  return (
    <>
      <div className="text-center border-b border-[#D1D8E1] dark:text-gray-400 dark:border-[#D1D8E1]">
        <ul className="flex flex-col md:flex-row gap-0 md:gap-5 lg:gap-10 justify-center survey-tabs -mb-px">
          {tabs.map((tab) => (
            <li className="" key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-block p-4 border-b-4 rounded-t-lg ${
                  activeTab === tab.id
                    ? "text-[#3D7100] dark:text-[#3D7100] border-[#3D7100]"
                    : "text-[#8D92AC] border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4">
        {activeTab === "create-survey" && (
          <div>
            <CreateSurvey />
          </div>
        )}

        {activeTab === "active-survey" && (
          <div>
            {activeSurveyFetching ? (
              <div className="flex justify-center items-center pt-5">
                <Spinner />
              </div>
            ) : activeSurvey?.data.length === 0 ? (
              <div className="flex flex-col justify-center items-center gap-5 pt-10 w-full">
                <p className="empty-survey-text">
                  You have not created a survey yet
                </p>
                <p className="empty-survey-desc text-center">
                  Create new survey to collect valuable insights, understand{" "}
                  <br className="hidden md:flex" />
                  opinions, and make informed decisions from your followers.
                </p>
                <button
                  className="w-[181px] h-[46.9px] rounded-[6.98px] p-2 bg-[#3D7100] text-white"
                  onClick={() => setActiveTab("create-survey")}
                >
                  Create new
                </button>
              </div>
            ) : (
              <ActiveSurvey />
            )}
          </div>
        )}

        {activeTab === "history" && <div>History Content</div>}
        {activeTab === "analytics" && <div>Analytics Content</div>}
      </div>
    </>
  );
}

export default Survey;
