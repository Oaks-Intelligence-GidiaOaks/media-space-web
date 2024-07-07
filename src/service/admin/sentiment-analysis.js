import {
  TRENDING_KEYWORDS,
  WORD_CLOUD,
  SENTIMENT_ANALYSIS_STATISTICS,
  NET_SENTIMENT,
  SENTIMENT_TREND,
} from "../constants";
import apiSlice from "../api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrendingKeywords: builder.query({
      query: () => ({
        url: TRENDING_KEYWORDS,
        method: "GET",
      }),
      providesTags: ["sentimentAnalysis"],
    }),

    getWordCloud: builder.query({
      query: () => ({
        url: WORD_CLOUD,
        method: "GET",
      }),
      providesTags: ["sentimentAnalysis"],
    }),

    getSentimentStats: builder.query({
      query: () => ({
        url: SENTIMENT_ANALYSIS_STATISTICS,
        method: "GET",
      }),
      providesTags: ["sentimentAnalysis"],
    }),

    getNetSentiment: builder.query({
      query: () => ({
        url: NET_SENTIMENT,
        method: "GET",
      }),
      providesTags: ["sentimentAnalysis"],
    }),

    getSentimentTrend: builder.query({
      query: () => ({
        url: SENTIMENT_TREND,
        method: "GET",
      }),
      providesTags: ["sentimentAnalysis"],
    }),
  }),
});

export const {
  useGetTrendingKeywordsQuery,
  useGetWordCloudQuery,
  useGetSentimentStatsQuery,
  useGetNetSentimentQuery,
  useGetSentimentTrendQuery,
} = adminApiSlice;
