import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const MultipleChart = ({ seriesData, xKey, yKeys }) => {
  // Extracting x-axis categories from the first series
  console.log(seriesData);
  const categories = seriesData[0]?.data?.map((item) => item[xKey]);

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
    colors: ["#3D7100", "#FF3A29"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    xaxis: {
      categories: categories,
    },
    // yaxis: {
    //   title: {
    //     text: "Activity",
    //   },
    // },
    legend: {
      position: "top",
    },
    title: {
      text: "Users Analytics",
    },
  };

  const series = seriesData.map((series) => ({
    name: series.name,
    data: series.data?.map((point) => ({ x: point.x, y: point.y })),
  }));

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
};

MultipleChart.propTypes = {
  seriesData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.object).isRequired,
    })
  ).isRequired,
  xKey: PropTypes.string.isRequired,
  yKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MultipleChart;
