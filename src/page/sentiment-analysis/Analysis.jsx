import { useSelector } from "react-redux";
import "./style.css";
import { Cards } from "../../components/layout/super-admin-layout";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { useGetPostStatsQuery } from "../../service/admin/statistics.service";
import neutral from "../../assets/icons/neutral.svg";
import post from "../../assets/icons/post.svg";
import positive from "../../assets/icons/positive.svg";
import negative from "../../assets/icons/negative.svg";
import DynamicLineChart from "../../components/charts/DynamicLineChart";
import data from "./chart-data"; // Assuming this data is an array of objects

const groupDataByMonth = (data, yKeys) => {
  const groupedData = {};

  data.forEach((item) => {
    const [year, month] = item.date.split("-").slice(0, 2); // Extract year and month
    if (!groupedData[year]) {
      groupedData[year] = {}; // Initialize the year if it doesn't exist
    }
    if (!groupedData[year][month]) {
      groupedData[year][month] = { positive: 0, negative: 0, neutral: 0 }; // Initialize the month if it doesn't exist
    }
    yKeys.forEach((key) => {
      groupedData[year][month][key] += parseFloat(item[key]);
    });
  });

  return groupedData;
};

const flattenGroupedData = (groupedData) => {
  const flattenedData = [];

  Object.keys(groupedData).forEach((year) => {
    Object.keys(groupedData[year]).forEach((month) => {
      const date = `${year}-${month}-01`; // Or any other day of the month
      flattenedData.push({
        date: date,
        positive: groupedData[year][month].positive,
        negative: groupedData[year][month].negative,
        neutral: groupedData[year][month].neutral,
      });
    });
  });

  return flattenedData;
};

const Analysis = () => {
  const user = useSelector((state) => state.user.user);
  const { data: postStats, isLoading: loadStats } = useGetPostStatsQuery();
  const yKeys = ["positive", "negative", "neutral"];
  const groupedData = groupDataByMonth(data, yKeys);
  const flattenedData = flattenGroupedData(groupedData);

  return (
    <>
      <div className="px-3 pt-5 pb-5">
        <div className="">
          {user && user.role === "OrgAdmin" ? (
            <>
              <div className="flex flex-col">
                <p className="analysis-greetings">
                  Welcome Back, {user?.display_name}
                </p>
                <p className="analysis-greetings-text">
                  Here is a brief overview of your product.
                </p>
              </div>

              <div className="flex w-full gap-2 justify-start items-center py-4">
                <p className="analysis-filter-top pr-5">Filter by:</p>
                <select className="analysis-filter-input focus:outline-none focus:ring-0">
                  <option value="Worldwide">Worldwide</option>
                </select>
                <select className="analysis-filter-input focus:outline-none focus:ring-0">
                  <option value="Today">Today</option>
                </select>
                <select className="analysis-filter-input focus:outline-none focus:ring-0">
                  <option value="All Categories">All Categories</option>
                </select>
              </div>

              <div className="w-full super-admin-card-box border-[#E6EDFF]  items-center justify-center sm:flex-row sm:flex-wrap sm:justify-center border-0 shadow sm:gap-10 md:grid md:grid-cols-2 md:justify-between lg:grid lg:grid-cols-4 xl:grid-cols-4 mb-20">
                {loadStats ? (
                  <ShimmerThumbnail width={250} height={150} />
                ) : (
                  <Cards
                    title={postStats?.data?.posts_count}
                    subtitle={"Total post"}
                    img={post}
                  />
                )}

                {loadStats ? (
                  <ShimmerThumbnail width={250} height={150} />
                ) : (
                  <Cards
                    title={postStats?.data?.impressions_count}
                    subtitle={"Total Positive"}
                    img={positive}
                  />
                )}

                {loadStats ? (
                  <ShimmerThumbnail width={250} height={150} />
                ) : (
                  <Cards
                    title={postStats?.data?.shares_count}
                    subtitle={"Total Negative"}
                    img={negative}
                  />
                )}

                {loadStats ? (
                  <ShimmerThumbnail width={250} height={150} />
                ) : (
                  <Cards
                    title={postStats?.data?.reposts_count}
                    subtitle={"Total Neutral"}
                    img={neutral}
                  />
                )}
              </div>
            </>
          ) : null}

          <div className="flex justify-between gap-10 pb-10">
            <div className="wordcloud w-full h-[449px] rounded-[13.17px] shadow border-[#E6EDFF] bg-white">
              <div className="px-10 pt-3">
                <div className="flex justify-between items-center">
                  <p className="word-cloud-text">Word Cloud</p>
                  <select className="w-[173px] h-[37.97px] analysis-filter-input focus:outline-none focus:ring-0">
                    <option value="This Week">This Week</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="net-sentiment w-full max-w-[376px] h-[449px]  rounded-[13.17px] shadow border-[#E6EDFF] bg-white">
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <p className="word-cloud-text">Net Sentiment</p>
                  <select className="w-[106.97px] h-[23.21px] analysis-filter-input focus:outline-none focus:ring-0">
                    <option value="Today">Today</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-10 justify-between">
            <div className="flex w-full rounded-[13.17px] border-[#E6EDFF] bg-white h-[537.02px] shadow">
              <DynamicLineChart
                data={flattenedData}
                xKey="date"
                yKeys={yKeys} // Pass the yKeys array
              />
            </div>
            <div className="net-sentiment w-full max-w-[376px] h-[537.02px]  rounded-[13.17px] shadow border-[#E6EDFF] bg-white">
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <p className="word-cloud-text">Net Sentiment</p>
                  <select className="w-[106.97px] h-[23.21px] analysis-filter-input focus:outline-none focus:ring-0">
                    <option value="Today">Today</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analysis;
