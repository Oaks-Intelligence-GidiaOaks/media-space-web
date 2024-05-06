import { CREATE_BADGE, ASSIGN_BADGE } from "../constants";
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

    getAllBadge: builder.query({
      query: () => ({
        url: CREATE_BADGE,
        method: "GET",
      }),
    }),

    getSingleBadge: builder.query({
      query: (id) => ({
        url: `${CREATE_BADGE}/${id}`,
        method: "GET",
      }),
    }),

    deleteSingleBadge: builder.query({
      query: (id) => ({
        url: `${CREATE_BADGE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Badge"],
    }),

    assignBadge: builder.mutation({
      query: (data) => ({
        url: ASSIGN_BADGE,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Badge"],
    }),
  }),
});

export const {
  useCreateBadgeMutation,
  useGetAllBadgeQuery,
  useGetSingleBadgeQuery,
  useDeleteSingleBadgeQuery,
  useAssignBadgeMutation,
} = organizationApiSlice;
