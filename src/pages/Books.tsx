import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  isAvailable: boolean;
}

const initialBooks: Book[] = [
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

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleBorrow = (book: Book) => {
    setSelectedBook(book);
    setIsBorrowModalOpen(true);
  };

  const handleBorrowConfirmed = (bookId: string, quantity: number) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === bookId) {
          const updatedCopies = b.copies - quantity;
          return {
            ...b,
            copies: updatedCopies,
            isAvailable: updatedCopies > 0,
          };
        }
        return b;
      })
    );
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const handleEditSave = (updatedBook: Book) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
    );
  };

  return (
    <section className="min-h-[90vh] pt-25 pb-10 px-4 max-w-6xl mx-auto text-white">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Books</h1>
        <p className="text-gray-400 mb-6">
          Manage all books in your library. You can add, edit, borrow, or remove
          books below.
        </p>
      </div>

      <div>
        <Link to="/create-book">
          <button className="ml-auto block mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">
            + Add New Book
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-neutral-900 rounded shadow">
        <table className="min-w-full">
          <thead className="bg-neutral-700">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Genre</th>
              <th className="px-4 py-2 text-left">ISBN</th>
              <th className="px-4 py-2 text-center">Copies</th>
              <th className="px-4 py-2 text-center">Availability</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b border-neutral-700">
                <td className="px-4 py-3">{book.title}</td>
                <td className="px-4 py-3">{book.author}</td>
                <td className="px-4 py-3">{book.genre}</td>
                <td className="px-4 py-3">{book.isbn}</td>
                <td className="px-4 py-3 text-center">{book.copies}</td>
                <td className="px-4 py-3 text-center">
                  {book.isAvailable ? (
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                      Available
                    </span>
                  ) : (
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                      Unavailable
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleEdit(book)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleBorrow(book)}
                  >
                    Borrow
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isBorrowModalOpen && selectedBook && (
        <BorrowModal
          book={selectedBook}
          onClose={() => setIsBorrowModalOpen(false)}
          onBorrow={handleBorrowConfirmed}
        />
      )}

      {isEditModalOpen && selectedBook && (
  <EditModal
    book={selectedBook}
    onClose={() => setIsEditModalOpen(false)}
    onSave={handleEditSave}
  />
)}
    </section>
  );
};

interface BorrowModalProps {
  book: Book;
  onClose: () => void;
  onBorrow: (bookId: string, quantity: number) => void;
}

const BorrowModal: React.FC<BorrowModalProps> = ({
  book,
  onClose,
  onBorrow,
}) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity <= 0) {
      alert("Quantity must be at least 1.");
      return;
    }

    if (quantity > book.copies) {
      alert("Quantity exceeds available copies.");
      return;
    }

    // Simulated API call
    console.log("Borrow request:", { bookId: book.id, quantity, dueDate });

    onBorrow(book.id, quantity);

    alert("Book borrowed successfully!");
    onClose();
    // navigate("/borrowed-summary");
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-800 rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Borrow Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="quantity" className="block mb-1 font-medium">
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                max={book.copies}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <p className="text-gray-400 text-sm mt-1">
                Available copies: {book.copies}
              </p>
            </div>
            <div>
              <label htmlFor="dueDate" className="block mb-1 font-medium">
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded"
            >
              Confirm Borrow
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface EditModalProps {
  book: Book;
  onClose: () => void;
  onSave: (updatedBook: Book) => void;
}

const EditModal: React.FC<EditModalProps> = ({ book, onClose, onSave }) => {
  const [formData, setFormData] = useState<Book>({ ...book });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Business logic: Mark unavailable if copies = 0
    const updatedBook = {
      ...formData,
      isAvailable: formData.copies > 0,
    };
    onSave(updatedBook);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-800 rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1 font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600"
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
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600"
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
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="isbn" className="block mb-1 font-medium">
              ISBN
            </label>
            <input
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600"
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
              value={formData.copies}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600"
            />
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
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
      </div>
    </div>
  );
};

export default Books;
