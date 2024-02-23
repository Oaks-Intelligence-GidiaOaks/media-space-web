import React from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const MultipleLineChart = ({ seriesData, xKey, yKeys }) => {
  // Extracting x-axis categories from the first series
  console.log(seriesData);
  const categories = seriesData[0].data.map((item) => item[xKey]);

  const options = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: "Activity",
      },
    },
    legend: {
      position: "top",
    },
  };

  const series = seriesData.map((series, index) => ({
    name: series.name,
    data: series.data.map((item) => parseFloat(item[yKeys[index]])),
  }));

  return (
    <ReactApexChart
      options={options}
      series={seriesData.map((series) => ({
        name: series.name,
        data: series.data.map((point) => ({ x: point.x, y: point.y })),
      }))}
      type="line"
      height={350}
    />
  );
};

MultipleLineChart.propTypes = {
  seriesData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.object).isRequired,
    })
  ).isRequired,
  xKey: PropTypes.string.isRequired,
  yKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MultipleLineChart;
