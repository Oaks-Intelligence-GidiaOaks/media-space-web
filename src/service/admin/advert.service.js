import { ADMIN_ADVERT } from "../constants";
import apiSlice from "../api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all advert route

    getAllAdminAdvert: builder.query({
      query: () => ({
        url: ADMIN_ADVERT,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const { useGetAllAdminAdvertQuery } = organizationApiSlice;
