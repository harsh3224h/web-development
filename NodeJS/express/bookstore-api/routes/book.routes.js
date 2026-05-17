const express = require("express");
const { books } = require("../db/books");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(201).json(books);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) return res.status(400).json(`Id must be a number!`);

  const book = books.find((book) => book.id === id);

  if (!book)
    return res
      .status(404)
      .end(`Requested book with id: ${id} does not exists!`);

  res.json(book);
});

router.post("/", (req, res) => {
  const { title, author } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "Title is required" });
  if (!author || author === "")
    return res.status(400).json({ error: "Author is required" });

  const id = books.length + 1;
  const book = { id, title, author };
  books.push(book);

  return res.status(201).json({ message: "Book created successfully", id });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json(`Id must be a number!`);

  const index = books.findIndex((book) => book.id === id);

  if (!index)
    return res
      .status(404)
      .end(`Requested book with id: ${id} does not exists!`);

  books.splice(index, 1);

  return res.status(200).end(`Book with id: ${id} deleted successfully!`);
});

module.exports = router;
