import { PLANS, PAYMENT_INIT } from "../constants";
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
    initializePayment: builder.mutation({
      query: (body) => ({
        url: PAYMENT_INIT,
        method: "POST",
        body: body,
      }),
      // providesTags: ["Plans"],
    }),
  }),
});

export const { useGetUserPlansQuery, useInitializePaymentMutation } =
  AdminApiSlice;
