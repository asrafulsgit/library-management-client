import React from "react";
import { useParams, Link } from "react-router";
import { useGetBookByIdQuery } from "../controllers/apiSlice";
import { Helmet } from "react-helmet";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useGetBookByIdQuery(id!);

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center text-white">
        <p>Book not found or error loading book.</p>
      </div>
    );
  }

  const book = data.data;
  return (
   <> 
    <Helmet>
            <title>BookStore | Book Details</title>
           </Helmet>
    <section className="min-h-[90vh] pt-24 pb-12 px-4 max-w-3xl mx-auto text-white">
      {/* Header */}
      <div className="mb-6 border-b border-neutral-700 pb-4">
        <h1 className="text-3xl md:text-4xl font-bold">{book.title}</h1>
        <p className="text-gray-400 mt-1">{book.author}</p>
      </div>

      {/* Details Card */}
      <div className="bg-neutral-900 rounded-lg p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-400">Genre</p>
            <p className="font-semibold">{book.genre}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">ISBN</p>
            <p className="font-semibold">{book.isbn}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Copies</p>
            <p className="font-semibold">{book.copies}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Availability</p>
            {book.available ? (
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
        <div className="mt-6">
          <p className="text-sm text-gray-400">Description</p>
          <p className="mt-1 text-gray-300">{book.description}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to={`/edit-book/${book._id}`}
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
    </>
  );
};

export default BookDetails;
