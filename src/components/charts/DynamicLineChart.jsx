import { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const parseTrendData = (trendData, filter) => {
  console.log(trendData);
  const parsedData = { positive: [], negative: [], neutral: [] };

  if (!trendData) return parsedData;

  Object.entries(trendData.positive || {}).forEach(([date, value]) => {
    const parsedDate =
      filter === "year"
        ? dayjs(date, "YY-MM").toDate()
        : dayjs(date, "YY-MM-DD").toDate();
    parsedData.positive.push({ x: parsedDate, y: value });
  });

  Object.entries(trendData.negative || {}).forEach(([date, value]) => {
    const parsedDate =
      filter === "year"
        ? dayjs(date, "YY-MM").toDate()
        : dayjs(date, "YY-MM-DD").toDate();
    parsedData.negative.push({ x: parsedDate, y: value });
  });

  Object.entries(trendData.neutral || {}).forEach(([date, value]) => {
    const parsedDate =
      filter === "year"
        ? dayjs(date, "YY-MM").toDate()
        : dayjs(date, "YY-MM-DD").toDate();
    parsedData.neutral.push({ x: parsedDate, y: value });
  });

  return parsedData;
};

const DynamicLineChart = ({ trendsData = {} }) => {
  const [filter, setFilter] = useState("year");

  const filteredData = useMemo(() => {
    let result = { positive: [], negative: [], neutral: [] };

    if (filter === "year") {
      result = parseTrendData(trendsData["12 months_trend"], filter);
    } else if (filter === "30-days") {
      result = parseTrendData(trendsData["30 days_trend"], filter);
    } else if (filter === "7-days") {
      result = parseTrendData(trendsData["7 days_trend"], filter);
    }

    return result;
  }, [filter, trendsData]);

  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    xaxis: {
      type: "datetime",
      categories: filteredData.positive.map((item) => item.x.valueOf()),
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "Inter"
        },
        formatter: (value) => {
          return filter === "year"
            ? dayjs(value).format("MMM YYYY")
            : dayjs(value).format("MMM D");
        }
      }
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: (value) => `${value}`,
        style: {
          fontSize: "10px",
          fontFamily: "Inter"
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      width: 2
    },
    annotations: {
      text: {
        style: {
          fontSize: "12px",
          fontFamily: "Inter",
          fontWeight: 400
        }
      }
    },
    fill: {
      type: "solid"
    },
    colors: ["#15CE12", "#FA3838", "#4360FA"],
    tooltip: {
      x: {
        format: filter === "year" ? "MMM YYYY" : "MMM D"
      },
      y: {
        formatter: (value) => `${value}`
      }
    }
  };

  const handleButtonClick = (value) => {
    setFilter(value);
  };

  return (
    <div className="flex flex-col w-full justify-between items-center">
      <div className="mt-5 flex justify-between items-center w-full px-5">
        <p className="chart-title hidden lg:block">
          Statistics <br />
          <span className="trend-spot">Trend Overtime</span>
        </p>
        <div className="flex gap-4 items-center">
          <button
            className={`filter-button ${
              filter === "7-days" ? "active-btn" : ""
            }`}
            onClick={() => handleButtonClick("7-days")}
            disabled={!trendsData["7 days_trend"]}
          >
            7 days
          </button>

          <button
            className={`filter-button ${
              filter === "30-days" ? "active-btn" : ""
            }`}
            onClick={() => handleButtonClick("30-days")}
            disabled={!trendsData["30 days_trend"]}
          >
            30 days
          </button>

          <button
            className={`filter-button ${filter === "year" ? "active-btn" : ""}`}
            onClick={() => handleButtonClick("year")}
            disabled={!trendsData["12 months_trend"]}
          >
            12 months
          </button>
        </div>
      </div>

      <div id="chart" className="w-full">
        <ReactApexChart
          options={options}
          series={[
            {
              name: "Positive",
              data: filteredData.positive.map((item) => item.y)
            },
            {
              name: "Negative",
              data: filteredData.negative.map((item) => item.y)
            },
            {
              name: "Neutral",
              data: filteredData.neutral.map((item) => item.y)
            }
          ]}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

DynamicLineChart.propTypes = {
  trendsData: PropTypes.object.isRequired
};

export default DynamicLineChart;
