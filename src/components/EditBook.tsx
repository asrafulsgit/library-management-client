import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";


export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  isAvailable: boolean;
}

const dummyBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    isbn: "9780743273565",
    description: "A novel set in the Roaring Twenties.",
    copies: 3,
    isAvailable: true,
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    isbn: "9780451524935",
    description: "A chilling prophecy about the future.",
    copies: 0,
    isAvailable: false,
  },
];

const EditBook: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch book by ID
  useEffect(() => {
    const found = dummyBooks.find((b) => b.id === id);
    if (found) {
      setBook(found);
    }
    setLoading(false);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;

    // Business logic: mark unavailable if copies = 0
    const updatedBook: Book = {
      ...book,
      isAvailable: book.copies > 0,
    };

    console.log("Updated book data:", updatedBook);

    // Simulate API update
    alert("Book updated successfully!");
    navigate("/books");
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (!book) return <p className="text-center text-red-500">Book not found.</p>;

  return (
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
          <input
            id="genre"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-base-100 border border-gray-600"
          />
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
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditBook;
