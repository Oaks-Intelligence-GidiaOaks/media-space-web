import { PLANS } from "../constants";
import apiSlice from "../api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => ({
        url: PLANS,
        method: "GET",
      }),
      providesTags: ["Plans"],
    }),
  }),
});

export const { useGetPlansQuery } = adminApiSlice;
