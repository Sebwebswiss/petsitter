import { apiSlice } from '@/slices/apiSlice';
import { UserDocument } from '@/types';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => `users?page=${page}&limit=${limit}`,
      transformResponse: (response: { data: any[], pagination: any }) => response,
      providesTags: ['USER'],
    }),
    getUser: builder.query({
      query: () => `user`,
      transformResponse: (response: { data: any }) => response.data,
    }),
    getUserById: builder.query<any, string>({
      query: (blogId) => `users/${blogId}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ['USER'],
    }),
    createUser: builder.mutation<any, UserDocument>({
      query: (blogData) => ({
        url: 'users',
        method: 'POST',
        body: blogData,
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: ['USER'],
    }),
    updateUser: builder.mutation<any, UserDocument>({
      query: ({ id, ...blogData }) => ({
        url: `users/${id}`,
        method: 'PATCH',  
        body: blogData,
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: ['USER'],
    }),
    deleteUser: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: ['USER'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
