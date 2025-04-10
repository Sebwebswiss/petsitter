import { clientApiSlice } from "@/slices/clientApiSlice";

export const usersApi = clientApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `user`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ['CLIENT'],
    }),
    getClientById: builder.query({
      query: (id: any) => `clients/${id}`,
      transformResponse: (response: { data: any }) => response.data,
    }),
    getClient: builder.query({
      query: () => `auth/user`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ['CLIENT'],
    }),
    updateClient: builder.mutation<any, any>({
      query: ({ id, ...blogData }) => ({
        url: `clients/${id}`,
        method: 'PATCH',
        body: blogData,
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: ['CLIENT'],
    }),
    updatePassword: builder.mutation<void, { clientId: string, currentPassword?: string, newPassword: string, securityAnswers?: { maidenName: string, favoriteFood: string } }>({
      query: ({ clientId, currentPassword, newPassword, securityAnswers }) => ({
        url: `/clients/update-password`,
        method: "PUT",
        body: {
          clientId,
          currentPassword,
          newPassword,
          securityAnswers,
        },
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: ['CLIENT'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery, useGetClientQuery, useGetClientByIdQuery, useUpdateClientMutation, useUpdatePasswordMutation } = usersApi;
