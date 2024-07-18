import { PLANS } from "../constants";
import apiSlice from "../api/apiSlice";

export const AdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserPlans: builder.query({
      query: () => ({
        url: "user/plans",
        method: "GET",
      }),
      // providesTags: ["Plans"],
    }),
  }),
});

export const { useGetUserPlansQuery } = AdminApiSlice;
