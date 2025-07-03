import React, { useEffect, useState } from "react";
import { useGetBorrowedSummaryQuery, type BookSummary } from "../controllers/apiSlice";

const BorrowSummary: React.FC = () => {

  const {data, isLoading,error}=useGetBorrowedSummaryQuery();

  const [summaries,setSummaries]=useState<BookSummary[] | null>(null);
  useEffect(()=>{
    if(data?.data){
      setSummaries(data?.data)
    }
  },[data])
  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

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
              {summaries?.map((record,index) => (
                <tr key={index} className="border-b border-neutral-700">
                  <td className="px-4 py-3">{
                    record?.book?.title.length > 25 ? `${record?.book?.title.slice(0,25)}...` : record?.book?.title}</td>
                  <td className="px-4 py-3">{record?.book?.isbn}</td>
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
