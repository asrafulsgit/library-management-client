import React from "react";
import locationImage from '../assets/location.png'
import emailImage from '../assets/email.png'
import phoneImage from '../assets/phone.png'

const Contact : React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-[#2626269d] text-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Title */}
        <div className="text-center mb-15">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            We'd love to hear from you. Reach out with any questions or feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start ">
              <div className="mt-1 w-12 ">
                <img src={locationImage} alt="location" className="h-7 mx-auto" />
                </div>
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-400">
                  123 Library Street<br />
                  Knowledge City, 45678
                </p>
              </div>
            </div>
            <div className="flex items-start ">
              <div className="mt-1 w-12">
                <img src={emailImage} alt="location" className="h-7 mx-auto" />
                </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-400">info@libraryapp.com</p>
              </div>
            </div>
            <div className="flex items-start ">
              <div className="mt-1 w-12">
                <img src={phoneImage} alt="location" className="h-8 mx-auto" />
                </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact ;
