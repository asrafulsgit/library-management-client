# 📚 Library Management (Client)

---

**Project Name:** BookStore  
**Live URL:** [https://jocular-peony-027112.netlify.app]

---

## 📝 Overview

The **Library Management Application** is a full-stack web system designed to help libraries or small book collections manage their inventory efficiently.

---

## 🚀 Features

✅ **CRUD Books**  
✅ **Borrow Books & Update Availability**  
✅ **View Borrow Summary**  

---

## 🧪 Technologies Used

- ⚛️ **React** – Frontend Framework
- 🎯 **Redux Toolkit & RTK Query** – State Management & Data Fetching

---

## ▶️ Setup Project Locally

```bash
# 1. Clone the repository
git clone https://github.com/asrafulsgit/library-management-client.git

# 2. Navigate to the project folder
cd library-management-client

# 3. Install dependencies
npm install
# or
yarn install

# 4. Create a .env file and add the following:
VITE_BACKEND_URL=https://l2-assignment-3-peach.vercel.app

# 5. Run the project
npm run dev
# or
yarn dev
```

---

## 🌐 API Endpoints

| Method | Endpoint                  | Description                       |
|--------|---------------------------|-----------------------------------|
| **GET**    | `/api/books`              | List all books                    |
| **GET**    | `/api/featured-books`     | List featured books (limit: 6)    |
| **GET**    | `/api/borrow`             | Get borrow summary                |
| **GET**    | `/api/books/:id`          | Get book by ID                    |
| **POST**   | `/api/books`              | Create a new book                 |
| **POST**   | `/api/borrow`             | Borrow a book                     |
| **PUT**    | `/api/books/:id`          | Update book details               |
| **DELETE** | `/api/books/:id`          | Delete a book                     |

---

## ⚡ RTK Query API Slice Example

```typescript
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<GetAllBooksResponse, void>({
      query: () => "/api/books",
      providesTags: ["Books"],
    }),
    getFeaturedBooks: builder.query<GetAllBooksResponse, void>({
      query: () => "/api/featured-borrow",
      providesTags: ["Books"],
    }),
    getBookById: builder.query<GetBooksResponse, string>({
      query: (id) => `/api/books/${id}`,
      providesTags: ["Books"],
    }),
    getBorrowedSummary: builder.query<GetBorrowedSummary, void>({
      query: () => "/api/borrow",
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
        url: "/api/borrow",
        method: "POST",
        body: { book: bookId, quantity, dueDate },
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
```
---

## 🧩 Future Improvements

- 🔐 **User Authentication & Role Management**  
  Allow different roles (e.g., Admin, Librarian, Member) with permissions.

- 📈 **Borrow History Tracking**  
  Keep records of who borrowed which book and when.

- ⏰ **Return Books & Overdue Reminders**  
  Notify users when borrowed books are due or overdue.

- 🖼️ **Cover Image Uploads**  
  Enable uploading custom book cover images instead of static URLs.

- 🔍 **Search & Filtering**  
  Allow searching by title, author, genre, and availability.

- ⭐ **Book Reviews & Ratings**  
  Let users leave reviews and ratings for each book.

---
