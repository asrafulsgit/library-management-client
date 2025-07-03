import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useBorrowBookMutation, useDeleteBookMutation, useGetBooksQuery } from "../controllers/apiSlice";
import type { Book } from "../interfaces/book.interface";





const Books: React.FC = () => {
  const { data, isLoading, error } = useGetBooksQuery();

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(()=>{
      if(data?.data){
        setBooks(data?.data)
      }
  },[data])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);


  const handleDelete = (book: Book) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  const handleBorrow = (book: Book) => {
    setSelectedBook(book);
    setIsBorrowModalOpen(true);
  };

  

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }
  return (
    <section className="min-h-[90vh] pt-25 pb-10 px-4 max-w-7xl mx-auto text-white">
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
        <table className="min-w-[1150px] w-full">
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
              <tr key={book._id} className="border-b border-neutral-700">
                <td className="px-4 py-3">{book.title.length > 25 ? `${book.title.slice(0,25)}...` : book.title} </td>
                <td className="px-4 py-3">{book.author}</td>
                <td className="px-4 py-3">{book.genre}</td>
                <td className="px-4 py-3">{book.isbn}</td>
                <td className="px-4 py-3 text-center">{book.copies}</td>
                <td className="px-4 py-3 text-center">
                  {book.available ? (
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
                  <Link to={`/books/${book._id}`}>
                    <button
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                    >
                      View
                    </button>
                  </Link>
                  <Link to={`/edit-book/${book._id}`}>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  </Link>
                  <button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleBorrow(book)}
                  >
                    Borrow
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    onClick={() => handleDelete(book)}
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
        />
      )}


      {isDeleteModalOpen && bookToDelete && (
  <DeleteModal
    book={bookToDelete}
    onClose={() => {
      setIsDeleteModalOpen(false);
      setBookToDelete(null);
    }}
    onConfirm={() => {
      setIsDeleteModalOpen(false);
      setBookToDelete(null);
    }}
  />
)}

    </section>
  );
};

interface BorrowModalProps {
  book: Book;
  onClose: () => void;
}

const BorrowModal: React.FC<BorrowModalProps> = ({
  book,
  onClose,
}) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [borrowBook, { isLoading : borrowLoading, error : borrowError, isSuccess }] = useBorrowBookMutation();
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (quantity <= 0) {
      alert("Quantity must be at least 1.");
      return;
    }

    if (quantity > book.copies) {
      alert("Quantity exceeds available copies.");
      return;
    }

    try {
    await borrowBook({
      bookId: book._id,
      quantity: quantity,
      dueDate: dueDate,
    }).unwrap();
    onClose();
    navigate("/borrow-summary");
  } catch (err) {
    console.error("Borrow error:", err);
    alert("Failed to borrow the book.");
  }
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
              {borrowLoading ? 'Borrowing...' :  'Confirm Borrow'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface DeleteModalProps {
  book: Book;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  book,
  onClose,
  onConfirm,
}) => {

  const [deleteBook, { isLoading, error }] = useDeleteBookMutation();

  const handleDelete =async ()=>{
    try {
      await deleteBook(book?._id).unwrap();
      onConfirm()
    } catch (err) {
      console.error("Failed to delete the book:", err);
      alert("Failed to delete the book.");
    }
  }
  

  return(
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
    <div className="bg-neutral-800 rounded p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Delete Book</h2>
      <p className="mb-4 text-gray-300">
        Are you sure you want to delete <strong>{book.title}</strong>?
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
         {isLoading ? 'Deleting' : 'Delete'}
        </button>
      </div>
    </div>
  </div>
)
};




export default Books;
