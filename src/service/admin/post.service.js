import { POST } from "../constants";
import apiSlice from "../api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all post route
    getPost: builder.query({
      query: () => ({
        url: POST,
        method: "GET"
      }),
      providesTags: ["Post"]
    }),
    getSinglePost: builder.query({
      query: (id) => ({
        url: `${POST}/${id}`,
        method: "GET"
      }),
      providesTags: ["Post"]
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: POST,
        method: "POST",
        body: postData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POST}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Post"]
    })
  })
});

export const {
  useGetPostQuery,
  useCreatePostMutation,
  useGetSinglePostQuery,
  useDeletePostMutation
} = organizationApiSlice;
