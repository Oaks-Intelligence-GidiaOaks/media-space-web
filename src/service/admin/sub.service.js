import {
  PLANS,
  PAYMENT_INIT,
  SUBSCRIPTION_HISTORY,
  SUBSCRIPTION_STATS,
  VERIFY_SUBSCRIPTION
} from "../constants";
import apiSlice from "../api/apiSlice";

export const AdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserPlans: builder.query({
      query: () => ({
        url: PLANS,
        method: "GET"
      })
      // providesTags: ["Plans"],
    }),
    initializePayment: builder.mutation({
      query: (body) => ({
        url: PAYMENT_INIT,
        method: "POST",
        body: body
      })
      // providesTags: ["Plans"],
    }),
    SubscriptionStats: builder.query({
      query: () => ({
        url: SUBSCRIPTION_STATS,
        method: "GET"
      })
      // providesTags: ["Plans"],
    }),

    SubscriptionHistory: builder.query({
      query: ({ filter, page, page_size }) => ({
        url: `${SUBSCRIPTION_HISTORY}?filter=${
          filter || ""
        }&page=${page}&page_size=${page_size}`,
        method: "GET"
      })
      // providesTags: ["Plans"],
    }),

    verifyPayment: builder.mutation({
      query: (body) => ({
        url: VERIFY_SUBSCRIPTION,
        method: "POST",
        body: body
      })
      // providesTags: ["Plans"],
    })
  })
});

export const {
  useGetUserPlansQuery,
  useInitializePaymentMutation,
  useSubscriptionStatsQuery,
  useSubscriptionHistoryQuery,
  useVerifyPaymentMutation
} = AdminApiSlice;
