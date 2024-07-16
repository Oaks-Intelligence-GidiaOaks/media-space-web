import { useSelector } from "react-redux";
import "./style.css";

import { ShimmerThumbnail } from "react-shimmer-effects";

import "./WordCloud";
import GaugeComponent from "react-gauge-component";
import Legend from "./Legend";
import arrow from "./arrow.svg";
import WordCloud from "./WordCloud";
import TrendingKeywords from "./TrendingKeywords";
import {
  useGetTrendingKeywordsQuery,
  useGetNetSentimentQuery,
} from "../../service/admin/sentiment-analysis";
import LineChart from "./LineChart";
import Stats from "./Stats";

const Analysis = () => {
  const user = useSelector((state) => state.user.user);
  // const { data: postStats, isLoading: loadStats } = useGetSentimentStatsQuery();

  const legendItemsNet = [
    { color: "#FF3A29", label: "Negative" },
    { color: "#D4BD52", label: "Neutral" },
    { color: "#4E9C19", label: "Positive" },
  ];
  const legendItemsTrend = [
    { color: "#FF3A29", label: "Negative" },
    { color: "#4360FA", label: "Neutral" },
    { color: "#4E9C19", label: "Positive" },
  ];

  const { data: trendingKeywords, isLoading: loadingTrendingWords } =
    useGetTrendingKeywordsQuery();
  const transformedData = trendingKeywords?.data?.map((item) => ({
    keyword: item.keyword,
    usage: item.usage,
    sentiments: {
      neutral: Math.round(item.neutral),
      positive: Math.round(item.positive),
      negative: Math.round(item.negative),
    },
  }));

  const { data: netSentiment, isLoading: loadNetSentiment } =
    useGetNetSentimentQuery();
  // console.log(netSentiment);

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

              {/* <div className="flex w-full gap-2 justify-start items-center py-4">
                <p className="analysis-filter-top pr-5">Filter by:</p>
                <select className="analysis-filter-input focus:outline-none focus:ring-0">
                  <option value="Worldwide">Worldwide</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="South Africa">South Africa</option>
                  <option value="England">England</option>
                  <option value="Wales">Wales</option>
                </select>
                <select className="analysis-filter-input focus:outline-none focus:ring-0">
                  <option value="Today">Last 12 hours</option>
                  <option value="Today">Today</option>
                  <option value="Today">Last 3 days</option>
                  <option value="Today">Last 7 days</option>
                  <option value="Today">Last 30 days</option>
                  <option value="Today">This year</option>
                  <option value="Today">Custom</option>
                </select>
                <select className="analysis-filter-input focus:outline-none focus:ring-0">
                  <option value="All Categories">All Categories</option>
                  <option value="Education">Education</option>
                  <option value="Sports">Sports</option>
                  <option value="Health and Wellness">
                    Health and Wellness
                  </option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Carbon footprint">Carbon footprint</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="w-full super-admin-card-box border-[#E6EDFF]  items-center justify-center sm:flex-row sm:flex-wrap sm:justify-center border shadow sm:gap-10 md:grid md:grid-cols-2 md:justify-between lg:grid lg:grid-cols-4 xl:grid-cols-4 mb-20">
                {loadStats ? (
                  <ShimmerThumbnail width={250} height={150} />
                ) : (
                  <Cards
                    title={postStats?.data?.total_sentiments?.count || "--"}
                    subtitle={"Total post"}
                    img={post}
                  />
                )}

                {loadStats ? (
                  <ShimmerThumbnail width={250} height={150} />
                ) : (
                  <Cards
                    title={postStats?.data?.positive_sentiments?.count || "--"}
                    subtitle={"Total Positive"}
                    img={positive}
                  />
                )}

                {loadStats ? (
                  <ShimmerThumbnail width={250} height={150} />
                ) : (
                  <Cards
                    title={postStats?.data?.negative_sentiments?.count || "--"}
                    subtitle={"Total Negative"}
                    img={negative}
                  />
                )}

                {loadStats ? (
                  <ShimmerThumbnail width={250} height={150} />
                ) : (
                  <Cards
                    title={postStats?.data?.neutral_sentiments?.count || "--"}
                    subtitle={"Total Neutral"}
                    img={neutral}
                  />
                )}
              </div> */}

              <Stats />
            </>
          ) : null}

          <div className="flex justify-between gap-10 pb-10">
            <div className="wordcloud w-full h-[449px] rounded-[13.17px] border shadow border-[#E6EDFF] bg-white">
              <div className="px-10 pt-3">
                <div className="flex justify-between items-center">
                  <p className="word-cloud-text">Word Cloud</p>
                  {/* <select className="w-[173px] h-[37.97px] analysis-filter-input focus:outline-none focus:ring-0">
                    <option value="Today">Last 12 hours</option>
                    <option value="Today">Today</option>
                    <option value="Today">Last 3 days</option>
                    <option value="Today">Last 7 days</option>
                    <option value="Today">Last 30 days</option>
                    <option value="Today">This year</option>
                    <option value="Today">Custom</option>{" "}
                  </select> */}
                </div>
                <div className="flex justify-center items-center w-full">
                  <WordCloud height={350} />
                </div>
              </div>
            </div>
            <div className="net-sentiment w-full max-w-[376px] h-[449px]  rounded-[13.17px] border shadow border-[#E6EDFF] bg-white">
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <p className="word-cloud-text">Net Sentiment</p>
                  {/* <select className="w-[106.97px] h-[23.21px] analysis-filter-input focus:outline-none focus:ring-0">
                    <option value="Today">Today</option>
                  </select> */}
                </div>

                <div className="flex flex-col justify-center mt-8">
                  {loadNetSentiment ? (
                    <ShimmerThumbnail width={350} height={350} />
                  ) : (
                    <>
                      <GaugeComponent
                        value={netSentiment?.data?.net_sentiment}
                        type="semicircle"
                        labels={{
                          tickLabels: {
                            type: "inner",
                            ticks: [
                              { value: 20 },
                              { value: 40 },
                              { value: 60 },
                              { value: 80 },
                              { value: 100 },
                            ],
                          },
                          valueLabel: {
                            hide: true,
                          },
                        }}
                        arc={{
                          colorArray: ["#EA4228", "#5BE12C"],
                          padding: 0.02,
                          width: 0.3,
                          nbSubArcs: 0,
                        }}
                        pointer={{
                          elastic: true,
                          animationDelay: 0,
                          color: "#272525",
                          width: 10,
                          length: 0.8,
                        }}
                      />

                      <div className="flex flex-col w-full justify-center items-center mb-40">
                        <h1 className="guage-value-head">
                          {netSentiment?.data?.net_sentiment}
                        </h1>
                        <p className="guage-rating">
                          {netSentiment?.data?.net_sentiment === 0
                            ? "NEUTRAL"
                            : netSentiment?.data?.net_sentiment > 0
                            ? "POSITIVE"
                            : "NEGATIVE"}
                        </p>
                        <p className="guage-period flex items-center gap-1 py-2">
                          <img src={arrow} alt="" />
                          7.2%
                        </p>
                        <p className="guage-period">Previous period: 74.24</p>
                      </div>

                      <Legend items={legendItemsNet} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-10 justify-between">
            <LineChart />

            <div className="net-sentiment w-full max-w-[376px] h-[537.02px] border  rounded-[13.17px] shadow border-[#E6EDFF] bg-white">
              <div className="p-3 h-full">
                <div className="flex items-center justify-between">
                  <p className="word-cloud-text">Trending keywords</p>
                  <p className="sentiment">Sentiment</p>
                </div>

                <div className="pt-5 flex flex-col h-full w-full gap-4 relative">
                  {loadingTrendingWords ? (
                    <ShimmerThumbnail width={350} height={400} />
                  ) : (
                    <>
                      {transformedData?.slice(0, 10).map((item, index) => (
                        <TrendingKeywords
                          key={index}
                          index={index + 1}
                          keyword={item.keyword}
                          usage={item.usage}
                          sentiments={item.sentiments}
                        />
                      ))}

                      <div className="absolute bottom-5 justify-center items-center w-full">
                        <Legend items={legendItemsTrend} />
                      </div>
                    </>
                  )}
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
