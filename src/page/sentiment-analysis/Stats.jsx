import { useState } from "react";
import { Cards } from "../../components/layout/super-admin-layout";
import { ShimmerThumbnail } from "react-shimmer-effects";
import neutral from "../../assets/icons/neutral.svg";
import post from "../../assets/icons/post.svg";
import positive from "../../assets/icons/positive.svg";
import negative from "../../assets/icons/negative.svg";
import { useGetSentimentStatsQuery } from "../../service/admin/sentiment-analysis";
import { Spinner } from "flowbite-react";

const Stats = () => {
  const [country, setCountry] = useState("Nigeria");
  const [dateRange, setDateRange] = useState("last 30 days");
  const [category, setCategory] = useState("All Categories");

  const { data: postStats, isFetching: loadStats } = useGetSentimentStatsQuery({
    filter: dateRange,
    category,
    country
  });

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-4 justify-start items-start md:items-center py-4">
        <p className="analysis-filter-top w-auto">Filter by:</p>
        <select
          className="analysis-filter-input w-full focus:outline-none focus:ring-0"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          value={country}
        >
          <option value="Worldwide">Worldwide</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="South Africa">South Africa</option>
          <option value="England">England</option>
          <option value="Wales">Wales</option>
          <option value="Nigeria">Nigeria</option>
        </select>

        <select
          className="h-[37.97px] w-full analysis-filter-input focus:outline-none focus:ring-0"
          onChange={(e) => setDateRange(e.target.value)}
          value={dateRange}
        >
          <option value="last 12 hours">Last 12 hours</option>
          <option value="today">Today</option>
          <option value="last 3 days">Last 3 days</option>
          <option value="last 7 days">Last 7 days</option>
          <option value="last 30 days">Last 30 days</option>
          <option value="this year">This year</option>
          {/* <option value="custom">Custom</option> */}
        </select>

        <select
          className="analysis-filter-input w-full focus:outline-none focus:ring-0"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="All Categories">All Categories</option>
          <option value="Education">Education</option>
          <option value="Sports">Sports</option>
          <option value="Health and Wellness">Health and Wellness</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Carbon footprint">Carbon footprint</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="w-auto super-admin-card-box border-[#E6EDFF] items-center justify-center sm:flex-row sm:flex-wrap sm:justify-center border shadow sm:gap-10 md:grid md:grid-cols-2 md:justify-between lg:grid lg:grid-cols-4 xl:grid-cols-4 mb-20">
        {loadStats ? (
          <div className="flex items-center justify-center h-full w-full">
            <Spinner />
          </div>
        ) : (
          <>
            <Cards
              title={postStats?.data?.total_sentiments?.count || 0}
              subtitle="Total post"
              img={post}
            />
            <Cards
              title={postStats?.data?.positive_sentiments?.count || 0}
              subtitle="Total Positive"
              img={positive}
            />
            <Cards
              title={postStats?.data?.negative_sentiments?.count || 0}
              subtitle="Total Negative"
              img={negative}
            />
            <Cards
              title={postStats?.data?.neutral_sentiments?.count || 0}
              subtitle="Total Neutral"
              img={neutral}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Stats;
