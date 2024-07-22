import React, { useState, useEffect } from "react";
import { Cards } from "../../components/layout/super-admin-layout";
import { ShimmerThumbnail } from "react-shimmer-effects";
import neutral from "../../assets/icons/neutral.svg";
import post from "../../assets/icons/post.svg";
import positive from "../../assets/icons/positive.svg";
import negative from "../../assets/icons/negative.svg";
import { useGetSentimentStatsQuery } from "../../service/admin/sentiment-analysis";
import { DateRangePicker } from "react-date-range";
import { addDays, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Stats = () => {
  const [country, setCountry] = useState("Nigeria");
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [category, setCategory] = useState("All Categories");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const { data: postStats, isLoading: loadStats } = useGetSentimentStatsQuery({
    country,
    category,
    start_date: format(dateRange[0].startDate, "yyyy-MM-dd"),
    end_date: format(dateRange[0].endDate, "yyyy-MM-dd"),
  });

  return (
    <div>
      <div className="flex w-full gap-2 justify-start items-center py-4">
        <p className="analysis-filter-top pr-5">Filter by:</p>
        <select
          className="analysis-filter-input focus:outline-none focus:ring-0"
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

        <button
          className="analysis-filter-input focus:outline-none focus:ring-0"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          {`${format(dateRange[0].startDate, "yyyy-MM-dd")} to ${format(
            dateRange[0].endDate,
            "yyyy-MM-dd"
          )}`}
        </button>

        {showDatePicker && (
          <div className="absolute z-10 mt-2">
            <DateRangePicker
              onChange={(item) => {
                setDateRange([item.selection]);
                setShowDatePicker(false); // Hide date picker after selection
              }}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
          </div>
        )}

        <select
          className="analysis-filter-input focus:outline-none focus:ring-0"
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

      <div className="w-full super-admin-card-box border-[#E6EDFF] items-center justify-center sm:flex-row sm:flex-wrap sm:justify-center border shadow sm:gap-10 md:grid md:grid-cols-2 md:justify-between lg:grid lg:grid-cols-4 xl:grid-cols-4 mb-20">
        {isFilterLoading || loadStats ? (
          <ShimmerThumbnail width={250} height={150} />
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
    </div>
  );
};

export default Stats;
