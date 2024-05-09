import { CREATE_SURVEY, END_SURVEY } from "../constants";
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
    getAllSurvey: builder.query({
      query: () => ({
        url: CREATE_SURVEY,
        method: "GET",
      }),
    }),
    endSurvey: builder.mutation({
      query: (id) => ({
        url: `${END_SURVEY}/${id}`,
        method: "PATCH",
      }),
    }),
    activeSurvey: builder.query({
      query: () => ({
        url: `${CREATE_SURVEY}?survey_type=active`,
        method: "GET",
      }),
    }),
    surveyHistory: builder.query({
      query: () => ({
        url: `${CREATE_SURVEY}?survey_type=history`,
        method: "GET",
      }),
    }),
    deleteSurvey: builder.mutation({
      query: (id) => ({
        url: `${CREATE_SURVEY}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Survey"],
    }),
  }),
});

export const {
  useCreateSurveyMutation,
  useGetAllSurveyQuery,
  useEndSurveyMutation,
  useActiveSurveyQuery,
  useSurveyHistoryQuery,
  useDeleteSurveyMutation,
} = organizationApiSlice;
