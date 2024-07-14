import apiSlice from "../api/apiSlice";
import { FEATURES } from "../constants";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => ({
        url: "superadmin/plan",
        method: "GET",
      }),
      providesTags: ["Plans"],
    }),

    getPlan: builder.query({
      query: (id) => ({
        url: `superadmin/plan/${id}`,
        method: "GET",
      }),
      providesTags: ["Plans"],
    }),

    getFeatures: builder.query({
      query: () => ({
        url: FEATURES,
        method: "GET",
      }),
      providesTags: ["Plans"],
    }),

    updatePlan: builder.mutation({
      query: (data) => ({
        url: `superadmin/plan/${data.id}`,
        body: data,
        method: "PATCH",
      }),
      invalidatesTags: ["Plans"],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetPlanQuery,
  useGetFeaturesQuery,
  useUpdatePlanMutation,
} = adminApiSlice;
