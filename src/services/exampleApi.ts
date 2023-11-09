import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Post, Comment } from '@services/types';

const baseUrl: string = 'https://jsonplaceholder.typicode.com/';

export const exampleApi = createApi({
  reducerPath: 'exampleApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts/',
    }),
    getPost: builder.query<Post, string>({
      query: id => {
        return `posts/${id}`;
      },
    }),
    getPostComment: builder.query<
      Comment[],
      { postId: string; commentId: string }
    >({
      query: args => {
        const { postId, commentId } = args;
        return `posts/${postId}/comments?id=${commentId}`;
      },
    }),
    createPost: builder.mutation<Post, Partial<Post>>({
      query: ({ userId, title, body }) => ({
        url: 'posts',
        method: 'POST',
        body: {
          title,
          body,
          userId,
        },
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostQuery,
  useLazyGetPostCommentQuery,
  useCreatePostMutation,
} = exampleApi;
