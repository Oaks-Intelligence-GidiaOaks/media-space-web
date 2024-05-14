import { ADD_REMOVE_STAFF, ORGANIZATION_USER_LIST } from "../constants";
import apiSlice from "../api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    toggleStaff: builder.mutation({
      query: (data) => ({
        url: ADD_REMOVE_STAFF,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Staff"],
    }),

    getAllStaff: builder.query({
      query: () => ({
        url: ADD_REMOVE_STAFF,
        method: "GET",
      }),
    }),

    getOrganizationList: builder.query({
      query: () => ({
        url: ORGANIZATION_USER_LIST,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useToggleStaffMutation,
  useGetAllStaffQuery,
  useGetOrganizationListQuery,
} = organizationApiSlice;
