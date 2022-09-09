const Book = require("../models/Book");
const Author = require("../models/Author");

const mongoDataMethods = {
  createAuthor: async (args) => {
    const newAuthor = new Author(args);
    return await newAuthor.save();
  },
  createBook: async (args) => {
    const newBook = new Book(args);
    return await newBook.save();
  },

  getAllBooks: async (condition = null) =>
    condition === null ? await Book.find() : await Book.find(condition),
  getBookById: async (id) => await Book.findById(id),
  getAllAuthors: async () => await Author.find(),
  getAuthorbyId: async (id) => await Author.findById(id),
};

module.exports = mongoDataMethods;
