import React, { useState } from "react";
import { useNavigate } from "react-router";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  details: string;
  copies: number;
  isAvailable: boolean;
}

const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    details: "A novel set in the Jazz Age exploring themes of decadence.",
    copies: 3,
    isAvailable: true,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    cover: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
    details: "A dystopian social science fiction novel and cautionary tale.",
    copies: 0,
    isAvailable: false,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "https://covers.openlibrary.org/b/id/8305831-L.jpg",
    details: "A novel about racial injustice in the Deep South.",
    copies: 5,
    isAvailable: true,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "https://covers.openlibrary.org/b/id/8091016-L.jpg",
    details: "A classic romantic novel of manners.",
    copies: 2,
    isAvailable: true,
  },
  {
    id: 5,
    title: "Moby Dick",
    author: "Herman Melville",
    cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    details: "The narrative of Captain Ahab's obsessive quest.",
    copies: 0,
    isAvailable: false,
  },
  {
    id: 6,
    title: "War and Peace",
    author: "Leo Tolstoy",
    cover: "https://covers.openlibrary.org/b/id/8231850-L.jpg",
    details: "A historical epic about the French invasion of Russia.",
    copies: 4,
    isAvailable: true,
  },
];

const FeaturedBooks: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const handleBorrow = (book: Book) => {
    setSelectedBook(book);
    setIsBorrowModalOpen(true);
  };

  const handleBorrowConfirmed = (bookId: string, quantity: number) => {
    
  
  };
  return (
  <>  
  <section id="featured" className="pt-10 pb-20 bg-[#2626269d] text-white">
      <div className="container mx-auto px-4">
        <div className="pb-3">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          Featured Books
        </h2>
        <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
          Explore our selection of highlighted titles available in the library.
        </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
  key={book.id}
  className="bg-neutral rounded-lg shadow-lg overflow-hidden flex flex-col"
>
  <div className="relative">
    <img
      src={book.cover}
      alt={book.title}
      className="w-full h-64 object-cover"
    />
    <span
      className={`absolute top-2 right-2 px-3 py-1 text-xs rounded-full font-medium ${
        book.isAvailable
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      }`}
    >
      {book.isAvailable ? "Available" : "Not Available"}
    </span>
  </div>
  <div className="p-4 flex flex-col flex-1 justify-between">
    <div>
      <h3 className="text-xl font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-400">{book.author}</p>
      <p className="text-sm mt-2 text-gray-300">{book.details}</p>
    </div>
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm flex items-center justify-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block w-4 h-4 mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6V4m0 2v2m0-2h6a2 2 0 012 2v12a2 2 0 01-2 2h-6m0-16H6a2 2 0 00-2 2v12a2 2 0 002 2h6"
    />
  </svg>
   {book.copies}
</p>

      <button
        disabled={!book.isAvailable}
        onClick={() => handleBorrow(book)}
        className={`py-2 px-4 rounded-lg font-medium transition ${
          book.isAvailable
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-600 cursor-not-allowed"
        }`}
      >
        Borrow Book
      </button>
    </div>
  </div>
            </div>

          ))}
        </div>
      </div>
    </section>
    
    {isBorrowModalOpen && selectedBook && (
        <BorrowModal
          book={selectedBook}
          onClose={() => setIsBorrowModalOpen(false)}
          onBorrow={handleBorrowConfirmed}
        />
      )}
    </>
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
  // const navigate = useNavigate();
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

    // onBorrow(book.id, quantity);

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

export default FeaturedBooks;
