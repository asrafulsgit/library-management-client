import React, { useState } from "react";
import { useAddBookMutation } from "../controllers/apiSlice";
import { toast } from "react-toastify";

interface Form {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

const CreateBook: React.FC = () => {
  const intiForm : Form ={
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
    available: false,
  }
  const [form, setForm] = useState<Form>(intiForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };
  //  Handle submit
  const [addBook, { isLoading , error , isSuccess }] = useAddBookMutation();
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addBook(form).unwrap();
      setForm(intiForm);
      toast.success('Book create successfull.')
    } catch (err: any) {
      if(err?.data?.error?.errors?.isbn?.message){
        toast.error(err?.data?.error?.errors?.isbn?.message);
      }else{
        toast.error(err?.data?.message)
      }
    }
  };


  return (
    <section className="pt-25 pb-16 bg-base-100 text-white min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Add New Book</h2>
        <p className="text-gray-400 mb-8">
          Fill in the details below to create a new book record.
        </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-neutral-900 p-6 rounded-lg shadow-lg"
        >
          {/* Title */}
          <div>
            <label htmlFor="title" className="block mb-1 font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block mb-1 font-medium">
              Author
            </label>
            <input
              id="author"
              name="author"
              type="text"
              required
              value={form.author}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Genre */}
          <div>
          <label htmlFor="genre" className="block mb-1 font-medium">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-base-100 border border-gray-600 text-white"
          >
            <option value="">Select a genre</option>
            <option value="FICTION">FICTION</option>
            <option value="NON_FICTION">NON_FICTION</option>
            <option value="SCIENCE">SCIENCE</option>
            <option value="HISTORY">HISTORY</option>
            <option value="BIOGRAPHY">BIOGRAPHY</option>
            <option value="FANTASY">FANTASY</option>
          </select>
        </div>

          {/* ISBN */}
          <div>
            <label htmlFor="isbn" className="block mb-1 font-medium">
              ISBN
            </label>
            <input
              id="isbn"
              name="isbn"
              type="text"
              required
              value={form.isbn}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block mb-1 font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Copies */}
          <div>
            <label htmlFor="copies" className="block mb-1 font-medium">
              Copies
            </label>
            <input
              id="copies"
              name="copies"
              type="number"
              min={0}
              value={form.copies}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-base-100 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Available */}
          <div className="flex items-center space-x-2">
            <input
              id="available"
              name="available"
              type="checkbox"
              checked={form.available}
              onChange={(e) => {
            setForm((prev) => ({
              ...prev,
              available : e.target.checked,
            }));
          }}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="available" className="font-medium">
              Available
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition"
          >
            {isLoading ? 'Creating...' : 'Create Book'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateBook;
