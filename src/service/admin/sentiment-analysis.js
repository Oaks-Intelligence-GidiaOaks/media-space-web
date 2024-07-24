import {
  TRENDING_KEYWORDS,
  WORD_CLOUD,
  NET_SENTIMENT,
  SENTIMENT_TREND
} from "../constants";
import apiSlice from "../api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrendingKeywords: builder.query({
      query: (filter) => ({
        url: `${TRENDING_KEYWORDS}?filter=${filter}`,
        method: "GET"
      }),
      providesTags: ["sentimentAnalysis"]
    }),

    getWordCloud: builder.query({
      query: (filter) => `${WORD_CLOUD}?filter=${filter}`,
      providesTags: (result, error, filter) => [
        { type: "SentimentAnalysis", id: filter }
      ]
    }),

    getSentimentStats: builder.query({
      query: ({ filter, country, category }) => {
        // You can adjust the query string based on the parameters
        return {
          url: `/admin/sentiment/statistics`,
          params: { filter, country, category }
        };
      },
      providesTags: ["sentimentAnalysis"]
    }),

    getNetSentiment: builder.query({
      query: (filter) => ({
        url: `${NET_SENTIMENT}?filter=${filter}`,
        method: "GET"
      }),
      providesTags: ["sentimentAnalysis"]
    }),

    getSentimentTrend: builder.query({
      query: () => ({
        url: SENTIMENT_TREND,
        method: "GET"
      }),
      providesTags: ["sentimentAnalysis"]
    })
  })
});

export const {
  useGetTrendingKeywordsQuery,
  useGetWordCloudQuery,
  useGetSentimentStatsQuery,
  useGetNetSentimentQuery,
  useGetSentimentTrendQuery
} = adminApiSlice;
