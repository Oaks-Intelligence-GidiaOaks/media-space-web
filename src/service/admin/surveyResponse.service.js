import { CREATE_SURVEY, END_SURVEY } from "../constants";
import apiSlice from "../api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResponse: builder.query({
      query: (id) => ({
        url: `${CREATE_SURVEY}/${id}/response`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetResponseQuery } = organizationApiSlice;
