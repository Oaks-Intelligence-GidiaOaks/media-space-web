import { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "./style.css";

dayjs.extend(customParseFormat);

const parseTrendData = (trendData, filter) => {
  const parsedData = { positive: [], negative: [], neutral: [] };
  const monthData = {};

  if (!trendData) return parsedData;

  const parseDate = (date, format) => {
    const parsedDate = dayjs(date, format);
    return parsedDate.isValid() ? parsedDate.format() : null;
  };

  const addData = (data, type) => {
    Object.entries(data || {}).forEach(([date, value]) => {
      let parsedDate;
      switch (filter) {
        case "year":
          parsedDate = parseDate(date, "YY-MM");
          break;
        case "30-days":
        case "7-days":
          parsedDate = parseDate(date, "YY-MM-DD");
          break;
        case "1-day":
          parsedDate = parseDate(date, "HH:mm");
          break;
        default:
          parsedDate = null;
      }
      if (parsedDate && !monthData[parsedDate]) {
        monthData[parsedDate] = { positive: 0, negative: 0, neutral: 0 };
      }
      if (parsedDate) {
        monthData[parsedDate][type] += value;
      }
    });
  };

  addData(trendData.positive, "positive");
  addData(trendData.negative, "negative");
  addData(trendData.neutral, "neutral");

  // Add dummy data only if there is valid last data
  if (Object.keys(monthData).length) {
    const lastDate = Object.keys(monthData).sort().pop();
    const lastDateObj = new Date(lastDate);
    const nextMonth = new Date(
      lastDateObj.getFullYear(),
      filter === "year"
        ? lastDateObj.getMonth() + 1
        : lastDateObj.getMonth() - 1,
      1
    );

    const dummyDataPoint = {
      x: nextMonth,
      y: 0
    };

    parsedData.positive.push(dummyDataPoint);
    parsedData.negative.push(dummyDataPoint);
    parsedData.neutral.push(dummyDataPoint);
  }

  Object.keys(monthData).forEach((date) => {
    const { positive, negative, neutral } = monthData[date];
    const validDate = new Date(date);
    if (!isNaN(validDate)) {
      parsedData.positive.push({ x: validDate, y: positive });
      parsedData.negative.push({ x: validDate, y: negative });
      parsedData.neutral.push({ x: validDate, y: neutral });
    }
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

    result.positive = result.positive.sort((a, b) => a.x - b.x);
    result.negative = result.negative.sort((a, b) => a.x - b.x);
    result.neutral = result.neutral.sort((a, b) => a.x - b.x);

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
      categories: filteredData?.positive?.map((item) => item.x.toISOString()),
      tickAmount:
        filter === "year"
          ? 12
          : filter === "30-days"
          ? 30
          : filter === "7-days"
          ? 7
          : 24,
      labels: {
        style: {
          fontSize: "10px",
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
      },
      range:
        filter === "year"
          ? 31536000000
          : filter === "30-days"
          ? 2592000000
          : filter === "7-days"
          ? 604800000
          : 86400000,
      padding: {
        left: 0,
        right: 0
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
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
  trendsData: PropTypes.object
};

export default DynamicLineChart;
