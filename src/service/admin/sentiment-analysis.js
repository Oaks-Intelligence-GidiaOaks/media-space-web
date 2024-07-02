import { TRENDING_KEYWORDS, WORD_CLOUD } from "../constants";
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
  }),
});

export const { useGetTrendingKeywordsQuery, useGetWordCloudQuery } =
  adminApiSlice;
