import PropTypes from "prop-types";

const TrendingKeywords = ({ index, keyword, usage, sentiments }) => {
  const { negative, neutral, positive } = sentiments;
  // console.log(sentiments);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-2">
        <p className="keyword-index">{index}</p>
        <div className="flex flex-col">
          <p className="keyword flex flex-wrap">{keyword}</p>
          <p className="usage">{usage} usage</p>
        </div>
      </div>
      <div className="flex items-center gap-1 w-[195px]">
        <div className="flex items-center border-l h-[22px] w-[61px] border-[#5D5D5D]">
          <div className="flex items-center w-[60px] h-[12px] border bg-[#FEE6E6]">
            <div
              className="w-[60px] h-[12px]"
              style={{ width: `${negative}%`, backgroundColor: "#FF3A29" }}
            ></div>
          </div>
        </div>

        <div className="flex items-center border-l h-[22px] w-[61px] border-[#5D5D5D]">
          <div className="flex items-center w-[60px] h-[12px] border bg-[#E6EAFE]">
            <div
              className="w-[60px] h-[12px]"
              style={{ width: `${neutral}%`, backgroundColor: "#4360FA" }}
            ></div>
          </div>
        </div>

        <div className="flex items-center border-l h-[22px] w-[61px] border-[#5D5D5D]">
          <div className="flex items-center w-[60px] h-[12px] border bg-[#E8FDE8]">
            <div
              className="w-[60px] h-[12px]"
              style={{ width: `${positive}%`, backgroundColor: "#4E9C19" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

TrendingKeywords.propTypes = {
  index: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  usage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sentiments: PropTypes.shape({
    neutral: PropTypes.number.isRequired,
    positive: PropTypes.number.isRequired,
    negative: PropTypes.number.isRequired,
  }).isRequired,
};

export default TrendingKeywords;
