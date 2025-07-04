import React from "react";

import booksImage from '../assets/books.png'
import people from '../assets/people.png'
import activeBooks from '../assets/active-books.png'
import borrowedBooks from '../assets/borrowed-books.png'

const stats = [
  {
    id: 1,
    label: "Books Available",
    value: 1250,
    icon: booksImage,
  },
  {
    id: 2,
    label: "Members",
    value: 750,
    icon: people,
  },
  {
    id: 3,
    label: "Books Borrowed",
    value: 500,
    icon: borrowedBooks,
  },
  {
    id: 4,
    label: "Active Borrows",
    value: 120,
    icon:activeBooks,
  },
];

const Statistics: React.FC = () => {
  return (
    <section id="statistics" className="py-16 bg-base-100 text-white">
      <div className="mx-auto px-5 max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Library Statistics</h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto">
          Key numbers that showcase the scope and activity of our library.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ id, label, value, icon }) => (
            <div
              key={id}
              className="bg-neutral-800 rounded-lg p-6 flex flex-col items-center justify-center shadow-md"
            >
              <div>
                <img src={icon} alt="statistics icon" className="h-10"/>
              </div>
              <p className="text-3xl font-extrabold mt-4">{value}</p>
              <p className="mt-2 text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
