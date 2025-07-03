import React from "react";

// Example aggregated data structure
interface BorrowSummary {
  id: string;
  title: string;
  isbn: string;
  totalQuantity: number;
}

const summaryData: BorrowSummary[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    isbn: "9780743273565",
    totalQuantity: 12,
  },
  {
    id: "2",
    title: "1984",
    isbn: "9780451524935",
    totalQuantity: 8,
  },
  {
    id: "3",
    title: "To Kill a Mockingbird",
    isbn: "9780061120084",
    totalQuantity: 5,
  },
];

const BorrowSummary: React.FC = () => {
  return (
    <section className="pt-25 pb-16 bg-base-100 text-white min-h-[90vh]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Borrow Summary</h2>
        <p className="text-gray-400 mb-8">
          Displays a list of books that have been borrowed, along with the total quantity borrowed for each book.
        </p>
        </div>

        <div className="overflow-x-auto bg-neutral-800 rounded shadow">
          <table className="min-w-[600px] w-full">
            <thead className="bg-neutral-700">
              <tr>
                <th className="px-4 py-2 text-left">Book Title</th>
                <th className="px-4 py-2 text-left">ISBN</th>
                <th className="px-4 py-2 text-center">Total Quantity Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {summaryData.map((record) => (
                <tr key={record.id} className="border-b border-neutral-700">
                  <td className="px-4 py-3">{record.title}</td>
                  <td className="px-4 py-3">{record.isbn}</td>
                  <td className="px-4 py-3 text-center">{record.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BorrowSummary;
