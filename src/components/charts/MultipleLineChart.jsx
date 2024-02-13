import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

const MultipleLineChart = ({ seriesData, xKey, yKey }) => {
  const formattedData = seriesData.map((series) => ({
    name: series.name,
    data: series.data.map((item) => ({
      x: item[xKey],
      y: item[yKey],
    })),
  }));

  const options = {
    chart: {
      height: 350,
    },
    xaxis: {
      type: "category",
      categories: formattedData[0].data.map((item) => item.x),
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: (value) => `${value}%`,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "solid",
      color: "#008FFB",
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
      text: "Risk Analysis Status",
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={formattedData.map((series) => ({
          name: series.name,
          data: series.data.map((item) => parseFloat(item.y)),
        }))}
        type="area"
        height={350}
      />
    </div>
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
  yKey: PropTypes.string.isRequired,
};

export default MultipleLineChart;
