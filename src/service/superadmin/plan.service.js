import apiSlice from "../api/apiSlice";

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
  }),
});

export const { useGetPlansQuery, useGetPlanQuery } = adminApiSlice;
