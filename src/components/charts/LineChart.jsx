import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const LineChart = ({ data, xKey, yKey }) => {
  const formattedData = data.map((item) => ({
    x: item[xKey],
    y: item[yKey],
  }));

  const options = {
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
      width: 4,
    },
    fill: {
      type: "solid",
      color: "#3D7100",
    },
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
      text: "User Overall Activity",
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={[
          {
            name: "Risk",
            data: formattedData.map((item) => parseFloat(item.y)),
          },
        ]}
        type="line"
        height={350}
        width={680}
      />
    </div>
  );
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  xKey: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired,
};

export default LineChart;
