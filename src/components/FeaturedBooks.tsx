import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Book } from "../interfaces/book.interface";
import { useBorrowBookMutation, useDeleteBookMutation, useGetFeaturedBooksQuery } from "../controllers/apiSlice";
import booksImage from '../assets/books.png'
import { toast } from "react-toastify";


const FeaturedBooks: React.FC = () => {
  const [books,setBooks]=useState<Book[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);

  const {data, isLoading,error}=useGetFeaturedBooksQuery();

  useEffect(()=>{
    if(data?.data){
      setBooks(data?.data)
    }
  },[data])

  const handleBorrow = (book: Book) => {
      setSelectedBook(book);
      setIsBorrowModalOpen(true);
    };
  
  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (error) {
    if ("data" in error && typeof error.data === "object" && error.data && "message" in error.data) {
      toast.error((error.data as any).message);
    } else if ("message" in error) {
      toast.error((error as any).message);
    } else {
      toast.error("An error occurred while fetching featured books.");
    }
  }

  
  return (
  <>  
    <section  className="pt-10 pb-20 bg-[#2626269d] text-white">
      <div className="px-5">
        <div className="pb-3">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          Featured Books
        </h2>
        <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
          Explore our selection of highlighted titles available in the library.
        </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {books.map((book) => (
            <div
  key={book._id}
  className="bg-neutral rounded-lg shadow-lg p-4 flex flex-col justify-between min-h-[200px]"
>
  <div className="flex items-start justify-between mb-4">
    <div>
      <h3 className="text-xl font-semibold text-white">{book.title}</h3>
      <p className="text-sm text-gray-400">{book.author}</p>
    </div>
    <span
      className={`px-3 ml-2 ${!book.available && 'min-w-[100px]'}  text-center  py-1 text-xs rounded-full font-medium ${
        book.available ? "bg-green-600 text-white" : "bg-red-600 text-white"
      }`}
    >
      {book.available ? "Available" : "Not Available"}
    </span>
  </div>

  <p className="text-sm text-gray-300 mb-4">{
    book.description && book.description.length > 90
      ? `${book.description.slice(0, 90)}...`
      : book.description ?? ""
    }</p>

  <div className="flex items-center justify-between">
    <p className=" text-sm flex items-center gap-1.5 text-gray-200">
      <img src={booksImage} alt="copies" className="h-4" />
      <span>{book.copies}</span>
    </p>

    <button
      disabled={!book.available}
      onClick={() => handleBorrow(book)}
      className={`py-2 px-4 rounded-lg font-medium  transition ${
        book.available
          ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          : "bg-gray-600 text-white cursor-not-allowed"
      }`}
    >
      Borrow Book
    </button>
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
        />
      )}

    </>
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
      toast.error('Quantity must be at least 1.')
      return;
    }

    if (quantity > book.copies) {
      toast.error('Quantity exceeds available copies.')
      return;
    }

    try {
    await borrowBook({
      bookId: book._id,
      quantity: quantity,
      dueDate: dueDate,
    }).unwrap();
    onClose();
    toast.success('Book borrow successfull.')
    navigate("/borrow-summary");
  } catch (err) {
    toast.error('Failed to borrow the book.')
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
              className="px-4 py-2 bg-gray-600 rounded cursor-pointer"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 cursor-pointer hover:bg-yellow-700 rounded"
            >
              {borrowLoading ? 'Borrowing...' :  'Confirm Borrow'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



export default FeaturedBooks;
