import {
  GETUSER,
  LOGIN,
  REGISTER,
  DEACTIVATE_USER,
  GET_CODE,
  RESET_PASSWORD,
  ACTIVATE_USER
} from "./constants";
import apiSlice from "./api/apiSlice";
import { updateUser } from "../redux/slices/user.slice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login users route
    loginUser: builder.mutation({
      query: (userData) => ({
        url: LOGIN,
        body: userData,
        method: "POST"
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const data = await queryFulfilled;
          // const { accessToken, user } = data;
          const accessToken = data.data.accessToken;
          const user = data.data.user;
          const refreshToken = data.data.user.refreshToken;

          // console.log(refreshToken, "refreshToken");
          dispatch(
            updateUser({
              token: accessToken,
              user,
              refreshToken: refreshToken
            })
          );
        } catch (error) {
          console.log(error);
          return;
        }
      },
      transformResponse: (response) => {
        // console.log(response, "rtk");
        return response;
      },
      invalidatesTags: ["User"]
    }),

    // Register users route
    registerUser: builder.mutation({
      query: (userData) => ({
        url: REGISTER,
        body: userData,
        method: "POST"
      }),
      invalidatesTags: ["User"]
    }),

    // Get user route
    getUser: builder.query({
      query: () => ({
        url: GETUSER,
        method: "GET"
      }),
      providesTags: ["User"]
    }),

    deActivateUser: builder.mutation({
      query: ({ id }) => ({
        url: `${DEACTIVATE_USER}/${id}`,
        method: "PATCH"
      }),
      invalidatesTags: ["User"]
    }),

    getCode: builder.mutation({
      query: (data) => ({
        url: GET_CODE,
        method: "POST",
        body: data
      }),
      providesTags: ["User"]
    }),

    updatePassword: builder.mutation({
      query: (data) => ({
        url: RESET_PASSWORD,
        method: "POST",
        body: data
      }),
      providesTags: ["User"]
    }),

    ActivateUser: builder.mutation({
      query: ({ id }) => ({
        url: `${ACTIVATE_USER}/${id}`,
        method: "PATCH"
      }),
      invalidatesTags: ["User"]
    })
  })
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
  useDeActivateUserMutation,
  useGetCodeMutation,
  useUpdatePasswordMutation,
  useActivateUserMutation
} = userApiSlice;
