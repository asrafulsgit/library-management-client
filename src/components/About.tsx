import React from "react";

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-base-100 text-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Our Library
          </h2>
          <p className="text-gray-400 mb-4">
            Our library offers a rich collection of books, journals, and digital resources
            to empower your learning and research. From timeless classics to modern
            bestsellers, we are committed to making knowledge accessible to everyone.
          </p>
          <p className="text-gray-400">
            With a clean and intuitive management system, borrowing and discovering books
            has never been easier. Join our community and explore the world of knowledge
            at your fingertips.
          </p>
        </div>

        {/* Optional Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80"
            alt="Library"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
