import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Post, Comment } from './types'

const baseUrl: string = 'https://jsonplaceholder.typicode.com/'

export const exampleApi = createApi({
  reducerPath: 'exampleApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl}),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `posts/`,
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `posts/${id}`,
    }),
    getPostComment: 
      builder.query<Comment, {postId: string, commentId: string}>({
       query: ({postId, commentId}) => (
        `posts/${postId}/comments?id=${commentId}`
        ),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostCommentQuery,
} = exampleApi