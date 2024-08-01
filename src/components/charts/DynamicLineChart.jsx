import { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const parseTrendData = (trendData, filter) => {
  console.log(trendData);
  const parsedData = { positive: [], negative: [], neutral: [] };
  const monthData = {};

  if (!trendData) return parsedData;

  Object.entries(trendData.positive || {}).forEach(([date, value]) => {
    let parsedDate;

    switch (filter) {
      case "year":
        parsedDate = dayjs(date, "YY-MM").format("YYYY-MM");
        break;
      case "30-days":
      case "7-days":
        parsedDate = dayjs(date, "YY-MM-DD").format("YYYY-MM-DD");
        break;
      case "1-day":
        parsedDate = dayjs(date, "HH:mm").format("YYYY-MM-DD HH:mm");
        break;
      default:
        parsedDate = new Date();
    }

    if (!monthData[parsedDate]) {
      monthData[parsedDate] = { positive: 0, negative: 0, neutral: 0 };
    }
    monthData[parsedDate].positive += value;
  });

  Object.entries(trendData.negative || {}).forEach(([date, value]) => {
    let parsedDate;

    switch (filter) {
      case "year":
        parsedDate = dayjs(date, "YY-MM").format("YYYY-MM");
        break;
      case "30-days":
      case "7-days":
        parsedDate = dayjs(date, "YY-MM-DD").format("YYYY-MM-DD");
        break;
      case "1-day":
        parsedDate = dayjs(date, "HH:mm").format("YYYY-MM-DD HH:mm");
        break;
      default:
        parsedDate = new Date();
    }

    if (!monthData[parsedDate]) {
      monthData[parsedDate] = { positive: 0, negative: 0, neutral: 0 };
    }
    monthData[parsedDate].negative += value;
  });

  Object.entries(trendData.neutral || {}).forEach(([date, value]) => {
    let parsedDate;

    switch (filter) {
      case "year":
        parsedDate = dayjs(date, "YY-MM").format("YYYY-MM");
        break;
      case "30-days":
      case "7-days":
        parsedDate = dayjs(date, "YY-MM-DD").format("YYYY-MM-DD");
        break;
      case "1-day":
        parsedDate = dayjs(date, "HH:mm").format("YYYY-MM-DD HH:mm");
        break;
      default:
        parsedDate = new Date();
    }

    if (!monthData[parsedDate]) {
      monthData[parsedDate] = { positive: 0, negative: 0, neutral: 0 };
    }
    monthData[parsedDate].neutral += value;
  });

  Object.keys(monthData).forEach((date) => {
    const { positive, negative, neutral } = monthData[date];

    parsedData.positive.push({ x: new Date(date), y: positive });
    parsedData.negative.push({ x: new Date(date), y: negative });
    parsedData.neutral.push({ x: new Date(date), y: neutral });
  });

  return parsedData;
};

const DynamicLineChart = ({ trendsData = {} }) => {
  const [filter, setFilter] = useState("year");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString().slice(-2)
  );

  const years =
    trendsData["12 months_trend"] && trendsData["12 months_trend"].positive
      ? Object.keys(trendsData["12 months_trend"].positive).map(
          (date) => date.split("-")[0]
        )
      : [];

  const filteredData = useMemo(() => {
    let result = { positive: [], negative: [], neutral: [] };

    if (filter === "year") {
      const yearData = {};
      for (const key in trendsData["12 months_trend"]) {
        yearData[key] = Object.fromEntries(
          Object.entries(trendsData["12 months_trend"][key] || {}).filter(
            ([date, value]) => date.startsWith(selectedYear)
          )
        );
      }
      result = parseTrendData(yearData, filter);
    } else if (filter === "30-days") {
      result = parseTrendData(trendsData["30 days_trend"], filter);
    } else if (filter === "7-days") {
      result = parseTrendData(trendsData["7 days_trend"], filter);
    } else if (filter === "1-day") {
      result = parseTrendData(trendsData["1 day_trend"], filter);
    }

    console.log(result, "results");

    return result;
  }, [filter, selectedYear, trendsData]);

  const options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    xaxis: {
      type: "datetime",
      categories: filteredData.positive.map((item) => item.x.valueOf()),
      tickAmount: 12,
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "Inter"
        },
        formatter: (value) => {
          switch (filter) {
            case "year":
              return dayjs(value).format("MMM YYYY");
            case "30-days":
            case "7-days":
              return dayjs(value).format("MMM D");
            case "1-day":
              return dayjs(value).format("HH:mm");
            default:
              return dayjs(value).format("MMM D");
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 300
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ],
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
        format:
          filter === "year"
            ? "MMM YYYY"
            : filter === "1-day"
            ? "HH:mm"
            : "MMM D"
      },
      y: {
        formatter: (value) => `${value}`
      }
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
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
              filter === "1-day" ? "active-btn" : ""
            }`}
            onClick={() => handleFilterChange("1-day")}
            disabled={!trendsData["1 day_trend"]}
          >
            1 day
          </button>

          <button
            className={`filter-button ${
              filter === "7-days" ? "active-btn" : ""
            }`}
            onClick={() => handleFilterChange("7-days")}
            disabled={!trendsData["7 days_trend"]}
          >
            7 days
          </button>

          <button
            className={`filter-button ${
              filter === "30-days" ? "active-btn" : ""
            }`}
            onClick={() => handleFilterChange("30-days")}
            disabled={!trendsData["30 days_trend"]}
          >
            30 days
          </button>

          <button
            className={`filter-button ${filter === "year" ? "active-btn" : ""}`}
            onClick={() => handleFilterChange("year")}
            disabled={!trendsData["12 months_trend"]}
          >
            12 months
          </button>
        </div>
        {filter === "year" && (
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="year-select"
          >
            {Array.from(new Set(years)).map((year) => (
              <option key={year} value={year}>
                20{year}
              </option>
            ))}
          </select>
        )}
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
