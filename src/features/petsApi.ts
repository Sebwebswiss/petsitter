import { apiSlice } from '@/slices/apiSlice';

export const petsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPets: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => `pets?page=${page}&limit=${limit}`,
      transformResponse: (response: { data: any[], pagination: any }) => response,
      providesTags: ['PETS'],
    }),
    getPetsStats: builder.query<any, any>({
      query: ({ page, limit }) => `pets/stats`,
      transformResponse: (response: { data: any[], pagination: any }) => response,
      providesTags: ['PETS'],
    }),
    getPetById: builder.query<any, string>({
      query: (blogId) => `pets/${blogId}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ['PETS'],
    }),
    createPet: builder.mutation<any, any>({
      query: (blogData) => ({
        url: 'pets',
        method: 'POST',
        body: blogData,
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: ['PETS'],
    }),
    updatePet: builder.mutation<any, any>({
      query: ({ id, ...blogData }) => ({
        url: `pets/${id}`,
        method: 'PATCH',
        body: blogData,
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: ['PETS'],
    }),
    deletePet: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `pets/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: ['PETS'],
    }),
  }),
});

export const {
  useGetPetsQuery,
  useGetPetsStatsQuery,
  useGetPetByIdQuery,
  useCreatePetMutation,
  useUpdatePetMutation,
  useDeletePetMutation,
} = petsApi;
