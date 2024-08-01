import { useGetSentimentTrendQuery } from "../../service/admin/sentiment-analysis";
import DynamicLineChart from "../../components/charts/DynamicLineChart";
import { Spinner } from "flowbite-react";

const LineChart = () => {
  const { data: trendsData, isLoading: loadTrends } =
    useGetSentimentTrendQuery();
  const trends = trendsData?.data?.trends;

  return (
    <div className="flex w-full border rounded-[13.17px] border-[#E6EDFF] bg-white h-[537.02px] shadow">
      {loadTrends ? (
        <div className="flex items-center justify-center h-full w-full">
          <Spinner />
        </div>
      ) : (
        <DynamicLineChart trendsData={trends} />
      )}
    </div>
  );
};

export default LineChart;
