import {
  CREATE_SURVEY,
  END_SURVEY,
  SURVEY_RESPONSES,
  DOWNLOAD_SURVEY
} from "../constants";
import apiSlice from "../api/apiSlice";

export const organizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSurvey: builder.mutation({
      query: (data) => ({
        url: CREATE_SURVEY,
        body: data,
        method: "POST"
      }),
      invalidatesTags: ["Survey"]
    }),
    getAllSurvey: builder.query({
      query: () => ({
        url: CREATE_SURVEY,
        method: "GET"
      })
    }),
    endSurvey: builder.mutation({
      query: (id) => ({
        url: `${END_SURVEY}/${id}`,
        method: "PATCH"
      })
    }),
    activeSurvey: builder.query({
      query: ({ page, page_size }) => ({
        url: `${CREATE_SURVEY}?survey_type=active&page=${page}&page_size=${page_size}`,
        method: "GET"
      })
    }),

    surveyHistory: builder.query({
      query: ({ page, page_size }) => ({
        url: `${CREATE_SURVEY}?survey_type=history&page=${page}&page_size=${page_size}`,
        method: "GET"
      })
    }),
    deleteSurvey: builder.mutation({
      query: (id) => ({
        url: `${CREATE_SURVEY}/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Survey"]
    }),
    // surveyResponses: builder.query({
    //   query: () => ({
    //     url: SURVEY_RESPONSES,
    //     method: "GET",
    //   }),
    // }),

    getResponse: builder.query({
      query: (id) => ({
        url: `${CREATE_SURVEY}/${id}/response`,
        method: "GET"
      })
    }),

    downloadResponse: builder.query({
      query: (id) => ({
        url: `${DOWNLOAD_SURVEY}/${id}`,
        method: "GET"
      })
    }),

    updateSurvey: builder.mutation({
      query: (data) => ({
        url: `${CREATE_SURVEY}/${data.surveyId}`,
        method: "PATCH"
      })
    })
  })
});

export const {
  useCreateSurveyMutation,
  useGetAllSurveyQuery,
  useEndSurveyMutation,
  useActiveSurveyQuery,
  useSurveyHistoryQuery,
  useDeleteSurveyMutation,
  // useSurveyResponsesQuery,
  useGetResponseQuery,
  useDownloadResponseQuery,
  useUpdateSurveyMutation
} = organizationApiSlice;
