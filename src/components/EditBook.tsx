import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetBookByIdQuery, useUpdateBookMutation } from "../controllers/apiSlice";
import type { Book } from "../interfaces/book.interface";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // const [triggerGetBooks] = useLazyGetBooksQuery();
  const [updateBook, { isLoading : updateLoading }] = useUpdateBookMutation();
  const { data, isLoading : intiLoading} = useGetBookByIdQuery(id!);
  const [book, setBook] = useState<Book | null>(null);
  
  useEffect(() => {
    if (data?.data) {
      setBook(data?.data);
    }
  }, [data]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBook((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === "copies" ? Number(value) : value,
          }
        : null
    );
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;

    try {
       await updateBook({
      id : book._id,
      data : {
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description,
        copies: book.copies
      }
    }).unwrap();
    toast.success('Book updated')
     navigate("/books");
    } catch (err : any) {
      toast.error('Failed to update the book.')
    }
    
  };

  if (intiLoading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!book) {
    return (
      <div
        className="min-h-[90vh] flex items-center justify-center
       text-red-600"
      >
        Book is not Found
      </div>
    );
  }

  return (
  <>  
  <Helmet>
          <title>BookStore | Update Book</title>
         </Helmet>
  <section className="max-w-2xl mx-auto pt-25 pb-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-4">
        Edit Book: <span className="text-blue-400">{book.title}</span>
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-base-100 border border-gray-600"
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block mb-1 font-medium">
            Author
          </label>
          <input
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-base-100 border border-gray-600"
            required
          />
        </div>
        <div>
          <label htmlFor="genre" className="block mb-1 font-medium">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-base-100 border border-gray-600 text-white"
          >
            <option value="">Select a genre</option>
            <option value="FICTION">FICTION</option>
            <option value="NON_FICTION">NON_FICTION</option>
            <option value="SCIENCE">SCIENCE</option>
            <option value="HISTORY">HISTORY</option>
            <option value="BIOGRAPHY">BIOGRAPHY</option>
            <option value="FANTASY">FANTASY</option>
          </select>
        </div>

        <div>
          <label htmlFor="isbn" className="block mb-1 font-medium">
            ISBN
          </label>
          <input
            id="isbn"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-base-100 border border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={book.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 rounded bg-base-100 border border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="copies" className="block mb-1 font-medium">
            Copies
          </label>
          <input
            id="copies"
            name="copies"
            type="number"
            min={0}
            value={book.copies}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-base-100 border border-gray-600"
          />
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={() => navigate("/books")}
            className="px-4 py-2 bg-gray-600 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            {updateLoading ? 'Changing...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </section></>
  );
};

export default EditBook;
