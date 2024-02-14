import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const DonutChart = ({ seriesData, labels }) => {
  const options = {
    chart: {
      width: 380,
      type: "donut",
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={seriesData} type="donut" />
      </div>
    </div>
  );
};

DonutChart.propTypes = {
  seriesData: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DonutChart;
