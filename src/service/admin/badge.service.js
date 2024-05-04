import { CREATE_BADGE } from "../constants";
import apiSlice from "../api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBadge: builder.mutation({
      query: (userData) => ({
        url: CREATE_BADGE,
        body: userData,
        method: "POST",
      }),
      invalidatesTags: ["Badge"],
    }),
  }),
});

export const { useCreateBadgeMutation } = organizationApiSlice;
