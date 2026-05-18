const { books } = require("../models/books.js");

exports.getAllBooks = function (req, res) {
  res.status(201).json(books);
};

exports.getBookById = function (req, res) {
  const id = Number(req.params.id);

  if (isNaN(id)) return res.status(400).json(`Id must be a number!`);

  const book = books.find((book) => book.id === id);

  if (!book)
    return res
      .status(404)
      .end(`Requested book with id: ${id} does not exists!`);

  res.json(book);
};

exports.createBook = function (req, res) {
  const { title, author } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "Title is required" });
  if (!author || author === "")
    return res.status(400).json({ error: "Author is required" });

  const id = books.length + 1;
  const book = { id, title, author };
  books.push(book);

  return res.status(201).json({ message: "Book created successfully", id });
};

exports.deleteBook = function (req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json(`Id must be a number!`);

  const index = books.findIndex((book) => book.id === id);

  if (!index)
    return res
      .status(404)
      .end(`Requested book with id: ${id} does not exists!`);

  books.splice(index, 1);

  return res.status(200).end(`Book with id: ${id} deleted successfully!`);
};
