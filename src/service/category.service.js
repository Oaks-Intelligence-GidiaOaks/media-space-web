import { CATEGORY } from "./constants";
import apiSlice from "./api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all category route
    getCategory: builder.query({
      query: () => ({
        url: CATEGORY,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoryQuery } = categoryApiSlice;
