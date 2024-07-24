import { useSelector } from "react-redux";
import "./style.css";
import "./WordCloud";
import GaugeComponent from "react-gauge-component";
import Legend from "./Legend";
import arrow from "./arrow.svg";
import WordCloud from "./WordCloud";
import TrendingKeywords from "./TrendingKeywords";
import {
  useGetTrendingKeywordsQuery,
  useGetNetSentimentQuery
} from "../../service/admin/sentiment-analysis";
import LineChart from "./LineChart";
import Stats from "./Stats";
import { Spinner } from "flowbite-react";
import { useState } from "react";

const Analysis = () => {
  const user = useSelector((state) => state.user.user);
  const legendItemsNet = [
    { color: "#FF3A29", label: "Negative" },
    { color: "#D4BD52", label: "Neutral" },
    { color: "#4E9C19", label: "Positive" }
  ];
  const legendItemsTrend = [
    { color: "#FF3A29", label: "Negative" },
    { color: "#4360FA", label: "Neutral" },
    { color: "#4E9C19", label: "Positive" }
  ];

  const [keywordFilter, setKeywordFilter] = useState("last 12 hours");
  const { data: trendingKeywords, isFetching: loadingTrendingWords } =
    useGetTrendingKeywordsQuery(keywordFilter);

  const transformedData = trendingKeywords?.data?.map((item) => ({
    keyword: item.keyword,
    usage: item.usage,
    sentiments: {
      neutral: Math.round(item.neutral),
      positive: Math.round(item.positive),
      negative: Math.round(item.negative)
    }
  }));

  const [netFilter, setNetFilter] = useState("last 12 hours");
  const { data: netSentiment, isFetching: loadNetSentiment } =
    useGetNetSentimentQuery(netFilter);
  // console.log(netSentiment);

  const [wordFilter, setWordFilter] = useState("last 12 hours");

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

              <Stats />
            </>
          ) : null}

          <div className="flex justify-between gap-10 pb-10">
            <div className="wordcloud w-full h-[449px] rounded-[13.17px] border shadow border-[#E6EDFF] bg-white">
              <div className="px-10 pt-3">
                <div className="flex justify-between items-center">
                  <p className="word-cloud-text">Word Cloud</p>
                  <select
                    className="w-auto h-[37.97px] analysis-filter-input focus:outline-none focus:ring-0"
                    onChange={(e) => setWordFilter(e.target.value)}
                    value={wordFilter}
                  >
                    <option value="last 12 hours">Last 12 hours</option>
                    <option value="today">Today</option>
                    <option value="last 3 days">Last 3 days</option>
                    <option value="last 7 days">Last 7 days</option>
                    <option value="last 30 days">Last 30 days</option>
                    <option value="this year">This year</option>
                    {/* <option value="custom">Custom</option> */}
                  </select>
                </div>
                <div className="flex justify-center items-center w-full">
                  <WordCloud height={350} filter={wordFilter} />
                </div>
              </div>
            </div>
            <div className="net-sentiment w-full max-w-[376px] h-[449px]  rounded-[13.17px] border shadow border-[#E6EDFF] bg-white">
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <p className="word-cloud-text">Net Sentiment</p>
                  <select
                    className="w-auto h-[37.97px] analysis-filter-input focus:outline-none focus:ring-0"
                    onChange={(e) => setNetFilter(e.target.value)}
                    value={netFilter}
                  >
                    <option value="last 12 hours">Last 12 hours</option>
                    <option value="today">Today</option>
                    <option value="last 3 days">Last 3 days</option>
                    <option value="last 7 days">Last 7 days</option>
                    <option value="last 30 days">Last 30 days</option>
                    <option value="this year">This year</option>
                    {/* <option value="custom">Custom</option> */}
                  </select>
                </div>

                <div className="flex flex-col justify-center mt-8">
                  {loadNetSentiment ? (
                    <div className="flex items-center justify-center h-full">
                      <Spinner />
                    </div>
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
                              { value: 100 }
                            ]
                          },
                          valueLabel: {
                            hide: true
                          }
                        }}
                        arc={{
                          colorArray: ["#EA4228", "#5BE12C"],
                          padding: 0.02,
                          width: 0.3,
                          nbSubArcs: 0
                        }}
                        pointer={{
                          elastic: true,
                          animationDelay: 0,
                          color: "#272525",
                          width: 10,
                          length: 0.8
                        }}
                      />

                      <div className="flex flex-col w-full justify-center items-center mb-40">
                        <h1 className="guage-value-head">
                          {Math.round(netSentiment?.data?.net_sentiment)}
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
                        <p className="guage-period">
                          Previous period: {netFilter}
                        </p>
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
                  <select
                    className="w-auto h-[37.97px] analysis-filter-input focus:outline-none focus:ring-0"
                    onChange={(e) => setKeywordFilter(e.target.value)}
                    value={keywordFilter}
                  >
                    <option value="last 12 hours">Last 12 hours</option>
                    <option value="today">Today</option>
                    <option value="last 3 days">Last 3 days</option>
                    <option value="last 7 days">Last 7 days</option>
                    <option value="last 30 days">Last 30 days</option>
                    <option value="this year">This year</option>
                    {/* <option value="custom">Custom</option> */}
                  </select>
                </div>

                <div className="pt-5 flex flex-col h-full w-full gap-4 relative">
                  {loadingTrendingWords ? (
                    <div className="flex items-center justify-center h-full">
                      <Spinner />
                    </div>
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

                      <div className="absolute bottom-10 justify-center items-center w-full">
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
