import { useState, useEffect, useRef } from "react";
import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";
import { useGetWordCloudQuery } from "../../service/admin/sentiment-analysis";
import { ShimmerThumbnail } from "react-shimmer-effects";

const colors = ["#28F473", "#09ABC3", "#000", "#5F0CF3", "#E0092F"];

const fontScale = scaleLog({
  range: [5, 15], // Adjusted range for font sizes
});
const fontSizeSetter = (datum) => fontScale(datum.value);

const fixedValueGenerator = () => 0.5;

export default function WordCloud({ height }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
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

  return (
    <div className="wordcloud w-full pt-2" ref={containerRef}>
      {isLoading ? (
        <ShimmerThumbnail width={width} height={300} />
      ) : width > 0 && normalizedWords.length > 0 ? (
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
              >
                {w.text}
              </Text>
            ))
          }
        </Wordcloud>
      ) : (
        <div>No data available</div>
      )}

      <style>{`
        .wordcloud {
          display: flex;
          flex-direction: column;
          user-select: none;
          width: 100%;
        }
        .wordcloud svg {
          margin: 1rem 0;
          cursor: pointer;
        }

        .wordcloud label {
          display: inline-flex;
          align-items: center;
          font-size: 14px;
          margin-right: 8px;
        }
        .wordcloud textarea {
          min-height: 100px;
        }
      `}</style>
    </div>
  );
}
