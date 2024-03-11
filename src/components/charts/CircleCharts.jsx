import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const CircleCharts = ({ data }) => {
  const seriesData = [
    data?.offline_users_count || 0,
    data?.online_users_count || 0,
    data?.total_users_count || 0,
  ];

  const options = {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              return data?.total_users_count || 0; // Use total_users_count from props or default to 0
            },
          },
        },
      },
    },
    labels: ["Offline", "Online", "Total Users"],
    colors: ["#FF9500", "#02BA09", "#FF3A29"],
    legend: {
      show: true,
      position: "bottom",
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={seriesData}
      type="radialBar"
      height={350}
    />
  );
};

CircleCharts.propTypes = {
  data: PropTypes.shape({
    offline_users_count: PropTypes.number,
    online_users_count: PropTypes.number,
    total_users_count: PropTypes.number,
  }).isRequired,
};

export default CircleCharts;
