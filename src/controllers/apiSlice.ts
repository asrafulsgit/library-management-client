import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book } from "../interfaces/book.interface";

interface GetAllBooksResponse {
  success: boolean;
  message: string;
  data: Book[];
}
interface GetBooksResponse {
  success: boolean;
  message: string;
  data: Book;
}


export interface BookSummary {
  totalQuantity : number;
  book : {
    title : string;
    isbn : string;
  }
}
interface GetBorrowedSummary {
  success : boolean;
  message : string;
  data : BookSummary[]
}

export const apiSlice = createApi({
  reducerPath: "api", // Slice name
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<GetAllBooksResponse, void>({
      query: () => "/api/books",
      providesTags: ["Books"],
    }),
    getBookById: builder.query<GetBooksResponse, string>({
      query: (id) => `/api/books/${id}`,
      providesTags: ["Books"],
    }),
    getBorrowedSummary: builder.query<GetBorrowedSummary, void>({
      query: () => `/api/borrow`,
      providesTags: ["Books"],
    }),
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: "/api/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    borrowBook: builder.mutation({
      query: ({ bookId, quantity, dueDate }) => ({
        url: `/api/borrow`,
        method: "POST",
        body: { book :bookId, quantity, dueDate }
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<Book, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/api/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/api/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowedSummaryQuery
} = apiSlice;
