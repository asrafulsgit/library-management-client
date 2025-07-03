import React from "react";

interface Testimonial {
  text: string;
  name: string;
  role: string;
  rating: number;  
}

const testimonials: Testimonial[] = [
  {
    text: "This library system is incredibly intuitive and efficient. Managing books has never been easier!",
    name: "Jane Doe",
    role: "Librarian, City Public Library",
    rating: 5,
  },
  {
    text: "The borrow summary feature is a game-changer. I can quickly see all borrowed books at a glance.",
    name: "John Smith",
    role: "Library Assistant",
    rating: 4.5,
  },
  {
    text: "Adding new books is a breeze, and the responsive design works perfectly on my tablet.",
    name: "Emily White",
    role: "School Librarian",
    rating: 5,
  },
];

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    className="w-5 h-5 inline-block"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.146 6.592a1 1 0 00.95.69h6.932c.969 0 1.371 1.24.588 1.81l-5.61 4.073a1 1 0 00-.364 1.118l2.146 6.591c.3.921-.755 1.688-1.54 1.118l-5.61-4.072a1 1 0 00-1.176 0l-5.61 4.072c-.784.57-1.838-.197-1.539-1.118l2.146-6.591a1 1 0 00-.364-1.118l-5.61-4.073c-.784-.57-.38-1.81.588-1.81h6.932a1 1 0 00.95-.69l2.146-6.592z"
    />
  </svg>
);

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        

        <div className="pb-3">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
  What Our Users Say
</h2>
<p className="text-center text-gray-400 mb-10 max-w-xl mx-auto">
  Hear from our community about how the library system has improved their experience.
</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-neutral-800 p-8 rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              <p className="text-lg mb-6 italic">"{t.text}"</p>
              <div className="text-yellow-400 mb-4 flex pl-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className="pr-1">
                    <StarIcon key={i} filled={i + 1 <= Math.floor(t.rating)} />
                  </span>
                ))}
              </div>
              <p className="font-semibold text-neutral-200">- {t.name}</p>
              <p className="text-sm text-neutral-400">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
