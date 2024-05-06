import { CREATE_SURVEY } from "../constants";
import apiSlice from "../api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSurvey: builder.mutation({
      query: (data) => ({
        url: CREATE_SURVEY,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Survey"],
    }),
  }),
});

export const { useCreateSurveyMutation } = organizationApiSlice;
