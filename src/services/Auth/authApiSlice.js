
import { apiSlice } from '../../services/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => '/users/login',
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),

    orgSignUp: builder.mutation({
      query: (data) => ({
        url: '/organizations/signup',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),

    verifyUser: builder.mutation({
      query: ({ token }) => ({
        url: '/users/verify-user',
        method: 'PUT',
        body: { token },
      }),
    }),

    userOnBoard: builder.mutation({
      query: () => ({
        url: '/organizations/mark-as-onboarded',
        method: 'PUT',
      }),
    }),

    getOnBoardingStep: builder.query({
      query: () => '/organizations/completed-onboarding-steps',
    }),

    getOnBoardStep: builder.mutation({
      query: () => ({
        url: '/organizations/completed-onboarding-steps',
        method: 'GET',
      }),
    }),

    requestPasswordReset: builder.mutation({
      query: ({ email }) => ({
        url: '/users/request-password-reset',
        method: 'PUT',
        body: { email },
      }),
    }),
    resendVerification: builder.mutation({
      query: (data) => ({
        url: '/users/resend-verification-link',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/users/reset-password',
        method: 'PUT',
        body: { ...data.data },
      }),
    }),
  }),
});

export const {
  useUserOnBoardMutation,
  useLoginUserMutation,
  useGetUserDataQuery,
  useVerifyUserMutation,
  useOrgSignUpMutation,
  useGetOnBoardStepMutation,
  useRequestPasswordResetMutation,
  useResendVerificationMutation,
  useGetOnBoardingStepQuery,
  useResetPasswordMutation,
} = userApiSlice;
