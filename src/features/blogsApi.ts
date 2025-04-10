import { apiSlice } from '@/slices/apiSlice';

export const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => `articles?page=${page}&limit=${limit}`,
      transformResponse: (response: { data: any[], pagination: any }) => response,
      
    }),
    getBlogById: builder.query<any, string>({
      query: (blogId) => `articles/${blogId}`,
      transformResponse: (response: { data: any }) => response.data,
      
    }),
    getBlogBySlug: builder.query<any, string>({
      query: (slug) => `articles/blog/${slug}`,
      transformResponse: (response: { data: any }) => response.data,
      
    }),
    createBlog: builder.mutation<any, { title: string; slug: string; description: string; publishDate: string; imageUrl: string }>({
      query: (blogData) => ({
        url: 'articles',
        method: 'POST',
        body: blogData,
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
    updateBlog: builder.mutation<any, { id: string; title: string; slug: string; description: string; publishDate: string; imageUrl: string }>({
      query: ({ id, ...blogData }) => ({
        url: `articles/${id}`,
        method: 'PATCH',
        body: blogData,
      }),
      transformResponse: (response: { data: any }) => response.data,
     
    }),
    deleteBlog: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `articles/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: { data: any }) => response.data,
     
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useGetBlogBySlugQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;
