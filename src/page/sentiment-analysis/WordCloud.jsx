import { useState, useEffect, useRef } from "react";
import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";
import { useGetWordCloudQuery } from "../../service/admin/sentiment-analysis";
import { ShimmerThumbnail } from "react-shimmer-effects";
import PropTypes from "prop-types";

const colors = ["#28F473", "#09ABC3", "#000", "#5F0CF3", "#E0092F"];

const fontScale = scaleLog({
  range: [5, 15], // Adjusted range for font sizes
});
const fontSizeSetter = (datum) => fontScale(datum.value);

const fixedValueGenerator = () => 0.5;

const WordCard = ({ word, details }) => {
  const { usage, unique_users, sentiment_score, sentiment_category } = details;

  const neutral = sentiment_category === "neutral" ? sentiment_score : 0;
  const positive = sentiment_category === "positive" ? sentiment_score : 0;
  const negative =
    sentiment_category === "negative" ? Math.abs(sentiment_score) : 0;
  const sentimentColors = {
    positive: "#4E9C19", // Green
    neutral: "#4360FA", // Blue
    negative: "#FF3A29", // Red
  };

  return (
    <div className="absolute bg-white border rounded shadow-lg w-[199px] h-[210px]">
      <h3 className="bg-[#F5FDE8] w-full h-[42px] pl-2 flex justify-start items-center word-card-header">
        {word}
      </h3>
      <div className="px-3 pt-3 flex flex-col w-full">
        <div className="word-card-details flex justify-between items-center pb-2 w-full">
          <p>Usage:</p> <p className="word-cloud-details-val">{usage}</p>
        </div>
        <div className="word-card-details flex justify-between items-center pb-3 w-full">
          <p> Unique users:</p>{" "}
          <p className="word-cloud-details-val">{unique_users}</p>
        </div>
        <hr className="text-[] pb-3" />
        <div className="word-card-details flex justify-start items-center pb-2 w-full">
          <p>Sentiment score</p>
        </div>
        <div className="word-card-details flex justify-between items-center pb-2 w-full">
          <p className="word-cloud-sentiment-val">
            <span style={{ color: sentimentColors[sentiment_category] }}>
              {sentiment_score}
            </span>
            /<span className="overall-details-val">100</span>
          </p>
          <p className="sentiment-category-text">{sentiment_category}</p>
        </div>

        <div className="flex items-center w-full">
          <div className="flex items-center w-[53px] border-[#5D5D5D]">
            <div className="flex items-center w-[53px] h-[8px] border rounded-l-[20px] bg-[#FEE6E6]">
              <div
                className="h-[8px]"
                style={{ width: `${negative}%`, backgroundColor: "#FF3A29" }}
              ></div>
            </div>
          </div>

          <div className="flex items-center w-[53px] border-[#5D5D5D]">
            <div className="flex items-center w-[53px] h-[8px] border bg-[#E6EAFE]">
              <div
                className="h-[8px]"
                style={{ width: `${neutral}%`, backgroundColor: "#4360FA" }}
              ></div>
            </div>
          </div>

          <div className="flex items-center w-[53px] border-[#5D5D5D]">
            <div className="flex items-center w-[53px] h-[8px] border rounded-r-[20px] bg-[#E8FDE8]">
              <div
                className="h-[8px]"
                style={{ width: `${positive}%`, backgroundColor: "#4E9C19" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WordCloud({ height }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [hoveredWord, setHoveredWord] = useState(null); // State for hovered word
  const [hoveredWordPosition, setHoveredWordPosition] = useState({
    x: 0,
    y: 0,
  }); // State for card position
  const { data: wordclouddata, isLoading } = useGetWordCloudQuery();

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    // Set initial width
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Transform and normalize the API data
  const transformedWords =
    wordclouddata?.data.map((item) => ({
      text: item.keyword,
      value: item.usage,
      details: {
        usage: item.usage,
        unique_users: item.unique_users,
        sentiment_score: item.sentiment_score * 100,
        sentiment_category:
          item.sentiment_score > 0
            ? "positive"
            : item.sentiment_score < 0
            ? "negative"
            : "neutral",
      },
    })) || [];

  const maxWordValue = Math.max(...transformedWords.map((w) => w.value), 1);
  const minWordValue = Math.min(...transformedWords.map((w) => w.value), 0);

  const normalizedWords = transformedWords.map((word) => {
    const normalizedValue =
      ((word.value - minWordValue) / (maxWordValue - minWordValue)) * 100;
    return {
      ...word,
      value: Math.round(normalizedValue),
    };
  });

  const handleMouseOver = (event, word) => {
    setHoveredWord(word);
    setHoveredWordPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseOut = () => {
    setHoveredWord(null);
  };

  return (
    <div className="wordcloud w-full pt-2 relative" ref={containerRef}>
      {isLoading ? (
        <ShimmerThumbnail width={width} height={300} />
      ) : width > 0 && normalizedWords.length > 0 ? (
        <>
          <Wordcloud
            words={normalizedWords}
            width={width}
            height={height}
            fontSize={fontSizeSetter}
            font={"Impact"}
            padding={2}
            spiral={"archimedean"}
            rotate={0}
            random={fixedValueGenerator}
          >
            {(cloudWords) =>
              cloudWords.map((w, i) => (
                <Text
                  key={w.text}
                  fill={colors[i % colors.length]}
                  textAnchor={"middle"}
                  transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                  fontSize={w.size}
                  fontFamily={w.font}
                  onMouseOver={(e) => handleMouseOver(e, w)}
                  onMouseOut={handleMouseOut}
                >
                  {w.text}
                </Text>
              ))
            }
          </Wordcloud>
          {hoveredWord && (
            <WordCard
              word={hoveredWord.text}
              details={hoveredWord.details}
              style={{
                top: hoveredWordPosition.y + 10,
                left: hoveredWordPosition.x + 10,
              }}
            />
          )}
        </>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

WordCard.propTypes = {
  word: PropTypes.string.isRequired,
  details: PropTypes.shape({
    usage: PropTypes.number.isRequired,
    unique_users: PropTypes.number.isRequired,
    sentiment_score: PropTypes.number.isRequired,
    sentiment_category: PropTypes.oneOf(["positive", "neutral", "negative"])
      .isRequired,
  }).isRequired,
};

WordCloud.propTypes = {
  height: PropTypes.number.isRequired,
};
