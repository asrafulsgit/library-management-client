import React from "react";
import { Link } from "react-router";

const Hero: React.FC = () => {
  return (
    <section
      className="text-neutral-100 
       overflow-hidden h-[88vh] flex items-center justify-center"
    >
      <div className="container mx-auto px-4 text-center  z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Minimal Library Management
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Effortlessly manage your book collection, track borrowings, and
          streamline library operations with a clean, intuitive interface.
        </p>
        <Link
           to='/books'
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Explore Books
        </Link>
      </div>
    </section>
  );
};

export default Hero;
