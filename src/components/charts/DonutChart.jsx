import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const DonutChart = ({ seriesData }) => {
  const options = {
    chart: {
      width: "100%",
      height: "100%",
      type: "donut",
    },
    legend: {
      position: "left",
    },
    colors: ["#3D7100", "#FFC327", "#D9D9D9"],
    labels: seriesData.map((dataPoint) => dataPoint.label),
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
        },
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={seriesData.map((dataPoint) => dataPoint.value)}
        type="donut"
        height="100%"
      />
    </div>
  );
};

DonutChart.propTypes = {
  seriesData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DonutChart;
