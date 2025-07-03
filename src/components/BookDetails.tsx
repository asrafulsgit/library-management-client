import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  cover : string;
  description: string;
  copies: number;
  isAvailable: boolean;
}

// Dummy data
const dummyBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    isbn: "9780743273565",
    description: "A novel set in the Roaring Twenties.",
    cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
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
    cover: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
    copies: 0,
    isAvailable: false,
  }
];

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
   const [loading, setLoading] = useState(true);
  useEffect(() => {
    
      const found = dummyBooks.find((b) => b.id === id);
      if (found) {
        setBook(found);
      }
      setLoading(false);
    }, [id]);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (!book) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <p>Book not found.</p>
      </div>
    );
  }

  return (
    <section className="min-h-[90vh] pt-24 pb-12 px-4 max-w-3xl mx-auto text-white">
  {/* Cover Image */}
  <div className="mb-8">
    <img
      src={book.cover}
      alt={book.title}
      className="w-full h-72 object-cover rounded-lg shadow-md"
    />
  </div>

  {/* Header */}
  <div className="mb-6 border-b border-neutral-700 pb-4">
    <h1 className="text-3xl md:text-4xl font-bold">{book.title}</h1>
    <p className="text-gray-400 mt-1">{book.author}</p>
  </div>

  {/* Details Card */}
  <div className="bg-neutral-900 rounded-lg p-6 shadow-lg">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Genre */}
      <div>
        <p className="text-sm text-gray-400">Genre</p>
        <p className="font-semibold">{book.genre}</p>
      </div>

      {/* ISBN */}
      <div>
        <p className="text-sm text-gray-400">ISBN</p>
        <p className="font-semibold">{book.isbn}</p>
      </div>

      {/* Copies */}
      <div>
        <p className="text-sm text-gray-400">Copies</p>
        <p className="font-semibold">{book.copies}</p>
      </div>

      {/* Availability */}
      <div>
        <p className="text-sm text-gray-400">Availability</p>
        {book.isAvailable ? (
          <span className="inline-block mt-1 bg-green-600 text-white text-xs px-2 py-1 rounded">
            Available
          </span>
        ) : (
          <span className="inline-block mt-1 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Unavailable
          </span>
        )}
      </div>
    </div>

    {/* Description */}
    <div className="mt-6">
      <p className="text-sm text-gray-400">Description</p>
      <p className="mt-1 text-gray-300">{book.description}</p>
    </div>
  </div>

  {/* Actions */}
  <div className="mt-8 flex flex-wrap gap-3">
    <Link
      to={`/book-update/${book.id}`}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
    >
      Edit Book
    </Link>
    <Link
      to="/books"
      className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
    >
      Back to List
    </Link>
  </div>
</section>


  );
};

export default BookDetails;
