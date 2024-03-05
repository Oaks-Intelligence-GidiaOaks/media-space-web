import { ORGANIZATIONS } from "./constants";
import apiSlice from "./api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all organization route
    getOrganization: builder.query({
      query: () => ({
        url: ORGANIZATIONS,
        method: "GET",
      }),
      providesTags: ["Organization"],
    }),
  }),
});

export const { useGetOrganizationQuery } = organizationApiSlice;
