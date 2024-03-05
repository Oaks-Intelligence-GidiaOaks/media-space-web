import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const CircleCharts = () => {
  const [chartData] = useState({
    series: [44, 55, 67],
    options: {
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
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 249;
              },
            },
          },
        },
      },
      labels: ["Offline", "Online ", "Total Users"],
      colors: ["#FF9500", "#02BA09", "#FF3A29"],
      legend: {
        show: true,
        position: "bottom",
      },
    },
  });

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="radialBar"
      height={350}
    />
  );
};

export default CircleCharts;
