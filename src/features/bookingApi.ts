import { apiSlice } from '@/slices/apiSlice';

export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => `bookings?page=${page}&limit=${limit}`,
      transformResponse: (response: { data: any[]; pagination: any }) => response,
      providesTags: ['BOOKINGS'],
    }),
    getBookedBookings: builder.query<
      any,
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) => {
        const params = new URLSearchParams();
        params.append('startDate', startDate);
        params.append('endDate', endDate);
        return `bookings/booked?${params.toString()}`;
      },
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ['BOOKINGS'],
    }),

    getBookingById: builder.query<any, string>({
      query: (bookingId) => `bookings/${bookingId}`,
      transformResponse: (response: { data: any }) => response.data,
      providesTags: ['BOOKINGS'],
    }),
    createBooking: builder.mutation<
      any,
      any
    >({
      query: (bookingData) => ({
        url: 'bookings',
        method: 'POST',
        body: bookingData,
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: ['BOOKINGS'],
    }),
    updateBooking: builder.mutation<
      any,
      any
    >({
      query: ({ id, ...bookingData }) => ({
        url: `bookings/${id}`,
        method: 'PATCH',
        body: bookingData,
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: ['BOOKINGS'],
    }),
    deleteBooking: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `bookings/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: any }) => response.data,
      invalidatesTags: ['BOOKINGS'],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useGetBookedBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
