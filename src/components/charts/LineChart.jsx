import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const LineChart = ({ data, xKey, yKey }) => {
  const formattedData = data.map((item) => ({
    x: item[xKey],
    y: item[yKey],
  }));

  const options = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    xaxis: {
      type: "category",
      categories: formattedData.map((item) => item.x),
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: (value) => `${value}k`,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 6,
    },
    fill: {
      type: "solid",
    },
    colors: ["#3D7100"],
    tooltip: {
      x: {
        format: "HH:mm",
      },
      y: {
        formatter: (value) => `${value}k`,
      },
    },
    legend: {
      show: true,
    },
    title: {
      text: "Overall User Activity",
    },
  };

  return (
    <div id="chart">
      <div className="hidden lg:block">
        <ReactApexChart
          options={options}
          series={[
            {
              name: "Total",
              data: formattedData.map((item) => parseFloat(item.y)),
            },
          ]}
          type="line"
          height={350}
          width={680}
        />
      </div>

      <div className="hidden md:block lg:hidden">
        <ReactApexChart
          options={options}
          series={[
            {
              name: "Total",
              data: formattedData.map((item) => parseFloat(item.y)),
            },
          ]}
          type="line"
          height={333}
        />
      </div>
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  xKey: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired,
};

export default LineChart;
