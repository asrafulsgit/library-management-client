import React from "react";

const stats = [
  {
    id: 1,
    label: "Books Available",
    value: 1250,
    icon: (
      <svg
        className="w-8 h-8 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20h9"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 20h9"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 4h10a1 1 0 011 1v15a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    label: "Members",
    value: 750,
    icon: (
      <svg
        className="w-8 h-8 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.121 17.804A5 5 0 0112 14a5 5 0 016.879 3.804"
        />
        <circle
          cx="12"
          cy="7"
          r="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          fill="none"
          stroke="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 3,
    label: "Books Borrowed",
    value: 500,
    icon: (
      <svg
        className="w-8 h-8 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 12v-3m0 0L9 9m3 0l3 3m0 6v-3m0 0L15 15m-3 0l-3 3"
        />
      </svg>
    ),
  },
  {
    id: 4,
    label: "Active Borrows",
    value: 120,
    icon: (
      <svg
        className="w-8 h-8 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6l4 2"
        />
      </svg>
    ),
  },
];

const Statistics: React.FC = () => {
  return (
    <section id="statistics" className="py-16 bg-base-100 text-white">
      <div className="container mx-auto px-4 max-w-5xl text-center">
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
              <div>{icon}</div>
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
