import "./styles.css";
import { useState } from "react";
import { CreateSurvey, ActiveSurvey, SurveyHistory } from "../../components";
import {
  useActiveSurveyQuery,
  useSurveyHistoryQuery
} from "../../service/admin/survey.service";
import { Spinner } from "flowbite-react";

function Survey() {
  const [activeTab, setActiveTab] = useState("active-survey");

  const tabs = [
    { id: "create-survey", label: "Create Survey" },
    { id: "active-survey", label: "Active Survey" },
    { id: "history", label: "History" },
    { id: "analytics", label: "Analytics" }
  ];

  const { data: surveyHistory, isFetching: surveyHistoryFetching } =
    useSurveyHistoryQuery();

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
            <ActiveSurvey />
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <SurveyHistory />
          </div>
        )}

        {activeTab === "analytics" && <div>Analytics Content</div>}
      </div>
    </>
  );
}

export default Survey;
