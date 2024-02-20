import LineChart from "../../components/charts/LineChart";
import "./style.css";

const Overview = () => {
  const dummyData = [
    { date: "JAN", activity: 10 },
    { date: "FEB", activity: 20 },
    { date: "MAR", activity: 15 },
    { date: "APRIL", activity: 25 },
    { date: "MAY", activity: 18 },
    { date: "JUNE", activity: 3 },
    { date: "JULY", activity: 50 },
    { date: "AUG", activity: 45 },
    { date: "SEP", activity: 39 },
    { date: "OCT", activity: 30 },
    { date: "NOV", activity: 11 },
    { date: "DEC", activity: 40 },
  ];
  return (
    <div className="px-5 pt-10">
      <div className="chart-section pt-10 px-5">
        <LineChart data={dummyData} xKey="date" yKey="activity" />
      </div>
    </div>
  );
};

export default Overview;
