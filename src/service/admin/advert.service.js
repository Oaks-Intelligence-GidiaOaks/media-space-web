import { ADMIN_ADVERT, TOGGLE_ADVERT, ADMIN_ADVERT_STATS } from "../constants";
import apiSlice from "../api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all advert route

    getAllAdminAdvert: builder.query({
      query: () => ({
        url: ADMIN_ADVERT,
        method: "GET",
      }),
      providesTags: ["Advert"],
    }),

    findAdveryByStatus: builder.query({
      query: (status) => ({
        url: `${ADMIN_ADVERT}?status=${status}`,
        method: "GET",
      }),
      providesTags: ["Advert"],
    }),

    getSingleAdvertById: builder.query({
      query: (id) => ({
        url: `${ADMIN_ADVERT}/${id}`,
        method: "GET",
      }),
      providesTags: ["Advert"],
    }),

    deleteSingleAdvertById: builder.query({
      query: (id) => ({
        url: `${ADMIN_ADVERT}/${id}`,
        method: "DELETE",
      }),
      providesTags: ["Advert"],
    }),

    toggleAdvertById: builder.mutation({
      query: (id) => ({
        url: `${TOGGLE_ADVERT}/${id}`,
        method: "GET",
      }),
      providesTags: ["Advert"],
    }),

    adminAdvertStats: builder.query({
      query: () => ({
        url: ADMIN_ADVERT_STATS,
        method: "GET",
      }),
      providesTags: ["Advert"],
    }),
  }),
});

export const {
  useGetAllAdminAdvertQuery,
  useFindAdveryByStatusQuery,
  useGetSingleAdvertByIdQuery,
  useDeleteSingleAdvertByIdQuery,
  useToggleAdvertByIdMutation,
  useAdminAdvertStatsQuery,
} = organizationApiSlice;
