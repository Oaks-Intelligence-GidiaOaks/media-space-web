import { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import UTC plugin for dayjs
import isBetween from "dayjs/plugin/isBetween"; // Import isBetween plugin for dayjs

dayjs.extend(utc); // Extend dayjs with UTC plugin
dayjs.extend(isBetween); // Extend dayjs with isBetween plugin

const sortMonths = (months) => {
  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
};

const groupDataByMonth = (data, xKey, yKeys) => {
  const groupedData = {};

  data.forEach((item) => {
    const date = dayjs.utc(item[xKey]); // Parse date as UTC
    const month = date.format("MMM");
    const year = date.format("YYYY");

    if (!groupedData[year]) {
      groupedData[year] = {};
    }
    if (!groupedData[year][month]) {
      groupedData[year][month] = {};
      yKeys.forEach((key) => {
        groupedData[year][month][key] = 0;
      });
    }

    yKeys.forEach((key) => {
      groupedData[year][month][key] += parseFloat(item[key]);
    });
  });

  // Sort months for each year
  Object.keys(groupedData).forEach((year) => {
    const sortedMonths = sortMonths(Object.keys(groupedData[year]));
    const sortedData = {};
    sortedMonths.forEach((month) => {
      sortedData[month] = groupedData[year][month];
    });
    groupedData[year] = sortedData;
  });

  return groupedData;
};

const DynamicLineChart = ({ data, xKey, yKeys }) => {
  const [filter, setFilter] = useState("year");
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));

  const groupedData = useMemo(
    () => groupDataByMonth(data, xKey, yKeys),
    [data, xKey, yKeys]
  );

  const filteredData = useMemo(() => {
    let result = { positive: [], negative: [], neutral: [] };

    if (filter === "year" && groupedData[selectedYear]) {
      result = Object.entries(groupedData[selectedYear]).reduce(
        (acc, [month, values]) => {
          acc.positive.push({ x: month, y: values.positive });
          acc.negative.push({ x: month, y: values.negative });
          acc.neutral.push({ x: month, y: values.neutral });
          return acc;
        },
        { positive: [], negative: [], neutral: [] }
      );
    } else if (filter === "30-days" || filter === "7-days") {
      const days = filter === "30-days" ? 30 : 7;
      const endDate = dayjs().utc().endOf("day"); // Current UTC time, end of the day
      const startDate = endDate.subtract(days - 1, "day").startOf("day"); // Start of the day, subtracting days - 1

      result = data
        .filter((item) => {
          const date = dayjs.utc(item[xKey]); // Parse date as UTC
          return date.isBetween(startDate, endDate, "day", "[]"); // inclusive of startDate and endDate
        })
        .reduce(
          (acc, item) => {
            const dateFormatted = dayjs.utc(item[xKey]).format("MMM D"); // Format in UTC
            acc.positive.push({
              x: dateFormatted,
              y: parseFloat(item.positive),
            });
            acc.negative.push({
              x: dateFormatted,
              y: parseFloat(item.negative),
            });
            acc.neutral.push({ x: dateFormatted, y: parseFloat(item.neutral) });
            return acc;
          },
          { positive: [], negative: [], neutral: [] }
        );
    }

    return result;
  }, [filter, data, xKey, groupedData, selectedYear]);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "category",
      categories: filteredData.positive.map((item) => item.x),
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "Inter",
        },
      },
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: (value) => `${value}k`,
        style: {
          fontSize: "12px",
          fontFamily: "Inter",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    annotations: {
      text: {
        style: {
          fontSize: "12px",
          fontFamily: "Inter",
          fontWeight: 400,
        },
      },
    },
    fill: {
      type: "solid",
    },
    colors: ["#15CE12", "#FA3838", "#4360FA"],
    tooltip: {
      x: {
        format: "MMM D",
      },
      y: {
        formatter: (value) => `${value}k`,
      },
    },
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
            disabled={!data}
          >
            7 days
          </button>

          <button
            className={`filter-button ${
              filter === "30-days" ? "active-btn" : ""
            }`}
            onClick={() => handleButtonClick("30-days")}
            disabled={!data}
          >
            30 days
          </button>

          <button
            className={`filter-button ${filter === "year" ? "active-btn" : ""}`}
            onClick={() => handleButtonClick("year")}
            disabled={!data}
          >
            12 months
          </button>
          {filter === "year" && (
            <select
              className="filter-button-input w-[100px] h-[37.96px] rounded-[8px] border-[#D9D9D9] border"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              disabled={!data}
            >
              {Object.keys(groupedData).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div id="chart" className="w-full">
        <ReactApexChart
          options={options}
          series={[
            {
              name: "Positive",
              data: filteredData.positive.map((item) => item.y),
            },
            {
              name: "Negative",
              data: filteredData.negative.map((item) => item.y),
            },
            {
              name: "Neutral",
              data: filteredData.neutral.map((item) => item.y),
            },
          ]}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

DynamicLineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  xKey: PropTypes.string.isRequired,
  yKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DynamicLineChart;
