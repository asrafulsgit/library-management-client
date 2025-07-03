const book = {
  _id: "685658a4f8ea852f3ba11f51",
  title: "The Theory of Everything",
  author: "Stephen Hawking",
  genre: "SCIENCE",
  isbn: "9780553380163",
  description: "An overview of cosmology and black holes.",
  copies: 5,
  available: true,
  cover: ""
};

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}